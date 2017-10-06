import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone'
import { userActions } from '../_actions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DataIntro from "./Data Collection/DataIntro";
import PersonalDetails from "./Data Collection/PersonalDetails";
import BusinessDetails from "./Data Collection/BusinessDetails";
// import DataNavMenu from "./Data Collection/DataNavMenu";


let address = [{}, {}];
let validImageTypes = ['png', 'jpeg', 'jpg'];
let validDocTypes = ['doc', 'docx', 'pdf'];
let validTypes = ['pdf', 'png', 'jpeg', 'jpg'];
let validRentTypes = ['pdf', 'png', 'jpeg', 'jpg', 'doc', 'docx'];

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        const _this = this;
        const userItem = JSON.parse(localStorage.getItem('user'));
        let personalDetailsItem, businessDetailsItem;
        if(localStorage.getItem('personalDetails')){
            personalDetailsItem = JSON.parse(localStorage.getItem('personalDetails'));
            console.log(personalDetailsItem);
        }
        if(localStorage.getItem('businessDetails')){
            businessDetailsItem = JSON.parse(localStorage.getItem('businessDetails'));
        }
        var userItemResult = userItem['result'];
        this.state = {
            personal: {
                name: personalDetailsItem['name'] ? personalDetailsItem['name'] : userItemResult['name'],
                mobile: personalDetailsItem['mobile'] ? personalDetailsItem['mobile'] : userItemResult['mobile'],
                email: personalDetailsItem['email'] ? personalDetailsItem['email'] : userItemResult['email'],
                dob: personalDetailsItem['dob'] ? personalDetailsItem['dob'] : '',
                aadhar: personalDetailsItem['aadhar'] ? personalDetailsItem['aadhar'] : '',
            },
            business: {
                businessName: businessDetailsItem['businessName'] ? businessDetailsItem['businessName'] : '',
                tradeName: businessDetailsItem['tradeName'] ? businessDetailsItem['tradeName'] : '',
                businessAddress: businessDetailsItem['businessAddress'] ? businessDetailsItem['businessAddress'] : '',
                address: businessDetailsItem['address'] ? businessDetailsItem['address'] : '',
                locality: businessDetailsItem['locality'] ? businessDetailsItem['locality'] : '',
                street: businessDetailsItem['street'] ? businessDetailsItem['street'] : '',
                selectedState:businessDetailsItem['selectedState'] ? businessDetailsItem['selectedState'] : 'Karnataka',
                pinCode: businessDetailsItem['pinCode'] ? businessDetailsItem['pinCode'] : '',
                branchNo:  0
            },
            document: {
                photo_success: false,
                photo_error: false,
                photo_errormsg: "",
                photo_url: "",
                pan_i_success: false,
                pan_i_error: false,
                pan_i_errormsg: "",
                pan_i_url: "",
                pan_b_success: false,
                pan_b_error: false,
                pan_b_errormsg: "",
                pan_b_url: "",
                rent_success: false,
                rent_error: false,
                rent_errormsg: "",
                rent_url: "",
                rent_type: "rent_agreement",
                address_success: false,
                address_error: false,
                address_errormsg: "",
                address_url: "",
                address_type: "aadhar",
                bank_success: false,
                bank_error: false,
                bank_errormsg: "",
                bank_url: "",
                bank_type: "cancelled_cheque",
                optional_success: false,
                optional_error: false,
                optional_errormsg: "",
                optional_url: "",
                optional_type: "Optional",
                branch1_success: false,
                branch1_error: false,
                branch1_errormsg: "",
                branch1_url: "",
                branch1_type: "rent_agreement",
                branch2_success: false,
                branch2_error: false,
                branch2_errormsg: "",
                branch2_url: "",
                branch2_type: "rent_agreement",

            },
            branchAddresses: [],
            tabIndex: 0,
            checkBranchFields: false,
            emailFormat: false,
            submittedPersonalDetails: false,
            submittedBusinessDetails: false
        };
        this.toBusinessDetails = this.toBusinessDetails.bind(this);
        this.toDocuments = this.toDocuments.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handle2Change = this.handle2Change.bind(this);
        this.handleDocChange = this.handleDocChange.bind(this);
        this.selectedbranchNo = this.selectedbranchNo.bind(this);
        this.handleBranchAddressDetails = this.handleBranchAddressDetails.bind(this);
        this.onPhotoDrop = this.onPhotoDrop.bind(this);
        this.apiCall = this.apiCall.bind(this);
    }

    toDocuments(event) {
        event.preventDefault();
        this.setState({ submittedBusinessDetails: true });
        console.log("data" + this.state.branchAddresses);
        const { business, branchAddresses } = this.state;
        const { name, value } = event.target;
        if (business.businessName && business.tradeName && business.businessAddress &&
            business.address && business.locality && business.street && business.pinCode) {
            console.log(business.branchNo);
            if (business.branchNo > 0) {
                console.log("1");
                for (var i = 0; i < business.branchNo; i++) {
                    console.log("2", address);

                    let number = i+1;
                    console.log(number);
                    if (address[i].hasOwnProperty("address1_" + number) && address[i].hasOwnProperty("address2_" + number) &&
                        address[i].hasOwnProperty("locality_" + number) && address[i].hasOwnProperty("city_" + number) && address[i].hasOwnProperty("pinCode_" + number)) {
                        this.setState({ checkBranchFields: true });
                        // this.setState({ branchAddresses: ["chaithra"] });
                        this.state.branchAddresses = address;
                        this.setState({ tabIndex: 2 });
                        console.log(this.state , "vilva", address);
                        localStorage.setItem("branchadressCount",JSON.stringify(this.state.branchAddresses));
                        localStorage.setItem("businessDetails", JSON.stringify(business));
                    }
                }
               
            }
            else {
                localStorage.setItem("businessDetails", JSON.stringify(business));
                console.log("saving");
                this.setState({ tabIndex: 2 });
            }
        }

    }

    toBusinessDetails(event) {
        event.preventDefault();
        this.setState({ submittedPersonalDetails: true });
        const { personal } = this.state;
        const atpos = personal.email.indexOf("@");
        const dotpos = personal.email.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= personal.email.length) {
            this.setState({ emailFormat: true });
        }
        if (personal.name && personal.mobile && personal.email && personal.dob && personal.aadhar) {
            localStorage.setItem("personalDetails", JSON.stringify(personal));
            this.setState({ tabIndex: 1 });
        }
    }

    componentDidMount() {
        // this.props.dispatch(userActions.getAll());
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        const { personal } = this.state;
        this.setState({
            personal: {
                ...personal,
                [name]: value
            }
        });
    }
    handle2Change(event) {
        event.preventDefault();
        const { name, value } = event.target;
        const { business } = this.state;
        this.setState({
            business: {
                ...business,
                [name]: value
            }
        });

    }

    handleDocChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        const { document } = this.state;
        this.setState({
            document: {
                ...document,
                [name]: value
            }
        });

    }

    selectedbranchNo(event) {
        const { business } = this.state;
        var count = event.target.value;
        this.setState({
            business: {
                ...business,
                branchNo: event.target.value
            }
        });
    }

    handleBranchAddressDetails(e) {
        // let noOfBranchAddresses = [];
        const { branchAddresses, business } = this.state;
        const { name, value } = e.target;
        // let addressName = {};
        let number = name.substring(name.length - 1) - 1;
        address[number][name] = value;
        // branchAddresses[number] = add
        // console.log(address[number]["address1_" + number]);
        console.log(address);

    }

    onPhotoDrop(files) {

        let file_type = (files[0].name.split('.'));
        let file_ext = file_type[file_type.length - 1];
        const { document } = this.state;

        if (validImageTypes.indexOf(file_ext) != -1) {
            if (files[0].size > 5242880) {
                this.setState({
                    document: {
                        ...document,
                        photo_success: false,
                        photo_error: true,
                        photo_errormsg: "File size shouldn't exceed 5 MB"
                    }
                });
            } else {
                this.onDrop(files, "photo");
            }
        } else {
            // this.state.document.photo_error = true;
            // this.state.document.photo_errormsg = "Invalid File type";
            this.setState({
                document: {
                    ...document,
                    photo_success: false,
                    photo_error: true,
                    photo_errormsg: "Invalid File Type"
                }
            });
        }
        console.log(this.state);
    }

    onPANIDrop(files) {

        let file_type = (files[0].name.split('.'));
        let file_ext = file_type[file_type.length - 1];
        const { document } = this.state;

        if (validTypes.indexOf(file_ext) != -1) {
            if (files[0].size > 5242880) {
                this.setState({
                    document: {
                        ...document,
                        pan_i_success: false,
                        pan_i_error: true,
                        pan_i_errormsg: "File size shouldn't exceed 5 MB"
                    }
                });
            } else {
                this.onDrop(files, "pan_i");
            }
        } else {
            // this.state.document.photo_error = true;
            // this.state.document.photo_errormsg = "Invalid File type";
            this.setState({
                document: {
                    ...document,
                    pan_i_success: false,
                    pan_i_error: true,
                    pan_i_errormsg: "Invalid File Type"
                }
            });
        }
        console.log(this.state);
    }

    onPANBDrop(files) {

        let file_type = (files[0].name.split('.'));
        let file_ext = file_type[file_type.length - 1];
        const { document } = this.state;

        if (validTypes.indexOf(file_ext) != -1) {
            if (files[0].size > 5242880) {
                this.setState({
                    document: {
                        ...document,
                        pan_b_error: true,
                        pan_b_success: false,
                        pan_b_errormsg: "File size shouldn't exceed 5 MB"
                    }
                });
            } else {
                this.onDrop(files, "pan_b");
            }
        } else {
            // this.state.document.photo_error = true;
            // this.state.document.photo_errormsg = "Invalid File type";
            this.setState({
                document: {
                    ...document,
                    pan_b_success: false,
                    pan_b_error: true,
                    pan_b_errormsg: "Invalid File Type"
                }
            });
        }
        console.log(this.state);
    }

    onAddressDrop(files) {

        let file_type = (files[0].name.split('.'));
        let file_ext = file_type[file_type.length - 1];
        const { document } = this.state;

        if (validTypes.indexOf(file_ext) != -1) {
            if (files[0].size > 5242880) {
                this.setState({
                    document: {
                        ...document,
                        address_error: true,
                        address_success: false,
                        address_errormsg: "File size shouldn't exceed 5 MB"
                    }
                });
            } else {
                this.onDrop(files, "address");
            }
        } else {
            // this.state.document.photo_error = true;
            // this.state.document.photo_errormsg = "Invalid File type";
            this.setState({
                document: {
                    ...document,
                    address_success: false,
                    address_error: true,
                    address_errormsg: "Invalid File Type"
                }
            });
        }
        console.log(this.state);
    }

    onBankDrop(files) {

        let file_type = (files[0].name.split('.'));
        let file_ext = file_type[file_type.length - 1];
        const { document } = this.state;

        if (validTypes.indexOf(file_ext) != -1) {
            if (files[0].size > 5242880) {
                this.setState({
                    document: {
                        ...document,
                        bank_error: true,
                        bank_success: false,
                        bank_errormsg: "File size shouldn't exceed 5 MB"
                    }
                });
            } else {
                this.onDrop(files, "bank");
            }
        } else {
            // this.state.document.photo_error = true;
            // this.state.document.photo_errormsg = "Invalid File type";
            this.setState({
                document: {
                    ...document,
                    bank_success: false,
                    bank_error: true,
                    bank_errormsg: "Invalid File Type"
                }
            });
        }
        console.log(this.state);
    }

    onRentDrop(files) {

        let file_type = (files[0].name.split('.'));
        let file_ext = file_type[file_type.length - 1];
        const { document } = this.state;

        if (validRentTypes.indexOf(file_ext) != -1) {
            if (files[0].size > 5242880) {
                this.setState({
                    document: {
                        ...document,
                        rent_error: true,
                        rent_success: false,
                        rent_errormsg: "File size shouldn't exceed 5 MB"
                    }
                });
            } else {
                this.onDrop(files, "rent");
            }
        } else {
            // this.state.document.photo_error = true;
            // this.state.document.photo_errormsg = "Invalid File type";
            this.setState({
                document: {
                    ...document,
                    rent_success: false,
                    rent_error: true,
                    rent_errormsg: "Invalid File Type"
                }
            });
        }
        console.log(this.state);
    }

    onBranch1Drop(files) {

        let file_type = (files[0].name.split('.'));
        let file_ext = file_type[file_type.length - 1];
        const { document } = this.state;

        if (validRentTypes.indexOf(file_ext) != -1) {
            if (files[0].size > 5242880) {
                this.setState({
                    document: {
                        ...document,
                        branch1_error: true,
                        branch1_success: false,
                        branch1_errormsg: "File size shouldn't exceed 5 MB"
                    }
                });
            } else {
                this.onDrop(files, "branch1");
            }
        } else {
            // this.state.document.photo_error = true;
            // this.state.document.photo_errormsg = "Invalid File type";
            this.setState({
                document: {
                    ...document,
                    branch1_success: false,
                    branch1_error: true,
                    branch1_errormsg: "Invalid File Type"
                }
            });
        }
        console.log(this.state);
    }

    onBranch2Drop(files) {

        let file_type = (files[0].name.split('.'));
        let file_ext = file_type[file_type.length - 1];
        const { document } = this.state;

        if (validRentTypes.indexOf(file_ext) != -1) {
            if (files[0].size > 5242880) {
                this.setState({
                    document: {
                        ...document,
                        branch2_error: true,
                        branch2_success: false,
                        branch2_errormsg: "File size shouldn't exceed 5 MB"
                    }
                });
            } else {
                this.onDrop(files, "branch2");
            }
        } else {
            // this.state.document.photo_error = true;
            // this.state.document.photo_errormsg = "Invalid File type";
            this.setState({
                document: {
                    ...document,
                    branch2_success: false,
                    branch2_error: true,
                    branch2_errormsg: "Invalid File Type"
                }
            });
        }
        console.log(this.state);
    }

    onOptionalDrop(files) {

        let file_type = (files[0].name.split('.'));
        let file_ext = file_type[file_type.length - 1];
        const { document } = this.state;

        if (validRentTypes.indexOf(file_ext) != -1) {
            if (files[0].size > 5242880) {
                this.setState({
                    document: {
                        ...document,
                        optional_error: true,
                        optional_success: false,
                        optional_errormsg: "File size shouldn't exceed 5 MB"
                    }
                });
            } else {
                this.onDrop(files, "optional");
            }
        } else {
            // this.state.document.photo_error = true;
            // this.state.document.photo_errormsg = "Invalid File type";
            this.setState({
                document: {
                    ...document,
                    optional_success: false,
                    optional_error: true,
                    optional_errormsg: "Invalid File Type"
                }
            });
        }
        console.log(this.state);
    }


    onDrop(files, type) {
        const user = JSON.parse(localStorage.getItem("user")).result;
        const { document } = this.state;
        console.log(files);
        const Base64 = { _keyStr: "HC6V61pIoCTf9YcFn77fTqc2s16GG8bvT8S4IUKQPayNEDcrUkwXet76EEfr9n+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/rn/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }
        const object_key = Base64.encode(files[0].name);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'key': 'docketgst', 'authcode': user.authcode },
        };

        return fetch('http://gst.edocketapp.com/api/v0/upload/s3_url?user_id=' + user.id + '&object_key=' + object_key, requestOptions)
            .then(response => {
                if (!response.ok) {

                    this.setState({
                        document: {
                            ...document,
                            [type + "_error"]: true,
                            [type + "_success"]: false,
                            [type + "_errormsg"]: "Error in uploading. Please try after sometime"
                        }
                    });
                    return Promise.reject(response.statusText);
                }

                return response.json();
            })
            .then(user => {

                if (user) {

                    var postData = new FormData();
                    postData.append('awsaccesskeyid', user.data.fields.awsaccesskeyid);
                    postData.append('key', user.data.fields.key);
                    postData.append('policy', user.data.fields.policy);
                    postData.append('signature', user.data.fields.signature);
                    postData.append('secure', user.data.fields.secure);
                    postData.append('file', files[0]);
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'multipart/form-data' },
                    };

                    return fetch(user.data.scheme + '://' + user.data.url, postData, requestOptions).then(response => {
                        if (!response.ok) {
                            this.setState({
                                document: {
                                    ...document,
                                    [type + "_error"]: true,
                                    [type + "_success"]: false,
                                    [type + "_errormsg"]: "Error in uploading. Please try after sometime"
                                }
                            });
                            return Promise.reject(response.statusText);
                        }

                        this.setState({
                            document: {
                                ...document,
                                [type + "_success"]: true,
                                [type + "_error"]: false,
                                [type + "_url"]: user.data.scheme + '://' + user.data.url + '/' + object_key
                            }
                        });
                        console.log(this.state)
                        return response.json();
                    })
                }

                return user;
            });
    }

    apiCall(event){
        event.preventDefault();
        const { document , business , personal } = this.state;
        let addressArray = [];
        if(!document.photo_success){
            this.setState({
                    document: {
                        ...document,
                        photo_error: true,
                        photo_errormsg: "PhotoGraph is mandatory"
                    }
                });
                return;
        }
        else if(!document.pan_i_success){
            this.setState({
                    document: {
                        ...document,
                        pan_i_error: true,
                        pan_i_errormsg: "Pan Card (Individual) is mandatory"
                    }
                });
                return;
        }
        else if(!document.rent_success){
            this.setState({
                    document: {
                        ...document,
                        rent_error: true,
                        rent_errormsg: "This document is mandatory"
                    }
                });
                return;
        }
        else if(!document.address_success){
            this.setState({
                    document: {
                        ...document,
                        address_error: true,
                        address_errormsg: "Address proof is mandatory"
                    }
                });
                return;
        }
        else if(!document.bank_success){
            this.setState({
                    document: {
                        ...document,
                        bank_error: true,
                        bank_errormsg: "Bank Details are mandatory"
                    }
                });
                return;
        }

        const regAddress =  {
                            "address_type" : "Reg",
                            "address1" : business.businessAddress,
                            "address2" : business.address,
                            "locality" : business.locality,
                            "city" : business.street,
                            "state" : business.selectedState,
                            "pincode" : business.pinCode,
                            "document_name" : document.rent_type,
                            "document_url" : document.rent_url
        }

        if(business.branchNo == 1){

             addressArray = [
                                regAddress,	
                                {
                                    "address_type" : "Branch",
                                    "address1" : this.state.branchAddresses[0].address1_1,
                                    "address2" : this.state.branchAddresses[0].address2_1,
                                    "locality" : this.state.branchAddresses[0].locality_1,
                                    "city" : this.state.branchAddresses[0].city_1,
                                    "state" : business.selectedState,
                                    "pincode" : this.state.branchAddresses[0].pinCode_1,
                                    "document_name" : document.branch1_type,
                                    "document_url" : document.branch1_url
                                }	
                            ]

            if(!document.branch1_success){
                   this.setState({
                    document: {
                        ...document,
                        branch1_error: true,
                        branch1_errormsg: "Branch 1 Details are mandatory"
                    }
                });
                return; 
            }
        }

        if(business.branchNo == 0){
             addressArray = [ regAddress ];
        }
      

        if(business.branchNo == 2){

              addressArray = [
                                regAddress,	
                                {
                                    "address_type" : "Branch",
                                    "address1" : this.state.branchAddresses[0].address1_1,
                                    "address2" : this.state.branchAddresses[0].address2_1,
                                    "locality" : this.state.branchAddresses[0].locality_1,
                                    "city" : this.state.branchAddresses[0].city_1,
                                    "state" : business.selectedState,
                                    "pincode" : this.state.branchAddresses[0].pinCode_1,
                                    "document_name" : document.branch1_type,
                                    "document_url" : document.branch1_url
                                },	
                                {
                                    "address_type" : "Branch",
                                    "address1" : this.state.branchAddresses[0].address1_2,
                                    "address2" : this.state.branchAddresses[0].address2_2,
                                    "locality" : this.state.branchAddresses[0].locality_2,
                                    "city" : this.state.branchAddresses[0].city_2,
                                    "state" : business.selectedState,
                                    "pincode" : this.state.branchAddresses[0].pinCode_2,
                                    "document_name" : document.branch2_type,
                                    "document_url" : document.branch2_url
                                }	
                            ]

            if(!document.branch1_success){
                   this.setState({
                    document: {
                        ...document,
                        branch1_error: true,
                        branch1_errormsg: "Branch 1 Details are mandatory"
                    }
                });
                return; 
            }

            if(!document.branch2_success){
                   this.setState({
                    document: {
                        ...document,
                        branch2_error: true,
                        branch2_errormsg: "Branch 2 Details are mandatory"
                    }
                });
                return; 
            }
        }

       
                            
        let docArray = [          
            {
                "document_name" : "photograph",
                "document_url" : document.photo_url
            },
            {
                "document_name" : "pancard_individual",
                "document_url" : document.pan_i_url
            },
            {
                "document_name" : document.rent_type,
                "document_url" : document.rent_url
            },
            {
                "document_name" : document.address_type,
                "document_url" : document.address_url
            },
            {
                "document_name" : document.bank_type,
                "document_url" : document.bank_url
            }
        ]

        if(document.pan_b_success){
            docArray.push({
                "document_name" : "pancard_business",
                "document_url" : document.pan_b_url
            })
        }

        if(document.optional_success){
            docArray.push({
                "document_name" : document.optional_type,
                "document_url" : document.optional_url
            })
        }

        const user = JSON.parse(localStorage.getItem("user")).result;
        const collectedData = {
                        "user_id" : user.id,
                        "name" : personal.name,
                        "email" : personal.email,
                        "mobile" : personal.mobile,
                        "birthdate" : personal.dob,
                        "aadhar_no" : personal.aadhar,                        
                        "business_type" : "new",
                        "business_category" : "old",
                        "business_name" : business.businessName,
                        // "date_of_incorporation" : "02/02/1992",
                        "trade_name" : business.tradeName,
                        "address": addressArray,
                        "document" : docArray
                    }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'key': 'docketgst', 'authcode': user.authcode },
            body: JSON.stringify(collectedData)
        };
        console.log(collectedData);
        return fetch("http://gst.edocketapp.com/api/v0/business", requestOptions)
            .then(response => {
                if (!response.ok) { 
                    return Promise.reject(response.statusText);
                }

                return response.json();
            })
            .then(user => {
                // login successful if there's a jwt token in the response
                // if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    if (user) {
                   console.log(user);
                }

                return user;
            });

    }

    render() {
        const { document } = this.state;
        const { user, users } = this.props;
        const { personal, business, submittedPersonalDetails, submittedBusinessDetails, checkBranchFields } = this.state;
        let noOfBranches = [], i;
        let tabIndex = this.state.tabIndex;
        for (i = 1; i <= business.branchNo; i++) {
            noOfBranches.push(i);
        }

        //  
        // function redirect(t , _this){
        //     console.log(t);
        //     let tabIndex = _this.state.tabIndex;
        //     _this.setState({ tabIndex : t })

        //     if( t == 2){
        //         console.log("1");
        //         if(!localStorage.getItem("businessDetails")){
        //             _this.setState({ tabIndex : 1 })
        //         }
        //         if(!localStorage.getItem("personalDetails")){
        //             _this.setState({ tabIndex : 0 })
        //         }
        //     }

        //     if( t == 1){
        //         console.log("0");
        //         if(!localStorage.getItem("personalDetails")){
        //             _this.setState({ tabIndex : 0 })
        //         }
        //     }
        // }

        function BranchList(props) {
            const _this = props.this;
            const numbers = props.numbers;
            const listItems = numbers.map((number) =>
                <div className="form-group" key={number.toString()}>
                    <div className="textContainer">Branch Address {number}</div>
                    <div style={{ display: 'flex' }}>
                        <input style={{ width: '47%' }} className="form-control data-form" name={"address1_" + number} type="text" placeholder="Address1 *" onChange={_this.handleBranchAddressDetails} />
                        <input style={{ width: '47%', marginLeft: '6%' }} className="form-control data-form" name={"address2_" + number} type="text" placeholder="Address2 *" onChange={_this.handleBranchAddressDetails} />
                    </div>
                    <div style={{ display: 'flex', marginTop: '1%' }}>
                        <input style={{ width: '47%' }} className="form-control data-form" name={"locality_" + number} type="text" placeholder="Locality *" onChange={_this.handleBranchAddressDetails} />
                        <input style={{ width: '47%', marginLeft: '6%' }} className="form-control data-form" name={"pinCode_" + number} type="text" placeholder="Pin code *" onChange={_this.handleBranchAddressDetails} />
                    </div>
                    <input style={{ marginTop: '1%' }} className="form-control data-form" name={"city_" + number} type="text" placeholder="City *" onChange={_this.handleBranchAddressDetails} />

                </div>

            );
            return (
                <div>{listItems}</div>
            );
        }
        return (
            <section style={{ background: 'linear-gradient(90deg, #d5bd85 50%, #3c3c54 50%)', position: "fixed", width: "100%", height: "100%", top: 0, left: 0, overflowY: "scroll" }}>
                <div style={{ position: 'fixed', top: 0, left: '49%', zIndex: 99999, background: '#fff', height: '8vh', width: '50%', display: 'flex' }}>
                    <h2 style={{ textAlign: 'left!important', fontSize: 16, fontWeight: 600, marginLeft: 30, marginBottom: 20 }}>DATA COLLECTION</h2>
                    <Link to="/"><div onClick={this.handleClick} style={{ zIndex: '999999', fontSize: '24px', paddingTop: '6px', background: '#000', marginLeft: '22vw', width: 50, height: '8vh', color: '#fff' }}>X</div></Link>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12" style={{ padding: 0 }}>
                            <DataIntro />
                            <div className="col-sm-6" style={{ background: '#3c3c54', height: '100vh', padding: 0, marginTop: '8vh' }}>
                                <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                                    <TabList>
                                        <Tab><div className="col-sm-3" style={{ color: '#fff', padding: 0, marginLeft: 30, textAlign: 'left!important' }}>PERSONAL DETAILS</div></Tab>
                                        {localStorage.getItem("personalDetails") && <Tab><div className="col-sm-3" style={{ color: '#fff', padding: 0, textAlign: 'center!important' }}>BUSINESS DETAILS</div></Tab>}
                                        {localStorage.getItem("businessDetails") && localStorage.getItem("personalDetails") && <Tab><div className="col-sm-3" style={{ color: '#fff', padding: 0, textAlign: 'right!important' }}>DOCUMENTS</div></Tab>}
                                    </TabList>
                                    <TabPanel>
                                        <div className="col-sm-12" style={{ padding: 0 }}>
                                            <form style={{ width: '85%', marginTop: '5vh', marginLeft: 30 }}>
                                                <div className="form-group">
                                                    <input type="text" name="name" value={personal.name} className="form-control data-form" id="personal_name" placeholder="Name *" onChange={this.handleChange} />
                                                </div>
                                                {submittedPersonalDetails && !personal.name &&
                                                    <h4 className="errorField">Name is Required</h4>
                                                }
                                                <div className="form-group">
                                                    <input type="text" name="mobile" value={personal.mobile} maxLength="10" className="form-control data-form" id="personal_mobile" placeholder="Mobile *" onChange={this.handleChange} />
                                                </div>
                                                {submittedPersonalDetails && (!personal.mobile || personal.mobile.length < 10) &&
                                                    <h4 className="errorField">Valid Number is Required</h4>
                                                }
                                                <div className="form-group">
                                                    <input type="email" name="email" value={personal.email} className="form-control data-form" id="personal_email" placeholder="Email *" onChange={this.handleChange} />
                                                </div>
                                                {submittedPersonalDetails && !personal.email &&
                                                    <h4 className="errorField">email is Required</h4>
                                                }
                                                {
                                                    submittedPersonalDetails && this.state.emailFormat && personal.email &&
                                                    <div className="errorField">Valid email is Required</div>
                                                }
                                                <div className="form-group">
                                                    <input type="date" name="dob" value={personal.dob} className="form-control data-form" id="personal_dob" placeholder="Date of birth*" onChange={this.handleChange} />
                                                </div>
                                                {submittedPersonalDetails && !personal.dob &&
                                                    <h4 className="errorField">Please select your date of birth </h4>
                                                }
                                                <div className="form-group">
                                                    <input type="text" name="aadhar" value={personal.aadhar} maxLength="12" className="form-control data-form" id="personal_aadhar" placeholder="Aadhar number *" onChange={this.handleChange} />
                                                </div>
                                                {submittedPersonalDetails && (!personal.aadhar || personal.aadhar < 12) &&
                                                    <h4 className="errorField">Aadhar is Required</h4>
                                                }
                                                <button type="submit" onClick={this.toBusinessDetails} style={{ background: '#d5bd85', marginTop: '5vh', borderRadius: 0, border: 'none', color: '#fff', width: '60%' }} className="btn btn-default pull-right">NEXT</button>
                                            </form>
                                        </div>
                                    </TabPanel>
                                    <TabPanel >
                                        <div className="col-sm-12" style={{ padding: 0 }}>
                                            <form style={{ width: '85%', marginTop: '5vh', marginLeft: 30 }}>
                                                <div className="form-group">
                                                    <input type="text" name="businessName" value={business.businessName} className="form-control data-form" id="business_name" placeholder="Business Name *" onChange={this.handle2Change} />
                                                </div>
                                                {submittedBusinessDetails && !business.businessName &&
                                                    <h4 className="errorField">Required</h4>
                                                }
                                                <div className="form-group">
                                                    <input type="text" name="tradeName" value={business.tradeName} className="form-control data-form" id="trade_name" placeholder="Trade Name *" onChange={this.handle2Change} />
                                                </div>
                                                {submittedBusinessDetails && !business.tradeName &&
                                                    <h4 className="errorField">Required</h4>
                                                }
                                                <div className="form-group">
                                                    <input type="text" name="businessAddress" value={business.businessAddress} className="form-control data-form" id="business_address1" placeholder="Address Line 1 *" onChange={this.handle2Change} />
                                                </div>
                                                {submittedBusinessDetails && !business.businessAddress &&
                                                    <h4 className="errorField">Required</h4>
                                                }
                                                <div className="form-group">
                                                    <input type="text" name="address" value={business.address} className="form-control data-form" id="business_address2" placeholder="Address Line 2 *" onChange={this.handle2Change} />
                                                </div>
                                                {submittedBusinessDetails && !business.address &&
                                                    <h4 className="errorField">Required</h4>
                                                }
                                                <div className="form-group" style={{ display: 'flex' }}>
                                                    <input type="text" name="locality" value={business.locality} style={{ width: '47%' }} className="form-control data-form" id="business_locality" placeholder="Locality *" onChange={this.handle2Change} />
                                                    {submittedBusinessDetails && !business.locality &&
                                                        <h4 className="errorField">Required</h4>
                                                    }
                                                    <input type="text" name="street" value={business.street} style={{ width: '47%', marginLeft: '6%' }} className="form-control data-form" id="business_city" placeholder="City *" onChange={this.handle2Change} />
                                                    {submittedBusinessDetails && !business.street &&
                                                        <h4 className="errorField">Required</h4>
                                                    }
                                                </div>

                                                <div className="form-group" style={{ display: 'flex' }}>
                                                    <select name="selectedState" value={business.selectedState} style={{ width: '47%' }} className="form-control   data-form" id="sel1" onChange={this.handle2Change}>
                                                        <option>Karnataka</option>
                                                        <option>Andra</option>
                                                        <option>Tamil Nadu</option>
                                                        <option>Gujarat</option>
                                                    </select>
                                                    <input name="pinCode" value={business.pinCode} type="text" style={{ width: '47%', marginLeft: '6%' }} className="form-control data-form" id="personal_pincode" placeholder="Pincode *" onChange={this.handle2Change} />
                                                    {submittedBusinessDetails && !business.pinCode &&
                                                        <h4 className="errorField">Required</h4>
                                                    }
                                                </div>
                                                <div className="form-group" style={{ display: 'flex' }}>
                                                    <label style={{ color: 'white', width: '47%' }} htmlFor="sel2">No of Branch office in {business.selectedState}</label>
                                                    <select name="branchNo" value={business.branchNo} style={{ width: '47%', marginLeft: '6%' }} className="form-control   data-form" id="sel2" onChange={this.handle2Change}>
                                                        <option value>0</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        {/* <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option> */}
                                                    </select>
                                                </div>
                                                <BranchList numbers={noOfBranches} this={this} />
                                                {submittedBusinessDetails && !checkBranchFields &&
                                                    <h4 className="errorField">All FieldsRequired</h4>
                                                }
                                                <button type="submit" onClick={this.toDocuments} style={{ background: '#d5bd85', marginTop: '5vh', borderRadius: 0, border: 'none', color: '#fff', width: '60%', marginBottom: '35%' }} className="btn btn-default pull-right">NEXT</button>
                                            </form>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="col-sm-12" style={{ padding: 0 }}>
                                            <form style={{ width: '85%', marginTop: '5vh', marginLeft: 30 }}>

                                                <div className="form-group" style={{ display: 'flex' }}>
                                                    <label htmlFor="photo" className="custom-file-upload1" style={{ fontSize: '14px', width: '75%' }}>Photograph *</label>

                                                    <Dropzone style={{ border: 'none!important', width: '20%', marginLeft: '5%' }} onDrop={this.onPhotoDrop.bind(this)}>
                                                        <label htmlFor="photo" className="custom-file-upload" style={{ fontSize: '22px', width: '100%' }}><i className="fa fa-upload"></i></label>
                                                    </Dropzone>
                                                </div>
                                                {this.state.document.photo_error &&
                                                    <h4 className="errorField">{this.state.document.photo_errormsg}</h4>
                                                }
                                                {this.state.document.photo_success &&
                                                    <h4 className="successField" >Uploaded successfully</h4>
                                                }

                                                <div className="form-group" style={{ display: 'flex' }}>
                                                    <label htmlFor="photo" className="custom-file-upload1" style={{ fontSize: '14px', width: '75%' }}>PAN Individual *</label>

                                                    <Dropzone style={{ border: 'none!important', width: '20%', marginLeft: '5%' }} onDrop={this.onPANIDrop.bind(this)}>
                                                        <label htmlFor="photo" className="custom-file-upload" style={{ fontSize: '22px', width: '100%' }}><i className="fa fa-upload"></i></label>
                                                    </Dropzone>
                                                </div>
                                                {this.state.document.pan_i_error &&
                                                    <h4 className="errorField">{this.state.document.pan_i_errormsg}</h4>
                                                }
                                                {this.state.document.pan_i_success &&
                                                    <h4 className="successField" >Uploaded successfully</h4>
                                                }

                                                <div className="form-group" style={{ display: 'flex' }}>
                                                    <label htmlFor="photo" className="custom-file-upload1" style={{ fontSize: '14px', width: '75%' }}>PAN Business (Optional)</label>

                                                    <Dropzone style={{ border: 'none!important', width: '20%', marginLeft: '5%' }} onDrop={this.onPANBDrop.bind(this)}>
                                                        <label htmlFor="photo" className="custom-file-upload" style={{ fontSize: '22px', width: '100%' }}><i className="fa fa-upload"></i></label>
                                                    </Dropzone>
                                                </div>
                                                {this.state.document.pan_b_error &&
                                                    <h4 className="errorField">{this.state.document.pan_b_errormsg}</h4>
                                                }
                                                {this.state.document.pan_b_success &&
                                                    <h4 className="successField" >Uploaded successfully</h4>
                                                }

                                                <div className="form-group" style={{ display: 'flex' }}>
                                                    <select style={{ width: '75%' }} value={this.state.document.rent_type} name="rent_type" className="form-control  data-form" id="rent" onChange={this.handleDocChange}>
                                                        <option value="rent_agreement">Rent / Lease Agreement</option>
                                                        <option value="tax_receipt">Tax Receipt</option>
                                                        <option value="khata_copy">Municipal Khata Copy</option>
                                                    </select>
                                                    <Dropzone style={{ border: 'none!important', width: '20%', marginLeft: '5%' }} onDrop={this.onRentDrop.bind(this)}>
                                                        <label htmlFor="photo" className="custom-file-upload" style={{ fontSize: '22px', width: '100%' }}><i className="fa fa-upload"></i></label>
                                                    </Dropzone>
                                                </div>
                                                {this.state.document.rent_error &&
                                                    <h4 className="errorField">{this.state.document.rent_errormsg}</h4>
                                                }
                                                {this.state.document.rent_success &&
                                                    <h4 className="successField" >Uploaded successfully</h4>
                                                }

                                                <div className="form-group" style={{ display: 'flex' }}>
                                                    <select style={{ width: '75%' }} value={this.state.document.address_type} name="address_type" className="form-control  data-form" id="address" onChange={this.handleDocChange}>
                                                        <option value="aadhar">Aadhar Card</option>
                                                        <option value="voter_id">Voter ID</option>
                                                        <option value="ration_card">Ration Card</option>
                                                        <option value="passport">Passport</option>
                                                    </select>
                                                    <Dropzone style={{ border: 'none!important', width: '20%', marginLeft: '5%' }} onDrop={this.onAddressDrop.bind(this)}>
                                                        <label htmlFor="photo" className="custom-file-upload" style={{ fontSize: '22px', width: '100%' }}><i className="fa fa-upload"></i></label>
                                                    </Dropzone>
                                                </div>
                                                {this.state.document.address_error &&
                                                    <h4 className="errorField">{this.state.document.address_errormsg}</h4>
                                                }
                                                {this.state.document.address_success &&
                                                    <h4 className="successField" >Uploaded successfully</h4>
                                                }

                                                <div className="form-group" style={{ display: 'flex' }}>
                                                    <select style={{ width: '75%' }} value={this.state.document.bank_type} name="bank_type" className="form-control  data-form" id="bank" onChange={this.handleDocChange}>
                                                        <option value="cancelled_cheque">Cancelled Cheque</option>
                                                        <option value="bank_statement">Bank statement</option>
                                                        <option value="passbook">First page of passbook</option>
                                                    </select>
                                                    <Dropzone style={{ border: 'none!important', width: '20%', marginLeft: '5%' }} onDrop={this.onBankDrop.bind(this)}>
                                                        <label htmlFor="photo" className="custom-file-upload" style={{ fontSize: '22px', width: '100%' }}><i className="fa fa-upload"></i></label>
                                                    </Dropzone>
                                                </div>
                                                {this.state.document.bank_error &&
                                                    <h4 className="errorField">{this.state.document.bank_errormsg}</h4>
                                                }
                                                {this.state.document.bank_success &&
                                                    <h4 className="successField" >Uploaded successfully</h4>
                                                }

                                                <div className="form-group" style={{ display: 'flex' }}>
                                                    <input type="text" className="form-control  data-form" value={this.state.document.optional_type} name="optional_type" id="optional" placeholder="Optional Document" style={{ borderRadius: 0, width: '75%' }} onChange={this.handleDocChange} />
                                                    <Dropzone style={{ border: 'none!important', width: '20%', marginLeft: '5%' }} onDrop={this.onOptionalDrop.bind(this)}>
                                                        <label htmlFor="photo" className="custom-file-upload" style={{ fontSize: '22px', width: '100%' }}><i className="fa fa-upload"></i></label>
                                                    </Dropzone>
                                                </div>
                                                {this.state.document.optional_error &&
                                                    <h4 className="errorField">{this.state.document.optional_errormsg}</h4>
                                                }
                                                {this.state.document.optional_success &&
                                                    <h4 className="successField" >Uploaded successfully</h4>
                                                }

                                                {business.branchNo > 0 &&
                                                    <div>
                                                        <div className="textContainer">Branch 1</div>
                                                        <div className="form-group" style={{ display: 'flex' }}>
                                                            <select style={{ width: '75%' }} value={this.state.document.branch1_type} name="branch1_type" className="form-control  data-form" id="rent" onChange={this.handleDocChange}>
                                                                <option value="rent_agreement">Rent / Lease Agreement</option>
                                                                <option value="tax_receipt">Tax Receipt</option>
                                                                <option value="khata_copy">Municipal Khata Copy</option>
                                                            </select>
                                                            <Dropzone style={{ border: 'none!important', width: '20%', marginLeft: '5%' }} onDrop={this.onBranch1Drop.bind(this)}>
                                                                <label htmlFor="photo" className="custom-file-upload" style={{ fontSize: '22px', width: '100%' }}><i className="fa fa-upload"></i></label>
                                                            </Dropzone>
                                                        </div>
                                                        {this.state.document.branch1_error &&
                                                            <h4 className="errorField">{this.state.document.branch1_errormsg}</h4>
                                                        }
                                                        {this.state.document.branch1_success &&
                                                            <h4 className="successField" >Uploaded successfully</h4>
                                                        }

                                                        {business.branchNo > 1 &&
                                                            <div>
                                                                <div className="textContainer">Branch 2</div>
                                                                <div className="form-group" style={{ display: 'flex' }}>
                                                                    <select style={{ width: '75%' }} value={this.state.document.branch2_type} name="branch2_type" className="form-control  data-form" id="rent" onChange={this.handleDocChange}>
                                                                        <option value="rent_agreement">Rent / Lease Agreement</option>
                                                                        <option value="tax_receipt">Tax Receipt</option>
                                                                        <option value="khata_copy">Municipal Khata Copy</option>
                                                                    </select>
                                                                    <Dropzone style={{ border: 'none!important', width: '20%', marginLeft: '5%' }} onDrop={this.onBranch2Drop.bind(this)}>
                                                                        <label htmlFor="photo" className="custom-file-upload" style={{ fontSize: '22px', width: '100%' }}><i className="fa fa-upload"></i></label>
                                                                    </Dropzone>
                                                                </div>
                                                                {this.state.document.branch2_error &&
                                                                    <h4 className="errorField">{this.state.document.branch2_errormsg}</h4>
                                                                }
                                                                {this.state.document.branch2_success &&
                                                                    <h4 className="successField" >Uploaded successfully</h4>
                                                                }
                                                            </div>
                                                        }
                                                    </div>
                                                }


                                                <button type="submit" onClick={this.apiCall} style={{ background: '#d5bd85', marginTop: '5vh', borderRadius: 0, border: 'none', color: '#fff', width: '60%', marginBottom: '35%' }} className="btn btn-default pull-right">NEXT</button>
                                            </form>
                                        </div>
                                    </TabPanel>
                                </Tabs>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };