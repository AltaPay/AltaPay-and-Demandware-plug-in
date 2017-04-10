

// Substitute the method submit() inside the file <proj_controllers>/cartridge/controllers/COSummary.js for: 


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
