import React from "react";

export default class DataIntro extends React.Component{
    render(){
        return(
            <div className="col-sm-6 logo-pc" style={{background: '#d5bd85', height: '100vh', padding: 0}}>
                <img src="assets/img/hands.png" style={{height: 315, width: 702, marginLeft: '-5vw'}} className="img-responsive" />
                <div className="col-sm-2" />
                <div className="col-sm-8" style={{marginLeft: '-5vw'}}>
                    <h1 style={{fontSize: 40, color: '#3c3c54'}} align><b>GST @ Rs.1399/-</b></h1>
                    <h3 style={{fontSize: 18, marginBottom: 0, color: '#3c3c54'}} align>Worried about the changes GST will make?</h3>
                    <h3 style={{fontSize: 18, marginTop: 5, color: '#3c3c54'}} align>Get expert assisstance for GST registration</h3>
                </div>
                <div className="col-sm-2" />
            </div>
        );
    }
} 