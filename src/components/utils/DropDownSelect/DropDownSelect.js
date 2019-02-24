import React, {Component} from 'react';




export class DropDownSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValue: "None"
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




    createClient = (event) => {
        if (event.detail === 0) {
            if (event.target.value == 0) {
                this.props.handleOpenModal()
            }
        }
    };
    onChange = (event) => {
        console.log(event.target.value)
    }
    render() {
        const {options, label, ...input} = this.props;
        if (options) {
            return (
                <div>
                    <label>{label}</label>
                    <select {...input} className="browser-default"  onChange={this.onChange} onClick={this.createClient}>
                        <option value="" disabled selected hidden>None</option>
                        <optgroup label="Add">
                            <option value={0}>Add client</option>
                        </optgroup>
                        <optgroup label="Choose">
                            {options.map(this.renderSelectOptions)}
                        </optgroup>
                    </select>

                </div>
            )
        }
        return null
    }

}


export default DropDownSelect;