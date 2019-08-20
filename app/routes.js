const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/poevent", controller.poErpIntegration);
router.post("/invoiceevent", controller.invoiceErpIntegration);
router.post("/disputeInvoiceevent", controller.disputeInvoiceErpIntegration);
router.post("/settlementevent", controller.settlementErpIntegration);

module.exports = router;
