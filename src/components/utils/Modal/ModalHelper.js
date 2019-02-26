import React, {Component} from 'react';
import Modal from 'react-modal';
import InvoiceNew from "../../Invoices/InvoiceNew";
import EyeglassNew from "../../Eyeglasses/EyeglassNew";
import ExaminationNew from "../../Examination/ExaminationNew";
import ClientNew from "../../Clients/ClientNew";


class ModalHelper extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: this.props.isOpen};

    }

    componentWillReceiveProps(newProps) {
        if (this.props !== newProps){
            this.setState({showModal: newProps.isOpen})
        }
    }

    render() {
        let formType;
        switch (this.props.formType) {
            case 'eyeglass':
                formType = <EyeglassNew handleModalSubmit={this.props.handleCloseModal} isModal={true}/>;
                break;
            case 'client':
                formType = <ClientNew handleModalSubmit={this.props.handleCloseModal} isModal={true}/>;
                break;
            case 'invoice':
                formType = <InvoiceNew handleModalSubmit={this.props.handleCloseModal} isModal={true}/>;
                break;
            case 'examination':
                formType = <ExaminationNew handleModalSubmit={this.props.handleCloseModal} isModal={true}/>
        }
        return(
            <Modal
                isOpen={this.state.showModal}
                contentLabel="onRequestClose Example"
                onRequestClose={this.props.handleCloseModal}
                className="Modal"
                overlayClassName="Overlay"
            >
                {formType}
            </Modal>
        )
    }

}

export default ModalHelper;

