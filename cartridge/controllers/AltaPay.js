/**
 * AltaPay controller.
 * 
 */
importPackage(dw.order);
importPackage(dw.system);
importPackage(dw.web);

var guard = require('altapay_controllers/cartridge/scripts/guard');

var ISML = require('dw/template/ISML');

var app = require('altapay_controllers/cartridge/scripts/app');

var Logger = require('dw/system/Logger');

var URLUtils = require('dw/web/URLUtils');


function logErrorAndRenderTemplate(err) {
	
	Logger.error(err);
	
	ISML.renderTemplate('error/generalerror.isml', {});

}

function getOrder () {
	
	return OrderMgr.getOrder(getOrderNo());

}

function getOrderNo () {
	
	var se = session;
	
	//return se.privacy.orderNo;
	return se.custom.altapay_orderNo;

}

function callbackForm() {

	var se = session;
	
	var order = getOrder();

	if (order != null) {
		
		ISML.renderTemplate('altapay/callbackform.isml', {});
	}
	else {
		
		logErrorAndRenderTemplate('Order not found: order ID ' + getOrderNo());
	}

}

function fraudCheck(req, recommendation) {
	
	var fr = req.httpParameterMap.fraud_recommendation;
	
	if (fr != null && fr == recommendation) {
		return true;
	}
	else {
		return false;
	}	
}

function getFraudMessage() {
	
	return 'Card declined';
}

function fraudCheckDeny(req) {
	
	return fraudCheck(req, 'Deny');
	
}

function fraudCheckChallenge(req) {
	
	return fraudCheck(req, 'Challenge');
	
}

function payment(orderConfirmed) { 

	var se = session;
	var req = request;

	// Save credit card token, if requested by customer: ===============================
	var ST = require('~/cartridge/scripts/pipelet/SaveCreditCardToken.ds');
	ST.save();
		
	// Get Order =======================================================================
	var order = getOrder();
	
	if (order == null) {		
		logErrorAndRenderTemplate('Order not found: order ID ' + getOrderNo());
		return;
	}

	// Validate Referrer ===============================================================
	var VAL = require('~/cartridge/scripts/pipelet/ValidateAltaPayAsReferrer.ds');
	
	var ret = VAL.validateAltaPayAsReferrer(req.httpParameterMap.xml.stringValue);
	
	if ((!ret.IsReferrerAltaPay) || (ret.orderToken != order.getOrderToken())) {
		logErrorAndRenderTemplate('Invalid referrer or invalid order token');
		return;
	}
	
	if (fraudCheckDeny(req)) {
		// Fraud checking (only for credit cards) returned 'Deny': fail the order.
		
		var txn =  require('dw/system/Transaction');
		
		var status = txn.wrap (
						function () {
							return OrderMgr.failOrder(order);
						});
		
		if (status.getStatus() == Status.ERROR) {
			logErrorAndRenderTemplate('Error failing the order ' + getOrderNo() + ': ' + status.getMessage());
			return;
		}
		
		// orderConfirmed = false;
		gotoCOBillingStart(true);
		return;
	
	}
	else if (order.getStatus() != Order.ORDER_STATUS_NEW) {
		// Order status should change from CREATED to NEW.
	
		// Replacement for COPlaceOrder-SubmitImpl: ==========================================================================
		try {
		
			var orderPlacementStatus = app.getModel('Order').submit(order);
	    	if (orderPlacementStatus.error) {
	    		logErrorAndRenderTemplate('Error calling Order.submit: ' + orderPlacementStatus.PlaceOrderError.getMessage());
				return;		
	    	}
	
		}
		catch (err) {		
			logErrorAndRenderTemplate('Error calling Order.submit: ' + err);
			return;		
		}
	
	}
		
	// pipelet/AltaPayUpdateOrderPaymentInstrument.ds ==================================	
	var txn =  require('dw/system/Transaction');
	
	ret = txn.wrap (
			function () {
				var UPD = require('~/cartridge/scripts/pipelet/AltaPayUpdateOrderPaymentInstrument.ds');
				return UPD.updateOrderPaymentInstrument(order, req.httpParameterMap.xml.stringValue, orderConfirmed);
			});
	
	if (!ret) {
		logErrorAndRenderTemplate('updateOrderPaymentInstrument error');
		return;
	}
	
	// pipelet/UpdateOpenNotificationMessage.ds ========================================
	var ONM = require('~/cartridge/scripts/pipelet/UpdateOpenNotificationMessage.ds');
	var openMessage = ONM.updateOpenNotificationMessage(orderConfirmed); 
		
	// COSummary-ShowConfirmation =======================================================
	response.redirect(URLUtils.https('AltaPay-ShowConfirmation', 'altapayOpenMessage', openMessage));
		
}


function showConfirmation () {
	
	var se = session;
	
	var order = getOrder();
	
	if (order == null) {		
		logErrorAndRenderTemplate('Order not found: order ID ' + getOrderNo());
		return;
	}

	app.getController('COSummary').ShowConfirmation(order);
	
}

function paymentOpen() {
	
	try {
		
		payment(false);
		
	}
	catch (err) {
		
		logErrorAndRenderTemplate('Unexpected error in paymentOpen: ' + err);
		
	}
}

function paymentSuccess() {
	
	try {
	
		payment(true);
	
	}
	catch (err) {
		
		logErrorAndRenderTemplate('Unexpected error in paymentSuccess: ' + err);
		
	}
}


