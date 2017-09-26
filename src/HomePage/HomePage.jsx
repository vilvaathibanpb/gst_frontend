import React from 'react';
import { Link,Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DataIntro from "./Data Collection/DataIntro";
import PersonalDetails from "./Data Collection/PersonalDetails";
import BusinessDetails from "./Data Collection/BusinessDetails";
// import DataNavMenu from "./Data Collection/DataNavMenu";

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tabIndex: 0 };
        this.toBusinessDetails = this.toBusinessDetails.bind(this);
        this.toDocuments = this.toDocuments.bind(this);
    }

    toDocuments(){
        this.setState( {tabIndex : 2});
    }

    toBusinessDetails(){
        this.setState( {tabIndex : 1});
    }
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return (
            <section style={{background: 'linear-gradient(90deg, #d5bd85 50%, #3c3c54 50%)' , position: "fixed" , width: "100%", height: "100%", top: 0, left: 0}}>
                <div style={{position: 'fixed', top: 0, left: '50%', zIndex: 99999, background: '#fff', height: '8vh', width: '50%', display : 'flex'}}>
                    <h2 style={{textAlign: 'left!important', fontSize: 16, fontWeight: 600, marginLeft: 30, marginBottom: 20}}>DATA COLLECTION</h2>
                    <Link to="/"><div onClick={this.handleClick} style={{zIndex: '999999', fontSize : '24px', paddingTop : '6px', background: '#000', marginLeft : '22vw', width: 50, height: '8vh', color: '#fff'}}>X</div></Link>
                </div>     
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12" style={{padding: 0}}>
                            <DataIntro />
                            <div className="col-sm-6" style={{background: '#3c3c54', height: '100vh', padding: 0, marginTop: '13vh'}}>
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
                                        <Tab><div className="col-sm-3" style={{color: '#fff', padding: 0, marginLeft: 30, textAlign: 'left!important'}}>PERSONAL DETAILS</div></Tab>
                                        <Tab><div className="col-sm-3" style={{color: '#fff', padding: 0, textAlign: 'center!important'}}>BUSINESS DETAILS</div></Tab>
                                        <Tab><div className="col-sm-3" style={{color: '#fff', padding: 0, textAlign: 'right!important'}}>DOCUMENT</div></Tab>
                                     </TabList> 
                                    <TabPanel>
                                        <div className="col-sm-12" style={{padding: 0}}>
                                            <form style={{width: '85%', marginTop: '5vh', marginLeft: 30}}>
                                                <div className="form-group">
                                                    <input type="text" className="form-control data-form" id="personal_name" placeholder="Name *" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control data-form" id="personal_mobile" placeholder="Mobile *" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="email" className="form-control data-form" id="personal_email" placeholder="Email *" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control data-form" id="personal_add1" placeholder="Address 1 *" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control data-form" id="personal_add2" placeholder="Address 2 *" />
                                                </div>
                                                <div className="form-group" style={{display: 'flex'}}>
                                                    <input type="text" style={{width: '47%'}} className="form-control data-form" id="personal_state" placeholder="State *" />
                                                    <input type="text" style={{width: '47%', marginLeft: '6%'}} className="form-control data-form" id="personal_pincode" placeholder="Pincode *" />
                                                </div>
                                                <button type="submit" onClick={this.toBusinessDetails} style={{background: '#d5bd85', marginTop: '5vh', borderRadius: 0, border: 'none', color: '#fff', width: '60%'}} className="btn btn-default pull-right">NEXT</button>
                                            </form>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                                <button type="submit" onClick={this.toDocuments} style={{background: '#d5bd85', marginTop: '5vh', borderRadius: 0, border: 'none', color: '#fff', width: '60%'}} className="btn btn-default pull-right">NEXT</button>                                        
                                    </TabPanel>
                                    <TabPanel>Athiban</TabPanel>
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