import React from "react";
import ReactDOM from "react-dom";

export default class HomeGSTDesc extends React.Component {
  render() {
    return (
        <section>
			<div className="container">
				<div className="row">
					<div className="col-sm-12" style={{color: '#3c3c54', marginBottom: '5%'}}>
						<div className="col-sm-2" />
						<div className="col-sm-8">
							<h1 style={{fontSize: 25, marginTop: '7%'}} align="center" id="about">What is GST?</h1>
							<p style={{fontSize: 14, marginTop: '3%', textAlign: 'justify!important'}} align="justify">
								Goods &amp; Services Tax is a multi-stage, destination-based tax that will be levied on every value addition on goods and services. Businesses having a turnover of more than Rs 20 Lakhs have to get registered mandatorily under GST. A single tax to replace multiple
								indirect taxes levied both at the Centre and State level.
							</p>				
						</div>
						<div className="col-sm-2" />
						<div className="col-sm-3" />
						<div className="col-sm-6">
							<h1 style={{fontSize: 25, marginTop: '7%'}} align="center">What are the benifits of GST?</h1>
							<p style={{fontSize: 14, marginTop: '5%'}}></p>
							<ul>
								<li><span> Cascading effect of tax as set-off of prior-stage taxes was not available </span></li>
								<li><span> Burden on goods and services had to be reduced benefiting common man </span></li>
								<li><span> Make our products competitive in domestic and international markets </span></li>
								<li><span> Boost economic activity and create more jobs </span></li>
								<li><span> Of transit time through check posts (concept of e-way bill) </span></li>	
								<li><span> Of unproductive work like submission of C/D/F/H forms </span></li>
								<li><span> Restrictions on input credit </span></li>
								<li><span> To identify tax evaders </span></li>
							</ul>
							<p />			
						</div>
						<div className="col-sm-3" />
					</div>
				</div>
			</div>
      	</section>
    );
  }
}
