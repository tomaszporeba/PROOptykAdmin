import React from 'react';
import {Link} from 'react-router-dom';
import './eyeglass.css'
import { getEyeglasses} from "../../actions";
import {connect} from "react-redux";
import _ from 'lodash';

const clickableItems = ['number', 'name', 'title', 'holderName', 'lastName'];

const associatedItems = {
    Client: "client/review",
    Invoices: "invoice/review",
};

class Row  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: true
        }
    }
    render() {
        let listItem = this.props.listItem;
        let height = this.state.isClicked ? "60px" : "150px";
        return (<tr style={{height: height}} onClick={() => {this.setState({isClicked: !this.state.isClicked})}}><Fields listItem={listItem}/></tr>);
    }

}


const Fields = ({listItem}) => {
    let fields = [];
    let omitted = ['createdAt', 'updatedAt', 'id'];
    for (let key in listItem) {
        if (listItem.hasOwnProperty(key)) {
            if (!omitted.includes(key)) {
                if (typeof listItem[key] === 'object') {
                    fields.push(LinkItem(key, listItem[key]))
                } else {
                    fields.push(<td key={listItem[key]}>{listItem[key]}</td>)
                }
            }
        }
    }
    return (fields);
};



const LinkItem = ( key, { ...items}) => {
    let concatenatedItems=``;
    let path = `${associatedItems[key]}/${items.id}`;
    for (let key in items) {
        if (items.hasOwnProperty(key)) {
            if (clickableItems.includes(key)) {
                concatenatedItems = concatenatedItems + `${items[key]} `;
            }
        }
    }
    return(<td><Link to={path}>{concatenatedItems}</Link></td>)
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
        let listItems = await this.props.requestType();
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
        return (this.props.columns.map((column) => {
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
                    <Row listItem={listItem}/>
                )
            })
        )
    }

    handleChange = (e) => {
        let listItems;
        this.setState({param: e.target.value}, async () => {
            listItems = await this.props.requestType(this.state.param);
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

List = connect(null, {getEyeglasses})(List);

export default List;