import React from "react";
import ReactDOM from "react-dom";

export default class HomeTaxTypes extends React.Component {
  render() {
    return (
        <section style={{background: '#3c3c54', padding: '3% 0'}}>
			<h1 style={{fontSize: 25, color: '#fff', marginBottom: '3%'}} align="center">Types of Taxes covered under GST</h1>
			<div className="container">
				<div className="row">
					<div className="col-sm-1" />
					<div className="col-sm-3" style={{margin: 20, background: '#fff'}}>
						<div style={{marginBottom: 50, padding: 10, minHeight: 500, height: 'auto'}}>
							<h4 style={{fontSize: 15, width: '60%', marginLeft: '20%'}} align="center">State Goods and Service Tax<br /> (SGST)</h4>
							<hr />
							<ul style={{paddingLeft: 0}}>
								<li style={{marginTop: 40, marginLeft: 10}}><span> Levied by the State </span></li>
								<li style={{marginTop: 40, marginLeft: 10}}><span> Intra-state sales </span></li>
								<li style={{marginTop: 40, marginLeft: 10}}><span> Supply of goods or services within the state </span></li>
							</ul>
						</div>
					</div>
					<div className="col-sm-3" style={{margin: 20, background: '#fff'}}>
						<div style={{marginBottom: 50, padding: 10, minHeight: 500, height: 'auto'}}>
							<h4 style={{fontSize: 15, width: '60%', marginLeft: '20%'}} align="center">Central Goods and Services Tax <br />(CGST)</h4>
							<hr />
							<ul style={{paddingLeft: 0}}>
								<li style={{marginTop: 40, marginLeft: 10}}><span> Levied by the Centre </span></li>
								<li style={{marginTop: 40, marginLeft: 10}}><span> Intra-state sales </span></li>
								<li style={{marginTop: 40, marginLeft: 10}}><span> Supply of goods or services within the state </span></li>
							</ul>
						</div>
					</div>
					<div className="col-sm-3" style={{margin: 20, background: '#fff'}}>
						<div style={{marginBottom: 50, padding: 10, minHeight: 500, height: 'auto'}}>
							<h4 style={{fontSize: 15, width: '60%', marginLeft: '20%'}} align="center">Integrated Goods and Services Tax <br /> (IGST)</h4>
							<hr />
							<ul style={{paddingLeft: 0}}>
								<li style={{marginTop: 20, marginLeft: 10}}><span> Levied by the Centre </span></li>
								<li style={{marginTop: 20, marginLeft: 10}}><span> Inter-state sales, Cross border sales </span></li>
								<li style={{marginTop: 20, marginLeft: 10}}><span> Supply of Goods, or of Services, or both in the course of interstate trade or commerce </span></li>
								<li style={{marginTop: 20, marginLeft: 10}}><span> Supply of Goods, or of services in the course of Import into the territory of India </span></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
      	</section>
    );
  }
}
