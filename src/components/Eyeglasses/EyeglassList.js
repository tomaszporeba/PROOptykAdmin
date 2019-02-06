import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './eyeglass.css'
import {getEyeglasses} from "../../actions";

class EyeglassList extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let eyeglasses = await getEyeglasses();
    }

    render() {
        return (
            <div className="eyeglass-container">
                <div className="eyeglass-list-container">
                    <span>Eyeglass</span>
                    <div className="eyeglass-list">
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