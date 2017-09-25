import React from "react";
import ReactDOM from "react-dom";

export default class HomeLandingArea extends React.Component {
  render() {
    return (
        <div className="col-sm-12 nav-bg" style={{padding: '0%', margin: '0%'}}>
			<div className="col-sm-6" style={{backgroundColor: '#d5bd85', position: 'relative'}}>
				<img src="assets/img/hands.png" style={{height: 315, width: 702}} className="img-responsive" />
				<a href="https://www.dockettech.com/" className="logo-pc"><img src="assets/img/logo.png" style={{position: 'absolute', top: '-9%', left: '5%', height: 133, padding: 11}} /></a>
				<div className="col-sm-2" />
				<div className="col-sm-8">
					<h1 style={{fontSize: 40, color: '#3c3c54'}} ><b>GST @ Rs.1399/-</b></h1>
					<h3 style={{fontSize: 18, marginBottom: 0, color: '#3c3c54'}} >Worried about the changes GST will make?</h3>
					<h3 style={{fontSize: 18, marginTop: 5, color: '#3c3c54'}} >Get expert assisstance for GST registration</h3>
					<h3 style={{fontSize: 16}} ><b>KNOW MORE</b></h3>
				</div>
				<div className="col-sm-2" />
			</div>
			<div className="col-sm-6" style={{backgroundColor: '#3c3c54'}}>
				<div className="col-sm-2" />
				<div className="col-sm-6" style={{marginTop: '20%'}}>
					<h3 style={{fontSize: 16, color: '#fff', marginBottom: 1}}>Now register under GST</h3>
					<h3 style={{fontSize: 20, color: '#fff', marginTop: 1, marginBottom: 30}}>HASSLE-FREE!</h3>			
					<form>
						<div className="form-group">
							<input type="text" className="form-control" id="name" placeholder="Your Name *" style={{borderRadius: 0, marginBottom: 25}} />
						</div>
						<div className="form-group">
							<input type="text" className="form-control" id="name" placeholder="Email Address *" style={{borderRadius: 0, marginBottom: 25}} />
						</div>
						<div className="form-group">
							<input type="text" className="form-control" id="name" placeholder="Phone Number *" style={{borderRadius: 0, marginBottom: 25}} />
						</div>
						<div className="center">
							<button type="submit" value="ORDER NOW" align="center" style={{width: '100%', background: '#d5bd85', color: '#fff', border: '1px solid #d5bd85', padding: 10, marginTop: '15%', marginBottom: '5%'}}>ORDER NOW</button>		  
						</div>
						<div className="center">
							<h4 style={{color: '#fff'}} align="center"> - OR - </h4>	
						</div>
						<div className="center">
							<button type="submit" value="REQUEST A CALL BACK" align="center" style={{width: '100%', background: '#3c3c54', color: '#d5bd85', border: '1px solid #d5bd85', padding: 10, marginTop: '5%', marginBottom: '15%'}}>REQUEST A CALL BACK</button>		  
						</div>
					</form>
				</div>
				<div className="col-sm-4" />		
			</div>
      </div>
    );
  }
}
