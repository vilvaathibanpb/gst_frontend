import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { App } from '../App';
import GST from '../assets/img/GST.svg';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.dispatch(userActions.logout());

        this.state = {
            user : {
                email: '',
                mobile:'',
                password: '',
                type:'login',
            },
                error_email:'',
                error_pwd:'',   
            submitted: false,
            otp_generated: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOTPChange = this.handleOTPChange.bind(this);
        this.handleOTPSubmit = this.handleOTPSubmit.bind(this);
    }


    handleChange(e) {
        const { name, value } = e.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                email: value, mobile: value
            }
        });
    }

    handleOTPChange(e) {
        const { name, value } = e.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                password: value
            }
        });
    }

     handleOTPSubmit(e) {
        e.preventDefault();

        this.setState({ otp_generated: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if(!user.email){
            this.setState({error_email:'Please enter your valid email'});
        }
        if (user.email && user.mobile) {
            dispatch(userActions.generate_otp(user.email , user.mobile , user.type));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if(!user.email){
            this.setState({error_email:'Please enter your valid email'});
        }
        if(!user.password){
            this.setState({error_pwd:'Please enter the otp'})
        }
        if (user.email && user.mobile && user.password) {
            dispatch(userActions.login(user.email , user.password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { otp_success } = this.props;
        const { username, password, submitted } = this.state;
        console.log("otp", otp_success);
        return (
            // <div className="col-md-6 col-md-offset-3">
            //     <h2>Login</h2>
            //     <form name="form" onSubmit={this.handleSubmit}>
            //         <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
            //             <label htmlFor="username">Username</label>
            //             <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
            //             {submitted && !username &&
            //                 <div className="help-block">Username is required</div>
            //             }
            //         </div>
            //         <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
            //             <label htmlFor="password">Password</label>
            //             <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
            //             {submitted && !password &&
            //                 <div className="help-block">Password is required</div>
            //             }
            //         </div>
            //         <div className="form-group">
            //             <button className="btn btn-primary">Login</button>
            //             {loggingIn &&
            //                 <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            //             }
            //             <Link to="/register" className="btn btn-link">Register</Link>
            //         </div>
            //     </form>
            // </div>
            <div>
                {/* <App /> */}
                <div className="container" style={{position: 'fixed', top: 0, left: 0, zIndex: 110, background: 'rgba(0,0,0,0.6)', height: '100vh', width: '100vw'}}>
                    <div className="row" style={{background: '#fff', margin: '10vh 20vw', height: '80vh'}}>
                        <div className="col-sm-12" style={{padding: 0}}>
                            <div className="col-sm-6 logo-pc" style={{background: '#d5bd85', height: '80vh', padding: 0}}>
                                <img src={GST} className="img-responsive" />
                                <h3 style={{width: '90%', fontSize: 16, marginTop: 0, textAlign: 'justify!important', marginLeft: '5%'}}>Get registered for GST today in the most simple, easy and fast way. The documents we need from you are:</h3>
                                <ul style={{fontSize: 16, marginLeft: '25%', width: '50%', listStyle: 'disc', marginTop: '5vh'}}>
                                    <li>Photograph</li>
                                    <li>Address Proof</li>
                                    <li>Bank Details</li>
                                </ul>
                            </div>        
                            <div className="col-sm-6" style={{position: 'relative'}}>
                                <Link to="/">
                                    <div style={{color: '#fff', background: '#3c3c54', boxShadow: '0 8px 10px -6px black', position: 'absolute', right: '-20px', top: '-20px', borderRadius: '50%', height: 50, width: 50, paddingTop: 12}}>
                                        <span style={{fontSize: 20}}>X</span>
                                    </div>
                                </Link>
                                <div style={{padding: '10%' , marginTop : '10%'}}> 
                                    <div style={{fontSize: 14, color: '#3c3c54'}}>
                                        <Link to="/register"><span style={{borderBottom: '1px solid #3c3c54', padding: '10px 20px', width: 100, opacity: '0.5'}}>Register</span></Link>
                                        <span style={{borderBottom: '1px solid #3c3c54', padding: '10px 20px', width: 100}}>Login</span>
                                    </div>
                                    <form style={{marginTop: '10%'}}>
                                        <div className="form-group">
                                            <input type="text"  className="form-control" onChange={this.handleChange} name="email" id="register_email" placeholder="Email Address / Mobile number *" style={{borderRadius: 0, marginBottom: 25}} />
                                            {!this.state.user.email && 
                                            <h4 className="errorField">{this.state.error_email}</h4>
                                            }
                                        </div> 
                                        {otp_success &&
                                        <div className="form-group">
                                            <input type="password" className="form-control" onChange={this.handleOTPChange} name="password" id="register_email" placeholder="Enter OTP *" style={{borderRadius: 0, marginBottom: 25}} />
                                            {!this.state.user.password &&
                                            <h4 className="errorField" >{this.state.error_pwd}</h4>
                                            }
                                        </div>  
                                        } 
                                        {!otp_success &&                              						
                                        <div className="center" style={{marginTop: '10%'}}>
                                            <button type="submit"  onClick={this.handleOTPSubmit} value="GENERATE OTP" align="center" style={{width: '100%', background: '#3c3c54', color: '#d5bd85', border: '1px solid #d5bd85', padding: 10, marginTop: '10%'}}>GENERATE OTP</button>		  
                                        </div>
                                        }
                                        {otp_success &&
                                        <div>
                                        <div type="submit" onClick={this.handleOTPSubmit} className="resend_otpButtonclass"><u>Resend OTP</u></div> 
                                         <div className="center" style={{marginTop: '10%'}}>
                                            <button type="submit"  onClick={this.handleSubmit} value="LOGIN NOW" align="center" style={{width: '100%', background: '#3c3c54', color: '#d5bd85', border: '1px solid #d5bd85', padding: 10, marginTop: '10%'}}>LOGIN NOW</button>		  
                                        </div>
                                        </div>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 