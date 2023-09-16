import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { RButton } from '../../../../../components/Controls';
export default function DeleteDevicePopup() {
    var { curItem } = this.state;
    var { t } = this.props;
    return (
        <Modal visible={true} className="modal-delete-product" dialogClassName="">
            <div className="modal-header">
                <h5 className="modal-title">{t('device.delete_device')}: {curItem.name} </h5>
                <span className="close" onClick={this.onClickCloseDeleteDevice.bind(this)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">
                <p>{t('common.message_delete')}</p>
            </div>

            <div className="modal-footer">
                <RButton
                    onClick={this.onClickCloseDeleteDevice.bind(this)}
                    className="btn btn-cancel"
                    text={" " + t('common.cancel')}
                    data-dismiss="modal" aria-hidden="true"
                    title={t('common.cancel')} />

                <RButton
                    onClick={this.onDeleteDeviceAction.bind(this)}
                    className="btn btn-save"
                    text={t('common.delete')}
                    title={t('common.delete')} />
            </div>
        </Modal>
    )
}