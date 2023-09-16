import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { RButton } from '../../../../../../components/Controls';
export default function OnOffPopup() {
    var { curItem } = this.state;
    console.log(curItem);
    var { t } = this.props;
    return (
        <Modal visible={true} className="modal-delete-device" dialogClassName="">
            <div className="modal-header">
                <h5 className="modal-title">{t('device.device')}: {curItem.name} </h5>
                <span className="close" onClick={this.props.onClickCloseOnOff.bind(this, false)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">
                {curItem.status_control == 1 ? 
                <p>{t('device.message_off')}</p>
                : 
                <p>{t('device.message_on')}</p>
                }
                
            </div>

            <div className="modal-footer">
                <RButton
                    onClick={this.props.onClickCloseOnOff.bind(this, false)}
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