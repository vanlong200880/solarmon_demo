import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { RButton } from '../../../../../../components/Controls';
export default function ChangeModePopup() {
    var { searchParam } = this.state;
    var { t } = this.props;
    return (
        <Modal visible={true} className="modal-delete-device" dialogClassName="">
            <div className="modal-header">
                <h5 className="modal-title">Change Mode </h5>
                <span className="close" onClick={this.props.onClickCloseChangeMode.bind(this, false)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">
                {searchParam.scheduled_mode == 1 ?
                    <p>{t('device.change_mode_auto')}</p>
                    :
                    <p>{t('device.change_mode_manual')}</p>
                }

            </div>

            <div className="modal-footer">
                <RButton
                    onClick={this.props.onClickCloseChangeMode.bind(this, false)}
                    className="btn btn-cancel"
                    text={" " + t('common.no')}
                    data-dismiss="modal" aria-hidden="true"
                    title={t('common.no')} />

                <RButton
                    onClick={this.onClickChangeModeAction.bind(this)}
                    className="btn btn-save"
                    text={t('common.yes')}
                    title={t('common.yes')} />
            </div>
        </Modal>
    )
}