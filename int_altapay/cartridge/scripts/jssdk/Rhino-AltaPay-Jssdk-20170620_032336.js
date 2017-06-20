/**
 * Recognized account offers (aka PaymentRequest.accountOffer)
 * @type {{required: string, disabled: string}}
 */
AccountOffer = {
      required: 'required'
    , disabled: 'disabled'
};

function AltaPayFactory() {
}

/**
 * @returns {MerchantApi}
 */
AltaPayFactory.prototype.getMerchantApi = function(username, password, url) {
	return new MerchantApi(
		username
		, password
		, url
		, this
		, this.getLogger()
		, this.getHttp()
		, this.getDateHelper()
		, this.getXml()
		, this.getResponseFactory()
		, this.getBase64()
		, this.getBaseApi()
	);
};

/**
 * @returns {ProcessorApi}
 */
AltaPayFactory.prototype.getProcessorApi = function(username, password, url) {
	return new ProcessorApi(
		username
		, password
		, url
		, this
		, this.getLogger()
		, this.getHttp()
		, this.getXml()
		, this.getResponseFactory()
		, this.getBase64()
		, this.getBaseApi()
	);
};

/**
 * @returns {Logger}
 */
AltaPayFactory.prototype.getLogger = function() {
	return new Logger();
};

/**
 * @returns {BaseApi}
 */
AltaPayFactory.prototype.getBaseApi = function() {
	return new BaseApi();
};


/**
 * @returns {Http}
 */
AltaPayFactory.prototype.getHttp = function() {
	return new Http();
};

/**
 * @returns {Xml}
 */
AltaPayFactory.prototype.getXml = function() {
	return new Xml();
};

/**
 * @returns {PaymentRequestBase}
 */
AltaPayFactory.prototype.getPaymentRequestBase = function() {
	return new PaymentRequestBase(this.getPaymentRequestConfig(), this.getPaymentInfo());
};

/**
 * @returns {PaymentRequest}
 */
AltaPayFactory.prototype.getPaymentRequest = function() {
	return new PaymentRequest(this.getPaymentRequestBase(), this.getCustomerInfo());
};

/**
 * @returns {InitiatePaymentRequest}
 */
AltaPayFactory.prototype.getInitiatePaymentRequest = function() {
	return new InitiatePaymentRequest(this.getBaseRequest(),this.getPaymentRequestBase(), this.getCustomerInfo(), this.getCreditCard());
};

/**
 * @returns {InvoiceReservationRequest}
 */
AltaPayFactory.prototype.getInvoiceReservationRequest = function() {
	return new InvoiceReservationRequest(this.getCustomerInfo());
};

/**
 * @returns {CaptureRequest}
 */
AltaPayFactory.prototype.getCaptureRequest = function() {
	return new CaptureRequest(this.getBaseRequest());
};

/**
 * @returns {RefundRequest}
 */
AltaPayFactory.prototype.getRefundRequest = function() {
	return new RefundRequest(this.getBaseRequest());
};


/**
 * @returns {ReleaseRequest}
 */
AltaPayFactory.prototype.getReleaseRequest = function() {
	return new ReleaseRequest(this.getBaseRequest());
};

/**
 * @returns {ChargeRequest}
 */
AltaPayFactory.prototype.getChargeRequest = function() {
	return new ChargeRequest(this.getBaseRequest());
};


/**
 * @returns {CreditCard}
 */
AltaPayFactory.prototype.getCreditCard = function() {
	return new CreditCard(this.getBaseRequest());
};

/**
 * @returns {BaseRequest}
 */
AltaPayFactory.prototype.getBaseRequest = function() {
	return new BaseRequest();
};

/**
 * @returns {PaymentInfo}
 */
AltaPayFactory.prototype.getPaymentInfo = function() {
	return new PaymentInfo(this.getBaseRequest());
};

/**
 * @returns {OrderLine}
 */
AltaPayFactory.prototype.getOrderLine = function() {
	return new OrderLine(this.getBaseRequest());
};

/**
 * @returns {CustomerInfo}
 */
AltaPayFactory.prototype.getCustomerInfo = function() {
	return new CustomerInfo(this.getCustomerAddress(), this.getCustomerAddress());
};

/**
 * @returns {CustomerAddress}
 */
AltaPayFactory.prototype.getCustomerAddress = function() {
	return new CustomerAddress();
};

/**
 * @returns {PaymentRequestConfig}
 */
AltaPayFactory.prototype.getPaymentRequestConfig = function() {
	return new PaymentRequestConfig();
};

/**
 * @returns {Verify3dSecureRequest}
 */
AltaPayFactory.prototype.getVerify3dSecureRequest = function(transactionId, paRes) {
	return new Verify3dSecureRequest(this.getBaseRequest(), transactionId, paRes);
};

/**
 * @returns {DateHelper}
 */
AltaPayFactory.prototype.getDateHelper = function() {
	return new DateHelper();
};

/**
 * @returns {ResponseFactory}
 */
AltaPayFactory.prototype.getResponseFactory = function () {
	return new ResponseFactory();
};

/**
 * @returns {ResponseFactory}
 */
AltaPayFactory.prototype.getBase64 = function () {
	return new Base64();
};

/**
 * @returns {HttpHelper}
 */
AltaPayFactory.prototype.getHttpHelper = function() {
	return new HttpHelper();
}

/**
 * @returns {PaymentsRequest}
 */
AltaPayFactory.prototype.getPaymentsRequest = function() {
	return new PaymentsRequest(this.getBaseRequest());
}

/**
 * @returns {FundingsRequest}
 */
AltaPayFactory.prototype.getFundingsRequest = function() {
	return new FundingsRequest(this.getBaseRequest());
}

/**
 * Recognized auth types (aka PaymentRequest.authType)
 * @type {{payment: string, paymentAndCapture: string, subscription: string, subscriptionAndCharge: string, verifyCard: string}}
 */
AuthType = {
      payment: 'payment'
    , paymentAndCapture: 'paymentAndCapture'
    , subscription: 'subscription'
    , subscriptionAndCharge: 'subscriptionAndCharge'
    , verifyCard: 'verifyCard'
}/**
* @constructor
*/
function Base64() {
	this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
}

/**
 * @param input
 * @returns {string}
 */
Base64.prototype.encode = function(input) {
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;

	input = this._utf8_encode(input);

	while (i < input.length)
	{
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2))
		{
			enc3 = enc4 = 64;
		}
		else if (isNaN(chr3))
		{
			enc4 = 64;
		}

		output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
	}
	return output;
};

/**
 * @param input
 * @returns {string}
 */
