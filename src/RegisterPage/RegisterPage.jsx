import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                email: '',
                mobile: '',
            },
            email_format:false,
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        const atpos = user.email.indexOf("@");
        const dotpos = user.email.lastIndexOf(".");
        if(atpos<1 || dotpos<atpos+2 || dotpos+2>=user.email.length){
            this.setState({email_format:true});
        }
        if (user.name && user.email && user.mobile) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            // <div className="col-md-6 col-md-offset-3">
            //     <h2>Register</h2>
            //     <form name="form" onSubmit={this.handleSubmit}>
            //         <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
            //             <label htmlFor="firstName">First Name</label>
            //             <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
            //             {submitted && !user.firstName &&
            //                 <div className="help-block">First Name is required</div>
            //             }
            //         </div>
            //         <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
            //             <label htmlFor="lastName">Last Name</label>
            //             <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
            //             {submitted && !user.lastName &&
            //                 <div className="help-block">Last Name is required</div>
            //             }
            //         </div>
            //         <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
            //             <label htmlFor="username">Username</label>
            //             <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
            //             {submitted && !user.username &&
            //                 <div className="help-block">Username is required</div>
            //             }
            //         </div>
            //         <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
            //             <label htmlFor="password">Password</label>
            //             <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
            //             {submitted && !user.password &&
            //                 <div className="help-block">Password is required</div>
            //             }
            //         </div>
            //         <div className="form-group">
            //             <button className="btn btn-primary">Register</button>
            //             {registering && 
            //                 <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            //             }
            //             <Link to="/login" className="btn btn-link">Cancel</Link>
            //         </div>
            //     </form>
            // </div>
            <div className="container" style={{position: 'fixed', top: 0, left: 0, zIndex: 110, background: 'rgba(0,0,0,0.6)', height: '100vh', width: '100vw'}}>
                    <div className="row" style={{background: '#fff', margin: '10vh 20vw', height: '80vh'}}>
            <div className="col-sm-12" style={{padding: 0}}>
                <div className="col-sm-6 logo-pc" style={{background: '#d5bd85', height: '80vh', padding: 0}}>
                    <img src="assets/img/GST.svg" className="img-responsive" />
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
                            <span style={{borderBottom: '1px solid #3c3c54', padding: '10px 20px', width: 100}}>Register</span>
                            <Link to="/login"><span style={{borderBottom: '1px solid #3c3c54', padding: '10px 20px', width: 100, opacity: '0.5'}}>Login</span></Link>
                        </div>
                        <form style={{marginTop: '10%'}}>
                            <div className="form-group">
                                <input type="text" className="form-control" name="name" onChange={this.handleChange} id="register_name" placeholder="Your Name *" style={{borderRadius: 0, marginBottom: 25}} />
                                {submitted && !user.name &&
                                      <div className="errorField">Name is required</div>
                                } 
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="email" onChange={this.handleChange} id="register_email" placeholder="Email Address *" style={{borderRadius: 0, marginBottom: 25}} />
                                {submitted && !user.email &&
                                      <div className="errorField">Email is Required</div>
                                } 
                                {
                                    submitted && this.state.email_format && user.email &&
                                    <div className="errorField">Valid email is Required</div>
                                }
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control" name="mobile" maxLength="10" onChange={this.handleChange} id="register_mobile" placeholder="Phone Number *" style={{borderRadius: 0, marginBottom: 25}} />
                                {submitted && (!user.mobile || user.mobile.length < 10) &&
                                      <div className="errorField">Valid number is required</div>
                                } 
                            </div>						
                            <div className="center" style={{marginTop: '10%'}}>
                                <button type="submit" onClick={this.handleSubmit} value="REGISTER NOW" align="center" style={{width: '100%', background: '#3c3c54', color: '#d5bd85', border: '1px solid #d5bd85', padding: 10, marginTop: '10%'}}>REGISTER NOW</button>		  
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };