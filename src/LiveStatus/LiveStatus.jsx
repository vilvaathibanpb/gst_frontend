import React from 'react';
import { Link, Route } from 'react-router-dom';

export default class LiveStatus extends React.Component {

    constructor(props) {
        super(props);

    }




    render() {
        return (
            <section style={{ background: 'linear-gradient(90deg, #d5bd85 50%, #3c3c54 50%)', position: "fixed", width: "100%", height: "100%", top: 0, left: 0, overflowY: "scroll" }}>
                <div className="container">
                    <div>Error</div>
                </div>
            </section>
        );
    }
}