Base64.prototype.decode = function(input) {
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;

	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	while (i < input.length)
	{

		enc1 = this._keyStr.indexOf(input.charAt(i++));
		enc2 = this._keyStr.indexOf(input.charAt(i++));
		enc3 = this._keyStr.indexOf(input.charAt(i++));
		enc4 = this._keyStr.indexOf(input.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;

		output = output + String.fromCharCode(chr1);

		if (enc3 != 64)
		{
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64)
		{
			output = output + String.fromCharCode(chr3);
		}
	}

	return this._utf8_decode(output);

};

/**
 * @param string
 * @returns {string}
 */
Base64.prototype._utf8_encode = function(string) {
	string = string.replace(/\r\n/g, "\n");
	var utftext = "";

	for (var n = 0; n < string.length; n++)
	{

		var c = string.charCodeAt(n);

		if (c < 128)
		{
			utftext += String.fromCharCode(c);
		}
		else if ((c > 127) && (c < 2048))
		{
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		}
		else
		{
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}
	}

	return utftext;
};

/**
 * @param utftext
 * @returns {string}
 */
Base64.prototype._utf8_decode = function(utftext) {
	var string = "";
	var i = 0;
	var c = 0, c2 = 0, c3 = 0;

	while (i < utftext.length)
	{

		c = utftext.charCodeAt(i);

		if (c < 128)
		{
			string += String.fromCharCode(c);
			i++;
		}
		else if ((c > 191) && (c < 224))
		{
			c2 = utftext.charCodeAt(i + 1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		}
		else
		{
			c2 = utftext.charCodeAt(i + 1);
			c3 = utftext.charCodeAt(i + 2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return string;
};
function BaseApi()
{

}

/**
 * @return {Object}
 * @private
 */
BaseApi.prototype.getHeaders = function() {
	return {'Authorization': "Basic " + this.base64.encode(this.username +':'+ this.password),'x-altapay-client-version':JssdkVersion.VERSION};
}

function BaseRequest()
{

}

BaseRequest.prototype.toHash = function()
{
	var result = {};
	for(var v in this)
	{
		if(typeof( this[v] ) === 'function' )
		{
			continue;
		}
		var overridden = this.perElementToHash(v,this[v]);
		if(overridden !== false)
		{
			ObjectHelper.extend(result, overridden);
		}
		else if(Object.prototype.toString.call( this[v] ) === '[object Array]')
		{
			result[this.transformHashKey(v)] = [];
			for(var k in this[v])
			{
				if(this[v][k].toHash)
				{
					result[this.transformHashKey(v)][k] = this[v][k].toString();
				}
				else
				{
					result[this.transformHashKey(v)][k] = this[v][k].toString();
				}
			}

			//result[this.transformHashKey(v)] = this[v].toHash();
		}
		else if(Object.prototype.toString.call( this[v] ) === '[object Object]' && this[v].toHash)
		{
			result[this.transformHashKey(v)] = this[v].toHash();
		}
		else if(this[v] !== null)
		{
			result[this.transformHashKey(v)] = this[v].toString();
		}
	}
	return result;
}

/**
 * @private
 * @returns {boolean|object}
 */
BaseRequest.prototype.perElementToHash = function()
{
	return false;
}

/**
 * @private
 * @param key {string}
 * @returns {string}
 */
BaseRequest.prototype.transformHashKey = function(key) {
	return key;
}
function BaseResponse()
{

}

/**
 * @returns {object}
 */
BaseResponse.prototype.getResponseObject = function()
{
	return this.responseObject;
}

/**
 * @param number
 * @return {PaymentResponse}
 */
BaseResponse.prototype.getPayment = function(number)
{
	if(this.responseObject.Body == null || this.responseObject.Body.Transactions == null)
	{
		return new PaymentResponse({});
	}
	if(Object.prototype.toString.call( this.responseObject.Body.Transactions.Transaction ) === '[object Array]' )
	{
		return new PaymentResponse(this.responseObject.Body.Transactions.Transaction[number]);
	}
	else if(number == 0)
	{
		return new PaymentResponse(this.responseObject.Body.Transactions.Transaction);
	}
	else
	{
		return new PaymentResponse({});
	}

}

/**
 * @returns {boolean}
 */
BaseResponse.prototype.success = function()
{
	return this.responseObject.Header.ErrorCode == 0 && this.responseObject.Body.Result == 'Success';
}

/**
 * @returns {string}
 */
BaseResponse.prototype.getErrorMessage = function()
{
	if(this.responseObject.Header.ErrorCode != 0)
	{
		return this.responseObject.Header.ErrorMessage;
	}
	else if(this.responseObject.Body.Result != 'Success')
	{
		return this.responseObject.Body.MerchantErrorMessage;
	}
	else
	{
		return null;
	}

};


/**
 * @returns {string}
 */
BaseResponse.prototype.getPaymentId = function()
{
	return this.getPayment(0).getPaymentId();
};

/**
 * @returns {int}
 */
BaseResponse.prototype.getTransactionId = function()
{
	return this.getPayment(0).getTransactionId();
};

/**
 * @returns {number}
 */
BaseResponse.prototype.getReservedAmount = function()
{
	return this.getPayment(0).getReservedAmount();
};

/**
 * @returns {number}
 */
BaseResponse.prototype.getCapturedAmount = function()
{
	return this.getPayment(0).getCapturedAmount();
};

/**
 * @returns {number}
 */
BaseResponse.prototype.getRefundedAmount = function()
{
	return this.getPayment(0).getRefundedAmount();
};

/**
 * @returns {number}
 */
BaseResponse.prototype.getRecurringDefaultAmount = function()
{
	return this.getPayment(0).getRecurringDefaultAmount();
};

/**
 * @returns {string}
 */
BaseResponse.prototype.getFraudRecommendation = function()
{
	return this.getPayment(0).getFraudRecommendation();
};


function BaseTransactionResponse()
{

}

BaseTransactionResponse.prototype.getReconciliationIdentifier = function()
{
	return this.getPayment(0).getReconciliationIdentifier();
}/**
 * @constructor
 */
function CallbackResponse(responseObject)
{
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}/**
 *
 * @extends BaseRequest
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function CaptureRequest(baseRequest) {
	this.paymentId = '';
	this.amount = null;
	this.orderLines = [];
	this.reconciliationIdentifier = null;
	this.invoiceNumber = null;
	this.salesTax = null;

	ObjectHelper.extend(this, baseRequest);
}

/**
 * @param orderLine {OrderLine}
 */
CaptureRequest.prototype.addOrderLine = function(orderLine) {
	this.orderLines.push(orderLine);
};

/**
 *
 * @param key {string}
 * @param value {object}
 * @returns {boolean|object}
 */
CaptureRequest.prototype.perElementToHash = function(key, value)
{
	if(key == 'orderLines')
	{
		if(value.length > 0)
		{
			var lines = [];
			for(var o in value)
			{
				lines.push(value[o].toHash());
			}
			return {'orderLines':lines};
		}
		else
		{
			return {};
		}
	}
	return false;
}

/**
 * @private
 * @param key {string}
 * @returns {string}
 */
CaptureRequest.prototype.transformHashKey = function(key) {
	if(key == 'paymentId')
	{
		return 'transaction_id';
	}
	if(key == 'orderLines')
	{
		return 'orderLines';
	}

	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}/**
 * @extends BaseResponse
 * @extends BaseTransactionResponse
 * @param responseObject
 * @constructor
 */
function CaptureResponse(responseObject) {
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
	ObjectHelper.extend(this, new BaseTransactionResponse());
}

/**
 * @return {CustomerAddress}
 */
CaptureResponse.prototype.getRegisteredAddress = function()
{
	var customerInfo = this.responseObject.Body.Transactions.Transaction.CustomerInfo;
	if(customerInfo == null)
	{
		return null;
	}
	var registeredAddress = customerInfo.RegisteredAddress;
	if(registeredAddress == null)
	{
		return null;
	}

	var address = new CustomerAddress();
	address.firstName = registeredAddress.Firstname;
	address.lastName = registeredAddress.Lastname;
	address.address = registeredAddress.Address;
	address.city = registeredAddress.City;
	address.region = registeredAddress.Region;
	address.country = registeredAddress.Country;
	address.postalCode = registeredAddress.PostalCode;

	return address;
}/**
 * @param baseRequest BaseRequest
 * @constructor
 */
function ChargeRequest(baseRequest)
{
	this.subscriptionPaymentId = '';
	this.amount = null;
	this.reconciliationIdentifier = null;

	ObjectHelper.extend(this, baseRequest);
}

/**
 *
 * @param key {string}
 * @returns {string}
 * @private
 */
ChargeRequest.prototype.transformHashKey = function(key) {
	if(key == 'subscriptionPaymentId')
	{
		return 'transaction_id';
	}

	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}/**
 * @constructor
 */
function ChargeResponse(responseObject)
{
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}

/**
 * @return {PaymentResponse}
 */
ChargeResponse.prototype.getSubscriptionPayment = function()
{
	return this.getPayment(0);
}

/**
 * @return {PaymentResponse}
 */
ChargeResponse.prototype.getChargePayment = function()
{
	return this.getPayment(1);
}/**
 *
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function CreditCard(baseRequest)
{
	this.cardnum = '';
	this.emonth = '';
	this.eyear = '';
	this.cvc = null;
	this.cardholderName = null;
	this.cardholderAddress = null;
	this.issueNumber = null;
	this.startMonth = null;
	this.startYear = null;

	ObjectHelper.extend(this, baseRequest);
}



var CsvHelper = {

	// ref: http://stackoverflow.com/a/1293163/2343
	// This will parse a delimited string into an array of
	// arrays. The default delimiter is the comma, but this
	// can be overriden in the second argument.
	csvToArray : function ( strData, strDelimiter ) {
		// Check to see if the delimiter is defined. If not,
		// then default to comma.
		strDelimiter = (strDelimiter || ",");

		// Create a regular expression to parse the CSV values.
		var objPattern = new RegExp(
			(
				// Delimiters.
			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

				// Quoted fields.
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

				// Standard fields.
			"([^\"\\" + strDelimiter + "\\r\\n]*))"
			),
			"gi"
		);


		// Create an array to hold our data. Give the array
		// a default empty first row.
		var arrData = [[]];

		// Create an array to hold our individual pattern
		// matching groups.
		var arrMatches = null;


		// Keep looping over the regular expression matches
		// until we can no longer find a match.
		while (arrMatches = objPattern.exec(strData)) {

			// Get the delimiter that was found.
			var strMatchedDelimiter = arrMatches[1];

			// Check to see if the given delimiter has a length
			// (is not the start of string) and if it matches
			// field delimiter. If id does not, then we know
			// that this delimiter is a row delimiter.
			if (
				strMatchedDelimiter.length &&
				strMatchedDelimiter !== strDelimiter
			) {

				// Since we have reached a new row of data,
				// add an empty row to our data array.
				arrData.push([]);

			}

			var strMatchedValue;

			// Now that we have our delimiter out of the way,
			// let's check to see which kind of value we
			// captured (quoted or unquoted).
			if (arrMatches[2]) {

				// We found a quoted value. When we capture
				// this value, unescape any double quotes.
				strMatchedValue = arrMatches[2].replace(
					new RegExp("\"\"", "g"),
					"\""
				);

			} else {

				// We found a non-quoted value.
				strMatchedValue = arrMatches[3];

			}


			// Now that we have our value string, let's add
			// it to the data array.
			arrData[arrData.length - 1].push(strMatchedValue);
		}

		// Return the parsed data.
		return ( arrData );
	},
	/**
	 * @param arrayKeys {array}
	 * @param arrayValues {array}
	 */
	combine : function(arrayKeys, arrayValues)
	{
		var result = {};
		for(var k in arrayKeys)
		{
			result[arrayKeys[k]] = arrayValues[k];
		}
		return result;
	}

};
function CustomerAddress() {
    this.firstName = null;
    this.lastName = null;
    this.address = null;
    this.city = null;
    this.region = null;
    /**
     * ISO-3166 country code
     * @type {string}
     */
    this.country = null;
    this.postalCode = null;
}/**
 * @param billingAddress {CustomerAddress}
 * @param shippingAddress {CustomerAddress}
 * @constructor
 */
function CustomerInfo(billingAddress, shippingAddress) {
    this.email = null;
    this.username = null;
    this.customerPhone = null;
    this.bankName = null;
    this.bankPhone = null;

    /**
     * @type {CustomerAddress}
     */
    this.billingAddress = billingAddress;

    /**
     * @type {CustomerAddress}
     */
    this.shippingAddress = shippingAddress;
}

/**
 * @returns {Object}
 */
CustomerInfo.prototype.toHash = function() {
    var result = {};

    result.email = this.email;
    result.username = this.username;
    result.customer_phone = this.customerPhone;
    result.bank_name = this.bankName;
    result.bank_phone = this.bankPhone;

    result.billing_firstname = this.billingAddress.firstName;
    result.billing_lastname = this.billingAddress.lastName;
    result.billing_city = this.billingAddress.city;
    result.billing_region = this.billingAddress.region;
    result.billing_postal = this.billingAddress.postalCode;
    result.billing_country = this.billingAddress.country;
    result.billing_address = this.billingAddress.address;

    result.shipping_firstname = this.shippingAddress.firstName;
    result.shipping_lastname = this.shippingAddress.lastName;
    result.shipping_city = this.shippingAddress.city;
    result.shipping_region = this.shippingAddress.region;
    result.shipping_postal = this.shippingAddress.postalCode;
    result.shipping_country = this.shippingAddress.country;
    result.shipping_address = this.shippingAddress.address;

    return result;
};

function DateHelper() {
}

/**
 * Format a date
 * @param format {string} Currently supported values are "Y,m,d,H,i.s" (like in PHP)
 * @param date {Date}
 * @returns {string}
 */
DateHelper.prototype.formatDate = function(format, date) {
    var result = '';

    for (var i=0; i!=format.length; i++) {
        switch (format[i]) {
            case 'Y':
                result += date.getFullYear();
                break;

            case 'm':
                result += this.padLeft(date.getMonth() + 1, 2, '0');
                break;

            case 'd':
                result += this.padLeft(date.getDate(), 2, '0');
                break;

            case 'H':
                result += this.padLeft(date.getHours(), 2, '0');
                break;

            case 'i':
                result += this.padLeft(date.getMinutes(), 2, '0');
                break;

            case 's':
                result += this.padLeft(date.getSeconds(), 2, '0');
                break;

            default:
                result += format[i];
                break;
        }
    }

    return result;
};

/**
 * Left pad a string
 * @param value {string}
 * @param length {number}
 * @param padding {string}
 * @returns {string}
 * @private
 */
DateHelper.prototype.padLeft = function(value, length, padding) {
    padding = padding || '0';
    return (value.toString().length < length) ? this.padLeft(padding+value, length, padding) : value;
};

var FraudRecommendation = {
	Accept : 'Accept',
	Deny : 'Deny',
	Challenge : 'Challenge',
	Unknown : 'Unknown'
};/**
 * Recognized fraud services
 * @type {{none: string, maxmind: string, red: string, test: string}}
 */
FraudService = {
      none: 'none'
    , maxmind: 'maxmind'
    , red: 'red'
    , test: 'test'
};

function FundingRecord(data)
{
	this.date = '';
	this.type = '';
	this.id = '';
	this.reconciliationIdentifier = '';
	this.payment = '';
	this.order = '';
	this.terminal = '';
	this.shop = '';
	this.transactionCurrency = '';
	this.transactionAmount = '';
	this.settlementCurrency = '';
	this.settlementAmount = '';
	this.fixedFee = '';
	this.fixedFeeVat = '';
	this.rateBasedFee = '';
	this.rateBasedFeeVat = '';

	this.readFromHeaders(data)
}

FundingRecord.prototype.readFromHeaders = function(data)
{
	var map = {
		Date : 'date',
		Type : 'type',
		ID : 'id',
		"Reconciliation Identifier" : 'reconciliationIdentifier',
		"Payment" : 'payment',
		Order : 'order',
		Terminal : 'terminal',
		Shop : 'shop',
		"Transaction Currency" : 'transactionCurrency',
		"Transaction Amount" : 'transactionAmount',
		"Settlement Currency" : 'settlementCurrency',
		"Settlement Amount" : 'settlementAmount',
		"Fixed Fee" : 'fixedFee',
		"Fixed Fee VAT" : 'fixedFeeVat',
		"Rate Based Fee" : 'rateBasedFee',
		"Rate Based Fee VAT" : 'rateBasedFeeVat'
	}

	for(var k in data)
	{
		if(map[k])
		{
			this[map[k]] = data[k];
		}

	}

}/**
 *
 * @param responseObject {object}
 * @param merchantApi {MerchantApi}
 * @param responseFactory {ResponseFactory}
 * @constructor
 */
function FundingResponse(responseObject, merchantApi, responseFactory)
{
	this.responseObject = responseObject;
	this.merchantApi = merchantApi;
	this.responseFactory = responseFactory;
}

/**
 * @return {string}
 */
FundingResponse.prototype.getFilename = function()
{
	return this.responseObject.Filename;
};

/**
 * @return {string}
 */
FundingResponse.prototype.getContractIdentifier = function()
{
	return this.responseObject.ContractIdentifier;
};

/**
 * @return {string}
 */
FundingResponse.prototype.getAcquirer = function()
{
	return this.responseObject.Acquirer;
};

/**
 * @return {string}
 */
FundingResponse.prototype.getFundingDate = function()
{
	return this.responseObject.FundingDate;
};

/**
 * @return {number}
 */
FundingResponse.prototype.getAmount = function()
{
	return this.responseObject.Amount;
};

/**
 * @return {string}
 */
FundingResponse.prototype.getReferenceText = function()
{
	return this.responseObject.ReferenceText;
};

/**
 * @return {string}
 */
FundingResponse.prototype.getAccountNumber = function()
{
	return this.responseObject.AccountNumber;
};

/**
 * @return {string}
 */
FundingResponse.prototype.getCsvString = function()
{
	return this.merchantApi.getFundingCsv(this.responseObject.DownloadLink);
};

/**
 * @return {FundingRecord[]}
 */
FundingResponse.prototype.getFundingRecords = function()
{
	var csv = this.getCsvString();
	var csvArray = CsvHelper.csvToArray(csv,";");
	var headers = csvArray[0];
	var result = [];
	for(var i=1;i<csvArray.length;i++)
	{
		if(csvArray[i].length == headers.length)
		{
			result.push(this.responseFactory.getFundingRecord(CsvHelper.combine(headers, csvArray[i])));
		}
	}
	return result;
};/**
 *
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function FundingsRequest(baseRequest)
{
	this.page = 0;

	ObjectHelper.extend(this, baseRequest);
}
/**
 *
 * @param responseObject {object}
 * @param merchantApi {MerchantApi}
 * @constructor
 */
function FundingsResponse(responseObject, merchantApi)
{
	this.responseObject = responseObject;
	this.merchantApi = merchantApi;
}

/**
 * @returns {boolean}
 */
FundingsResponse.prototype.success = function()
{
	return this.responseObject.Header.ErrorCode == 0;
}

/**
 * @returns {object}
 */
FundingsResponse.prototype.getResponseObject = function()
{
	return this.responseObject;
}

FundingsResponse.prototype.getNumberOfPages = function()
{
	return this.responseObject.Body.Fundings['@numberOfPages'];
}

FundingsResponse.prototype.length = function()
{
	if(this.responseObject.Body == null || this.responseObject.Body.Fundings == null)
	{
		return 0;
	}
	if(Object.prototype.toString.call( this.responseObject.Body.Fundings.Funding ) === '[object Array]' )
	{
		return this.responseObject.Body.Fundings.Funding.length;
	}
	else
	{
		return 1;
	}

}

FundingsResponse.prototype.getFundings = function()
{
	if(this.responseObject.Body == null || this.responseObject.Body.Fundings == null)
	{
		return [];
	}
	if(Object.prototype.toString.call( this.responseObject.Body.Fundings.Funding ) === '[object Array]' )
	{
		var result = [];
		for(var k in this.responseObject.Body.Fundings.Funding)
		{
			result.push(new FundingResponse(this.responseObject.Body.Fundings.Funding[k], this.merchantApi));
		}
		return result;
	}
	else
	{
		return [new FundingResponse(this.responseObject.Body.Fundings.Funding, this.merchantApi)];
	}
}/**
 * Recognized goods type (aka OrderLine.goodsType)
 * @type {{shipment: string, handling: string, item: string}}
 */
GoodsType = {
      shipment: 'shipment'
    , handling: 'handling'
    , item: 'item'
};
/**
 * @interface
 * @constructor
 */
function Http() {

}

/**
 * Do a get request
 * @param url
 * @param parameters {object}
 * @param headers {object}
 */
Http.prototype.get = function(url, parameters, headers) {

};


/**
 * Do a post request
 * @param url
 * @param parameters {object}
 * @param headers {object}
 */
Http.prototype.post = function(url, parameters, headers) {

};

function HttpHelper()
{

}

/**
 *
 * @param hash {string}
 * @param prefix {string}
 * @returns {object}
 */
HttpHelper.prototype.getHttpHash = function(hash, prefix)
{
	var result = {};
	for(var k in hash)
	{
		var newKey = prefix == null ? k : prefix+'['+k+']';

		if(typeof(hash[k]) == 'object' && (hash[k] == null || !hash[k].getClass))
		{
			result = this.mergeHash(result, this.getHttpHash(hash[k],newKey));
		}
		else
		{
			result[newKey] = hash[k];
		}
	}
	return result;
}

/**
 *
 * @param hash1 {object}
 * @param hash2 {object}
 * @returns {object}
 * @private
 */
HttpHelper.prototype.mergeHash = function(hash1, hash2)
{
	for(var k in hash2)
	{
		hash1[k] = hash2[k];
	}
	return hash1;
}

/**
 *
 * @param hash {object}
 * @returns {string}
 */
HttpHelper.prototype.buildParameterString = function(hash)
{
	var parameters = [];
	for(var k in hash)
	{
		parameters.push(encodeURIComponent(k)+'='+encodeURIComponent(hash[k]));
	}
	return parameters.join('&');
}/**
 * @param baseRequest {BaseRequest}
 * @param paymentRequestBase {PaymentRequestBase}
 * @param customerInfo {CustomerInfo}
 * @param creditCard {CreditCard}
 * @extends BaseRequest
 * @extends PaymentRequestBase
 * @constructor
 */
function InitiatePaymentRequest(baseRequest,paymentRequestBase, customerInfo, creditCard)
{
	this.customerInfo = customerInfo;
	this.creditCard = creditCard;
	this.paymentSource = 'eCommerce';

	/**
	 * @type {OrderLine[]}
	 */
	this.orderLines = [];

	ObjectHelper.extend(this, baseRequest);
	ObjectHelper.extend(this, paymentRequestBase);
}

/**
 * @param key {string}
 * @param value {object}
 * @returns {object}
 */
InitiatePaymentRequest.prototype.perElementToHash = function(key, value)
{
	if(key == 'creditCard' && value)
	{
		return value.toHash();
	}
	if(key == 'orderLines')
	{
		if(value.length > 0)
		{
			var lines = [];
			for(var o in value)
			{
				lines.push(value[o].toHash());
			}
			return {'orderLines':lines};
		}
		else
		{
			return {};
		}
	}
	return false;
}

/**
 * @param orderLine {OrderLine}
 */
InitiatePaymentRequest.prototype.addOrderLine = function(orderLine) {
	this.orderLines.push(orderLine);
};

/**
 *
 * @param key {string}
 * @returns {string}
 */
InitiatePaymentRequest.prototype.transformHashKey = function(key) {
	if(key == 'paymentInfos')
	{
		return 'transaction_info';
	}
	if(key == 'requestConfig')
	{
		return 'config';
	}
	if(key == 'orderLines')
	{
		return key;
	}
	if(key == 'authType')
	{
		return 'type';
	}

	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}/**
 * @extends BaseResponse
 * @extends BaseTransactionResponse
 * @param responseObject
 * @constructor
 */
function InitiatePaymentResponse(responseObject)
{
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
	ObjectHelper.extend(this, new BaseTransactionResponse());
}

/**
 * @param key {string}
 * @returns {string}
 */
InitiatePaymentResponse.prototype.getPaymentInfo = function(key)
{
	var transaction = this.responseObject.Body.Transactions.Transaction;

	if(transaction.PaymentInfos)
	{
		if(Object.prototype.toString.call( transaction.PaymentInfos.PaymentInfo ) === '[object Array]' )
		{
			for(var k in transaction.PaymentInfos.PaymentInfo)
			{
				if(transaction.PaymentInfos.PaymentInfo[k]['@name'] == key)
				{
					return transaction.PaymentInfos.PaymentInfo[k]['@'];
				}
			}
		}
		else if(transaction.PaymentInfos.PaymentInfo['@name'] == key)
		{
			return transaction.PaymentInfos.PaymentInfo['@'];
		}
	}
	return null;
}

/**
 * @returns {boolean}
 */
InitiatePaymentResponse.prototype.threeDSecure = function()
{
	return this.responseObject.Header.ErrorCode == 0 && this.responseObject.Body.Result == '3dSecure';
}

/**
 * @returns {string}
 */
InitiatePaymentResponse.prototype.getPaReq = function()
{
	var items = this.responseObject.Body.RedirectResponse.Data.Item;

	for (var k in items) {
		if (items[k]['@key'] == 'PaReq') {
			return items[k]['@'];
		}
	}

	return null;

}

/**
 * @returns {string}
 */
InitiatePaymentResponse.prototype.getRedirectUrl = function()
{
	return this.responseObject.Body.RedirectResponse.Url;
}
/**
 * @extends PaymentRequest
 * @extends BaseRequest
 * @param customerInfo {CustomerInfo}
 * @constructor
 */
function InvoiceReservationRequest(customerInfo) {

	//
    // required:
    //
    this.terminal = '';
    this.shopOrderid = '';
    this.amount = 0;
    this.currency = ''; // currency code (3 chars)
	/**
	 * @type {CustomerInfo}
	 */
	this.customerInfo = customerInfo;

    //
    // optional:
    //
    this.type = null; // payment type
	this.transaction_info = null;
	this.accountNumber = null;
	this.bankCode = null;
	this.fraud_service = null;
	this.payment_source = null;
	/**
	 * @type {OrderLine[]}
	 */
	this.orderLines = [];
	this.organisationNumber = null;
	this.personalIdentifyNumber = null;
	this.birthDate = null;

	// the order below matters:
	ObjectHelper.extend(this, new PaymentRequest());
	ObjectHelper.extend(this, new BaseRequest());

}

/**
 * @param key {string}
 * @returns {string}
 */
InvoiceReservationRequest.prototype.transformHashKey = function(key) {

	if (key == 'customerInfo') {
		return 'customer_info';
	}
	else if (key == 'shopOrderid') {
		return 'shop_orderid';
	}
	else {
		return key;
	}
};/**
 * @extends BaseResponse
 * @param responseObject
 * @constructor
 */
function InvoiceReservationResponse(responseObject) {
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}

            JssdkVersion = {
            VERSION : 'JsSDK/20170620_032336'
            }
        
function Logger() {
}

/**
 * @param message {string}
 */
Logger.prototype.debug = function(message) {
    console.log('[debug] ' + message);
};

/**
 * @param message {string}
 */
Logger.prototype.information = function(message) {
    console.log('[information] ' + message);
};

/**
 * @param message {string}
 */
Logger.prototype.warning = function(message) {
    console.log('[warning] ' + message);
};

/**
 * @param message {string}
 */
Logger.prototype.error = function(message) {
    console.log('[error] ' + message);
};
/**
 * Connector for the AltaPay Merchant API
 *
 * @param username The API username for AltaPay
 * @param password The API user's password
 * @param url The url for the gateway (e.g. "testgateway.pensio.com")
 * @param factory {AltaPayFactory}
 * @param logger {Logger}
 * @param http {Http}
 * @param dateHelper {DateHelper}
 * @param xml {Xml}
 * @param responseFactory {ResponseFactory}
 * @param base64 {Base64}
 * @param baseApi {BaseApi}
 * @extends BaseApi
 * @constructor
 */
function MerchantApi(username, password, url, factory, logger, http, dateHelper, xml, responseFactory, base64, baseApi) {
	this.username = username;
	this.password = password;
	this.url = url;

	this.factory = factory;
	this.logger = logger;
	this.http = http;
	this.dateHelper = dateHelper;
	this.xml = xml;
	this.responseFactory = responseFactory;
	this.base64 = base64;

	ObjectHelper.extend(this, baseApi);
}

/**
 * Checks of possible to login with username and password
 * @returns {boolean}
 */
MerchantApi.prototype.login = function() {
	var xmlStr = this.http.get(this.url+'/merchant/API/login', {}, this.getHeaders());
	var xmlObj = this.xml.deserialize(xmlStr);
	return "OK" == xmlObj.Body.Result;
};

/**
 * @param request {PaymentRequest}
 * @return {PaymentRequestResponse}
 */
MerchantApi.prototype.createPaymentRequest = function(request) {
	var result = this.http.post(this.url+'/merchant/API/createPaymentRequest', request.toHash(), this.getHeaders());
	var responseObject = this.xml.deserialize(result);
	return this.responseFactory.getPaymentRequestResponse(responseObject)
};

/**
 * @param request {InvoiceReservationRequest}
 * @return {InvoiceReservationResponse}
 */
MerchantApi.prototype.createInvoiceReservation = function(request) {
	var result = this.http.post(this.url+'/merchant/API/createInvoiceReservation', request.toHash(), this.getHeaders());
	var responseObject = this.xml.deserialize(result);
	return this.responseFactory.getInvoiceReservationResponse(responseObject)
};

/**
 * @param request {CaptureRequest}
 * @return {CaptureResponse}
 */
MerchantApi.prototype.capture = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/captureReservation',request.toHash(), this.getHeaders());
	var responseObject = this.xml.deserialize(result);

	return this.responseFactory.getCaptureResponse(responseObject);
}

/**
 * @param request {RefundRequest}
 * @return {RefundResponse}
 */
MerchantApi.prototype.refund = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/refundCapturedReservation',request.toHash(), this.getHeaders());
	var responseObject = this.xml.deserialize(result);

	return this.responseFactory.getRefundResponse(responseObject);
}

/**
 * @param request {ReleaseRequest}
 * @return {ReleaseResponse}
 */
MerchantApi.prototype.release = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/releaseReservation',request.toHash(), this.getHeaders());
	var responseObject = this.xml.deserialize(result);

	return this.responseFactory.getReleaseResponse(responseObject);
}

/**
 * @param request {ChargeRequest}
 * @return {ChargeResponse}
 */
MerchantApi.prototype.chargeSubscription = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/chargeSubscription',request.toHash(), this.getHeaders());
	var responseObject = this.xml.deserialize(result);

	return this.responseFactory.getChargeResponse(responseObject);
}

