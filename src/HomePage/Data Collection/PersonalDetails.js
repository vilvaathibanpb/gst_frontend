import React from "react";

export default class PersonalDetails extends React.Component{
    render(){
        return(
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
                    <button type="submit" style={{background: '#d5bd85', marginTop: '5vh', borderRadius: 0, border: 'none', color: '#fff', width: '60%'}} className="btn btn-default pull-right">NEXT</button>
                </form>
            </div>
        );
    }
}

