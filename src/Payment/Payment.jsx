import React from 'react';
import { PrivateRoute } from '../_components';
import Hands from '../assets/img/hands.png';
import Logo from '../assets/img/logo.png';
import { withRouter } from 'react-router'
// import { Router, Route , Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';

// import { Link, Route } from 'react-router-dom';






class Payment extends React.Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
  handleClick(e){
      e.preventDefault();
      history.push("/home");
  }
    render() {

        const { match, location, history } = this.props
        console.log(this.props.location.search);
        
        return (
        // <Router history={history}>
            <section style={{ background: 'linear-gradient(90deg, #d5bd85 50%, #3c3c54 50%)', position: "fixed", width: "100%", height: "100%", top: 0, left: 0, overflowY: "scroll" }}>
                <div className="container">
                    <div className="col-sm-12 nav-bg" style={{ padding: '0%', margin: '0%' }}>
                        <div className="col-sm-6" style={{ backgroundColor: '#d5bd85', position: 'relative' }}>
                            <img src={Hands} style={{ height: 315, width: 702 }} className="img-responsive" />
                            <a href="https://www.dockettech.com/" className="logo-pc"><img src={Logo} style={{ position: 'absolute', top: '-9%', left: '5%', height: 133, padding: 11 }} /></a>
                            <div className="col-sm-2" />
                            <div className="col-sm-8">
                                <h1 style={{ fontSize: 40, color: '#3c3c54' }} ><b>GST @ Rs.1399/-</b></h1>
                                <h3 style={{ fontSize: 18, marginBottom: 0, color: '#3c3c54' }} >Worried about the changes GST will make?</h3>
                                <h3 style={{ fontSize: 18, marginTop: 5, color: '#3c3c54' }} >Get expert assisstance for GST registration</h3>
                                <h3 style={{ fontSize: 16 }} ><b>KNOW MORE</b></h3>
                            </div>
                            <div className="col-sm-2" />
                        </div>
                        <div className="col-sm-6" style={{ backgroundColor: '#3c3c54' }}>
                            <div className="col-sm-2" />
                            <div className="col-sm-6" style={{ marginTop: '20%' }}>
                                <h3 style={{ fontSize: 16, color: '#fff', marginBottom: 1 }}>Payment got failed please try after some time</h3>
                                <div className="col-sm-4" />
                            </div>
                            <div className="center">
                                <button type="submit" onClick={this.handleClick} value="PLEASE APPLY AGAIN" align="center" style={{ width: '100%', background: '#3c3c54', color: '#d5bd85', border: '1px solid #d5bd85', padding: 10, marginTop: '5%', marginBottom: '15%' }}>PLEASE APPLY AGAIN</button>
                                {/* <Route path="/:uid" component="Topic" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            // </Router>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    // console.log(state)
    const { otp_success } = state.otp_generation;
    return {
        loggingIn,
        otp_success
    };
}

const connectedPayment = withRouter(connect(mapStateToProps)(Payment));
export { connectedPayment as Payment }; 