/**
 * @param request {ChargeRequest}
 * @return {ChargeResponse}
 */
MerchantApi.prototype.reserveSubscriptionCharge = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/reserveSubscriptionCharge',request.toHash(), this.getHeaders());
	var responseObject = this.xml.deserialize(result);

	return this.responseFactory.getChargeResponse(responseObject);
}

/**
 * @param xml {string}
 * @return {CallbackResponse}
 */
MerchantApi.prototype.parseCallbackXml = function(xml)
{
	var responseObject = this.xml.deserialize(xml);

	return this.responseFactory.getCallbackResponse(responseObject);
}


/**
 * @param request {PaymentsRequest}
 * @return {PaymentsResponse}
 */
MerchantApi.prototype.getPayments = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/transactions',request.toHash(), this.getHeaders());
	var responseObject = this.xml.deserialize(result);

	return this.responseFactory.getPaymentsResponse(responseObject);
}

/**
 * @param request {FundingsRequest}
 * @return {FundingsResponse}
 */
MerchantApi.prototype.getFundings = function(request)
{
	var result = this.http.post(this.url+'/merchant/API/fundingList',request.toHash(), this.getHeaders());
	var responseObject = this.xml.deserialize(result);

	return this.responseFactory.getFundingsResponse(responseObject, this);
}

