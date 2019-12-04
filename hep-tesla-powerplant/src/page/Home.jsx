import React, { Component } from 'react';
import {Service} from '../service/Service'

class Home extends Component {
    constructor(props) {
        super(props);
        this.service = new Service();
    }

    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12 p-md-6 p-lg-3">
                </div>
            </div>
        );
    }
}

export default Home;