const Request = require("request");
var fs = require("fs");
const _ = require("lodash");
function postRequest(headers, url, reqBody) {
  return new Promise((resolve, reject) => {
    Request.post(
      {
        headers,
        url,
        body: JSON.stringify(reqBody)
      },
      function(error, res, body) {
        if (!error) {
          console.log("resp status code : ", res.statusCode);
          if (Number(res.statusCode) >= 400) {
		console.log("error : ",body)
              reject({
                status: res.statusCode,
                message: "something went wrong"
              });
          }
          resolve(body);
        } else {
          reject(error);
        }
      }
    );
  });
}


module.exports = {
  postRequest
};
