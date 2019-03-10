import React, {Component} from 'react';
import Modal from 'react-modal';
import InvoiceNew from "../../Invoices/InvoiceNew";
import EyeglassNew from "../../Eyeglasses/EyeglassNew";
import ExaminationNew from "../../Examination/ExaminationNew";
import ClientNew from "../../Clients/ClientNew";
import './modal.css'
import {connect} from "react-redux";
import {closeModal} from "../../../creators/modalCreator";

class ModalHelper extends Component {

    render() {
        let formType;
        console.log(this.props.formType);
        switch (this.props.formType) {
            case 'eyeglass':
                formType = <EyeglassNew isModal={true}/>;
                break;
            case 'client':
                formType = <ClientNew isModal={true}/>;
                break;
            case 'invoice':
                formType = <InvoiceNew isModal={true}/>;
                break;
            case 'examination':
                formType = <ExaminationNew isModal={true}/>
        }
        return (
            <Modal
                isOpen={this.props.isOpen}
                contentLabel="onRequestClose"
                onRequestClose={this.props.closeModal}
                className="Modal modal-container"
                overlayClassName="Overlay"
            >
                {formType}
            </Modal>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        isOpen: state.modal.isModalOpen,
        formType: state.modal.formType
    }
};

function mapDispatchToProps(dispatch) {
    return {
        closeModal: () => {
            dispatch(closeModal())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalHelper);

