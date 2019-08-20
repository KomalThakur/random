const { request } = require("../proxies");
const { oicConfig } = require("../config");

const _ = require("lodash");

async function invokePOErpEndpoint(reqBody) {
	let body = _.omit(JSON.parse(reqBody.eventMsg.payload.data), ['description', 'action', 'name'])
  console.log("req body payload PO event", body);
  return request.postRequest(oicConfig.headers, oicConfig.requestUrlPO, body );
}

async function invokeInvoiceErpEndpoint(reqBody) {
  let body = _.omit(JSON.parse(reqBody.eventMsg.payload.data), ['description', 'action', 'name'])
  console.log("req body payload Invoice event", body);
  return request.postRequest(oicConfig.headers, oicConfig.requestUrlInvoice, body );
}

async function invokeSettlementErpEndpoint(reqBody) {
  let body = _.omit(JSON.parse(reqBody.eventMsg.payload.data), ['description', 'action', 'name'])
  console.log("req body payload Settlement event", body);
  return request.postRequest(oicConfig.headers, oicConfig.requestUrlSettlement, body );
}

async function invokeDisputeInvoiceErpEndpoint(reqBody) {
  let body = _.omit(JSON.parse(reqBody.eventMsg.payload.data), ['description', 'action', 'name'])
  console.log("req body dispute invoice event", body);
  return request.postRequest(oicConfig.headers, oicConfig.requestUrlDisputeInvoice, body );
}


module.exports = {
  invokePOErpEndpoint,
  invokeInvoiceErpEndpoint,
  invokeSettlementErpEndpoint,
  invokeDisputeInvoiceErpEndpoint
};
