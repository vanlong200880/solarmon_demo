import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { RButton } from '../../../../../../components/Controls';
export default function DeleteCalendarPopup() {
    var { curItem } = this.state;
    var { t } = this.props;
    return (
        <Modal visible={true} className="modal-delete-device" dialogClassName="">
            <div className="modal-header">
                <h5 className="modal-title">{t('device.delete_scheduled')} </h5>
                <span className="close" onClick={this.props.closeDeleteCalendar.bind(this)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">
                <p>{t('common.message_delete')}</p>
            </div>

            <div className="modal-footer">
                <RButton
                    onClick={this.props.closeDeleteCalendar.bind(this)}
                    className="btn btn-cancel"
                    text={" " + t('common.no')}
                    data-dismiss="modal" aria-hidden="true"
                    title={t('common.no')} />

                <RButton
                    onClick={this.onClickOnOffAction.bind(this)}
                    className="btn btn-save"
                    text={t('common.yes')}
                    title={t('common.yes')} />
            </div>
        </Modal>
    )
}