/**
 * @param link {string}
 * @return {string}
 */
MerchantApi.prototype.getFundingCsv = function(link)
{
	return this.http.post(link,{}, this.getHeaders());
}

var ObjectHelper = {
	/**
	 * Set values on object which doesnt already exist to values from withObject
	 *
	 * @param object {object}
	 * @param withObject {object}
	 */
	extend : function(object, withObject)
	{
		for (var x in withObject) {
			// only override the stuff that we have not implemented here
			if (!object[x]) {
				object[x] = withObject[x];
			}
		}
	}

};/**
 *
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function OrderLine(baseRequest) {
	this.description = '';
	this.itemId = '';
	this.quantity = 0;
	this.taxPercent = null;
	this.unitCode = null;
	this.unitPrice = 0;
	this.discountPercent = null;

	/**
	 * @see GoodsType
	 * @type {string}
	 */
	this.goodsType = GoodsType.item;
	ObjectHelper.extend(this, baseRequest);
}

/**
 * @param key {string}
 * @returns {string}
 */
OrderLine.prototype.transformHashKey = function(key) {
	if(key == 'discountPercent')
	{
		return 'discount';
	}

	return key;
}

/**
 *
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function PaymentInfo(baseRequest)
{
	ObjectHelper.extend(this, baseRequest);
}
/**
 * @extends PaymentRequestBase
 * @extends BaseRequest
 * @param paymentRequestBase {PaymentRequestBase}
 * @param customerInfo {CustomerInfo}
 * @constructor
 */
