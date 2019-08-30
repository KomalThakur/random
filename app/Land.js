import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom"
import {
    Header,
    Container,
    Button,
    Icon,
    Message,
    Progress,
    Tab,
    Grid,
    Image,
    Dimmer,
    Loader,
    Search,
    Form,
    Select,
    Modal,
    Menu,
    Divider,
    Input
} from "semantic-ui-react"
import ReactTable from 'react-table'
import DVGraph from "../Visualization/DVGraph/DVGraph";

import hcImageUrl from "../images/HC.svg"
import invoiceIcon from "../images/invoice.svg"
import poIcon from "../images/po.svg"
import dashIcon from "../images/dashboard.svg"
import paymentIcon from "../images/payment.svg"
import mockDashboard from "../images/mock-dashboard.png"
// import csvtojson from 'csvtojson'
// import csv from 'csv'
import ReactFileReader from 'react-file-reader';

import * as poData from './mockdata/poMock.json'
import * as invoiceData from './mockdata/invoicesMock.json'
import * as disputeData from './mockdata/disputesMock.json'


class Land extends Component {
    constructor(props) {
        super(props);
        // debugger;
        // this.roleVal = ''
        this.state = {
            userRole: this.props.userRole,
            activeItem: this.props.activeItem,
            csvFilePath: '',
            showModal: false,
            modalData: [],
            invoiceTabIndex: 0,
            disputeTabIndex: 0,
            poData: [],
            invoicesData: [],
            logOut: false,
            settlementData: [],
            uploadDataArgs: [],
            uploadErrors: [],
            search: '',
            invoiceSearch: '',
            poDisputeComment: '',
            ledgerSearch: '',
            disputeSearch: '',
            modalSuccessMessage: '',
            percentNumber: 0,
            uploadInvoiceData: [],
            isFileSelected: false,
            selectedFileName: '',
            isUploadInProgress: false,
            loaderActive: false,
            paymentInstructionsFlag: true,
            addRowSettlementClicked: false,
            buyerCodes: [],
            buyerProfile: [],
            sellerProfile: [],
            sellerCodes: [],
            buyerBusinessUnitCodes: [],
            sellerBusinessUnitCodes: [],
            currencyCodes: [],
            buyerCountryCodes: [],
            ledgerData: [],
            sellerCountryCodes: [],
            currencyDropDown: [],
            disputeData: [],
            businessUnitDropDown: [],
            settleRefObj: [],
            selectedBuyerCode: '',
            selectedSellerCode: '',
            selectedBuyerBusinessUnit: '',
            selectedBuyerCountryCode: '',
            selectedSellerBusinessUnit: '',
            paymentResponse: [],
            failedPayment: [],
            checkdispute: '',
            selectedSellerCountryCode: '',
            selectedNettingAllowed: '',
            areCodesMatching: false,
            addedDropdownData: [
                {
                    id: "0",
                    buyerData: {
                        selectedBuyerCode: '',
                        selectedSellerCode: '',
                        selectedBuyerBusinessUnit: '',
                        buyerNettingFlag: ''
                    },
                    sellerData: {
                        selectedBuyerCountryCode: '',
                        selectedSellerBusinessUnit: '',
                        selectedSellerCountryCode: '',
                        sellerNettingFlag: ''
                    }
                }
            ]
        }

        // this.csvtojson = csvtojson;
        // this.csv = csv;
        this.poData = [];
        this.invoiceData = invoiceData;
        this.disputeData = disputeData;
        this.setFilePath = this.setFilePath.bind(this);
        this.poFetchCall = this.poFetchCall.bind(this)
        this.invoicesFetchCall = this.invoicesFetchCall.bind(this)
        this.generatePoData = this.generatePoData.bind(this)
        this.generateInvoicesData = this.generateInvoicesData.bind(this)
        this.showModal = this.showModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.setUploadInvoiceData = this.setUploadInvoiceData.bind(this);
        this.submitInvoice = this.submitInvoice.bind(this);
        this.getTrProps = this.getTrProps.bind(this);
        this.getTrPropsInvoice = this.getTrPropsInvoice.bind(this);
        this.toggleAllUpload = this.toggleAllUpload.bind(this);
        this.viewUploadedInvoices = this.viewUploadedInvoices.bind(this);
        this.cancelUpload = this.cancelUpload.bind(this);
        this.populateBuyerCodes = this.populateBuyerCodes.bind(this);
        this.populateSellerCodes = this.populateSellerCodes.bind(this);
        this.buyerCodeChange = this.buyerCodeChange.bind(this);
        this.sellerCodeChange = this.sellerCodeChange.bind(this);
        this.removeDuplicates = this.removeDuplicates.bind(this);
        this.addRowSettlement = this.addRowSettlement.bind(this);
        this.pushSettlementRow = this.pushSettlementRow.bind(this);
        this.getSettlementRow = this.getSettlementRow.bind(this);
        this.setBuyerCodes = this.setBuyerCodes.bind(this);
        // this.settleInvoices = this.settleInvoices.bind(this);
        this.arrangeAddedRows = this.arrangeAddedRows.bind(this);
        this.arrangeAddedRowsSeller = this.arrangeAddedRowsSeller.bind(this);
        this.reFilterSellerCodes = this.reFilterSellerCodes.bind(this);
        this.fetchLedger = this.fetchLedger.bind(this);
        this.fetchDispute = this.fetchDispute.bind(this);
        this.doSettlement = this.doSettlement.bind(this);
        this.checkDisputedForInvoice = this.checkDisputedForInvoice.bind(this);
        this.paymentDataFromCsv = [];
        this.logOutSession = this.logOutSession.bind(this);
        this.api_invocation = 'https://7ED46BA56B1248BE9DABC941F63C617A.blockchain.ocp.oraclecloud.com:443/restproxy1/bcsgw/rest/v1/transaction/invocation';
        this.api_query = 'https://7ED46BA56B1248BE9DABC941F63C617A.blockchain.ocp.oraclecloud.com:443/restproxy1/bcsgw/rest/v1/transaction/query';
        this.api_invocation_rp2 = 'https://7ED46BA56B1248BE9DABC941F63C617A.blockchain.ocp.oraclecloud.com:443/restproxy2/bcsgw/rest/v1/transaction/invocation';
        this.api_query_rp2 = 'https://7ED46BA56B1248BE9DABC941F63C617A.blockchain.ocp.oraclecloud.com:443/restproxy2/bcsgw/rest/v1/transaction/query';
        this.api_invocation_rp3 = 'https://7ED46BA56B1248BE9DABC941F63C617A.blockchain.ocp.oraclecloud.com:443/restproxy3/bcsgw/rest/v1/transaction/invocation';
        this.api_query_rp3 = 'https://7ED46BA56B1248BE9DABC941F63C617A.blockchain.ocp.oraclecloud.com:443/restproxy3/bcsgw/rest/v1/transaction/query';
        this.api_invocation_rp4 = 'https://7ED46BA56B1248BE9DABC941F63C617A.blockchain.ocp.oraclecloud.com:443/restproxy4/bcsgw/rest/v1/transaction/invocation';
        this.api_query_rp4 = 'https://7ED46BA56B1248BE9DABC941F63C617A.blockchain.ocp.oraclecloud.com:443/restproxy4/bcsgw/rest/v1/transaction/query';
    }

    componentDidMount() {
        this.setState({
            activeItem: this.props.activeItem != '' ? this.props.activeItem : 'HOME'
        })
        // document.getElementsByClassName(".search-gridDate input").setAttribute("placeholder", "Search Purchase Orders ...");
        this.poFetchCall();
        this.invoicesFetchCall();
        this.fetchLedger();
        this.populateBuyerCodes();
        this.populateSellerCodes();
        this.fetchDispute();
        // debugger;
        if (this.props.userRole == '') {
            this.setState({
                userRole: localStorage.userRole
            })
            // this.state.userRole= localStorage.userRole
        }
    }

