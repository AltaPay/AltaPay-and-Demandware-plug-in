'use strict';

/**
 * Handle.
 */
function Handle(args) {
	
	var txn =  require('dw/system/Transaction');
	
	var ret = txn.wrap (
			function () {
				var cp = require('int_altapay/cartridge/scripts/pipelet/CreatePaymentInstrument.ds');
				return cp.createPayment(args);
			});
	
	if (ret) {
		
		return {success: true};
	}
	else {
	
		return {error: true};
	}
	
	
}

/**
 * Authorizes a payment.
 *
 */
function Authorize(args) {
	
	var txn =  require('dw/system/Transaction');
	
	// CHECK REQUISITES: ===============================================================
	var ret = txn.wrap (
			function () {
				var cp = require('int_altapay/cartridge/scripts/pipelet/CheckPreRequisites.ds');
				return cp.check(args);
			});
	
	if (!ret) {
		return {error: true};
	}
	
	// CREATE PAYMENT: ==================================================================
	var pc = require('int_altapay/cartridge/scripts/pipelet/PaymentCreate.ds');
	ret = pc.create(args);

	var location;
	if (!ret) {
		// location = dw.web.URLUtils.https('AltaPay-PaymentFail');
		return {error: true};
	}
	else {
		location = args.CreatePaymentURL;
	}
	
	// Redirect: =========================================================================
	request.custom.altapay_location = location;    // Payment gateway URL.
	session.custom.altapay_orderNo = args.OrderNo; // Need to save this in the session. It'll be used by the Altapay controller.
		
	return {
		authorized: true // Actually it's not yet authorized, but we must return true to continue the flow and redirect the user to the gateway
	}; 

}

/*
 * Module exports
 */
exports.Handle = Handle;
exports.Authorize = Authorize;