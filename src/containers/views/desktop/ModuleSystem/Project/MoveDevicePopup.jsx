import React from 'react';
import Modal from 'react-bootstrap4-modal';
import Constants from '../../../../../utils/Constants';
import Libs from '../../../../../utils/Libs';
import RowItemMoveDevice from './RowItemMoveDevice';

export default function MoveDevicePopup() {

    var { curItem, curItemProject, dataListProject, dataList } = this.state;
    const { t } = this.props;
    var RowItemMoveDevices = null;
    console.log("dataList: ", dataList);
    if (Libs.isArrayData(dataList)) {
        RowItemMoveDevices = dataList.map((item, index) => {
            return (
                <RowItemMoveDevice
                    key={'row_item_' + index}
                    index={index}
                    dataItem={item}
                    dataEmployees={Libs.isArrayData(curItem.dataEmployees) ? curItem.dataEmployees : []}
                    onItemClickDelete={this.onItemClickDelete}
                    handleInputChangeItem={this.handleInputChangeItem}
                    dataListProject={dataListProject}
                    handleDropdownChange={this.handleDropdownChange}
                />
            );
        })
    }

    return (
        <Modal visible={true} className="modal-project-config" dialogClassName="modal-xl modal-dialog-scrollable" >
            <div className="modal-header">
                <h5 className="modal-title">
                    {t('project.title')}: {curItemProject.name}
                </h5>
                <span className="close" onClick={this.props.onItemClickCloseMove.bind(this, false)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">


                <div className="box-info">
                    <h2>{t('project.move_device')}</h2>
                    <div className="box-info-content">
                        <div className="project-user-manage">
                            <div className="data-view">
                                <div className="main-header">
                                    <div className="header-row">
                                        <div className="header-col width10"><p>No.</p></div>
                                        <div className="header-col width30"><p>Device ID</p></div>
                                        <div className="header-col width30"><p>Device Name</p></div>
                                        <div className="header-col width30 text-end">
                                        </div>
                                    </div>
                                </div>
                                <div className="main-body">
                                    <div className="body">
                                        {RowItemMoveDevices ? RowItemMoveDevices : <div className="data-empty">{t('common.data_empty')}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-cancel" onClick={this.props.onItemClickCloseMove.bind(this, false)}>
                    {t('common.cancel')}
                </button>
                <button type="button" className="btn btn-save" onClick={this.onSave.bind(this)}>
                    {(curItem.screen_mode === Constants.SCREEN_MODE.EDIT) ? t('common.save') : t('common.save')}
                </button>
            </div>
        </Modal>

    )
}