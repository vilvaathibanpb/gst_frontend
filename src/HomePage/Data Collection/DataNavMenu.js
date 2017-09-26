import React from "react";

export default class DataNavMenu extends React.Component{
    render(){
        return(
            <div className="col-sm-12" style={{color: 'rgba(255,255,255,0.4)', padding: 0}}>
                <div className="col-sm-3" style={{color: '#fff', padding: 0, marginLeft: 30, textAlign: 'left!important'}}>PERSONAL DETAILS</div>
                <div className="col-sm-4" style={{padding: 0, textAlign: 'center!important'}}>BUSINESS DETAILS</div>
                <div className="col-sm-3" style={{padding: 0, textAlign: 'right!important'}}>DOCUMENT</div>						
            </div>
        );
    }
}