module.exports = {
  requestUrlPO:
   "https://vbcs-bc-sc-oabcs1.integration.ocp.oraclecloud.com:443/ic/api/integration/v1/flows/rest/PO_CAPTUREB_SEND_EBS/1.0/poevents", 
  requestUrlInvoice:
    "https://vbcs-bc-sc-oabcs1.integration.ocp.oraclecloud.com:443/ic/api/integration/v1/flows/rest/SUBMITINVOICE_BC/1.0/invoice",
    requestUrlDisputeInvoice : "https://vbcs-bc-sc-oabcs1.integration.ocp.oraclecloud.com:443/ic/api/integration/v1/flows/rest/UPDATEINVOICEFORDISPUTE/1.0/updateDisputeInvoice",
    requestUrlSettlement: "https://vbcs-bc-sc-oabcs1.integration.ocp.oraclecloud.com:443/ic/api/integration/v1/flows/rest/CAPTURE_SETTELME_EVENTS_BC/1.0/getSettlementEvent",
    headers: {
    Authorization: "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
    "Content-Type": "application/json"
  }
};
