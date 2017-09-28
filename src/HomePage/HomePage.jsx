import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DataIntro from "./Data Collection/DataIntro";
import PersonalDetails from "./Data Collection/PersonalDetails";
import BusinessDetails from "./Data Collection/BusinessDetails";
// import DataNavMenu from "./Data Collection/DataNavMenu";

const userItem = JSON.parse(localStorage.getItem('user'));
var userItemResult = userItem['result'];
class HomePage extends React.Component {

    constructor(props) {
        super(props);
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
            branchAddresses:[],
            tabIndex: 0,
            emailFormat: false,
            submittedPersonalDetails: false,
            submittedBusinessDetails: false
        };
        this.toBusinessDetails = this.toBusinessDetails.bind(this);
        this.toDocuments = this.toDocuments.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.selectedState = this.selectedState.bind(this);
        this.selectedbranchNo = this.selectedbranchNo.bind(this);
        this.handleBranchAddressDetails = this.handleBranchAddressDetails.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    toDocuments(event) {
        event.preventDefault();
        this.setState({ submittedBusinessDetails: true })
        const { business } = this.state;
        if (business.businessName && business.tradeName && business.businessAddress &&
            business.address && business.locality && business.street &&
            business.selectedState && business.pinCode && business.branchNo) {
            if (business.branchNo > 0) {
                
            }
            else {
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
        console.log("personalDetails" + personal);
    }
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }
    handleChange(e) {
        const { name, value } = e.target;
        const { personal, business } = this.state;
        this.setState({
            personal: {
                ...personal,
                [name] : value
            },
            // business: {
            //     ...business,
            //     businessName: value,
            //     tradeName: value,
            //     businessAddress: value,
            //     address: value,
            //     locality: value,
            //     street: value,
            //     pinCode: value,
            //     branchNo: value
            // }
        });
    }
    selectedState(event) {
        const { business } = this.state;
        this.setState({
            business: {
                ...business,
                selectedState: event.target.value
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
    handleDateChange(e){
        const { personal } = this.state;
        this.setState({
            personal: {
                ...personal,
                dob: event.target.value
            }
        });

    }
    handleBranchAddressDetails(e){
       const{branchAddresses,business} = this.state;
       const{name , value} = e.target;
       for(i=1 ; i < business.branchNo ; i++){
        const addressName = 'address'+i;
            this.setState({addressName:{
                name : value
            }});
            branchAddresses[branchNo-1].push(this.state.addressName)
       }

       alert(this.state.addressName);
    }
    render() {
        console.log(userItemResult['name']);
        const { user, users } = this.props;
        const { personal, business , submittedPersonalDetails ,submittedBusinessDetails} = this.state;
        let noOfBranches = [], i;       
        for (i = 1; i <= business.branchNo; i++) {
            noOfBranches.push(i);
        }

        function BranchList(props) {
            const numbers = props.numbers;
            const listItems = numbers.map((number) =>
                <div className="form-group" key={number.toString()}>
                    <div style={{ display: 'flex' }}>
                        <input className="form-control data-form" name={"address1_" + number} type="text" placeholder="Address1" onChange={this.handleBranchAddressDetails}/>
                        <input className="form-control data-form" name={"address2_" + number} type="text" placeholder="Address2" onChange={this.handleBranchAddressDetails} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <input className="form-control data-form" name={"locality_" + number} type="text" placeholder="Locality" onChange={this.handleBranchAddressDetails} />
                        <input className="form-control data-form" name={"city_" + number} type="text" placeholder="City" onChange={this.handleBranchAddressDetails} />
                    </div>
                    <input className="form-control data-form" name={"pinCode_" + number} type="text" placeholder="Pin code" onChange={this.handleBranchAddressDetails} />
                </div>
            );
            return (
                
                <div>{listItems}</div>
            );
        }
        return (
            <section style={{ background: 'linear-gradient(90deg, #d5bd85 50%, #3c3c54 50%)', position: "fixed", width: "100%", height: "100%", top: 0, left: 0 }}>
                <div style={{ position: 'fixed', top: 0, left: '50%', zIndex: 99999, background: '#fff', height: '8vh', width: '50%', display: 'flex' }}>
                    <h2 style={{ textAlign: 'left!important', fontSize: 16, fontWeight: 600, marginLeft: 30, marginBottom: 20 }}>DATA COLLECTION</h2>
                    <Link to="/"><div onClick={this.handleClick} style={{ zIndex: '999999', fontSize: '24px', paddingTop: '6px', background: '#000', marginLeft: '22vw', width: 50, height: '8vh', color: '#fff' }}>X</div></Link>
                </div>
                <div className="container" style={{ overflowY: 'scroll!important' }}>
                    <div className="row">
                        <div className="col-sm-12" style={{ padding: 0 }}>
                            <DataIntro />
                            <div className="col-sm-6" style={{ background: '#3c3c54', height: '100vh', padding: 0, marginTop: '13vh' }}>
                                {/* <div className="col-sm-12" style={{color: 'rgba(255,255,255,0.4)', padding: 0}}>
                                    <div className="col-sm-3" style={{color: '#fff', padding: 0, marginLeft: 30, textAlign: 'left!important'}}>PERSONAL DETAILS</div>
                                    <div className="col-sm-4" style={{padding: 0, textAlign: 'center!important'}}>BUSINESS DETAILS</div>
                                    <div className="col-sm-3" style={{padding: 0, textAlign: 'right!important'}}>DOCUMENT</div>						
                                </div> */}
                                {/* <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                                    <Tab eventKey={1} title="Tab 1"><PersonalDetails /></Tab>
                                    <Tab eventKey={2} title="Tab 2"></Tab>
                                    <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
                                </Tabs> */}
                                <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                                    <TabList>
                                        <Tab><div className="col-sm-3" style={{ color: '#fff', padding: 0, marginLeft: 30, textAlign: 'left!important' }}>PERSONAL DETAILS</div></Tab>
                                        <Tab><div className="col-sm-3" style={{ color: '#fff', padding: 0, textAlign: 'center!important' }}>BUSINESS DETAILS</div></Tab>
                                        <Tab><div className="col-sm-3" style={{ color: '#fff', padding: 0, textAlign: 'right!important' }}>DOCUMENT</div></Tab>
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
                                                    <input type="date" name="dob" value={personal.dob} className="form-control data-form" id="personal_dob" placeholder="Date of birth*" onChange={this.handleDateChange} />
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
                                                    <input type="text" name={business.businessName} value={business.businessName} className="form-control data-form" id="business_name" placeholder="Business Name *" onChange={this.handleChange} />
                                                </div>
                                                {submittedBusinessDetails && !business.businessName &&
                                                    <h4 className="errorField">Required</h4>
                                                }
                                                <div className="form-group">
                                                    <input type="text" name={business.tradeName} value={business.tradeName} className="form-control data-form" id="trade_name" placeholder="Trade Name *" onChange={this.handleChange} />
                                                </div>
                                                {submittedBusinessDetails && !business.tradeName &&
                                                    <h4 className="errorField">Required</h4>
                                                }
                                                <div className="form-group">
                                                    <input type="text" name={business.businessAddress} value={business.businessAddress} className="form-control data-form" id="business_address1" placeholder="Business Address *" onChange={this.handleChange} />
                                                </div>
                                                {submittedBusinessDetails && !business.businessAddress &&
                                                    <h4 className="errorField">Required</h4>
                                                }
                                                <div className="form-group">
                                                    <input type="text" name={business.address} value={business.address} className="form-control data-form" id="business_address2" placeholder="Address *" onChange={this.handleChange} />
                                                </div>
                                                {submittedBusinessDetails && !business.address &&
                                                    <h4 className="errorField">Required</h4>
                                                }
                                                <div className="form-group" style={{ display: 'flex' }}>
                                                    <input type="text" name={business.locality} value={business.locality} style={{ width: '47%' }} className="form-control data-form" id="business_locality" placeholder="Locality *" onChange={this.handleChange} />
                                                    {submittedBusinessDetails && !business.locality &&
                                                        <h4 className="errorField">Required</h4>
                                                    }
                                                    <input type="text" name={business.street} value={business.street} style={{ width: '47%', marginLeft: '6%' }} className="form-control data-form" id="business_city" placeholder="City *" onChange={this.handleChange} />
                                                    {submittedBusinessDetails && !business.street &&
                                                        <h4 className="errorField">Required</h4>
                                                    }
                                                </div>

                                                <div className="form-group" style={{ display: 'flex' }}>
                                                    <select name={business.selectedState} value={business.selectedState} style={{ width: '47%' }} className="form-control" id="sel1" onChange={this.selectedState}>
                                                        <option>Karnataka</option>
                                                        <option>Andra</option>
                                                        <option>Tamil Nadu</option>
                                                        <option>Gujarat</option>
                                                    </select>
                                                    <input name={business.pinCode} value={business.pinCode} type="text" style={{ width: '47%', marginLeft: '6%' }} className="form-control data-form" id="personal_pincode" placeholder="Pincode *" onChange={this.handleChange} />
                                                    {submittedBusinessDetails && !business.pinCode &&
                                                        <h4 className="errorField">Required</h4>
                                                    }
                                                </div>
                                                <div className="form-group" style={{ display: 'flex' }}>
                                                    <label style={{ color: 'white', width: '47%' }} htmlFor="sel2">No of Branch office in {business.selectedState}</label>
                                                    <select name={business.branchNo} value={business.branchNo} style={{ width: '47%', marginLeft: '6%' }} className="form-control" id="sel2" onChange={this.selectedbranchNo}>
                                                        <option selected>0</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </select>
                                                </div>
                                                <BranchList numbers={noOfBranches} />
                                                <button type="submit" onClick={this.toDocuments} style={{ background: '#d5bd85', marginTop: '5vh', borderRadius: 0, border: 'none', color: '#fff', width: '60%', marginBottom: '35%' }} className="btn btn-default pull-right">NEXT</button>
                                            </form>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="col-sm-12" style={{ padding: 0 }}>
                                            <form style={{ width: '85%', marginTop: '5vh', marginLeft: 30 }}>
                                                <div className="form-group">
                                                    <input type="text" name={business.businessName} value={business.businessName} className="form-control data-form" id="business_name" placeholder="Business Name *" onChange={this.handleChange} />
                                                </div>
                                                {submittedBusinessDetails && !business.businessName &&
                                                    <h4 className="errorField">Required</h4>
                                                }
                                               

                                                <div className="form-group" style={{ display: 'flex' }}>
                                                    <select name={business.selectedState} value={business.selectedState} style={{ width: '47%' }} className="form-control" id="sel1" onChange={this.selectedState}>
                                                        <option>Karnataka</option>
                                                        <option>Andra</option>
                                                        <option>Tamil Nadu</option>
                                                        <option>Gujarat</option>
                                                    </select>
                                                    <input name={business.pinCode} value={business.pinCode} type="text" style={{ width: '47%', marginLeft: '6%' }} className="form-control data-form" id="personal_pincode" placeholder="Pincode *" onChange={this.handleChange} />
                                                    {submittedBusinessDetails && !business.pinCode &&
                                                        <h4 className="errorField">Required</h4>
                                                    }
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