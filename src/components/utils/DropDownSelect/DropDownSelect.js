import React, {Component} from 'react';
import {connect} from "react-redux";
import { showModal } from "../../../creators/modalCreator";
import {getSingleItem} from "../../../creators/formCreator";

export class DropDownSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValue: "None",
            value: this.props.defaultValue || ''
        };

    }
    renderSelectOptions = ({...item}) => {
        return (
            <option
                key={item.id}
                value={item.id}
            >
                {`${item.label}`}
            </option>
        );
    };


    componentWillReceiveProps(newProps) {
        if (this.props !== newProps) {
            this.setState({value: newProps.defaultValue});
        }
    }
    createClient = (event) => {
        if (event.detail === 0) {
            if (event.target.value == 0) {
                this.props.openModal(this.props.formType);
            }
        }
    };
    onChange = (event) => {
        this.setState({value: event.target.value})
    };
    render() {
        const {input, options, label, formType, meta : { error, touched }} = this.props;
        if (options) {
            return (
                <div style={{marginBottom: "2.25rem"}}>
                    <label>{label}</label>
                    <select {...input} className="browser-default" value={this.state.value} onChange={this.onChange} onClick={this.createClient}>
                        <option value="" disabled selected hidden>None</option>
                        <optgroup label="Add">
                            <option value={0}>{`Add ${formType}`}</option>
                        </optgroup>
                        <optgroup label="Choose">
                            {options.map(this.renderSelectOptions)}
                        </optgroup>
                    </select>
                    <div className="red-text">
                        { touched && error }
                    </div>
                </div>
            )
        }
        return null
    }

}

function mapDispatchToProps(dispatch) {
    return {
        openModal: (formType) => {
            dispatch(showModal(formType))
        }
    }
}

export default connect(null, mapDispatchToProps)(DropDownSelect);