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
            null
        );
    }
}


export default EyeglassList;