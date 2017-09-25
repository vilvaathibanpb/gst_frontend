import React from "react";
import ReactDOM from "react-dom";

export default class Footer extends React.Component {
  render() {
    return (
        <section style={{background: '#fff'}}>
			<div className="col-sm-12" style={{color: '#3c3c54'}}>
				<p style={{fontSize: 12, marginTop: '1%' , textAlign: 'center'}}>
					Copyright © 2017. Docket Tech Solutions Private Limited
				</p>	
			</div>
      	</section>
    );
  }
}
