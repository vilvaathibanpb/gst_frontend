import React from "react";
import ReactDOM from "react-dom";

export default class HomeDocReqd extends React.Component {
  render() {
    return (
        <section>
			<div className="container">
				<div className="row">
					<div className="col-sm-12" style={{color: '#3c3c54', marginBottom: '5%'}}>
						<div className="col-sm-2" />
						<div className="col-sm-8">
							<h1 style={{fontSize: 25, marginTop: '7%'}} align="center">Documents Required</h1>
							<p style={{fontSize: 14, marginTop: '5%'}}>
							</p><ul>
							<li><span> PAN card of the Company </span></li>
							<li><span> Proof of constitution like Partnership deed, LLP agreement, Memorandum of Association (MOA) /Articles of Association (AOA), Certificate of incorporation </span></li>
							<li><span> Details and proof of principal place of business </span></li>
							<li style={{marginLeft: '6%'}}><span> For Own premises - Latest Property Tax Receipt or Municipal Khata copy or copy of Electricity Bill </span></li>
							<li style={{marginLeft: '6%'}}><span> For Rented or Leased premises- A copy of the valid Rent / Lease Agreement with any document in support like electricity bill </span></li>
							<li><span> Details of your Bank account like name of the account holder, account number MICR code, IFSC code and bank branch details. ( or Copy of first page of passbook or Cancelled cheque of your bank account) </span></li>
							<li><span> Letter of authorization or Copy of board resolution approving the same in case of company. </span></li>
							<li><span> Authorized signatory list like List of partners with their identity and address proof in case of partnership firm or List of directors with their identity and address proof in case of company ( Photograph, Aadhar and PAN card of each individual/ partner/ director ) </span></li>
							</ul>
							<p />			
						</div>
						<div className="col-sm-2" />
					</div>
				</div>
			</div>
      	</section>

    );
  }
}
