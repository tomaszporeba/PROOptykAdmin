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

const Row = (...listItems) => {
    let rows = [];
    let omitted = ['createdAt', 'updatedAt', 'id'];
    for (let key in listItems[0]) {
        if (listItems[0].hasOwnProperty(key)) {
            if (!omitted.includes(key)) {
                rows.push(<td key={listItems[0][key]}>{listItems[0][key]}</td>)
            }
        }
    }
    return (<tr>{rows}</tr>);
};


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [],
            param: ''
        }
    }

    async componentDidMount() {
        let listItems = await this.props.getEyeglasses();
        this.setState({
            listItems
        })
    }

    sortArray(keyValue) {
        let isDescending;
        isDescending = this.state.listItems[0][keyValue] >= this.state.listItems.slice(-1).pop()[keyValue];
        isDescending ? this.setState({
            listItems: this.state.listItems.sort((a, b) => (a[keyValue] > b[keyValue]) ? 1 : ((b[keyValue] > a[keyValue]) ? -1 : 0))
        }) : this.setState({
            listItems: this.state.listItems.sort((a, b) => (a[keyValue] < b[keyValue]) ? 1 : ((b[keyValue] < a[keyValue]) ? -1 : 0))
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
        return (this.state.listItems.map((listItem) => {
                return (
                    <Row key={listItem.id}{...listItem}/>
                )
            })
        )
    }

    handleChange = (e) => {
        let listItems;
        this.setState({param: e.target.value}, async () => {
            listItems = await this.props.getEyeglasses(this.state.param);
            this.setState({
                listItems
            })
        });
    };

    render() {
        return (
            <div className="list-container">
                <div className="list-items-container">
                    <span>Eyeglass</span>
                    <div className="list-items">
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

List = connect(mapStateToProps, {getEyeglasses})(List);

export default List;