
// Access the file <proj_controllers>/cartridge/controllers/COPlaceOrder.js
// In the method start(), substitute the following last lines:
		
// var orderPlacementStatus = Order.submit(order);
// if (!orderPlacementStatus.error) {
//     clearForms();
// }
// return orderPlacementStatus;


// They must be substituted for:


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
