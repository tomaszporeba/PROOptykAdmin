import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './eyeglass.css'
import {fetchUser, getEyeglasses} from "../../actions";
import {connect} from "react-redux";


const columns = [
    {title: "Holder name", width: 2},
    {title: "Purchase price", width: 2},
    {title: "Price", width: 2},
    {title: "Vat", width: 2},
    {title: "Availability", width: 2},
    {title: "Color", width: 2},
    {title: "Size", width: 2},
    {title: "Salon", width: 2}];

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

    renderHeader() {
        return (columns.map((column) => {
                return (
                    <th>
                        {column.title}
                    </th>
                )
            })
        )
    }

    renderRows() {
        return (this.state.eyeglasses.map((eyeglass) => {
                return (
                    <tr>
                        <td>{eyeglass.holder_name}</td>
                        <td>{eyeglass.purchase_price}</td>
                        <td>{eyeglass.price}</td>
                        <td>{eyeglass.vat}</td>
                        <td>{eyeglass.availability}</td>
                        <td>{eyeglass.color}</td>
                        <td>{eyeglass.size}</td>
                        <td>{eyeglass.salon}</td>
                    </tr>
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