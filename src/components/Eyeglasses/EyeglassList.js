import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../Dashboard/dashboard.css'
import {getEyeglasses} from "../../actions";

class EyeglassList extends React.Component {
    constructor(props) {
        super(props);
    }


    async componentDidMount() {
        let eyeglasses = await getEyeglasses("aa");
        console.log(eyeglasses);
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