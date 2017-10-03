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

const userItem = JSON.parse(localStorage.getItem('user'));
var userItemResult = userItem['result'];
let address = [{},
{}, {}, {}, {}];

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        const _this = this;
        this.state = {
            personal: {
                name: userItemResult['name'],
                mobile: userItemResult['mobile'],
                email: userItemResult['email'],
                dob: '',
                aadhar: '',
            },
            business: {
                businessName: '',
                tradeName: '',
                businessAddress: '',
                address: '',
                locality: '',
                street: '',
                selectedState: 'Karnataka',
                pinCode: '',
                branchNo: ''
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
        this.selectedbranchNo = this.selectedbranchNo.bind(this);
        this.handleBranchAddressDetails = this.handleBranchAddressDetails.bind(this);
    }

    toDocuments(event) {
        event.preventDefault();
        this.setState({ submittedBusinessDetails: true })
        console.log("data" + this.state.branchAddresses);
        const { business, branchAddresses } = this.state;
        if (business.businessName && business.tradeName && business.businessAddress &&
            business.address && business.locality && business.street &&
            business.selectedState && business.pinCode && business.branchNo) {
            if (business.branchNo > 0) {
                for (var i = 0; i < business.branchNo; i++) {
                    let number = name.substring(name.length - 1)
                    if (address[i].hasOwnProperty("address1_" + number) && address[i].hasOwnProperty("address2_" + number) &&
                        address[i].hasOwnProperty("locality_" + number) && address[i].hasOwnProperty("city_" + number) && address[i].hasOwnProperty("pinCode_" + number)) {
                        this.setState({ checkBranchFields: true });
                    }
                }
                this.setState({ branchAddresses: address });
                localStorage.setItem("branchadressCount", branchAddresses);
            }
            else {
                localStorage.setItem("businessDetails", business);
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
            localStorage.setItem("personalDetails", personal);
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

    onDrop(files) {
        // console.log(localStorage.getItem("user"));
        const user = JSON.parse(localStorage.getItem("user")).result;
        console.log(files);
        const Base64 = { _keyStr: "HC6V61pIoCTf9YcFn77fTqc2s16GG8bvT8S4IUKQPayNEDcrUkwXet76EEfr9n+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/rn/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }
        const object_key = Base64.encode(files[0].name);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'key': 'docketgst', 'authcode': user.authcode },
            // body: JSON.stringify(user)
        };

        return fetch('http://gst.edocketapp.com/api/v0/upload/s3_url?user_id=' + user.id + '&object_key=' + object_key, requestOptions)
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

                    var postData = new FormData();
                    postData.append('awsaccesskeyid',user.data.fields.awsaccesskeyid);
                    postData.append('key',user.data.fields.key);
                    postData.append('policy',user.data.fields.policy);
                    postData.append('signature',user.data.fields.signature);
                    postData.append('secure',user.data.fields.secure);
                    postData.append('file',files[0]);
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'multipart/form-data' },
                    };

                    return fetch(user.data.scheme + '://' + user.data.url,postData, requestOptions).then(response => {
                        if (!response.ok) {
                            return Promise.reject(response.statusText);
                        }

                        return response.json();
                    })
                    .then(user => {
                        if (user) {

                            const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'multipart/form-data' },
                            };
                        }
                        return user;
                    });
                }

                return user;
            });
    }

    // handleFileChange(files) {
    //    store.dispatch(userActions.fileupload(file));
    // }
    render() {
        const { user, users } = this.props;
        const { personal, business, submittedPersonalDetails, submittedBusinessDetails, checkBranchFields } = this.state;
        let noOfBranches = [], i;
        for (i = 1; i <= business.branchNo; i++) {
            noOfBranches.push(i);
        }

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
                <div style={{ position: 'fixed', top: 0, left: '50%', zIndex: 99999, background: '#fff', height: '8vh', width: '50%', display: 'flex' }}>
                    <h2 style={{ textAlign: 'left!important', fontSize: 16, fontWeight: 600, marginLeft: 30, marginBottom: 20 }}>DATA COLLECTION</h2>
                    <Link to="/"><div onClick={this.handleClick} style={{ zIndex: '999999', fontSize: '24px', paddingTop: '6px', background: '#000', marginLeft: '22vw', width: 50, height: '8vh', color: '#fff' }}>X</div></Link>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12" style={{ padding: 0 }}>
                            <DataIntro />
                            <div className="col-sm-6" style={{ background: '#3c3c54', height: '100vh', padding: 0, marginTop: '13vh' }}>
                                <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                                    <TabList>
                                        <Tab><div className="col-sm-3" style={{ color: '#fff', padding: 0, marginLeft: 30, textAlign: 'left!important' }}>PERSONAL DETAILS</div></Tab>
                                        <Tab><div className="col-sm-3" style={{ color: '#fff', padding: 0, textAlign: 'center!important' }}>BUSINESS DETAILS</div></Tab>
                                        <Tab><div className="col-sm-3" style={{ color: '#fff', padding: 0, textAlign: 'right!important' }}>DOCUMENTS</div></Tab>
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
                                                    <input type="text" name="businessAddress" value={business.businessAddress} className="form-control data-form" id="business_address1" placeholder="Business Address *" onChange={this.handle2Change} />
                                                </div>
                                                {submittedBusinessDetails && !business.businessAddress &&
                                                    <h4 className="errorField">Required</h4>
                                                }
                                                <div className="form-group">
                                                    <input type="text" name="address" value={business.address} className="form-control data-form" id="business_address2" placeholder="Address *" onChange={this.handle2Change} />
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
                                                    <select name="selectedState" value={business.selectedState} style={{ width: '47%' }} className="form-control" id="sel1" onChange={this.handle2Change}>
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
                                                    <select name="branchNo" value={business.branchNo} style={{ width: '47%', marginLeft: '6%' }} className="form-control" id="sel2" onChange={this.handle2Change}>
                                                        <option value>0</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
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
                                                    <select style={{ width: '75%' }} className="form-control  data-form" id="sel1">
                                                        <option>Karnataka</option>
                                                        <option>Andra</option>
                                                        <option>Tamil Nadu</option>
                                                        <option>Gujarat</option>
                                                    </select>
                                                    {submittedBusinessDetails && !business.pinCode &&
                                                        <h4 className="errorField">Required</h4>
                                                    }
                                                    {/* <input type="text" style={{ width: '75%' }} name={business.businessName} value={business.businessName} className="form-control data-form" id="business_name" placeholder="Business Name *" onChange={this.handleChange} /> */}
                                                    <Dropzone style={{ border: 'none!important', width: '20%', marginLeft: '5%' }} onDrop={this.onDrop.bind(this)}>
                                                        <label htmlFor="photo" className="custom-file-upload" style={{ fontSize: '22px', width: '100%' }}><i className="fa fa-upload"></i></label>
                                                        {/* <input type="file" id="photo" /> */}
                                                    </Dropzone>
                                                </div>
                                                {submittedBusinessDetails && !business.businessName &&
                                                    <h4 className="errorField">Required</h4>
                                                }

                                                 <div className="form-group" style={{ display: 'flex' }}>
                                                    <select style={{ width: '75%' }} className="form-control  data-form" id="sel1">
                                                        <option>Karnataka</option>
                                                        <option>Andra</option>
                                                        <option>Tamil Nadu</option>
                                                        <option>Gujarat</option>
                                                    </select>
                                                    {submittedBusinessDetails && !business.pinCode &&
                                                        <h4 className="errorField">Required</h4>
                                                    }
                                                    {/* <input type="text" style={{ width: '75%' }} name={business.businessName} value={business.businessName} className="form-control data-form" id="business_name" placeholder="Business Name *" onChange={this.handleChange} /> */}
                                                    <Dropzone style={{ border: 'none!important', width: '20%', marginLeft: '5%' }} onDrop={this.onDrop.bind(this)}>
                                                        <label htmlFor="photo" className="custom-file-upload" style={{ fontSize: '22px', width: '100%' }}><i className="fa fa-upload"></i></label>
                                                        {/* <input type="file" id="photo" /> */}
                                                    </Dropzone>
                                                </div>
                                                {submittedBusinessDetails && !business.businessName &&
                                                    <h4 className="errorField">Required</h4>
                                                }




                                                <div className="form-group " style={{ display: 'flex' }}>

                                                </div>

                                                <button type="submit" onClick={this.toDocuments} style={{ background: '#d5bd85', marginTop: '5vh', borderRadius: 0, border: 'none', color: '#fff', width: '60%', marginBottom: '35%' }} className="btn btn-default pull-right">NEXT</button>
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