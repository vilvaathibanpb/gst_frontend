import React from "react";
import ReactDOM from "react-dom";

export default class HomeContactUs extends React.Component {
  render() {
    return (
        <section style={{background: '#d5bd85'}} id="contact">
			<div className="container">
				<div className="row" style={{marginBottom: '3%'}}>
					<div className="col-sm-12" style={{color: '#3c3c54'}}>
						<div className="col-sm-2" />
						<div className="col-sm-8">
							<h1 style={{fontSize: 25, marginTop: '7%'}} align="center"><b>Contact Us</b></h1>
							<p style={{fontSize: 16, marginTop: '3%'}} align="center">
								WE'LL LOVE TO HEAR FROM YOU! <br />
								Give us a call, Send us an email or drop by to have a chat 
							</p>				
						</div>
						<div className="col-sm-2" />
					</div>
					<div className="col-sm-12" style={{color: '#3c3c54'}}>					
						<form>
							<div className="col-sm-6" style={{marginTop: '3%'}}>								
							<div className="form-group">
								<input type="text" className="form-control" id="name" placeholder="Your Name *" style={{borderRadius: 0}} />
							</div>
							<div className="form-group">
								<input type="text" className="form-control" id="name" placeholder="Email *" style={{borderRadius: 0}} />
							</div>
							<div className="form-group">
								<input type="text" className="form-control" id="name" placeholder="Phone Number *" style={{borderRadius: 0}} />
							</div>
							</div>
							<div className="col-sm-6" style={{marginTop: '3%'}}>
							<div className="form-group">
								<textarea className="form-control" rows={3} placeholder="Message *" id="comment" defaultValue={""} />
							</div>
							<div style={{width: '100%', marginBottom: '5%'}} align>
								<button type="submit" value="SEND" align="center" style={{width: '100%', background: '#3c3c54', color: '#fff', border: 'none', padding: 8, marginTop: '3%', marginBottom: '5%'}}>SEND</button>		  
							</div>
							</div>
						</form>
					</div>
					<div className="col-sm-12" style={{color: '#3c3c54'}}>
						<hr style={{border: '0.2px solid #3c3c54', opacity: '0.4'}} />
					</div>
					<div className="col-sm-12" style={{color: '#3c3c54'}}>
						<h1 style={{fontSize: 16, marginTop: '2%'}} align="center"><b>Mail us: support@dockettech.com</b></h1>
						<p style={{fontSize: 14, marginTop: '2%'}} align="center">
							Newbridge Business Center, Embassy Golf Links Business Park <br />
							Block "B", 1st Floor, Pebble Beach, Off Intermediate Ring Road, Domlur<br />
							Bangalore - 560071
						</p>	
						<h4 style={{fontSize: 14, marginTop: '2%'}} align="center"><b>080 - 4656 4656 </b></h4>	
					</div>
					<div className="col-sm-12" style={{color: '#3c3c54', marginBottom: '2%', marginTop: '2%'}} align="center">
						<i className="fa fa-facebook" style={{color: '#fff', background: '#3c3c54', height: 25, width: 25, paddingTop: 7, marginRight: 10, marginLeft: 10}} align="center" />						
						<i className="fa fa-twitter" style={{color: '#fff', background: '#3c3c54', height: 25, width: 25, paddingTop: 7, marginRight: 10}} align="center" />						
						<i className="fa fa-google-plus" style={{color: '#fff', background: '#3c3c54', height: 25, width: 25, paddingTop: 7, marginRight: 10}} align="center" />						
					</div>
				</div>
			</div>
      </section>
    );
  }
}