function PaymentRequest(paymentRequestBase, customerInfo) {
	this.saleReconciliationIdentifier = null;
	this.salesInvoiceNumber = null;

	/**
	 * Amount - not percent
	 * @type {number}
	 */
	this.salesTax = null;

	/**
	 * @type {CustomerInfo}
	 */
	this.customerInfo = customerInfo;

	/**
	 * The creation date of the customer in the shop system.
	 * Fraud detection services can use this.
	 * @type {Date}
	 */
	this.customerCreatedDate = null;

	/**
	 * @type {OrderLine[]}
	 */
	this.orderLines = [];

	/**
	 * @see ShippingMethod
	 * @type {string}
	 */
	this.shippingMethod = null;

	this.organisationNumber = null;

	/**
	 * @see AccountOffer
	 * @type {string}
	 */
	this.accountOffer = null;

	ObjectHelper.extend(this, new BaseRequest());
	ObjectHelper.extend(this, paymentRequestBase);
}

/**
 * @param orderLine {OrderLine}
 */
PaymentRequest.prototype.addOrderLine = function(orderLine) {
	this.orderLines.push(orderLine);
};

/**
 * @param key {string}
 * @param value {object}
 * @returns {object}
 */
PaymentRequest.prototype.perElementToHash = function(key, value)
{
	if(key == 'orderLines')
	{
		if(value.length > 0)
		{
			var lines = [];
			for(var o in value)
			{
				lines.push(value[o].toHash());
			}
			return {'orderLines':lines};
		}
		else
		{
			return {};
		}
	}
	return false;
}

/**
 * @param key {string}
 * @returns {string}
 */
PaymentRequest.prototype.transformHashKey = function(key) {
	if(key == 'paymentInfos')
	{
		return 'transaction_info';
	}
	if(key == 'requestConfig')
	{
		return 'config';
	}
	if(key == 'orderLines')
	{
		return key;
	}
	if(key == 'authType')
	{
		return 'type';
	}

	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}/**
 *
 * @param paymentRequestConfig {PaymentRequestConfig}
 * @param paymentInfo {PaymentInfo}
 * @constructor
 */
function PaymentRequestBase(paymentRequestConfig, paymentInfo) {
    //
    // required
    //
    this.terminal = '';
    this.shopOrderid = '';
    this.amount = 0;
    this.currency = ''; // ISO ?? (3 chars or 3 digits)

    //
    // optional
    //
    this.language = null;

    /**
     * Dictionary with key-value pairs
     * @type {PaymentInfo}
     */
    this.paymentInfos = paymentInfo;
    this.authType = null; // see AuthType
    this.creditCardToken = null;
    this.cookie = null;
    this.requestConfig = paymentRequestConfig;

	/**
	 * @see FraudService
	 * @type {string}
	 */
	this.fraudService = null;

	ObjectHelper.extend(this, new BaseRequest());
}

/**
 * Add a payment info (or transaction info). This will be available
 * in all callbacks.
 * @param name {string}
 * @param value {string}
 */
PaymentRequestBase.prototype.addPaymentInfo = function(name, value) {
    this.paymentInfos[name] = value;
};

/**
 * @param key {string}
 * @returns {string}
 */
PaymentRequestBase.prototype.transformHashKey = function(key) {
	if(key == 'paymentInfos')
	{
		return 'transaction_info';
	}
	if(key == 'requestConfig')
	{
		return 'config';
	}
	if(key == 'authType')
	{
		return 'type';
	}

	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}
function PaymentRequestConfig() {
    this.callbackForm = null;
    this.callbackOk = null;
    this.callbackFail = null;
    this.callbackRedirect = null;
    this.callbackOpen = null;
    this.callbackNotification = null;

    /**
     * By settings this, a check will be made at the last possible time before taking the payment. This is
     * used to verify that stock, discounts, etc. are still valid for the order/shopping basket. This callback
     * will be done in the same way as other callbacks, but you can prepend GET parameters to the URL if you
     * need anything in particular which is not part of the normal POST parameters.
     *
     * To allow the payment you must return an HTML/TEXT response with the value "OKAY". Anything else will be
     * assumed to be a sign that we should abort/decline the payment and will be placed as the error message.
     * An example could be "Some of the items in the basked are out of stock".
     *
     * If your server responds with any other http response code than 200, the payment will fail with an error.
     *
     * To ensure consistence we will strip HTML/XML tags, and we will only allow the first 255 characters to
     * become the error message when the callback returns something different than "OKAY"
     */
    this.callbackVerifyOrder = null;
}

PaymentRequestConfig.prototype.toHash = function() {
    var result = {};

    result.callback_form = this.callbackForm;
    result.callback_ok = this.callbackOk;
    result.callback_fail = this.callbackFail;
    result.callback_redirect = this.callbackRedirect;
    result.callback_open = this.callbackOpen;
    result.callback_notification = this.callbackNotification;
    result.callback_verify_order = this.callbackVerifyOrder;

    return result;
};
/**
 * @extends BaseResponse
 * @param responseObject
 * @constructor
 */
function PaymentRequestResponse(responseObject) {
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}

/**
 * @returns {string}
 */
PaymentRequestResponse.prototype.getUrl = function()
{
	if(this.responseObject.Body != null)
	{
		return this.responseObject.Body.Url;
	}
	return null;
};

/**
 * @returns {string}
 */
PaymentRequestResponse.prototype.getDynamicJavascriptUrl = function()
{
	if(this.responseObject.Body != null)
	{
		return this.responseObject.Body.DynamicJavascriptUrl;
	}
	return null;
};
/**
 * @param responseObject {object}
 * @constructor
 */
function PaymentResponse(responseObject)
{
	this.responseObject = responseObject;
}


/**
 * @returns {string}
 */
PaymentResponse.prototype.getPaymentId = function()
{
	return this.responseObject.PaymentId;
};

/**
 * @returns {string}
 */
PaymentResponse.prototype.getTransactionStatus = function()
{
	return this.responseObject.TransactionStatus;
};

/**
 * @returns {int}
 */
PaymentResponse.prototype.getTransactionId = function()
{
	return this.responseObject.TransactionId;
};

/**
 * @returns {number}
 */
PaymentResponse.prototype.getReservedAmount = function()
{
	return this.responseObject.ReservedAmount;
};

/**
 * @returns {number}
 */
PaymentResponse.prototype.getCapturedAmount = function()
{
	return this.responseObject.CapturedAmount;
};

/**
 * @returns {number}
 */
PaymentResponse.prototype.getRefundedAmount = function()
{
	return this.responseObject.RefundedAmount;
};

/**
 * @returns {number}
 */
PaymentResponse.prototype.getRecurringDefaultAmount = function()
{
	return this.responseObject.RecurringDefaultAmount;
};

/**
 * @returns {string}
 */
PaymentResponse.prototype.getFraudRecommendation = function()
{
	if(this.responseObject.FraudRecommendation == null)
	{
		return FraudRecommendation.Unknown;
	}
	return this.responseObject.FraudRecommendation;
};

/**
 * @returns {string}
 */
PaymentResponse.prototype.getReconciliationIdentifier = function()
{
	var identifiers = this.responseObject.ReconciliationIdentifiers.ReconciliationIdentifier;

	if(Object.prototype.toString.call( identifiers ) === '[object Array]' )
	{
		return identifiers[identifiers.length - 1].Id;
	}
	else
	{
		return identifiers.Id;
	}
}/**
 *
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function PaymentsRequest(baseRequest)
{
	this.shop = null;
	this.terminal = null;
	this.transactionId = null;
	this.paymentId = null;
	this.shopOrderid = null;
	this.paymentStatus = null;
	this.reconciliationIdentifier = null;

	ObjectHelper.extend(this, baseRequest);
}

/**
 *
 * @param key {string}
 * @returns {string}
 * @private
 */
PaymentsRequest.prototype.transformHashKey = function(key) {
	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}/**
 * @param responseObject {object}
 * @constructor
 */
function PaymentsResponse(responseObject)
{
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}