function paymentFail() {
	
	try {
		
		fail();
	
	}
	catch (err) {
		
		logErrorAndRenderTemplate('Unexpected error in paymentFail: ' + err);
		
	}
	
}

function fail() {
	
	var se = session;
	var req = request;

	// Get Order =======================================================================
	var order = getOrder();
	
	if (order == null) {		
		logErrorAndRenderTemplate('Order not found: order ID ' + getOrderNo());
		return;
	}
	
	// COPlaceOrder-FailImpl =========================================================
	try {
		
		// This recovers the basket, so the user can try to checkout again:
		var txn =  require('dw/system/Transaction');
		
		var status = txn.wrap (
				function() {
					return OrderMgr.failOrder(order);
				});
		
		if 	(status.getStatus() != dw.system.Status.OK) {
			logErrorAndRenderTemplate(status.getMessage() + ' (Error failing order: order ID ' + getOrderNo() + ')');
			return;
		}
	
	}
	catch (err) {		
		logErrorAndRenderTemplate(err);
		return;		
	}
	
	gotoCOBillingStart(false);
	
}

function gotoCOBillingStart(fraudError) { // Redirects to the billing page
	
	var req = request;
	var se = session;
	var errorMessage = '';
	
	// UpdateErrorMessage ==================================================================
	var UPD = require('~/cartridge/scripts/pipelet/UpdateErrorMessage.ds');
	
	if (!fraudError) { 
		errorMessage = UPD.updateErrorMessage(req.httpParameterMap.xml.stringValue);
	}
	else {
		errorMessage = getFraudMessage();
	}
	
	//se.custom.altapayErrorMessage = errorMessage;
	
	// COBilling-Start =====================================================================
	response.redirect(URLUtils.https('COBilling-Start', 'altapayErrorMessage', errorMessage));
	
}

function paymentNotification() {
	
	try {
		
		notification();
	
	}
	catch (err) {
		
		logErrorAndRenderTemplate('Unexpected error in paymentNotification: ' + err);
		
	}
	
}

function notification() {
	
	var req = request;
	
	// FindOrder ==================================================================
	var FO = require('~/cartridge/scripts/pipelet/FindOrder.ds');
	
	var orderId = FO.findOrder(req.httpParameterMap.xml.stringValue);
	
	if (orderId == null) {
		Logger.error('Order ID not found inside XML');		
		ISML.renderTemplate('altapay/notification_feedback_order_not_found.isml', {});
		return;
	}
	
	// GetOrder ===================================================================
	var order = OrderMgr.getOrder(orderId);
	
	if (order == null) {		
		Logger.error('Order not found: order ID ' + orderId);		
		ISML.renderTemplate('altapay/notification_feedback_order_not_found.isml', {});
		return;
	}
	
	// ControlOpenNotification ==================================================================
	var txn =  require('dw/system/Transaction');
	
	var result = txn.wrap (
			function () {
				var CON = require('~/cartridge/scripts/pipelet/ControlOpenNotification.ds');
				return CON.controlOpenNotification(order, req.httpParameterMap.xml.stringValue);
			});

	if (result == null) {
		Logger.error('Error calling ControlOpenNotification for the order ' + orderId);		
		ISML.renderTemplate('altapay/notification_feedback_order_not_found.isml', {});
		return;
	}
	
	if (result.CancelOrder) { // cancel 
		
		var status = txn.wrap (
				function () {
					return OrderMgr.cancelOrder(order);
				});		
		
		if (status.getStatus() == dw.system.Status.OK) {
			ISML.renderTemplate('altapay/notification_feed_back.isml', {});
		}
		else {
			Logger.error('Error cancelling the order ' + orderId + ': ' + status.getMessage());		
			ISML.renderTemplate('altapay/notification_feedback_order_not_found.isml', {});
		}
		
	}
	else if (result.OrderMatch) { // success
		
		if (order.getStatus() != Order.ORDER_STATUS_NEW) {
			
			// Order status should change from CREATED to NEW: ================================================================
			try {
				
				var orderPlacementStatus = app.getModel('Order').submit(order);
		    	if (orderPlacementStatus.error) {
		    		logErrorAndRenderTemplate('Error calling Order.submit: ' + orderPlacementStatus.PlaceOrderError.getMessage());
					return;		
		    	}
		
			}
			catch (err) {		
				logErrorAndRenderTemplate('Error calling Order.submit: ' + err);
				return;		
			}
			
		} 
	
		ISML.renderTemplate('altapay/notification_feed_back.isml', {});
	
	}
	else { // error
		Logger.error('OrderMatch is false');		
		ISML.renderTemplate('altapay/notification_feedback_order_not_found.isml', {});
	}
	
}

exports.CallbackForm = guard.ensure(['https'], callbackForm);
exports.CallbackForm.public = true;

exports.PaymentSuccess = guard.ensure(['https'], paymentSuccess);
exports.PaymentSuccess.public = true;

exports.PaymentOpen = guard.ensure(['https'], paymentOpen);
exports.PaymentOpen.public = true;

exports.PaymentFail = guard.ensure(['https'], paymentFail);
exports.PaymentFail.public = true;

exports.PaymentNotification = guard.ensure(['https'], paymentNotification);
exports.PaymentNotification.public = true;

exports.ShowConfirmation = guard.ensure(['https'], showConfirmation);
exports.ShowConfirmation.public = true;







