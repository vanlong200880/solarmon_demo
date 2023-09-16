import React from 'react';
import { RText, RTextArea } from '../../../../../components/Controls';
import Modal from 'react-bootstrap4-modal';
import Constants from '../../../../../utils/Constants';
import FormReactSelect from '../../../../../components/FormReactSelect';
import CMSDatePicker from '../../../../../components/CMSDatePicker/CMSDatePicker';
import Libs from '../../../../../utils/Libs';

export default function SingleLinePopup() {

    var { curItem, allLanguage, dataProjectGroup } = this.state;
    const { t } = this.props;

    return (
        <Modal visible={true} className="modal-add" dialogClassName="modal-lg modal-dialog-scrollable full-screen" >
            <div className="modal-header">
                <h5 className="modal-title">
                    Single line diagram
                </h5>
                <span className="close" onClick={this.props.onClickCloseSingleLine.bind(this, false)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">
                <img src="/demo.jpg" />

            </div>
            
        </Modal>

    )
}