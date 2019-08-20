module.exports = {
  requestUrlPO:
    "https://OIC-GE-BC-gecorporatepoc.integration.ocp.oraclecloud.com:443/ic/api/integration/v1/flows/rest/PO_CAPTUREB_SEND_EBS/1.0/poevents",
  requestUrlInvoice:
    "https://OIC-GE-BC-gecorporatepoc.integration.ocp.oraclecloud.com:443/ic/api/integration/v1/flows/rest/SUBMITINVOICE_BC/1.0/invoice",
    requestUrlDisputeInvoice : "https://OIC-GE-BC-gecorporatepoc.integration.ocp.oraclecloud.com:443/ic/api/integration/v1/flows/rest/UPDATEINVOICEFORDISPUTE/1.0/updateDisputeInvoice",
    requestUrlSettlement: "https://OIC-GE-BC-gecorporatepoc.integration.ocp.oraclecloud.com:443/ic/api/integration/v1/flows/rest/CAPTURE_SETTELME_EVENTS_BC/1.0/getSettlementEvent",
    headers: {
    Authorization: "Basic YXBwZGV2dGVzdDpHZXRlc3QxMjM0NTY=",
    "Content-Type": "application/json"
  }
};