    poFetchCall() {
        this.setState({
            poData: []
        })
        fetch(this.api_invocation_rp4, {
            method: 'post',
            body: JSON.stringify({
                "channel": "icledger",
                "chaincode": "ic-PO-final",
                "method": "getHistoryForPurchaseorder",
                "args": ["111"],
                "chaincodeVer": "v1"
            }),
            headers: {
                "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                "Content-Type": "application/json"
            },
            auth: {
                username: 'icledger',
                password: 'Welcome#12345'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            let parsedJson = JSON.parse(data.result.payload)
            parsedJson.forEach(txn => {
                this.generatePoData(txn);
            })
        });
    }
    invoicesFetchCall() {
        console.log("inside inv fetch#######")
        fetch(this.api_query_rp3, {
            method: 'post',
            body: JSON.stringify({
                "channel": "icledger",
                "chaincode": "ic-invoices-final",
                "method": "getHistoryForInvoices",
                "args": ["allinvoices"],
                "chaincodeVer": "v1"
            }),
            headers: {
                "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                "Content-Type": "application/json"
            },
            auth: {
                username: 'icledger',
                password: 'Welcome#12345'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            let parsedJson = JSON.parse(data.result.payload);
            console.log("ivfc", parsedJson);
            parsedJson.forEach(txn => {
                this.generateInvoicesData(txn);
            })
        });
    }
    generateInvoicesData(txn) {
        console.log("inside gen ivdata####");
        fetch(this.api_query_rp3, {
            method: 'post',
            body: JSON.stringify({
                "channel": "icledger",
                "chaincode": "ic-invoices-final",
                "method": "readInvoices",
                "args": [txn.Value.allinv],
                "chaincodeVer": "v1"
            }),
            headers: {
                "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                "Content-Type": "application/json"
            },
            auth: {
                username: 'icledger',
                password: 'Welcome#12345'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            let parsedJson = JSON.parse(data.result.payload);
            let joinedArr = this.state.invoicesData.concat(parsedJson);
            console.log("invdata", joinedArr);
            this.setState({
                invoicesData: joinedArr
            });
            // that.poData.push(data.result.payload)

        });
    }

    checkDisputedForInvoice(ivno) {
        fetch(this.api_query_rp3, {
            method: 'post',
            body: JSON.stringify({
                "channel": "icledger",
                "chaincode": "ic-invoices-final",
                "method": "readInvoices",
                "args": [ivno],
                "chaincodeVer": "v1"
            }),
            headers: {
                "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                "Content-Type": "application/json"
            },
            auth: {
                username: 'icledger',
                password: 'Welcome#12345'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            let parsedJson = JSON.parse(data.result.payload);
            console.log("invdata", parsedJson);
            this.setState({
                checkdispute: parsedJson.dispute,
                loaderActive: false,
                isModalLoaded: true
            });
            // that.poData.push(data.result.payload)

        });
    }

    generatePoData(txn) {

        fetch(this.api_invocation_rp4, {
            method: 'post',
            body: JSON.stringify({
                "channel": "icledger",
                "chaincode": "ic-PO-final",
                "method": "readPurchaseorder",
                "args": [txn.Value.pq],
                "chaincodeVer": "v1"
            }),
            headers: {
                "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                "Content-Type": "application/json"
            },
            auth: {
                username: 'icledger',
                password: 'Welcome#12345'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            let parsedJson = JSON.parse(data.result.payload);
            let joinedArr = this.state.poData.concat(parsedJson)
            this.setState({
                poData: joinedArr
            })
            // that.poData.push(data.result.payload)
        });

    }

    createInvoicesDispute() {
        let currDate = new Date();
        let curDisputeID = currDate.toISOString();
        currDate = currDate.toLocaleDateString();
        fetch(this.api_invocation_rp3, {
            method: 'post',
            body: JSON.stringify({
                "channel": "icledger",
                "chaincode": "ic-invoices-final",
                "method": "dispute",
                "args": [this.state.modalData[0].invoice_number, "DISPUTED", this.state.modalData[0].disputedescription, curDisputeID, currDate],
                "chaincodeVer": "v1"
            }),
            headers: {
                "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                "Content-Type": "application/json"
            },
            auth: {
                username: 'icledger',
                password: 'Welcome#12345'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            alert('Dispute Successfully Added!')
            console.log(data);
            // this.invoicesFetchCall();   // ?????
            this.fetchDispute()
            this.setState({
                modalSuccessMessage: data.txid
            })

        })

    }
    createInvoices_on_Dispute() {
        let currDate = new Date();
        let curDisputeID = currDate.toISOString();
        currDate = currDate.toLocaleDateString();
        fetch(this.api_invocation_rp3, {
            method: 'post',
            body: JSON.stringify({
                "channel": "icledger",
                "chaincode": "ic-invoices-final",
                "method": "dispute",
                "args": [this.state.modalData[0].Record.invoice_number, "DISPUTED", this.state.modalData[0].Record.disputedescription, curDisputeID, currDate],
                "chaincodeVer": "v1"
            }),
            headers: {
                "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                "Content-Type": "application/json"
            },
            auth: {
                username: 'icledger',
                password: 'Welcome#12345'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            alert('Dispute Successfully Added!')
            console.log(data);
            // this.invoicesFetchCall();   // ?????
            this.fetchDispute()
            this.setState({
                modalSuccessMessage: data.txid
            })

        })

    }
    //     fetchLedger() {
    //      fetch('https://7ED46BA56B1248BE9DABC941F63C617A.blockchain.ocp.oraclecloud.com:443/restproxy1/bcsgw/rest/v1/transaction/query', {
    //         method: 'post',
    //         body: JSON.stringify({
    //             "channel":"icledger",
    //             "chaincode":"ic-ledger-final",
    //             "method":"readref",
    //             "args": ["STAX_VA28"],
    //             "chaincodeVer":"v1"
    //         }),
    //         headers: {
    //             "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
    //             "Content-Type": "application/json"
    //         },
    //         auth: {
    //           username: 'icledger',
    //           password: 'Welcome#12345'
    //         },                
    //       }).then((response) => {
    //         return response.json();
    //       }).then((data) => { 
    //           if(data.returnCode == 'Success') { 
    //           let parsedJson = JSON.parse(data.result.payload)    
    //           this.setState({
    //               ledgerData: this.state.ledgerData.concat(parsedJson)
    //           })

    //           }
    //           else {
    //               // Else statement
    //            }

    // })
    //     }
    // setUploadErrors() {
    //     this.setState(prevState => ({
    //         uploadInvoiceData: {                   // object that we want to update
    //             ...prevState.uploadInvoiceData,    // keep all other key-value pairs
    //             invoice_status_date: this.state.uploadErrors      // update the value of specific key
    //         }
    //     }))
    // }
    fetchLedger() {
        fetch(this.api_query, {
            method: 'post',
            body: JSON.stringify({
                "channel": "icledger",
                "chaincode": "ic-ledger-final",
                "method": "queryRef",
                "args": ["{\"selector\":{\"docType\":\"refobject\"}}"],
                "chaincodeVer": "v1"
            }),
            headers: {
                "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                "Content-Type": "application/json"
            },
            auth: {
                username: 'icledger',
                password: 'Welcome#12345'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.returnCode == 'Success') {
                let parsedJson = JSON.parse(data.result.payload)
                console.log("ledger data", parsedJson)
                this.setState({
                    ledgerData: this.state.ledgerData.concat(parsedJson)
                })

            }
            else {
                // Else statement
            }

        })
    }

    fetchDispute() {
        this.setState({
            loaderActive: true
        })
        fetch(this.api_query_rp3, {
            method: 'post',
            body: JSON.stringify(
                {
                    "channel": "icledger",
                    "chaincode": "ic-invoices-final",
                    "method": "queryInvoices",
                    "args": ["{\"selector\":{\"docType\":\"Invoice\",\"dispute\":\"DISPUTED\"}}"],
                    "chaincodeVer": "v1"
                }),
            headers: {
                "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                "Content-Type": "application/json"
            },
            auth: {
                username: 'icledger',
                password: 'Welcome#12345'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.returnCode == 'Success') {
                this.setState({
                    loaderActive: false
                })
                let parsedJson = JSON.parse(data.result.payload);
                console.log(parsedJson);
                if (this.state.disputeData.length != 0) {
                    console.log("inside if fetch@@@@@@@@@");

                    if (this.state.disputeData.length < parsedJson.length) {
                        this.setState({
                            disputeData: []
                        })
                        for (let x = 0 ; x < parsedJson.length; x++) {
                            this.setState({
                                disputeData: this.State.disputeData.concat(parsedJson[x])
                            })
                            console.log("!!!", x)
                        }
                    }

                    else if (this.state.disputeData.length == parsedJson.length) {

                        for (let m = 0; m < this.state.disputeData.length; m++) {
                            for (let n = 0; n < parsedJson.length; n++) {
                                if (this.state.disputeData[m].Key === parsedJson[n].Key && Date.parse(this.state.disputeData[m].Record.disputeid) < Date.parse(parsedJson[n].Record.disputeid)) {
                                    this.state.disputeData[m] = parsedJson[n];
                                    console.log("!!!!", m + "-" + n);
                                }
                                // else if (this.state.disputeData[m].key == parsedJson[n].key && this.state.disputeData[m].Record.disputedescription == parsedJson[n].Record.disputedescription) {
                                //     this.state.disputeData[m] = parsedJson[n];
                                //     console.log(" else !!!!", this.state.disputeData[m].key);
                                // }
                            }
                        }
                    }
                }
                else {
                    this.setState({
                        disputeData: this.state.disputeData.concat(parsedJson)
                    })
                    console.log("dispute data", data);
                }
            }
            else {
                // Else statement
                console.log("dispute data", data);
                this.setState({
                    loaderActive: false
                })
            }

        })
    }
    submitInvoice() {
        if (this.state.uploadInvoiceData.length != 0) {
            this.setState({
                loaderActive: true
            })
            this.state.uploadDataArgs[0].currentLine.forEach((uploadData, index) => {
                // Code for setting percentage progress
                setTimeout(function () {
                    // this.setState({
                    //     percentNumber: (index / this.state.uploadInvoiceData.length)  * 100
                    // })

                    //End
                    if (uploadData.length != 0) {
                        uploadData[uploadData.length - 1] = Number(uploadData[uploadData.length - 1]).toString();
                        console.log(uploadData);
                        let currDate = new Date();
                        fetch(this.api_invocation_rp3, {
                            method: 'post',
                            body: JSON.stringify({
                                "channel": "icledger",
                                "chaincode": "ic-invoices-final",
                                "method": "initInvoices",
                                "args": uploadData,
                                "chaincodeVer": "v1"
                            }),
                            headers: {
                                "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                                "Content-Type": "application/json"
                            },
                            auth: {
                                username: 'icledger',
                                password: 'Welcome#12345'
                            },
                        }).then((response) => {
                            return response.json();
                        }).then((data) => {
                            if (data.returnCode == 'Success') {
                                this.state.uploadInvoiceData[index].invoice_status = 'SUBMITTED';
                                this.setState({
                                    isUploadInProgress: false
                                })
                                console.log(data);
                            }
                            else {
                                data.info.peerErrors.forEach(err => {
                                    this.state.uploadInvoiceData[index].invoice_status = err.errMsg;
                                    this.forceUpdate();
                                    // this.setState({
                                    //     uploadErrors: this.state.uploadErrors.concat(err.errMsg)
                                    // })
                                })
                                //  this.setUploadErrors();
                                //   alert('Invoice submission failed, Please check the data and resubmit the csv file')
                                console.log(data);
                            }
                            // Show progress bar with incremental percentage
                            //   this.closeModal();
                        })
                    }

                }.bind(this), 3000)
            })


            this.setState({
                loaderActive: false
            })
        }
    }
    itemClicked(event, data) {
        console.log(event, data);
        // this.props.updateActiveItemParent(data.children.props.children)
        this.setState({ activeItem: data.children.props.children });
        if (event.target.innerText == 'INVOICES') {
            this.setState({
                invoiceTabIndex: "0"
            })
        }
        if (event.target.innerText == "DISPUTES") {
            this.fetchDispute();
        }
    }
    setUploadInvoiceData(res, currentLine) {

        this.setState({
            uploadInvoiceData: this.state.uploadInvoiceData.concat(res),
            uploadDataArgs: this.state.uploadDataArgs.concat({ currentLine }),
            isFileSelected: true,
            loaderActive: false
        })
    }
    setFilePath = files => {

        if (files.length != 0) {
            this.setState({
                selectedFileName: files[0]
            })
            var reader = new FileReader();
            let that = this;
            reader.onload = (e) => {
                // Use reader.result
                var csv = reader.result;
                var lines = csv.split("\n");
                var result = [];
                var currentLine = [];
                var headers = lines[0].split(",");
                for (var i = 1; i < lines.length; i++) {
                    var obj = {};
                    var currentline = lines[i].split(",");

                    for (var j = 0; j < headers.length; j++) {
                        obj[headers[j]] = currentline[j];
                    }
                    result.push(obj);
                    this.paymentDataFromCsv = currentLine;
                    currentLine.push(currentline);

                }

                console.log(result);

                this.setUploadInvoiceData(result, currentLine)
            }

            reader.readAsText(files[0]);
        }
        else {
            this.setState({
                isFileSelected: false,
                uploadInvoiceData: []

            })
        }

    }


    toggleAllUpload(e) {
        // e.preventDefault();

    }
    viewUploadedInvoices() {

    }
    cancelUpload() {
        this.setState({
            isFileSelected: false,
            uploadInvoiceData: []
        })
    }

    showModal(rowInfo) {
        this.setState({
            modalData: this.state.modalData.concat(rowInfo.original),
            isModalLoaded: true,
        })
        console.log(rowInfo);
        if (this.state.activeItem === 'INVOICES') {
            if (this.state.modalData[0] != 0) {
                this.setState({
                    isModalLoaded: false,
                    loaderActive: true
                })
                this.checkDisputedForInvoice(rowInfo.original.invoice_number);
                console.log("checkdisp", this.state.checkdispute);
            }
        }

    }
    closeModal() {
        this.setState({
            isModalLoaded: false,
            modalData: [],
            modalSuccessMessage: '',
            loaderActive: false,
            checkdispute: ''
        })
        console.log(this.state.modalData);
        // console.log("hide2S"+this.state.modalData[0].Key);
    }
    switchTab(e, data) {
        this.setState({
            invoiceTabIndex: data.activeIndex
        })
    }

    switchDisputeTab(e, data) {
        this.setState({
            disputeTabIndex: data.activeIndex
        })
    }

    getTrProps = (state, column, rowInfo) => {
        if (column != undefined) {
            return {
                style: {
                    color: column.original.dispute == 'yes' ? 'red' : 'black',
                    background: column.original.dispute == 'yes' ? '#ff000017' : ''
                }
            }
        }
        else {
            return {
                style: {
                    color: 'black',
                }
            }

        }
    }

    getTrPropsInvoice = (state, column, rowInfo) => {
        if (column != undefined) {
            return {
                style: {
                    color: column.original.dispute == 'yes' ? 'red' : 'black',
                    background: column.original.dispute == 'yes' ? '#ff000017' : ''
                }
            }
        }
        else {
            return {
                style: {
                    color: 'black',
                }
            }

        }
    }

    removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject = {};

        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }

    populateBuyerCodes() {

        fetch(this.api_query_rp2, {
            method: 'post',
            body: JSON.stringify({
                "channel": "icreferences",
                "chaincode": "ic-references-BUC-final",
                "method": "queryBUC",
                "args": ["{\"selector\":{\"docType\":\"bucobject\"}}"],
                "chaincodeVer": "v3"
            }),
            headers: {
                "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                "Content-Type": "application/json"
            },
            auth: {
                username: 'icledger',
                password: 'Welcome#12345'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            let parsedJson = JSON.parse(data.result.payload);
            this.setBuyerCodes(parsedJson);
            this.setState({
                buyerProfile: this.state.buyerProfile.concat(parsedJson),
                //  selectedBuyerCode: parsedJson.companycode,
                //  selectedCurrencyCode: parsedJson.buc_currencycode,
                //  selectedCountryCode: parsedJson.buc_countrycode,
                //  selectedBusinessUnit: parsedJson.buc,
                //  selectedNettingAllowed: parsedJson.netting_allowed,
            })
        });


    }

    populateSellerCodes() {

        fetch(this.api_query_rp2, {
            method: 'post',
            body: JSON.stringify({
                "channel": "icreferences",
                "chaincode": "ic-references-BUC-final",
                "method": "queryBUC",
                "args": ["{\"selector\":{\"docType\":\"bucobject\"}}"],
                "chaincodeVer": "v3"
            }),
            headers: {
                "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                "Content-Type": "application/json"
            },
            auth: {
                username: 'icledger',
                password: 'Welcome#12345'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            let parsedJson = JSON.parse(data.result.payload);
            //  let parsedJsonDuplic = [{"companycode":"GMX3","buc_countryname":"MX","buc_name":"SERVICIOS ADMINISTRATIVOS INTERNS S DE RL CV","buc_nettingflag":"A"},{"companycode":"300","buc_countryname":"US","buc_name":"GEMS-IT USA","buc_nettingflag":"Y"},{"companycode":"SAIR","buc_countryname":"US","buc_name":"CORPORATE AIR TRANSPORT OPER","buc_nettingflag":"Y"},{"companycode":"GMX3","buc_countryname":"MX","buc_name":"SERVICIOS ADMINISTRATIVOS INTERNS S DE RL CV","buc_nettingflag":"A"}]
            this.setSellerCodes(parsedJson);
            this.setState({
                sellerProfile: this.state.sellerProfile.concat(parsedJson),
            })
        });


    }

    setSellerCodes(parsedJson) {

        if (parsedJson.length != 0) {
            parsedJson.forEach(data => {
                this.setState({
                    sellerCodes: this.state.sellerCodes.concat({ key: data.Record.companycode, text: data.Record.companycode, value: data.Record.companycode }),
                    sellerCountryCodes: this.state.sellerCountryCodes.concat({ key: data.Record.buc_countryname, text: data.Record.buc_countryname, value: data.Record.buc_countryname }),
                    sellerBusinessUnitCodes: this.state.sellerBusinessUnitCodes.concat({ key: data.Record.buc_segment, text: data.Record.buc_segment, value: data.Record.buc_segment }),

                })
            })

        }

        this.setState({
            sellerCodes: this.removeDuplicates(this.state.sellerCodes, "text"),
            sellerCountryCodes: this.removeDuplicates(this.state.sellerCountryCodes, "text"),
            sellerBusinessUnitCodes: this.removeDuplicates(this.state.sellerBusinessUnitCodes, "text")

        })
    }
    async  paymentStatusByCsv(paymentdata) {
        console.log(paymentdata);
        const response = await fetch(this.api_invocation, {
            method: 'post',
            body: JSON.stringify({
                "channel": "icledger",
                "chaincode": "ic-PaymentConfirmation-final",
                "method": "initpay",
                "args": [paymentdata[1], paymentdata[2], paymentdata[0], paymentdata[3], paymentdata[4]],
                "chaincodeVer": "v1"
            }),
            headers: {
                "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                "Content-Type": "application/json"
            },
            auth: {
                username: 'icledger',
                password: 'Welcome#12345'
            },
        })
        const json = await response.json();
        console.log(json)
        this.setState({
            paymentResponse: {
                invoicenumber: paymentdata[0].replace(/"/g, ""),
                returncode: json.returnCode
            }
        });
        return { invoicenumber: paymentdata[0].replace(/"/g, ""), returncode: json.returnCode }
        //  alert(this.state.paymentResponse.length)

    }

    getPaymentStatus() {
        this.setState({
            loaderActive: true
        })
        let success = [];
        // for (var i=0;i<this.paymentDataFromCsv.length;i++){
        //  this.paymentStatusByCsv(this.paymentDataFromCsv[i])
        //      console.log(this.paymentStatusByCsv(this.paymentDataFromCsv[i]))

        // }
        console.log('inside payment')
        let promises = []
        let doc = this.paymentDataFromCsv;
        for (let i = 0; i < doc.length; i++) {
            //      console.log("doc is =====", doc.data());

            console.log(doc[i], typeof (doc), doc[i][0])


            this.paymentStatusByCsv(doc[i]).then(any => {
                console.log(this.state.paymentResponse, any)
                // if(any.returncode != "Success"){
                promises.push(any);
                // }

                if (i == doc.length - 1) {
                    console.log(promises)
                    this.setState({
                        loaderActive: false,
                        failedPayment: promises
                    })
                    // this.showModalforPayment(promises);
                    console.log(this.state.modalData)
                }

            })


        };

    }
    setBuyerCodes(parsedJson) {

        if (parsedJson.length != 0) {
            parsedJson.forEach(data => {
                this.setState({
                    buyerCodes: this.state.buyerCodes.concat({ key: data.Record.companycode, text: data.Record.companycode, value: data.Record.companycode }),
                    buyerCountryCodes: this.state.buyerCountryCodes.concat({ key: data.Record.buc_countryname, text: data.Record.buc_countryname, value: data.Record.buc_countryname }),
                    buyerBusinessUnitCodes: this.state.buyerBusinessUnitCodes.concat({ key: data.Record.buc_segment, text: data.Record.buc_segment, value: data.Record.buc_segment }),

                })
            })

        }

        this.setState({
            buyerCodes: this.removeDuplicates(this.state.buyerCodes, "text"),
            buyerCountryCodes: this.removeDuplicates(this.state.buyerCountryCodes, "text"),
            buyerBusinessUnitCodes: this.removeDuplicates(this.state.buyerBusinessUnitCodes, "text")

        })
    }
    arrangeAddedRowsSeller(obj) {

        this.state.addedDropdownData.forEach((data, index) => {
            if (data.id == obj.id) {
                this.state.addedDropdownData[index].sellerData = obj
                this.forceUpdate();
            }
        })
    }
    arrangeAddedRows(obj) {

        this.state.addedDropdownData.forEach((data, index) => {
            if (data.id == obj.id) {
                this.state.addedDropdownData[index].buyerData = obj
                this.forceUpdate();
            }
        })
    }

    buyerCodeChange(e, changeIndex) {
        // if(e.target.parentElement.parentElement.parentElement.attributes['id'] != undefined) {
        // var changeIndex = e.target.parentElement.parentElement.parentElement.attributes['id'].value;
        // }
        // else if(e.target.parentElement.parentElement.attributes['id'].value) {
        //     var changeIndex = e.target.parentElement.parentElement.attributes['id'].value;
        // }
        // var newArr = [], actualArr = []; 
        // newArr = newArr.concat(this.state.addedDropdownData.slice(0));
        this.state.buyerProfile.forEach((profile) => {
            if (profile.Record.companycode == e.currentTarget.textContent) {
                var obj = {
                    id: changeIndex,
                    selectedBuyerCode: e.target.innerText,
                    selectedBuyerCountryCode: profile.Record.buc_countryname,
                    selectedBuyerBusinessUnit: profile.Record.buc_segment,
                    buyerNettingFlag: profile.Record.netting_allowed
                }

                this.arrangeAddedRows(obj)

                //     this.setState({
                //         selectedBuyerCode: profile.companycode,
                //         selectedBuyerCountryCode: profile.buc_countryname,
                //         selectedBuyerBusinessUnit: profile.buc_name,
                //        //  selectedNettingAllowed: this.state.buyerProfile.netting_allowed,
                //    })    
            }
        })

        // this.setState({
        //  sellerCodes: this.removeDuplicates(this.state.sellerCodes, "text"),
        // })
        // this.reFilterSellerCodes(changeIndex);
    }
    reFilterSellerCodes(ind, text) {
        if (this.state.addedDropdownData.length > 1) {
            this.state.addedDropdownData.forEach((dd, index) => {
                if (ind != index.toString()) {
                    if (dd.sellerData.selectedSellerCode == text) {
                        this.setState({
                            areCodesMatching: true
                        })
                    }
                }

            })
        }
    }
    sellerCodeChange(e, changeIndex) {
        // this.reFilterSellerCodes(changeIndex, e.target.innerText);
        if (!this.state.areCodesMatching) {
            this.state.sellerProfile.forEach((profile) => {
                if (profile.Record.companycode == e.currentTarget.textContent) {

                    var obj = {
                        id: changeIndex,
                        selectedSellerCode: e.target.innerText,
                        selectedSellerCountryCode: profile.Record.buc_countryname,
                        selectedSellerBusinessUnit: profile.Record.buc_segment,
                        sellerNettingFlag: profile.Record.buc_nettingflag
                    }

                    this.arrangeAddedRowsSeller(obj)

                }
                // else {
                //     alert('Buyer and Seller can"t have same Country codes')
                // }
            })
        }
        else {
            var obj = {
                id: changeIndex,
                selectedBuyerCode: '',
                selectedBuyerCountryCode: '',
                selectedBuyerBusinessUnit: '',
                buyerNettingFlag: ''
            }
            this.arrangeAddedRowsSeller(obj)
            alert('You picked the same Buyer/Seller company codes to settle. Please pick different ones for Seller')
        }
        this.setState({
            areCodesMatching: false
        })
    }


    addRowSettlement() {
        this.setState({
            addRowSettlementClicked: true
        })
    }

    pushSettlementRow() {
        this.setState({
            addedDropdownData: this.state.addedDropdownData.concat(
                {
                    id: this.state.addedDropdownData.length.toString(),
                    buyerData: {
                        selectedBuyerCode: '',
                        selectedSellerCode: '',
                        selectedBuyerBusinessUnit: '',
                        buyerNettingFlag: ''
                    },
                    sellerData: {
                        selectedBuyerCountryCode: '',
                        selectedSellerBusinessUnit: '',
                        selectedSellerCountryCode: '',
                        sellerNettingFlag: ''
                    }
                }
            )
        })
    }

    getSettlementRow() {
        let arr = [];
        if (this.state.addedDropdownData.length <= 5) {
            this.state.addedDropdownData.forEach(data => {
                arr.push(
                    <Form className="dropdown-form">
                        <Form.Group widths='equal' >
                            <Form.Field width="3"
                                id={data.id}
                                control={Select}
                                options={this.state.buyerCodes}
                                label={{ children: 'Buyer Company Code', htmlFor: 'form-select-control-entity' }}
                                placeholder='Company Code'
                                search
                                searchInput={{ id: 'form-select-control-entity' }}
                                onChange={(event) => this.buyerCodeChange(event, data.id)}
                                value={data.buyerData.selectedBuyerCode}
                            />
                            <Form.Field width="3"
                                id={data.id}
                                control={Select}
                                options={this.state.buyerCountryCodes}
                                label={{ children: 'Buyer Country', htmlFor: 'form-select-control-entity' }}
                                placeholder='Country'
                                search
                                searchInput={{ id: 'form-select-control-entity' }}
                                value={data.buyerData.selectedBuyerCountryCode}
                            />
                            <Form.Field
                                id={data.id}
                                control={Select}
                                options={this.state.buyerBusinessUnitCodes}
                                label={{ children: 'Buyer Entity', htmlFor: 'form-select-control-entity' }}
                                placeholder='Entity'
                                search
                                searchInput={{ id: 'form-select-control-entity' }}
                                value={data.buyerData.selectedBuyerBusinessUnit}
                            />
                            <Form.Field
                                id={data.id}
                                control={Select}
                                options={this.state.sellerCodes}
                                label={{ children: 'Seller Company Code', htmlFor: 'form-select-control-entity' }}
                                placeholder='Company Code'
                                search
                                searchInput={{ id: 'form-select-control-entity' }}
                                onChange={(event) => this.sellerCodeChange(event, data.id)}
                                value={data.sellerData.selectedSellerCode}
                            />
                            <Form.Field
                                id={data.id}
                                control={Select}
                                options={this.state.sellerCountryCodes}
                                label={{ children: 'Seller Country', htmlFor: 'form-select-control-entity' }}
                                placeholder='Country'
                                search
                                searchInput={{ id: 'form-select-control-entity' }}
                                value={data.sellerData.selectedSellerCountryCode}
                            />
                            <Form.Field
                                id={data.id}
                                control={Select}
                                options={this.state.sellerBusinessUnitCodes}
                                label={{ children: 'Seller Entity', htmlFor: 'form-select-control-entity' }}
                                placeholder='Seller'
                                search
                                searchInput={{ id: 'form-select-control-entity' }}
                                value={data.sellerData.selectedSellerBusinessUnit}
                            />
                        </Form.Group>
                    </Form>
                )
            })
        }
        else {
            if (this.state.addedDropdownData.length != 0) {
                // this.setState({
                //     addedDropdownData: this.state.addedDropdownData.slice(0,5)
                // })
            }
            alert('Limit exceeded for adding number of Buyer and Seller Codes!!')
        }
        return arr;
    }
    doActualSettlement(from, to, currDate) {
        // let currDate = new Date();
        // currDate = currDate.toISOString();
        fetch(this.api_query, {
            method: 'post',
            body: JSON.stringify({
                "channel": "icledger",
                "chaincode": "ic-Settlements-final",
                "method": "readSettlement",
                "args": [from + to + currDate],
                "chaincodeVer": "v1"
            }),
            headers: {
                "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                "Content-Type": "application/json"
            },
            auth: {
                username: 'icledger',
                password: 'Welcome#12345'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(from, to, currDate)
            if (data.returnCode == 'Success') {
                let parsedJson = JSON.parse(data.result.payload);
                this.setState({
                    settlementData: this.state.settlementData.concat(parsedJson)
                })
            }
            else {
                //error
            }
        });
    }
    logOutSession() {
        localStorage.removeItem('userRole');
        this.setState({
            logOut: true
        })
    }
    doSettlement() {
        let currDate = new Date();
        currDate = currDate.toISOString();
        this.state.addedDropdownData.forEach(val => {
            fetch(this.api_invocation, {
                method: 'post',
                body: JSON.stringify({
                    "channel": "icledger",
                    "chaincode": "ic-Settlements-final",
                    "method": "createSettlement",
                    "args": [val.buyerData.selectedBuyerCode, currDate, val.sellerData.selectedSellerCode],
                    "chaincodeVer": "v1"
                }),
                headers: {
                    "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                    "Content-Type": "application/json"
                },
                auth: {
                    username: 'icledger',
                    password: 'Welcome#12345'
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.returnCode == 'Success') {
                    //   let parsedJson = JSON.parse(data)
                    console.log(val.buyerData.selectedBuyerCode, currDate, val.sellerData.selectedSellerCode)
                    this.doActualSettlement(val.buyerData.selectedBuyerCode, val.sellerData.selectedSellerCode, currDate);
                    this.invoicesFetchCall();
                }
                else {
                    console.log("error", data.info.peerErrors[0].errMsg);
                }
            });
        })
    }


    resolvedDispute() {
        let currDate = new Date();
        let curDisputeID = currDate.toISOString();
        currDate = currDate.toLocaleDateString();

        fetch(this.api_invocation_rp3, {
            method: 'post',
            body: JSON.stringify({
                "channel": "icledger",
                "chaincode": "ic-invoices-final",
                "method": "dispute",
                "args": [this.state.modalData[0].invoice_number, "RESOLVED", this.state.modalData[0].disputedescription, curDisputeID, currDate],
                "chaincodeVer": "v1"
            }),
            headers: {
                "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                "Content-Type": "application/json"
            },
            auth: {
                username: 'icledger',
                password: 'Welcome#12345'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.returnCode == 'Success') {
                alert('Successfully Resolved!')
                console.log(data);
                this.invoicesFetchCall();
                this.setState({
                    modalSuccessMessage: data.txid
                })
            }
        })
    }
    resolve_on_Dispute() {
        let currDate = new Date();
        let curDisputeID = currDate.toISOString();
        currDate = currDate.toLocaleDateString();

        fetch(this.api_invocation_rp3, {
            method: 'post',
            body: JSON.stringify({
                "channel": "icledger",
                "chaincode": "ic-invoices-final",
                "method": "dispute",
                "args": [this.state.modalData[0].Record.invoice_number, "RESOLVED", this.state.modalData[0].Record.disputedescription, curDisputeID, currDate],
                "chaincodeVer": "v1"
            }),
            headers: {
                "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
                "Content-Type": "application/json"
            },
            auth: {
                username: 'icledger',
                password: 'Welcome#12345'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.returnCode == 'Success') {
                alert('Successfully Resolved!')
                console.log(data);
                this.invoicesFetchCall();
                this.setState({
                    modalSuccessMessage: data.txid
                })
            }
        })
    }
    // settleInvoices() { 
    //     // var today = new Date();
    //     // var dd = String(today.getDate()).padStart(2, '0');
    //     // var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    //     // var yyyy = today.getFullYear();

    //     // today = mm + '-' + dd + '-' + yyyy;
    //     var today = '26-10-2019';
    //     this.state.addedDropdownData.forEach(val => {
    //         fetch('https://7ED46BA56B1248BE9DABC941F63C617A.blockchain.ocp.oraclecloud.com:443/restproxy1/bcsgw/rest/v1/transaction/query', {
    //             method: 'post',
    //             body: JSON.stringify({
    //                 "channel":"geicreference",
    //                 "chaincode":"ge-ic-profile",
    //                 "method":"readref",
    //                 "args":[`${val.buyerData.selectedBuyerCode}_${val.sellerData.selectedSellerCode}`],
    //                 "chaincodeVer":"v1"
    //                 }),
    //             headers: {
    //                 "Authorization": "Basic aWNsZWRnZXI6V2VsY29tZSMxMjM0NQ==",
    //                 "Content-Type": "application/json"
    //             },
    //             auth: {
    //               username: 'icledger',
    //               password: 'Welcome#12345'
    //             },                
    //           }).then((response) => {
    //             return response.json();
    //           }).then((data) =>{ ;
    //               if(data.returnCode == 'Success') {
    //              let parsedJson = JSON.parse(data.result.payload);
    //              this.setState({
    //                  settleRefObj: this.state.settleRefObj.concat(parsedJson)
    //               })
    //               this.doSettlement(val, parsedJson);
    //              }
    //              else {
    //                  //error
    //              }
    //           });
    //     })
    //     // this.setState({
    //     //     settlementData: this.state.settlementData.concat({
    //     //         settlement_id: '234',
    //     //         settlement_frombuc: '32435',
    //     //         settlement_invoice_amount: '34',
    //     //         settlement_frombucname: 'PRSFE',

    //     //     })
    //     // })
    // }
    render() {

        //Tabs

        const disputePanes = [
            // { menuItem: 'PO Disputes', render: () => <Tab.Pane attached={false}></Tab.Pane> },
            { menuItem: 'Invoice Disputes', render: () => <Tab.Pane attached={false}></Tab.Pane> }
        ]
        const invoicePanes = [
            { menuItem: 'Upload Invoice', render: () => <Tab.Pane attached={false}></Tab.Pane> },
            { menuItem: 'Search Invoice', render: () => <Tab.Pane attached={false}></Tab.Pane> }
        ]
        // Columns for Purchase Orders 
        const poColumns = [{
            Header: 'PO Number',
            accessor: 'po_number',
            Cell: props => <a href="javascript:void(0)"><span className='number'>{props.value}</span> </a>// Custom cell components!
        }, {
            Header: 'Total Price',
            id: "total_price",
            accessor: (data, index) => {
                let output = [];
                if (data.items != undefined) {
                    data.items.forEach(itm => {
                        output.push(itm.total_price);
                    });
                }
                return output.join(', ');
            },
        }, {
            Header: 'Coco',
            accessor: 'companycode',
        }, {
            Header: 'Currency',
            accessor: 'currency_code',
        }, {
            Header: 'PO Date',
            accessor: 'po_received_date',
        }, {
            Header: 'PO Status',
            accessor: 'po_status',
        }, {
            Header: 'Confirmation No',
            accessor: 'payment_conf_num',
            Cell: props => <span className='number'>{props.value == 'nil' ? '' : props.value}</span> // Custom cell components!
        }]
        // Columns for Invoices
        const invoiceColumns = [{
            Header: 'Invoice Number',
            accessor: 'invoice_number',
            Cell: props => <a href="javascript:void(0)"> <span className='number'>{props.value}</span> </a> // Custom cell components!
        }, {
            Header: 'PO Number',
            accessor: 'po_number',
            Cell: props =><span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'From Coco',
            accessor: 'from_buc_coco',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'To Coco',
            accessor: 'to_buc_coco',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Invoice Amount',
            accessor: 'total_invoice_amount',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Invoice Date',
            accessor: 'invoice_created_date',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Invoice Status',
            accessor: 'invoice_status',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Payment Confirmation',
            accessor: 'payment_conf_num',
            Cell: props => <span className='number'>{props.value == 'nil' ? '' : props.value}</span> // Custom cell components!
        }, {
            Header: 'Settlement Number',
            accessor: 'settlement_id',
            Cell: props => <span className='number'>{props.value == 'nil' ? '' : props.value}</span>// Custom cell components!
        }] // Columns for LEDGER
        const ledgerColumns = [{
            Header: 'From Coco',
            accessor: 'Record.from_coco',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'To Coco',
            accessor: 'Record.to_coco',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Currency',
            accessor: 'Record.currency',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Settlement Amount',
            accessor: 'Record.settlement_amount',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }]
        // Columns for Upload Invoices View
        const uploadInvoiceColumns = [{
            Header: 'Invoice Number',
            accessor: 'invoice_number',
            Cell: props => <span className='number'>{props.value}</span>  // Custom cell components!
        },
        {
            Header: 'PO Number',
            accessor: 'po_number',
            Cell: props => <span className='number'>{props.value}</span>  // Custom cell components!
        }, {
            Header: 'From Coco',
            accessor: 'from_buc_coco',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'To Coco',
            accessor: 'to_buc_coco',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Invoice Amount',
            accessor: 'total_invoice_amount',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Invoice Status',
            accessor: 'invoice_status',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }]

        // Columns for Disputes
        const disputeColumns = [{
            Header: 'Dispute ID',
            accessor: 'Record.disputeid',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Invoice Number',
            accessor: 'Record.invoice_number',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'PO Number',
            accessor: 'Record.po_number',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Company Code',
            accessor: 'Record.from_buc_coco',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Dispute Description',
            accessor: 'Record.disputedescription',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Invoice Date',
            accessor: 'Record.disputedate',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }]


        // Columns for Settlements
        const settlementColumns = [{
            Header: 'Settlement ID',
            accessor: 'settlement_id',
            Cell: props => <a href="javascript:void(0)"><span className='number'>{props.value}</span> </a> // Custom cell components!
        }, {
            Header: 'Buyer Coco',
            accessor: 'companycode',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Seller Coco',
            accessor: 'settlement_tobuc',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Currency',
            accessor: 'settlement_invoice_currency',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Settlement Amount',
            accessor: 'settlement_invoice_amount',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }]


        const paymentColumns = [{
            Header: 'Invoice Number',
            accessor: 'invoicenumber',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Payment Status',
            accessor: 'returncode',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }]

        // console.log(this.props)
        // if(this.props.userRole){
        //     return <Redirect to='/dash' />
        // }

        let poData = this.state.poData;
        if (this.state.search) {
            poData = poData.filter(row => {
                return row.po_number.includes(this.state.search)
                    || row.currency_code.includes(this.state.search) || row.po_received_date.includes(this.state.search)
                    || row.po_status.includes(this.state.search) || row.payment_conf_num.includes(this.state.search) ||
                    row.items.forEach(itm => {
                        return itm.po_line_item_number.includes(this.state.search)
                            || itm.quantity_ordererd.includes(this.state.search) || itm.total_price.includes(this.state.search)
                    })

            })

        }

        let invData = this.state.invoicesData;

        if (this.state.invoiceSearch) {
            invData = invData.filter(row => {
                return row.invoice_number.includes(this.state.invoiceSearch)
                    || row.po_number.includes(this.state.invoiceSearch) || row.from_buc_coco.includes(this.state.invoiceSearch)
                    || row.to_buc_coco.includes(this.state.invoiceSearch) ||
                    row.total_invoice_amount.includes(this.state.invoiceSearch)
                    || row.invoice_status.includes(this.state.invoiceSearch)


            })

        }
        let ledgData = this.state.ledgerData;

        if (this.state.ledgerSearch) {
            ledgData = ledgData.filter(row => {
                return row.Record.from_coco.includes(this.state.ledgerSearch)
                    || row.Record.to_coco.includes(this.state.ledgerSearch) || row.Record.settlement_amount.toString().includes(this.state.ledgerSearch) ||
                    row.Record.currency.includes(this.state.ledgerSearch)
            })

        }

        let dispdata = this.state.disputeData;
        if (this.state.disputeSearch) {
            dispdata = dispdata.filter(row => {
                return row.Record.invoice_number.includes(this.state.disputeSearch)
                    || row.Record.po_number.includes(this.state.disputeSearch) || row.Record.from_buc_coco.toString().includes(this.state.disputeSearch) ||
                    row.Record.disputedescription.includes(this.state.disputeSearch) || row.Record.disputedate.includes(this.state.disputeSearch)

            })

        }

        return (
            <div className="screens-background">
                <Container className="header-navigation-bar">
                    <Menu secondary>
                        <Menu.Item>
                            <img src={hcImageUrl} className="ge-logo ui small image" />
                        </Menu.Item>
                        <Menu.Item className="logo-header-name">
                            <h3>IC Ledger</h3>
                        </Menu.Item>
                        <Menu.Item position='right'>
                            <Menu pointing secondary>
                                <Menu.Menu>
                                    <Menu.Item active={this.state.activeItem === 'HOME'} className="header-tabs-items" onClick={(event, data) => this.itemClicked(event, data)}>
                                        <h4>HOME</h4>
                                    </Menu.Item>
                                    {this.state.userRole == 'BUYER' ? <Menu.Item active={this.state.activeItem === 'PURCHASE ORDERS'} className="header-tabs-items" onClick={(event, data) => this.itemClicked(event, data)}>
                                        <h4>PURCHASE ORDERS</h4>
                                    </Menu.Item> : <div></div>}
                                    {(this.state.userRole == 'BUYER' || this.state.userRole == 'SELLER') ? <Menu.Item active={this.state.activeItem === 'INVOICES'} className="header-tabs-items" onClick={(event, data) => this.itemClicked(event, data)}>
                                        <h4>INVOICES</h4>
                                    </Menu.Item> : <div></div>}
                                    {this.state.userRole == "BUYER" ? <Menu.Item active={this.state.activeItem === 'SETTLEMENTS'} className="header-tabs-items" onClick={(event, data) => this.itemClicked(event, data)}>
                                        <h4>SETTLEMENTS</h4>
                                    </Menu.Item> : <div></div>}
                                    {(this.state.userRole == 'SELLER' || this.state.userRole == 'TREASURY') ? <Menu.Item active={this.state.activeItem === 'PAYMENTS'} className="header-tabs-items" onClick={(event, data) => this.itemClicked(event, data)}>
                                        <h4>PAYMENTS</h4>
                                    </Menu.Item> : <div></div>}
                                    {(this.state.userRole == 'SELLER' || this.state.userRole == 'BUYER') ? <Menu.Item active={this.state.activeItem === 'DISPUTES'} className="header-tabs-items" onClick={(event, data) => this.itemClicked(event, data)}>
                                        <h4>DISPUTES</h4>
                                    </Menu.Item> : <div></div>}
                                    {this.state.userRole == 'TREASURY' ? <Menu.Item active={this.state.activeItem === 'LEDGER'} className="header-tabs-items" onClick={(event, data) => this.itemClicked(event, data)}>
                                        <h4>LEDGER</h4>
                                    </Menu.Item> : <div></div>}
                                    <Menu.Item className="header-tabs-items" onClick={this.logOutSession}>
                                        <h4>Logout</h4>
                                    </Menu.Item>
                                </Menu.Menu>
                            </Menu>
                        </Menu.Item>
                    </Menu>
                </Container>
                <Container className="tabular-content">
                    {/*Show below Home Page when Home is Selected*/}
                    {this.state.activeItem === 'HOME' ?
                        <div className>
                            <div className="header-txn-table">
                                <img src={dashIcon} className='header-icons-set' />
                                <h2>DASHBOARD</h2>
                            </div>
                            <Container>
                                <iframe className="analytics-page" src="http://129.213.155.160:3000/" ></iframe>
                            </Container>
                            {/* <ReactTable
                            data={transactions}
                            columns={columns} filterable
                        /> */}
                        </div> : <div> </div>
                    }

                    {/*Show below PO Page when purchase orders is Selected*/}
                    {this.state.activeItem === 'PURCHASE ORDERS' ?
                        <div className="transactions-table">
                            <div className="header-txn-table">
                                <img src={poIcon} className='header-icons-set' />
                                <h2>PURCHASE ORDERS</h2>
                            </div>
                            <br /> <br />

                            <Search value={this.state.search}
                                onSearchChange={e => this.setState({ search: e.target.value })} placeholder="Search Purchase Orders here ..." className='search-gridData' />
                            {/* Search: <input 
									value={this.state.search}
									onChange={e => this.setState({search: e.target.value})}
								/>                   */}
                            <ReactTable
                                data={poData} defaultPageSize={10}
                                columns={poColumns} loading={this.state.poData.length == '0'}
                                getTdProps={(state, rowInfo, column, instance) => {
                                    return {
                                        onClick: (e, handleOriginal) => {
                                            this.showModal(rowInfo)
                                        }
                                    }
                                }
                                }
                                getTrProps={this.getTrProps}


                            />
                            {this.state.modalData.length != 0 ?
                                <Modal open={this.state.isModalLoaded} closeIcon={true} onClose={() => this.closeModal()}>
                                    <Modal.Header>PURCHASE ORDER {this.state.modalData[0].po_number}</Modal.Header>
                                    <Modal.Content>
                                        {this.state.modalSuccessMessage != '' ?
                                            <Grid columns={2}>
                                                <Message
                                                    success
                                                    header='Dispute submitted successfully, find the Transaction Id below'
                                                    content={this.state.modalSuccessMessage}
                                                />
                                            </Grid>
                                            :
                                            <div></div>
                                        }
                                        <Grid columns={2}>
                                            <Grid.Row>
                                                <Grid.Column>
                                                    <div className="modalRowContent">PO Received Date:  {this.state.modalData[0].po_received_date}</div>
                                                    <div className="modalRowContent">PO Number:  {this.state.modalData[0].po_number}</div>
                                                    {/* <div className="modalRowContent">Company Code:  {this.state.modalData[0].companycode}</div> */}
                                                    <div className="modalRowContent">Company Code:  {this.state.modalData[0].companycode}</div>
                                                    {/* <div className="modalRowContent">To Company Code:  {this.state.modalData[0].to_buc_segment}</div> */}
                                                    <div className="modalRowContent">Currency Code:  {this.state.modalData[0].currency_code}</div>
                                                    <div className="modalRowContent">PO Status: {this.state.modalData[0].po_status}</div>
                                                    <div className="modalRowContent">LINE ITEM Number: {this.state.modalData[0].items[0].po_line_item_number}</div>
                                                    <div className="modalRowContent">Unit Price: {this.state.modalData[0].items[0].unit_price}</div>
                                                    {/* <div className="modalRowContent">Disputed:  {this.state.modalData[0].dispute == 'yes' ? 'YES' : 'NO'}</div> */}
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <div className="modalRowContent">Buyer Address: 1234 Maple street Austin TX</div>
                                                    <div className="modalRowContent">Buyer Email:  {this.state.modalData[0].buyer_emailid}</div>
                                                    <div className="modalRowContent">Seller Address: 1234 Maple street Austin TX</div>
                                                    <div className="modalRowContent">Seller Email:  {this.state.modalData[0].supplier_emailid}</div>
                                                    <div className="modalRowContent">Receiver Email:  {this.state.modalData[0].receiver_emailid}</div>
                                                    <div className="modalRowContent">Type of Transaction: {this.state.modalData[0].docType}</div>
                                                    <div className="modalRowContent">Confirmation Number: {this.state.modalData[0].payment_conf_num}</div>
                                                </Grid.Column>
                                            </Grid.Row>
                                            {/* <Grid.Row>
                                            <Grid.Column>
                                                <div className="modalRowContent">Comments:</div>
                                                <textarea value={this.state.modalData[0].disputedescription == 'nil' ? '' : this.state.modalData[0].disputedescription }
									onChange={e => {
                                        let arr = this.state.modalData[0];
                                        arr.disputedescription = e.target.value;
                                        this.setState(prevState => ({
                                            modalData: {                   // object that we want to update
                                                ...prevState.modalData,    // keep all other key-value pairs
                                                modalData: arr      // update the value of specific key
                                            }
                                        }))
                                    }}></textarea>
                                            </Grid.Column>
                                        </Grid.Row> */}

                                        </Grid>
                                        {/* {this.state.modalData[0].dispute == 'yes' ?
                    <div className="button-ge-container"> 
                        <button disabled={false}  onClick={() => this.createPoDispute()} className="button-ge resolve">RESOLVE</button>
                    </div>
                    :
                    <div className="button-ge-container"> 
                        <button disabled={false}  onClick={() => this.createPoDispute()} className="button-ge dispute">DISPUTE</button>
                    </div>
                        }                                 */}
                                    </Modal.Content>
                                </Modal>
                                :
                                <Modal><Modal.Header>No data available for this Purchase Order!!!</Modal.Header></Modal>
                            }

                        </div> : <div> </div>
                    }

                    {/*Show below Invoices Page when invoices is Selected*/}
                    {this.state.activeItem === 'INVOICES' ?
                        <div className="transactions-table">
                            {/* <div className="successMessage">
                        <Message
                            success
                            header='Invoices are submitted successfully'
                            content='This is the confirmation number: "TXN8237546"'
                        />
                </div> */}
                            <div className="header-txn-table">
                                <img src={invoiceIcon} className='header-icons-set' />
                                <h2>INVOICES</h2>
                            </div>
                            <Tab menu={{ secondary: true, pointing: true }} panes={invoicePanes} onTabChange={(event, data) => this.switchTab(event, data)} />
                            <br /> <br />
                            {this.state.invoiceTabIndex == '0' ?
                                <div>

                                    {this.state.isUploadInProgress ?
                                        //                     <Progress active={this.state.isUploadInProgress} percent={this.state.percentNumber} color='green' progress>
                                        //                         {this.state.percentNumber}% Complete
                                        // </Progress> 
                                        <Dimmer active>
                                            <Loader size='big'>Uploading</Loader>
                                        </Dimmer>

                                        : <div> </div>}
                                    {!this.state.isFileSelected ?
                                        <div className="upload-form-invoices">
                                            <span>Please click on </span>
                                            {/* <label htmlFor="file-upload" className="custom-file-upload">
                                <i className="fa fa-cloud-upload"></i>  UPLOAD CSV
                        </label> */}
                                            <ReactFileReader className="custom-file-upload" handleFiles={this.setFilePath} fileTypes={'.csv'}>
                                                <button className='btn'>UPLOAD CSV</button>
                                            </ReactFileReader>
                                            <input id="file-upload" name='file-upload' type="file" onChange={(event) => this.setFilePath(event)} />

                                            <span> to view INVOICES</span>
                                        </div>
                                        :
                                        <div className="upload-form-invoices">Selected file: {this.state.selectedFileName.name}
                                            <button className="button-ge" onClick={this.cancelUpload}>CANCEL</button>
                                        </div>
                                    }

                                    {/* <div className="button-ge-container"> 
                        <button disabled={!this.state.isFileSelected} className="button-ge" onClick={this.viewUploadedInvoices}>VIEW</button>
                    </div> */}
                                    <ReactTable
                                        data={this.state.uploadInvoiceData} defaultPageSize={10}
                                        columns={uploadInvoiceColumns} loading={this.state.loaderActive == true}
                                        getTdProps={(state, rowInfo, column, instance) => {
                                            return {
                                                onClick: (e, handleOriginal) => {
                                                    this.showModal(rowInfo);
                                                }
                                            }
                                        }
                                        }
                                    />

                                    {this.state.modalData.length != 0 ?
                                        <Modal open={this.state.isModalLoaded} closeIcon={true} onClose={() => this.closeModal()}>
                                            <Modal.Header>INVOICE {this.state.modalData[0].invoice_number}</Modal.Header>
                                            <Modal.Content>
                                                <Grid columns={2}>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <div className="modalRowContent">Invoice Number: {this.state.modalData[0].invoice_number}</div>
                                                            <div className="modalRowContent">PO Number: {this.state.modalData[0].po_number}</div>
                                                            <div className="modalRowContent">From Company Code: {this.state.modalData[0].from_buc_coco}</div>
                                                            <div className="modalRowContent">To Company: {this.state.modalData[0].to_buc_coco}</div>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <div className="modalRowContent">Invoice Status: {this.state.modalData[0].invoice_status}</div>
                                                            <div className="modalRowContent">Unit Price: {this.state.modalData[0].total_invoice_amount}</div>
                                                            <div className="modalRowContent">Currency Code: {this.state.modalData[0].invoice_currency}</div>
                                                            <div className="modalRowContent">Unit Price: {this.state.modalData[0].total_invoice_amount}</div>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row>
                                                        <div className="modalRowContent">Comments:</div>
                                                        <textarea value={this.state.modalData[0].disputedescription == 'nil' ? '' : this.state.modalData[0].disputedescription}
                                                            onChange={e => {
                                                                let arr = this.state.modalData[0];
                                                                arr.disputedescription = e.target.value;
                                                                this.setState(prevState => ({
                                                                    modalData: {                   // object that we want to update
                                                                        ...prevState.modalData,    // keep all other key-value pairs
                                                                        modalData: arr      // update the value of specific key
                                                                    }
                                                                }))
                                                            }}></textarea>

                                                    </Grid.Row>
                                                    <Grid.Row>
                                                        {/* <Button className="button-update">Update</Button>
                                                        <Button className="button-ge dispute">Dispute</Button>
                                                        <Button className="button-ge resolve">Resolve</Button> */}
                                                        {/* 
                                                        <div className="button-ge-container">
                                                            <button disabled={false} onClick={() => this.createPoDispute()} className="button-ge dispute">DISPUTE</button>
                                                        </div>
                                                        <div className="button-ge-container">
                                                            <button disabled={false} onClick={() => this.createPoDispute()} className="button-update">UPDATE</button>
                                                        </div>
                                                        <div className="button-ge-container">
                                                            <button disabled={false} onClick={() => this.createPoDispute()} className="button-ge resolve">RESOLVE</button>
                                                        </div> */}
                                                        {this.state.checkdispute != 'RESOLVED' ?
                                                            <div>
                                                                {this.state.checkdispute == 'DISPUTED' ?
                                                                    <div className="button-ge-container">
                                                                        <button disabled={false} onClick={() => this.resolvedDispute()} className="button-ge resolve">RESOLVE</button>
                                                                    </div>
                                                                    :
                                                                    <div className="button-ge-container">
                                                                        <button disabled={false} onClick={() => this.createInvoicesDispute()} className="button-ge dispute">DISPUTE</button>
                                                                    </div>
                                                                }
                                                                <div className="button-ge-container">
                                                                    <button disabled={false} onClick={() => this.createInvoicesDispute()} className="button-update">UPDATE</button>
                                                                </div>
                                                            </div> :
                                                            <div className="button-ge-container">
                                                                Resolved
                                                    </div>
                                                        }
                                                    </Grid.Row>

                                                </Grid>

                                            </Modal.Content>
                                        </Modal>
                                        :
                                        <Modal><Modal.Header>No data available for this Purchase Order!!!</Modal.Header></Modal>
                                    }
                                    <div className="button-ge-container">
                                        <button disabled={!this.state.isFileSelected} className="button-ge" onClick={this.submitInvoice}>SUBMIT</button>
                                    </div>
                                    {/* <ReactFileReader handleFiles={ this.setFilePath } fileTypes={'.csv'}>
                                        <button className='btn'>Upload About to change :)</button>
                                    </ReactFileReader> */}
                                </div>

                                :

                                <div>

                                    <Search value={this.state.invoiceSearch}
                                        onSearchChange={e => this.setState({ invoiceSearch: e.target.value })} placeholder="Search Invoice here ..." className='search-gridData' />

                                    <ReactTable
                                        data={invData} defaultPageSize={10}
                                        columns={invoiceColumns} loading={invData.length == '0'}
                                        getTdProps={(state, rowInfo, column, instance) => {
                                            return {
                                                onClick: (e, handleOriginal) => {
                                                    this.showModal(rowInfo)
                                                }
                                            }
                                        }
                                        }

                                        getTrProps={this.getTrPropsInvoice}
                                    //  getTrProps={(state,column, rowInfo) => {
                                    //    if(column != undefined) {
                                    //     return {
                                    //       style: {
                                    //         color: column.original.dispute == 'DISPUTED' ? 'red' : 'black'
                                    //       }
                                    //     }
                                    //    }
                                    //   }}
                                    />
                                    {this.state.loaderActive == true ?
                                        <Dimmer active>
                                            <Loader size='big'>Loading</Loader>
                                        </Dimmer>
                                        : <div>
                                            {this.state.modalData.length != 0 ?
                                                <Modal open={this.state.isModalLoaded} closeIcon={true} onClose={() => this.closeModal()}>
                                                    <Modal.Header>INVOICE {this.state.modalData[0].invoice_number}</Modal.Header>
                                                    <Modal.Content>
                                                        <Grid columns={2}>
                                                            <Grid.Row>
                                                                <Grid.Column>
                                                                    <div className="modalRowContent">Invoice Number: {this.state.modalData[0].invoice_number}</div>
                                                                    <div className="modalRowContent">Invoice Received Date: {this.state.modalData[0].invoice_created_date}</div>
                                                                    <div className="modalRowContent">From Company Code: {this.state.modalData[0].from_buc_coco}</div>
                                                                    <div className="modalRowContent">To Company: {this.state.modalData[0].to_buc_coco}</div>
                                                                    <div className="modalRowContent">Currency Code: {this.state.modalData[0].invoice_currency}</div>
                                                                    <div className="modalRowContent">LINE ITEM Number: {this.state.modalData[0].line_item_number}</div>
                                                                    <div className="modalRowContent">Unit Price: {this.state.modalData[0].total_invoice_amount}</div>
                                                                </Grid.Column>
                                                                <Grid.Column>
                                                                    <div className="modalRowContent">Invoice Status: {this.state.modalData[0].invoice_status}</div>
                                                                    <div className="modalRowContent">Type of Transaction: {this.state.modalData[0].docType}</div>
                                                                    <div className="modalRowContent">Buyer Email: def@ora.com</div>
                                                                    <div className="modalRowContent">Ship To Country: US</div>
                                                                    <div className="modalRowContent">Ship From Country: US</div>
                                                                </Grid.Column>
                                                            </Grid.Row>

                                                            <Grid.Row>
                                                                <div className="modalRowContent">Comments:</div>
                                                                <textarea value={this.state.modalData[0].disputedescription == 'nil' ? '' : this.state.modalData[0].disputedescription}
                                                                    onChange={e => {
                                                                        let arr = this.state.modalData[0];
                                                                        arr.disputedescription = e.target.value;
                                                                        this.setState(prevState => ({
                                                                            modalData: {                   // object that we want to update
                                                                                ...prevState.modalData,    // keep all other key-value pairs
                                                                                modalData: arr      // update the value of specific key
                                                                            }
                                                                        }))
                                                                    }}></textarea>
                                                                {/* <Button className="button-update">Update</Button> */}
                                                            </Grid.Row>


                                                        </Grid>

                                                        {this.state.checkdispute != 'RESOLVED' ?
                                                            <div>
                                                                {this.state.checkdispute == 'DISPUTED' ?
                                                                    <div className="button-ge-container">
                                                                        <button disabled={false} onClick={() => this.resolvedDispute()} className="button-ge resolve">RESOLVE</button>
                                                                    </div>
                                                                    :
                                                                    <div className="button-ge-container">
                                                                        <button disabled={false} onClick={() => this.createInvoicesDispute()} className="button-ge dispute">DISPUTE</button>
                                                                    </div>
                                                                }
                                                                <div className="button-ge-container">
                                                                    <button disabled={false} onClick={() => this.createInvoicesDispute()} className="button-update">UPDATE</button>
                                                                </div>
                                                            </div> :
                                                            <div className="button-ge-container">
                                                                Resolved
                                                    </div>
                                                        }
                                                    </Modal.Content>
                                                </Modal>
                                                :
                                                <Modal><Modal.Header>No data available for this Purchase Order!!!</Modal.Header></Modal>
                                            }
                                        </div>
                                    }
                                </div>
                            }

                            {this.state.loaderActive == true ?
                                <Dimmer active>
                                    <Loader size='big'>Loading</Loader>
                                </Dimmer>
                                :
                                <div></div>
                            }
                        </div> : <div> </div>
                    }


                    {/*Show below Payments Page when Payments is Selected*/}
                    {this.state.activeItem === 'PAYMENTS' ?
                        <div className="transactions-table">
                            <div className="header-txn-table">
                                <img src={paymentIcon} className='header-icons-set' />
                                <h2>PAYMENTS</h2>
                            </div>
                            <br /> <br />

                            <div className="upload-form-invoices">
                                <span>Please click on </span>
                                {/* <label for="file-upload" className="custom-file-upload">
                                <i className="fa fa-cloud-upload"></i>  UPLOAD CSV
                        </label>                     */}
                                <ReactFileReader className="custom-file-upload" handleFiles={this.setFilePath} fileTypes={'.csv'}>
                                    <button className='btn'>UPLOAD CSV</button>
                                </ReactFileReader>
                                <input id="file-upload" type="file" onChange={(event) => this.setFilePath(event)} />

                                <span> to submit Payments</span>
                            </div>
                            <div className="button-ge-container">
                                <button disabled={false} onClick={() => this.getPaymentStatus()} className="button-ge">SUBMIT</button>
                            </div>
                            {this.state.loaderActive == true ?
                                <Dimmer active>
                                    <Loader size='big'>Loading</Loader>
                                </Dimmer>
                                :
                                //    <div></div>

                                <ReactTable
                                    data={this.state.failedPayment} defaultPageSize={10}
                                    columns={paymentColumns}
                                    getTdProps={(state, rowInfo, column, instance) => {
                                        return {
                                            onClick: (e, handleOriginal) => {
                                                this.showModal(rowInfo)
                                            }
                                        }
                                    }
                                    }
                                />
                            }
                            {/* <ReactTable
                            data={transactions}
                            columns={columns} filterable
                        /> */}
                        </div> : <div> </div>
                    }


                    {/*Show below Settlements Page when Settlements is Selected*/}
                    {this.state.activeItem === 'SETTLEMENTS' ?
                        <div className="transactions-table">
                            <div className="header-txn-table">
                                <img src={paymentIcon} className='header-icons-set' />
                                <h2>SETTLEMENTS</h2>
                            </div>
                            <br /> <br />
                            <div>


                                {this.getSettlementRow()}

                                <div className="add-button-settlements" onClick={this.pushSettlementRow}>
                                    <Icon size='huge' name='plus circle' />
                                </div>


                                <div className="button-ge-container">
                                    <button disabled={this.state.buyerSellerCode != '' ? false : true} onClick={this.doSettlement} className="button-ge">SETTLE INVOICES</button>
                                </div>

                                <div>
                                    {/* <div className="button-ge-container"> 
                <button disabled={false} className="button-ge">SETTLE</button>
                </div> */}
                                    <ReactTable
                                        data={this.state.settlementData} defaultPageSize={5}
                                        columns={settlementColumns}
                                        getTdProps={(state, rowInfo, column, instance) => {
                                            return {
                                                onClick: (e, handleOriginal) => {
                                                    this.showModal(rowInfo)
                                                }
                                            }
                                        }
                                        }

                                    />
                                    {this.state.modalData.length != 0 ?
                                        <Modal open={this.state.isModalLoaded} closeIcon={true} onClose={() => this.closeModal()}>
                                            <Modal.Header>SETTLEMENT INVOICE {this.state.modalData[0].settlement_id}</Modal.Header>
                                            <Modal.Content>
                                                {/* <Grid columns={2}>
                                <h2>Payment Details</h2>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <div className="modalRowContent">Payment Account No: {this.state.modalData[0].payments.payment_accountno}</div>
                                            <div className="modalRowContent">Amount: {this.state.modalData[0].payments.payment_amount}</div>
                                            <div className="modalRowContent">Bank: {this.state.modalData[0].payments.payment_bank}</div>
                                            <div className="modalRowContent">Address: {this.state.modalData[0].payments.payment_bankaddress}</div>
                                            <div className="modalRowContent">Payment Email: {this.state.modalData[0].payments.payment_email}</div>
                                            <div className="modalRowContent">Bank Code: {this.state.modalData[0].payments.payment_bankcode}</div>
                                            <div className="modalRowContent">Payment Org: {this.state.modalData[0].payments.payment_org}</div>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <div className="modalRowContent">Beneficiary: {this.state.modalData[0].payments.payment_beneficiary}</div>
                                            <div className="modalRowContent">From BUC: {this.state.modalData[0].payments.payment_from_buc}</div>
                                            <div className="modalRowContent">Payment Si: {this.state.modalData[0].payments.payment_si}</div>
                                            <div className="modalRowContent">Payment Swift Code: {this.state.modalData[0].payments.payment_swiftcode}</div>
                                            <div className="modalRowContent">Payment To Buc: {this.state.modalData[0].payments.payment_to_buc}</div>
                                            <div className="modalRowContent">Payment To: {this.state.modalData[0].payments.payment_to}</div>
                                        </Grid.Column>
                                    </Grid.Row>
                                    

                                </Grid> */}
                                                <Grid columns={2}>
                                                    <h2>Settlement Info</h2>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <div className="modalRowContent">Settlement Date: {this.state.modalData[0].settlement_date}</div>
                                                            <div className="modalRowContent">Settlement ID: {this.state.modalData[0].settlement_id}</div>
                                                            <div className="modalRowContent">Invoice Amount: {this.state.modalData[0].settlement_invoice_amount}</div>
                                                            <div className="modalRowContent">Currency Code: {this.state.modalData[0].settlement_invoice_currency}</div>
                                                            <div className="modalRowContent">Type of Transaction: {this.state.modalData[0].docType}</div>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <div className="modalRowContent">Coco: {this.state.modalData[0].companycode}</div>
                                                            <div className="modalRowContent">TO Coco: {this.state.modalData[0].settlement_tobuc}</div>
                                                            <div className="modalRowContent">Settlement Amount: {this.state.modalData[0].settlement_invoice_amount}</div>
                                                            <div className="modalRowContent">Settlement Amount ADN: {this.state.modalData[0].settlement_invoice_amount_adn}</div>
                                                            <div className="modalRowContent">To Buc Country: {this.state.modalData[0].settlement_tobuc_country}</div>
                                                        </Grid.Column>
                                                    </Grid.Row>


                                                </Grid>

                                                <div className="button-ge-container">
                                                    <button disabled={false} onClick={() => this.closeModal()} className="button-ge resolve">CLOSE</button>
                                                </div>

                                            </Modal.Content>
                                        </Modal>
                                        :
                                        <Modal><Modal.Header>No data available for this Purchase Order!!!</Modal.Header></Modal>
                                    }

                                </div>


                            </div>





                            {this.state.loaderActive == true ?
                                <Dimmer active>
                                    <Loader size='big'>Loading</Loader>
                                </Dimmer>
                                :
                                <div></div>
                            }
                        </div> : <div> </div>
                    }

                    {/*Show below Ledger Page when Ledger is Selected*/}
                    {this.state.activeItem === 'LEDGER' ?
                        <div className="transactions-table">

                            <div className="header-txn-table">
                                <img src={invoiceIcon} className='header-icons-set' />
                                <h2>LEDGER</h2>
                            </div>


                            <div>
                                <Search value={this.state.ledgerSearch}
                                    onSearchChange={e => this.setState({ ledgerSearch: e.target.value })} placeholder="Search here ..." className='search-gridData' />

                                <ReactTable
                                    data={ledgData} defaultPageSize={10}
                                    columns={ledgerColumns} loading={this.state.ledgerData.length == '0'}
                                    getTdProps={(state, rowInfo, column, instance) => {
                                        return {
                                            onClick: (e, handleOriginal) => {
                                                this.showModal(rowInfo)
                                            }
                                        }
                                    }
                                    }

                                    getTrProps={this.getTrPropsInvoice}

                                />

                            </div>


                        </div> : <div> </div>
                    }

                    {/*Show below Disputes Page when disputes is Selected*/}
                    {this.state.activeItem === 'DISPUTES' ?
                        <div className="transactions-table">
                            <div className="header-txn-table">
                                <img src={poIcon} className='header-icons-set' />
                                <h2>DISPUTES</h2>
                            </div>

                            <Tab menu={{ secondary: true, pointing: true }} panes={disputePanes} onTabChange={(event, data) => this.switchDisputeTab(event, data)} />
                            <br /> <br />
                            {/* <input type="file" /> */}
                            {this.state.disputeTabIndex == '0' ?
                                <div>
                                    <Search value={this.state.disputeSearch}
                                        onSearchChange={e => this.setState({ disputeSearch: e.target.value })} placeholder="Search Disputes here ..." className='search-gridData' />
                                    {this.state.loaderActive == true ?
                                        <Dimmer active>
                                            <Loader size='big'>Loading</Loader>
                                        </Dimmer>
                                        :
                                        <ReactTable
                                            data={dispdata} defaultPageSize={10}
                                            columns={disputeColumns} loading={this.state.disputeData.length == '0'}
                                            getTdProps={(state, rowInfo, column, instance) => {
                                                return {
                                                    onClick: (e, handleOriginal) => {
                                                        this.showModal(rowInfo)
                                                        console.log("modaldata DP", rowInfo)
                                                    }
                                                }
                                            }
                                            }
                                        />
                                    }
                                    {this.state.modalData.length != 0 ?
                                        <Modal open={this.state.isModalLoaded} closeIcon={true} onClose={() => this.closeModal()}>
                                            <Modal.Header>DISPUTED INVOICE</Modal.Header>
                                            <Modal.Content>
                                                <Grid columns={2}>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <div className="modalRowContent">Disputed Date:{this.state.modalData[0].Record.disputedate}</div>
                                                            <div className="modalRowContent">PO Number:{this.state.modalData[0].Record.po_number} </div>
                                                            <div className="modalRowContent">Company Code:{this.state.modalData[0].Record.from_buc_coco}</div>
                                                            <div className="modalRowContent">Currency Code: {this.state.modalData[0].Record.invoice_currency}</div>
                                                            <div className="modalRowContent">Buyer Email: def@ora.com</div>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <div className="modalRowContent">Invoice Number: {this.state.modalData[0].Record.invoice_number}</div>
                                                            <div className="modalRowContent">From Buc: {this.state.modalData[0].Record.from_buc}</div>
                                                            <div className="modalRowContent">LINE ITEM Number: {this.state.modalData[0].Record.line_item_number}</div>
                                                            <div className="modalRowContent">Invoice Status: {this.state.modalData[0].Record.invoice_status}</div>
                                                            <div className="modalRowContent">Unit Price: {this.state.modalData[0].Record.total_invoice_amount}</div>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <div className="modalRowContent">Comments:</div>
                                                            <div className="modalRowContent">Cannot find the required item from inventory!</div>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <div className="modalRowContent">Resolution:</div>
                                                            <textarea></textarea>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row>
                                                        {this.state.checkdispute != 'RESOLVED' ?
                                                            <div>
                                                                <Grid.Column>
                                                                    <div className="button-ge-container">
                                                                        <button disabled={false} onClick={() => this.resolve_on_Dispute()} className="button-ge resolve">RESOLVE</button>
                                                                    </div>
                                                                </Grid.Column>
                                                                <Grid.Column>
                                                                    <div className="button-ge-container">
                                                                        <button disabled={false} onClick={() => this.createInvoices_on_Dispute()} className="button-update">UPDATE</button>
                                                                    </div>
                                                                </Grid.Column>
                                                            </div>
                                                            :
                                                            <div className="button-ge-container">
                                                                Resolved</div>
                                                        }
                                                    </Grid.Row>
                                                </Grid>


                                            </Modal.Content>
                                        </Modal>
                                        :
                                        <div> </div>
                                    }
                                </div>

                                :
                                <div>


                                    <Search placeholder="Search Disputes here ..." className='search-gridData' />
                                    <ReactTable
                                        data={this.disputeData} defaultPageSize={10}
                                        columns={invoiceColumns}
                                        getTdProps={(state, rowInfo, column, instance) => {
                                            return {
                                                onClick: (e, handleOriginal) => {
                                                    this.showModal(rowInfo)
                                                }
                                            }
                                        }
                                        }
                                    />
                                    <Modal open={this.state.isModalLoaded} closeIcon={true} onClose={() => this.closeModal()}>
                                        <Modal.Header>DISPUTED INVOICE</Modal.Header>
                                        <Modal.Content>
                                            <Grid columns={2}>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <div className="modalRowContent">Invoice Received Date: {this.state.modalData[0].Key}</div>
                                                        <div className="modalRowContent">Invoice Number: {this.state.modalData[0].Record.dispute}</div>
                                                        <div className="modalRowContent">Company Code: {this.state.modalData[0].Record.dispute}</div>
                                                        <div className="modalRowContent">Currency Code: USD</div>
                                                        <div className="modalRowContent">Buyer Email: def@ora.com</div>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <div className="modalRowContent">From Buc: GE Corporate</div>
                                                        <div className="modalRowContent">LINE ITEM Number: line1</div>
                                                        <div className="modalRowContent">PO Status: InProgress</div>
                                                        <div className="modalRowContent">Unit Price: 800</div>
                                                        <div className="modalRowContent">Doc Type: Purchasequote</div>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <div className="modalRowContent">Comments:</div>
                                                        <div className="modalRowContent">Cannot find the required item from inventory!</div>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <div className="modalRowContent">Resolution:</div>
                                                        <textarea></textarea>
                                                    </Grid.Column>
                                                </Grid.Row>

                                            </Grid>

                                            <div className="button-ge-container">
                                                <button disabled={false} className="button-ge resolve">RESOLVE</button>
                                            </div>
                                        </Modal.Content>
                                    </Modal>

                                </div>
                            }




                        </div> : <div> </div>
                    }


                </Container>

                {/* <Link to='/signin'>Sign In</Link><br /><br />
                <Link to='/signup'>Sign Up</Link><br /><br /> */}

                {this.state.logOut ? <Redirect to="/" /> : null}
            </div>
        );
    }
}

export default Land;