const { erpService } = require("./services");
const _ = require("lodash");
const moment = require("moment");

async function poErpIntegration(req, res, next) {
  /*try {
    console.log(
      "Invoke PO integration API called, Timestamp: ",
      moment()
        .utcOffset("+05:30")
        .format()
    );
    let resp = await erpService.invokePOErpEndpoint(
      req.body
    );

    res.status(200);
    res.send({
      status: 200,
      message: "Success"
    });
  } catch (error) {
    next(error);
  }*/

  res.status(200);
  res.send({
    status: 200,
    message: "Success"
  });
}

async function invoiceErpIntegration(req, res, next) {
  /*try {
     console.log(
       "Invoke integration API called, Timestamp: ",
       moment()
         .utcOffset("+05:30")
         .format()
     );
     let resp = await erpService.invokeInvoiceErpEndpoint(
       req.body
     );
 
     res.status(200);
     res.send({
       status: 200,
       message: "Success"
     });
   } catch (error) {
     next(error);
   }*/

  res.status(200);
  res.send({
    status: 200,
    message: "Success"
  });
}

async function settlementErpIntegration(req, res, next) {
  /*try {
     console.log(
       "Invoke settlement ERP API called, Timestamp: ",
       moment()
         .utcOffset("+05:30")
         .format()
     );
     let resp = await erpService.invokeSettlementErpEndpoint(
       req.body
     );
 
     res.status(200);
     res.send({
       status: 200,
       message: "Success"
     });
   } catch (error) {
     next(error);
   }*/

  res.status(200);
  res.send({
    status: 200,
    message: "Success"
  });
}

async function disputeInvoiceErpIntegration(req, res, next) {
  res.status(200);
  res.send({
    status: 200,
    message: "Success"
  });
}

module.exports = {
  poErpIntegration,
  invoiceErpIntegration,
  settlementErpIntegration,
  disputeInvoiceErpIntegration
};
