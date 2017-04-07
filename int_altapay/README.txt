**** Changes necessary in other files:

-> 1)  <xxxxx_controllers>/cartridge/controllers/COSummary.js

Substitute the method submit() for: 


function submit() {
    // Calls the COPlaceOrder controller that does the place order action and any payment authorization.
    // COPlaceOrder returns a JSON object with an order_created key and a boolean value if the order was created successfully.
    // If the order creation failed, it returns a JSON object with an error key and a boolean value.
    var placeOrderResult = app.getController('COPlaceOrder').Start();
    if (placeOrderResult.error) {
        start({
            PlaceOrderError: placeOrderResult.PlaceOrderError
        });
    } else if (placeOrderResult.order_created) {
    	
    	if (request.custom.altapay_location != null) { // new code
    		response.redirect(request.custom.altapay_location); // new code
    	}
    	else {
    		showConfirmation(placeOrderResult.Order);
    	}
    }
}


-> 2) <xxxxxxx_core>/cartridge/templates/default/checkout/billing/billing.isml

Add the code below in a convenient place:


<div class="altapay-errorMessage">
	<isif condition="${request.httpParameterMap.altapayErrorMessage != null}">
		<label>
		${request.httpParameterMap.altapayErrorMessage} 
		</label>
	</isif>
</div>
		
		

-> 3) <xxxxxxx_core>/cartridge/templates/default/checkout/confirmation/confirmation.isml

Add the code below in a convenient place:

<isif condition="${request.httpParameterMap.altapayOpenMessage != null}">
	${request.httpParameterMap.altapayOpenMessage}
</isif>



-> 4) <xxxxx_controllers>/cartridge/controllers/COPlaceOrder.js -> method start():

--- Substitute the last lines:
		
var orderPlacementStatus = Order.submit(order);
if (!orderPlacementStatus.error) {
    clearForms();
}
return orderPlacementStatus;


--- for it:

    if (request.custom.altapay_location != null) { 
    	
    	// Return without changing the order status to NEW. The order status will remain CREATED,
    	// which means it can be recovered (the user can try to buy it again) if the gateway unauthorizes the order.
    	
    	return {
    		Order: order,
    		order_created: true
    	};
    	
    }
    else { // the order status will be changed to NEW
    	var orderPlacementStatus = Order.submit(order);
    	if (!orderPlacementStatus.error) {
    		clearForms();
    	}
    	return orderPlacementStatus;
    }

    