PaymentsResponse.prototype.length = function()
{
	if(this.responseObject.Body == null || this.responseObject.Body.Transactions == null)
	{
		return 0;
	}
	if(Object.prototype.toString.call( this.responseObject.Body.Transactions.Transaction ) === '[object Array]' )
	{
		return this.responseObject.Body.Transactions.Transaction.length;
	}
	else
	{
		return 1;
	}

}

PaymentsResponse.prototype.getPayments = function()
{
	if(this.responseObject.Body == null || this.responseObject.Body.Transactions == null)
	{
		return [];
	}
	if(Object.prototype.toString.call( this.responseObject.Body.Transactions.Transaction ) === '[object Array]' )
	{
		var result = [];
		for(var k in this.responseObject.Body.Transactions.Transaction)
		{
			result.push(new PaymentResponse(this.responseObject.Body.Transactions.Transaction[k]));
		}
		return result;
	}
	else
	{
		return [new PaymentResponse(this.responseObject.Body.Transactions.Transaction)];
	}
}
/**
 * Connector for the AltaPay Processor API.
 *
 * @param username The API username for AltaPay
 * @param password The API user's password
 * @param url The url for the gateway (e.g. "testgateway.pensio.com")
 * @param factory {AltaPayFactory}
 * @param logger {Logger}
 * @param http {Http}
 * @param xml {Xml}
 * @param responseFactory {ResponseFactory}
 * @param base64 {Base64}
 * @param baseApi {BaseApi}
 * @extends BaseApi
 * @constructor
 */
function ProcessorApi(username, password, url, factory, logger, http, xml, responseFactory, base64, baseApi) {
    this.username = username;
    this.password = password;
    this.url = url;

    this.factory = factory;
    this.logger = logger;
    this.http = http;
	this.xml = xml;
	this.responseFactory = responseFactory;
	this.base64 = base64;

	ObjectHelper.extend(this, baseApi);
}

/**
 * @param request {InitiatePaymentRequest}
 * @return {InitiatePaymentResponse}
 */
ProcessorApi.prototype.initiatePayment = function(request) {
	var result = this.http.post(this.url+'/processor.php/API/initiatePayment', request.toHash(), this.getHeaders());
	var responseObject = this.xml.deserialize(result);
	return this.responseFactory.getInitiatePaymentResponse(responseObject)
};

/**
 * @param request {Verify3dSecureRequest}
 * @return {InitiatePaymentResponse}
 */
ProcessorApi.prototype.verify3dSecure = function(request) {
	var result = this.http.post(this.url+'/processor.php/API/verify3dSecure', request.toHash(), this.getHeaders());
	var responseObject = this.xml.deserialize(result);
	return this.responseFactory.getInitiatePaymentResponse(responseObject)
};/**
 * @extends BaseRequest
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function RefundRequest(baseRequest)
{
	this.paymentId = '';
	this.amount = null;
	this.orderLines = [];
	this.reconciliationIdentifier = null;
	this.invoiceNumber = null;
	this.allowOverRefund = null;

	ObjectHelper.extend(this, baseRequest);
}

/**
 * @param orderLine {OrderLine}
 */
RefundRequest.prototype.addOrderLine = function(orderLine) {
	this.orderLines.push(orderLine);
};

/**
 *
 * @param key {string}
 * @param value {object}
 * @returns {object}
 * @private
 */
RefundRequest.prototype.perElementToHash = function(key, value)
{
	if(key == 'orderLines')
	{
		if(value.length > 0)
		{
			var lines = [];
			for(var o in value)
			{
				lines.push(value[o].toHash());
			}
			return {'orderLines':lines};
		}
		else
		{
			return {};
		}
	}
	return false;
}

/**
 *
 * @param key {string}
 * @returns {string}
 * @private
 */
RefundRequest.prototype.transformHashKey = function(key) {
	if(key == 'paymentId')
	{
		return 'transaction_id';
	}
	if(key == 'orderLines')
	{
		return 'orderLines';
	}

	return key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
}/**
 * @param responseObject
 * @extends BaseResponse
 * @extends BaseTransactionResponse
 * @constructor
 */
function RefundResponse(responseObject)
{
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
	ObjectHelper.extend(this, new BaseTransactionResponse());
}
/**
 *
 * @extends BaseRequest
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function ReleaseRequest(baseRequest)
{
	this.paymentId = '';

	ObjectHelper.extend(this, baseRequest);
}

/**
 * @param key {string}
 * @returns {string}
 * @private
 */
ReleaseRequest.prototype.transformHashKey = function(key) {
	if(key == 'paymentId')
	{
		return 'transaction_id';
	}

	return key;
}/**
 * @extends BaseResponse
 * @param responseObject
 * @constructor
 */
function ReleaseResponse(responseObject)
{
	this.responseObject = responseObject;

	ObjectHelper.extend(this, new BaseResponse());
}
function ResponseFactory()
{

}

/**

 * @param responseObject
 * @returns {CaptureResponse}
 */
ResponseFactory.prototype.getCaptureResponse = function(responseObject)
{
	return new CaptureResponse(responseObject);
}

/**
 * @param responseObject
 * @returns {RefundResponse}
 */
ResponseFactory.prototype.getRefundResponse = function(responseObject)
{
	return new RefundResponse(responseObject);
}

/**
 * @param responseObject
 * @returns {ReleaseResponse}
 */
ResponseFactory.prototype.getReleaseResponse = function(responseObject)
{
	return new ReleaseResponse(responseObject);
}

/**
 * @param responseObject
 * @returns {ChargeResponse}
 */
ResponseFactory.prototype.getChargeResponse = function(responseObject)
{
	return new ChargeResponse(responseObject);
}

/**
 * @param responseObject
 * @returns {PaymentRequestResponse}
 */
ResponseFactory.prototype.getPaymentRequestResponse = function (responseObject)
{
	return new PaymentRequestResponse(responseObject);
};

/**
 * @param responseObject
 * @returns {PaymentRequestResponse}
 */
ResponseFactory.prototype.getInvoiceReservationResponse = function (responseObject)
{
	return new InvoiceReservationResponse(responseObject);
};

/**
 * @param responseObject
 * @returns {InitiatePaymentResponse}
 */
ResponseFactory.prototype.getInitiatePaymentResponse = function(responseObject)
{
	return new InitiatePaymentResponse(responseObject);
}

/**
 * @param responseObject
 * @returns {CallbackResponse}
 */
ResponseFactory.prototype.getCallbackResponse = function(responseObject)
{
	return new CallbackResponse(responseObject);
}

/**
 * @param responseObject
 * @returns {PaymentsResponse}
 */
ResponseFactory.prototype.getPaymentsResponse = function(responseObject)
{
	return new PaymentsResponse(responseObject);
}

/**
 * @param responseObject {object}
 * @param merchantApi MerchantApi
 * @returns {FundingsResponse}
 */
ResponseFactory.prototype.getFundingsResponse = function(responseObject, merchantApi)
{
	return new FundingsResponse(responseObject, merchantApi, this);
}

/**
 * @param data {object}
 * @returns {FundingRecord}
 */
ResponseFactory.prototype.getFundingRecord = function(data)
{
	return new FundingRecord(data);
}


/**
 * Factory that provides Rhino context
 *
 * @param baseFactory {AltaPayFactory}
 * @extends {AltaPayFactory}
 * @constructor
 */
function RhinoAltaPayFactory(baseFactory) {
	ObjectHelper.extend(this, baseFactory);
}

/**
 * @returns {Http}
 */
RhinoAltaPayFactory.prototype.getHttp = function() {
	return new RhinoHttp(this.getXml(),this.getHttpHelper());
};

/**
 * @returns {Xml}
 */
AltaPayFactory.prototype.getXml = function() {
	return new RhinoXml();
};

/**
 *
 * @implements {Http}
 * @constructor
 * @param xml {Xml}
 * @param httpHelper {HttpHelper}
 */
function RhinoHttp(xml, httpHelper) {
	this.xml = xml;
	this.httpHelper = httpHelper;
	this.charset = "UTF-8";
}

/**
 * Do a get request
 * @param url
 * @param parameters {object}
 * @param headers {object}
 * @return {string}
 */
