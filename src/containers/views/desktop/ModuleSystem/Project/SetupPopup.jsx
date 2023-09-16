import React from 'react';
import { RText } from '../../../../../components/Controls';
import Modal from 'react-bootstrap4-modal';
import Constants from '../../../../../utils/Constants';
import FormReactSelect from '../../../../../components/FormReactSelect';
import Libs from '../../../../../utils/Libs';
import RowItemConfig from './RowItemConfig';

export default function SetupPopup() {

    var { curItem, curItemProject, dataYear, dataConfigRevenue } = this.state;
    const { t } = this.props;
    var RowItemConfigs = null;
    if (Libs.isArrayData(dataConfigRevenue)) {
        RowItemConfigs = dataConfigRevenue.map((item, index) => {
            return (
                <RowItemConfig
                    key={'row_item_' + index}
                    index={index}
                    dataItem={item}
                    dataEmployees={Libs.isArrayData(curItem.dataEmployees) ? curItem.dataEmployees : []}
                    onItemClickDelete={this.onItemClickDelete}
                    handleInputChangeItem={this.handleInputChangeItem}
                />
            );
        })
    }

    return (
        <Modal visible={true} className="modal-project-config" dialogClassName="modal-xl modal-dialog-scrollable" >
            <div className="modal-header">
                <h5 className="modal-title">
                    {t('project.setup_title')}: {curItemProject.name}
                </h5>
                <span className="close" onClick={this.props.onItemClickCloseSetup.bind(this, false)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">

                <div className="box-info">
                    <h2>{t('project.estimation_sensor')}
                        <button type="button" className="btn btn-save save-config" onClick={this.onSaveEstimationSenSor.bind(this)}>
                            {(curItem.screen_mode === Constants.SCREEN_MODE.EDIT) ? t('common.save') : t('common.save')}
                        </button>
                    </h2>
                    <div className="box-info-content">
                        <div className="row">
                            <div className="col-md-6">
                                <fieldset>
                                    <legend>Mái 1</legend>
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-6">
                                            <div className="mb-3">
                                                <RText label={t('project.config_yi')}
                                                    inputClass="form-control"
                                                    inputId="config_yi"
                                                    inputName="config_yi"
                                                    value={curItem.config_yi}
                                                    onChange={(e) => { this.handleInputChange(e); this.validateOneEst(e); }}
                                                    pattern="^[0-9.-]*$"
                                                    required="required"
                                                    maxLength={20} />
                                            </div>
                                        </div>

                                        <div className="col-xl-4 col-lg-4 col-md-4 col-6">
                                            <div className="mb-3">
                                                <RText label={t('project.config_po')}
                                                    inputClass="form-control"
                                                    inputId="config_po"
                                                    inputName="config_po"
                                                    value={curItem.config_po}
                                                    onChange={(e) => { this.handleInputChange(e); this.validateOneEst(e); }}
                                                    pattern="^[0-9.]*$"
                                                    required="required"
                                                    maxLength={20} />
                                            </div>
                                        </div>

                                        <div className="col-xl-4 col-lg-4 col-md-4 col-6">
                                            <div className="mb-3">
                                                <RText label={t('project.total_loss_factor')}
                                                    inputClass="form-control"
                                                    inputId="total_loss_factor"
                                                    inputName="total_loss_factor"
                                                    value={curItem.total_loss_factor}
                                                    onChange={(e) => { this.handleInputChange(e); this.validateOneEst(e); }}
                                                    pattern="^[0-9.]*$"
                                                    required="required"
                                                    maxLength={20} />
                                            </div>
                                        </div>
                                    </div>

                                </fieldset>
                            </div>
                            <div className="col-md-6">
                            <fieldset>
                                    <legend>Mái 2</legend>
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-6">
                                            <div className="mb-3">
                                                <RText label={t('project.config_yi')}
                                                    inputClass="form-control"
                                                    inputId="config_yi1"
                                                    inputName="config_yi1"
                                                    value={curItem.config_yi1}
                                                    onChange={(e) => { this.handleInputChange(e); this.validateOneEst(e); }}
                                                    pattern="^[0-9.-]*$"
                                                    required="required"
                                                    maxLength={20} />
                                            </div>
                                        </div>

                                        <div className="col-xl-4 col-lg-4 col-md-4 col-6">
                                            <div className="mb-3">
                                                <RText label={t('project.config_po')}
                                                    inputClass="form-control"
                                                    inputId="config_po1"
                                                    inputName="config_po1"
                                                    value={curItem.config_po1}
                                                    onChange={(e) => { this.handleInputChange(e); this.validateOneEst(e); }}
                                                    pattern="^[0-9.]*$"
                                                    required="required"
                                                    maxLength={20} />
                                            </div>
                                        </div>

                                        <div className="col-xl-4 col-lg-4 col-md-4 col-6">
                                            <div className="mb-3">
                                                <RText label={t('project.total_loss_factor')}
                                                    inputClass="form-control"
                                                    inputId="total_loss_factor1"
                                                    inputName="total_loss_factor1"
                                                    value={curItem.total_loss_factor1}
                                                    onChange={(e) => { this.handleInputChange(e); this.validateOneEst(e); }}
                                                    pattern="^[0-9.]*$"
                                                    required="required"
                                                    maxLength={20} />
                                            </div>
                                        </div>
                                    </div>

                                </fieldset>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="box-info">
                    <h2>{t('project.revenue')}</h2>
                    <div className="box-info-content">
                        <div className="project-user-manage">
                            <div className="data-view">
                                <div className="main-header">
                                    <div className="header-row">
                                        <div className="header-col width10"><p>ID</p></div>
                                        <div className="header-col width25"><p>{t('project.value')}</p></div>
                                        <div className="header-col width25"><p>{t('project.from_date')}</p></div>
                                        <div className="header-col width25"><p>{t('project.to_date')}</p></div>
                                        <div className="header-col width15 text-end">
                                            <div className="add-config" onClick={this.addRowConfigRevenue.bind(this)}><span className="icon icon-plus"></span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="main-body">
                                    <div className="body">
                                        {RowItemConfigs ? RowItemConfigs : <div className="data-empty">{t('common.data_empty')}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="box-info">
                    <h2>{t('project.performance_estimate')}</h2>
                    <div className="box-info-content">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                <div className="mb-3">
                                    <RText label={t('project.yearly_egrade_default')}
                                        inputClass="form-control"
                                        inputId="yearly_egrade_default"
                                        inputName="yearly_egrade_default"
                                        required="required"
                                        value={curItem.yearly_egrade_default}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9.]*$"
                                        maxLength={3} />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                <div className="mb-3">
                                    <RText label={t('project.yearly_egrade_two')}
                                        inputClass="form-control"
                                        required="required"
                                        inputId="yearly_egrade_two"
                                        inputName="yearly_egrade_two"
                                        value={curItem.yearly_egrade_two}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9.]*$"
                                        maxLength={3} />
                                </div>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-md-2 col-12">
                                <div className="mb-3">
                                    <FormReactSelect
                                        label={t('project.year')}
                                        instanceId="year"
                                        className="year"
                                        name="year"
                                        required="required"
                                        value={dataYear.filter(function (item) { return item.id === curItem.year })}
                                        onChange={(e) => { this.handleDropdownChange(e, 'year'); }}
                                        optionList={dataYear}
                                        placeHolder={t('common.choose')}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-md-2 col-6">
                                <div className="mb-3">
                                    <RText label={t('project.jan')}
                                        inputClass="form-control"
                                        inputId="jan"
                                        inputName="jan"
                                        value={curItem.jan}
                                        required="required"
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9.]*$"
                                        maxLength={20} />
                                </div>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-md-2 col-6">
                                <div className="mb-3">
                                    <RText label={t('project.feb')}
                                        inputClass="form-control"
                                        inputId="feb"
                                        inputName="feb"
                                        required="required"
                                        value={curItem.feb}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9.]*$"
                                        maxLength={20} />
                                </div>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-md-2 col-6">
                                <div className="mb-3">
                                    <RText label={t('project.mar')}
                                        inputClass="form-control"
                                        inputId="mar"
                                        inputName="mar"
                                        required="required"
                                        value={curItem.mar}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9.]*$"
                                        maxLength={20} />
                                </div>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-md-2 col-6">
                                <div className="mb-3">
                                    <RText label={t('project.apr')}
                                        inputClass="form-control"
                                        inputId="apr"
                                        inputName="apr"
                                        value={curItem.apr}
                                        required="required"
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9.]*$"
                                        maxLength={20} />
                                </div>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-md-2 col-6">
                                <div className="mb-3">
                                    <RText label={t('project.may')}
                                        inputClass="form-control"
                                        inputId="may"
                                        inputName="may"
                                        required="required"
                                        value={curItem.may}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9.]*$"
                                        maxLength={20} />
                                </div>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-md-2 col-6">
                                <div className="mb-3">
                                    <RText label={t('project.jun')}
                                        inputClass="form-control"
                                        inputId="jun"
                                        required="required"
                                        inputName="jun"
                                        value={curItem.jun}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9.]*$"
                                        maxLength={20} />
                                </div>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-md-2 col-6">
                                <div className="mb-3">
                                    <RText label={t('project.jul')}
                                        inputClass="form-control"
                                        inputId="jul"
                                        inputName="jul"
                                        required="required"
                                        value={curItem.jul}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9.]*$"
                                        maxLength={20} />
                                </div>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-md-2 col-6">
                                <div className="mb-3">
                                    <RText label={t('project.aug')}
                                        inputClass="form-control"
                                        inputId="aug"
                                        inputName="aug"
                                        value={curItem.aug}
                                        required="required"
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9.]*$"
                                        maxLength={20} />
                                </div>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-md-2 col-6">
                                <div className="mb-3">
                                    <RText label={t('project.sep')}
                                        inputClass="form-control"
                                        inputId="sep"
                                        inputName="sep"
                                        required="required"
                                        value={curItem.sep}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9.]*$"
                                        maxLength={20} />
                                </div>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-md-2 col-6">
                                <div className="mb-3">
                                    <RText label={t('project.oct')}
                                        inputClass="form-control"
                                        inputId="oct"
                                        inputName="oct"
                                        value={curItem.oct}
                                        required="required"
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9.]*$"
                                        maxLength={20} />
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-2 col-6">
                                <div className="mb-3">
                                    <RText label={t('project.nov')}
                                        inputClass="form-control"
                                        inputId="nov"
                                        inputName="nov"
                                        required="required"
                                        value={curItem.nov}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9.]*$"
                                        maxLength={20} />
                                </div>
                            </div>

                            <div className="col-xl-2 col-lg-2 col-md-2 col-6">
                                <div className="mb-3">
                                    <RText label={t('project.dec')}
                                        inputClass="form-control"
                                        inputId="dec"
                                        inputName="dec"
                                        required="required"
                                        value={curItem.dec}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9.]*$"
                                        maxLength={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-cancel" onClick={this.props.onItemClickCloseSetup.bind(this, false)}>
                    {t('common.cancel')}
                </button>
                <button type="button" className="btn btn-save" onClick={this.onSave.bind(this)}>
                    {(curItem.screen_mode === Constants.SCREEN_MODE.EDIT) ? t('common.save') : t('common.save')}
                </button>
            </div>
        </Modal>

    )
}