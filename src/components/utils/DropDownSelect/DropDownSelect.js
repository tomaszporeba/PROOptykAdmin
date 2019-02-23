import React, {Component} from 'react';
import Modal from 'react-modal';
import './dropDownSelect.css'
import ClientNew from './../../Clients/ClientNew'



export class DropDownSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);

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

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }


    createClient = (event) => {
        if (event.target.value == 0) {
            this.handleOpenModal()
        }
    };
    render() {
        const {options, label, ...input} = this.props;
        if (options) {
            return (
                <div>
                    <label>{label}</label>
                    <select {...input} className="browser-default" onChange={this.createClient}>
                        <option value="" disabled selected hidden>None</option>
                        <optgroup label="Add">
                            <option value={0}>Add client</option>
                        </optgroup>
                        <optgroup label="Choose">
                            {options.map(this.renderSelectOptions)}
                        </optgroup>
                    </select>
                    <Modal
                        isOpen={this.state.showModal}
                        contentLabel="onRequestClose Example"
                        onRequestClose={this.handleCloseModal}
                        className="Modal"
                        overlayClassName="Overlay"
                    >
                       <ClientNew/>
                    </Modal>
                </div>
            )
        }
        return null
    }

}


export default DropDownSelect;