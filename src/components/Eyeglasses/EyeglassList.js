import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './eyeglass.css'
import {fetchUser, getEyeglasses} from "../../actions";
import {connect} from "react-redux";


const columns = [
    {title: "Holder name", width: 2, sortKeyValue: "holder_name"},
    {title: "Purchase price", width: 2, sortKeyValue: "purchase_price"},
    {title: "Price", width: 2, sortKeyValue: "price"},
    {title: "Vat", width: 2, sortKeyValue: "vat"},
    {title: "Availability", width: 2, sortKeyValue: "availability"},
    {title: "Color", width: 2, sortKeyValue: "color"},
    {title: "Size", width: 2, sortKeyValue: "size"},
    {title: "Salon", width: 2, sortKeyValue: "salon"}];

const Row =({holder_name, purchase_price, price, vat, availability, color, size, salon}) => (
    <tr>
        <td>{holder_name}</td>
        <td>{purchase_price}</td>
        <td>{price}</td>
        <td>{vat}</td>
        <td>{availability}</td>
        <td>{color}</td>
        <td>{size}</td>
        <td>{salon}</td>
    </tr>
);

class EyeglassList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eyeglasses: []
        }
    }

    async componentDidMount() {
        let eyeglasses = await this.props.getEyeglasses();
        this.setState({
            eyeglasses
        })
    }

    sortArray(keyValue) {
        let isDescending;
        isDescending = this.state.eyeglasses[0][keyValue] >= this.state.eyeglasses.slice(-1).pop()[keyValue];
        isDescending ?  this.setState({
            eyeglasses: this.state.eyeglasses.sort((a,b) => (a[keyValue] > b[keyValue]) ? 1 : ((b[keyValue] > a[keyValue]) ? -1 : 0))
        }) :         this.setState({
            eyeglasses: this.state.eyeglasses.sort((a,b) => (a[keyValue] < b[keyValue]) ? 1 : ((b[keyValue] < a[keyValue]) ? -1 : 0))
        })

    }
    renderHeader() {
        return (columns.map((column) => {
                return(
                    <th onClick={() => this.sortArray(column.sortKeyValue)}>
                        {column.title}
                    </th>
                )
            })
        )
    }

    renderRows() {
        return (this.state.eyeglasses.map((eyeglass) => {
                return (
                    <Row {...eyeglass}/>
                )
            })
        )
    }

    render() {
        return (
            <div className="eyeglass-container">
                <div className="eyeglass-list-container">
                    <span>Eyeglass</span>
                    <div className="eyeglass-list">
                        <table className="table-container">
                            <thead>
                            <tr>
                                {this.renderHeader()}
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderRows()}
                            </tbody>
                        </table>
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

function mapStateToProps(state) {
    return {};

}

EyeglassList = connect(mapStateToProps, {getEyeglasses})(EyeglassList);

export default EyeglassList;