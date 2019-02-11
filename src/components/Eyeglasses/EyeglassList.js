import React from 'react';
import {Link} from 'react-router-dom';
import './eyeglass.css'
import { getEyeglasses} from "../../actions";
import {connect} from "react-redux";
import _ from 'lodash';


const columns = [
    {title: "Holder name", width: 2, sortKeyValue: "holder_name"},
    {title: "Purchase price", width: 2, sortKeyValue: "purchase_price"},
    {title: "Price", width: 2, sortKeyValue: "price"},
    {title: "Vat", width: 2, sortKeyValue: "vat"},
    {title: "Availability", width: 2, sortKeyValue: "availability"},
    {title: "Color", width: 2, sortKeyValue: "color"},
    {title: "Size", width: 2, sortKeyValue: "size"},
    {title: "Salon", width: 2, sortKeyValue: "salon"}];

const Row = (...eyeglass) => {
    let rows = [];
    let omitted = ['createdAt', 'updatedAt', 'id'];
    for (let key in eyeglass[0]) {
        if (eyeglass[0].hasOwnProperty(key)) {
            if (!omitted.includes(key)) {
                rows.push(<td key={eyeglass[0][key]}>{eyeglass[0][key]}</td>)
            }
        }
    }
    return (<tr>{rows}</tr>);
};


class EyeglassList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eyeglasses: [],
            param: ''
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
        isDescending ? this.setState({
            eyeglasses: this.state.eyeglasses.sort((a, b) => (a[keyValue] > b[keyValue]) ? 1 : ((b[keyValue] > a[keyValue]) ? -1 : 0))
        }) : this.setState({
            eyeglasses: this.state.eyeglasses.sort((a, b) => (a[keyValue] < b[keyValue]) ? 1 : ((b[keyValue] < a[keyValue]) ? -1 : 0))
        })
    }

    debounceEvent(...args) {
        this.debouncedEvent = _.debounce(...args);
        return e => {
            e.persist();
            return this.debouncedEvent(e);
        }
    }

    renderHeader() {
        return (columns.map((column) => {
                return (
                    <th key={column.title} onClick={() => this.sortArray(column.sortKeyValue)}>
                        {column.title}
                    </th>
                )
            })
        )
    }

    renderRows() {
        return (this.state.eyeglasses.map((eyeglass) => {
                return (
                    <Row key={eyeglass.id}{...eyeglass}/>
                )
            })
        )
    }

    handleChange = (e) => {
        let eyeglasses;
        this.setState({param: e.target.value}, async () => {
            eyeglasses = await this.props.getEyeglasses(this.state.param);
            this.setState({
                eyeglasses
            })
        });
    };

    render() {
        return (
            <div className="eyeglass-container">
                <div className="eyeglass-list-container">
                    <span>Eyeglass</span>
                    <div className="eyeglass-list">
                        <div className="search-container">
                            <input placeholder="Search..." type="text" name="param"
                                   onChange={this.debounceEvent(this.handleChange, 700)}/>
                        </div>
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