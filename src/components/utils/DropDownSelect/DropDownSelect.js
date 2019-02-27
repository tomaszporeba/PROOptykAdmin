import React, {Component} from 'react';

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
                this.props.handleOpenModal()
            }
        }
    };
    onChange = (event) => {
        this.setState({value: event.target.value})
    };
    render() {
        const {input, options, label, meta : { error, touched }} = this.props;
        if (options) {
            return (
                <div>
                    <label>{label}</label>
                    <select {...input} className="browser-default" value={this.state.value} onChange={this.onChange} onClick={this.createClient}>
                        <option value="" disabled selected hidden>None</option>
                        <optgroup label="Add">
                            <option value={0}>Add client</option>
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


export default DropDownSelect;