RhinoHttp.prototype.get = function(url, parameters, headers) {
	var query = this.httpHelper.buildParameterString(this.httpHelper.getHttpHash(parameters));
	var connection = java.net.URL(url + "?" + query).openConnection();
	for (var key in headers)
	{
		connection.setRequestProperty(key, headers[key]);
	}
	return this.inputStreamToString(connection.getInputStream());
};


/**
 * Do a post request
 * @param url
 * @param parameters {object}
 * @param headers {object}
 * @return {string}
 */
RhinoHttp.prototype.post = function(url, parameters, headers) {
	var post = this.httpHelper.buildParameterString(this.httpHelper.getHttpHash(parameters));

	var connection = java.net.URL(url).openConnection();
	for (var key in headers)
	{
		connection.setRequestProperty(key, headers[key]);
	}
	connection.setDoInput(true);
	connection.setDoOutput(true);
	connection.setUseCaches(false);
	connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
	var printout = new java.io.DataOutputStream(connection.getOutputStream());

	printout.writeBytes(post);
	printout.flush();
	printout.close();


	return this.inputStreamToString(connection.getInputStream());
};

/**
 * Read response input stream into a string
 * @param is
 * @returns {string}
 * @private
 */
RhinoHttp.prototype.inputStreamToString = function(is){
	var ch;
	var sb = java.lang.StringBuilder();
	var reader = java.io.InputStreamReader(is);

	while((ch = reader.read())!= -1)
	{
		sb.append(java.lang.Character(ch));
	}
	return sb.toString();
}

/**
 * @implements {Xml}
 * @constructor
 */
function RhinoXml() {
	this.nodeTypes = {
		Text : 3,
		CData : 4,
		Tag : 1
	};
}

/**
 * Build anonymous javascript object from xml
 * @param xmlString
 */
RhinoXml.prototype.deserialize = function(xmlString) {
	var builder = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder()

	var doc = builder.parse(new org.xml.sax.InputSource(new java.io.StringReader(xmlString)));

	return this.traverseXmlDom(doc.getDocumentElement());
};

RhinoXml.prototype.serialize = function(rootName,object) {
	var builder = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder()

	var doc = builder.newDocument();

	var element = doc.createElement(rootName);
	doc.appendChild(element);

	this.buildDom(doc, element, object);

	var source = new javax.xml.transform.dom.DOMSource(doc);
	var stringWriter = new java.io.StringWriter();
	var streamResult = new javax.xml.transform.stream.StreamResult(stringWriter);
	var transformerFactory = new javax.xml.transform.TransformerFactory.newInstance();
	var transformer = transformerFactory.newTransformer();
	transformer.transform(source, streamResult);
	return stringWriter.toString();
};

RhinoXml.prototype.buildDom = function(doc, element, object)
{
	if(Object.prototype.toString.call( object ) === '[object Array]' )
	{
		for(var i in object)
		{
			this.buildDom(doc, element, object[i]);
		}
	}
	else
	{
		for(var x in object)
		{
			if(x.substr(0,1) == '@')
			{
				element.setAttribute(x.substr(1),object[x]);
			}
			else
			{
				var e = doc.createElement(x);
				if(typeof(object[x]) == 'object')
				{
					this.buildDom(doc, e, object[x]);
				}
				else
				{
					e.setTextContent(object[x]);
				}
				element.appendChild(e);
			}
		}
	}
};

RhinoXml.prototype.traverseXmlDom = function(element) {

	var childNodes = element.getChildNodes();
	var result = {};
//	console.log(element.getTagName()+ "("+childNodes.getLength()+")");

	if(childNodes.getLength() == 0 &&
		(element.getAttributes() == null || element.getAttributes().getLength() == 0))
	{
		return null;
	}

	if(element.getAttributes() != null)
	{
		var attributes = element.getAttributes();
		for(var a = 0;a < attributes.getLength();a++)
		{
			var attribute = attributes.item(a);
			result['@'+attribute.getName()] = attribute.getTextContent();
		}
	}

	for(var i = 0;i < childNodes.getLength();i++)
	{
		var childNode = childNodes.item(i);

		if(childNode.getNodeType() == this.nodeTypes.Text || childNode.getNodeType() == this.nodeTypes.CData)
		{
			if(Object.keys(result).length > 0)
			{
				result['@'] = childNode.getTextContent();
			}
			else
			{
				return childNode.getTextContent();
			}

		}
		else if(childNode.getNodeType() == this.nodeTypes.Tag)
		{
			if(result[childNode.getTagName()])
			{
				if(Object.prototype.toString.call( result[childNode.getTagName()] ) !== '[object Array]' )
				{
					var oldValue = result[childNode.getTagName()];
					result[childNode.getTagName()] = [oldValue];
				}

				result[childNode.getTagName()].push(this.traverseXmlDom(childNode));
			}
			else
			{
				result[childNode.getTagName()] = this.traverseXmlDom(childNode);
			}
		}
		else
		{
			throw "Unknown node type: "+childNode.getNodeType();
		}

	}
	return result;
}/**
 * Recognized shipping method (aka PaymentRequest.shippingMethod)
 * @type {{lowCost: string, designatedByCustomer: string, international: string, military: string, nextDay: string, other: string, storePickup: string, twoDayService: string, threeDayService: string}}
 */
ShippingMethod = {
      lowCost: 'LowCost'
    , designatedByCustomer: 'DesignatedByCustomer'
    , international: 'International'
    , military: 'Military'
    , nextDay: 'NextDay'
    , other: 'Other'
    , storePickup: 'StorePickup'
    , twoDayService: 'TwoDayService'
    , threeDayService: 'ThreeDayService'
};
/**
 *
 * @param baseRequest {BaseRequest}
 * @constructor
 */
function Verify3dSecureRequest(baseRequest, transactionId, paRes)
{
	this.transactionId = transactionId;
	this.md = transactionId;
	this.paRes = paRes;

	ObjectHelper.extend(this, baseRequest);
}


/**
 *
 * @param key {string}
 * @returns {string}
 * @private
 */
Verify3dSecureRequest.prototype.transformHashKey = function(key) {
	if(key == 'md')
	{
		return '3DSecureRegular[MD]';
	}
	else if(key == 'paRes')
	{
		return '3DSecureRegular[paRes]';
	}

	return key;
}
/**
 * @interface
 * @constructor
 */
function Xml() {

}

/**
 * Build anonymous javascript object from xml
 * @param xmlString
 */
Xml.prototype.deserialize = function(xmlString) {

};

/**
 * Create xml from anonymous javascript object
 * @param rootName
 * @param object
 * @return xmlString
 */
Xml.prototype.serialize = function(rootName,object) {

}
var console = {

    log: function(msg) {
        java.lang.System.out.println(msg);
    },

	logChar: function(msg) {
		java.lang.System.out.print(msg);
	},

	logObject : function(object, indentLevel)
	{
		if(indentLevel == null)
		{
			indentLevel = 0;
		}
		console.log(console.repeat(indentLevel, "\t")+'{');
		for(var k in object)
		{
			var str = k+': ';
			if(typeof(object) === 'function')
			{
				console.log(console.repeat(indentLevel+1, "\t") + str + 'function');
			}
			else if(Object.prototype.toString.call( object[k] ) === '[object Object]')
			{
				console.log(console.repeat(indentLevel+1, "\t") + str);
				console.logObject(object[k], indentLevel+1);
			}
			else
			{
				console.log(console.repeat(indentLevel+1, "\t") + str + object[k]);
			}

		}
		console.log(console.repeat(indentLevel, "\t") + '}');
	},

	repeat : function(num, str)
	{
		return new Array( num + 1 ).join( str );
	}

};/**
 * Created by emerson on 6/20/17.
 *
 * Exporting of objects, necessary for the SalesForce (aka Demandware) javascript plugin.
 *
 */

if (module != undefined) {

    module.exports = {
        ObjectHelper: ObjectHelper,
        RhinoAltaPayFactory: RhinoAltaPayFactory,
        AltaPayFactory: AltaPayFactory,
        RhinoHttp: RhinoHttp
    }

}