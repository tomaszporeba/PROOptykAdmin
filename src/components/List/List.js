import React from 'react';
import {Link} from 'react-router-dom';
import './list.css'
import {connect} from "react-redux";
import _ from 'lodash';
import {getEyeglasses} from "../../actions";
import {getListOfItems, getSortedItems} from "../../creators/listCreator";

const clickableItems = ['number', 'name', 'title', 'holder_name', 'lastName'];

const associatedItems = {
    Client: "client/edit",
    Invoice: "invoice/edit",
    Eyeglass: "eyeglass/edit"
};

class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: true
        }
    }

    render() {
        let listItem = this.props.listItem;
        let listItemClass = this.state.isClicked ? "list-item-class-shrink" : "list-item-class-expand";
        let editPath = `${window.location.pathname}/edit/${listItem.id}`;
        let deletePath = `${window.location.pathname}/delete/${listItem.id}`;
        return (

            <tr className={listItemClass} onClick={() => {
                this.setState({isClicked: !this.state.isClicked});
            }}>
                <div className="fields-container">
                    <Fields listItem={listItem}/>
                </div>
                <div>
                    <Link style={{color:"white"}} to={editPath}>
                        <i className="small material-icons">edit</i>
                    </Link>
                    <Link style={{color:"white"}} to={deletePath}>
                        <i className="small material-icons">delete</i>
                    </Link>
                </div>
            </tr>);
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


const LinkItem = (key, {...items}) => {
    let concatenatedItems = ``;
    let path = `${associatedItems[key]}/${items.id}`;
    for (let key in items) {
        if (items.hasOwnProperty(key)) {
            if (clickableItems.includes(key)) {
                concatenatedItems = concatenatedItems + `${items[key]} `;
            }
        }
    }
    return (<td><Link to={path}>{concatenatedItems}</Link></td>)
};


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            param: ''
        }
    }

    componentDidMount() {
        let path = window.location.pathname;
        this.props.getListItems(path, this.state.param);

    }

    sortArray(keyValue) {
        this.props.getSortedItems(this.props.listItems, keyValue);
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
        return (this.props.listItems.map((listItem) => <Row listItem={listItem}/>))
    }

    handleChange = (e) => {
        this.setState({param: e.target.value}, async () => {
            this.props.getListItems(window.location.pathname, this.state.param)
        });
    };

    render() {
        return (
            <div className="list-items-container">
                <span>{window.location.pathname.replace('/', '').toUpperCase()}</span>
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
                        <Link to={`${window.location.pathname}/new`} className="btn-floating btn-medium black">
                            <i className="medium material-icons">add</i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listItems: state.list.listItems,
        isLoading: state.list.isLoading
    }
};


function mapDispatchToProps(dispatch) {
    return {
        getListItems: (path, sortType) => {
            dispatch(getListOfItems(path, sortType))
        },
        getSortedItems: (listItems, keyValue) => {
            dispatch(getSortedItems(listItems,keyValue))
        }
    }
}

List = connect(mapStateToProps, mapDispatchToProps)(List);

export default List;