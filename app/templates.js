var fs = require("fs");
const createInstanceTemplate = {
  serviceVersion: "1",
  organizationType: "true",
  numberOfPeersDev: "2",
  managedSystemType: "oracle",
  enableNotification: "true",
  serviceName: "",
  serviceLevel: "PAAS",
  notificationEmail: "",
  appSize: "Developer",
  isBYOL: "false"
};

const uploadChaincodeTemplate = {
  chaincodeId: "",
  chaincodeVersion: "v1",
  chaincodeIndexes: "[]",
  myfile: {
    value: "",
    options: {
      filename: "",
      contentType: "multipart/form-data"
    }
  }
};

const installChaincodeTemplate = {
  source: {
    fileName: "generic",
    content: "generic chaincode"
  },
  chaincodeId: "",
  chaincodeVersion: "v1",
  peers: []
};

const instantiateChaincodeTemplate = {
  channelName: "default",
  chaincodeVersion: "v1",
  transientMap: {},
  endorsementPolicy: {
    identities: [],
    policy: {
      "0-of": []
    }
  },
  args: [],
  peers: []
};

const invokeChaincodeTemplate = {
  channel: "default",
  chaincode: "",
  method: "",
  args: [],
  chaincodeVer: "v1"
};

module.exports = {
  createInstanceTemplate,
  uploadChaincodeTemplate,
  installChaincodeTemplate,
  instantiateChaincodeTemplate,
  invokeChaincodeTemplate
};
