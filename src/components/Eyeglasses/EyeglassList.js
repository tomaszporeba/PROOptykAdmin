import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../Dashboard/dashboard.css'

class EyeglassList extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className="dashboard">
                    <div className="dashboard-container">
                        <div className="fixed-action-btn">
                            <Link to="eyeglass/new" className="btn-floating btn-medium black">
                                <i className="medium material-icons">add</i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EyeglassList;