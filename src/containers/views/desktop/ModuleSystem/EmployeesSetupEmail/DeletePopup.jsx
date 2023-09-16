import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { RButton } from '../../../../../components/Controls';
export default function DeletePopup() {
    var { curItem } = this.state;
    var { t } = this.props;
    return (
        <Modal visible={true} className="modal-delete-product" dialogClassName="">
            <div className="modal-header">
                <h5 className="modal-title">{t('common.delete')}: {curItem.id} </h5>
                <span className="close" onClick={this.onClickCloseDelete.bind(this, false)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">
                <p>{t('common.message_delete')}</p>
            </div>

            <div className="modal-footer">
                <RButton
                    onClick={this.onClickCloseDelete.bind(this, false)}
                    className="btn btn-cancel"
                    text={" " + t('common.cancel')}
                    data-dismiss="modal" aria-hidden="true"
                    title={t('common.cancel')} />

                <RButton
                    onClick={this.onDeleteAction.bind(this)}
                    className="btn btn-save"
                    text={t('common.delete')}
                    title={t('common.delete')} />
            </div>
        </Modal>
    )
}