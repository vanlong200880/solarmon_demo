import React from 'react';
import { RText, RTextArea, RSwitch } from '../../../../../components/Controls';
import FormReactSelect from '../../../../../components/FormReactSelect';
import Modal from 'react-bootstrap4-modal';
import Constants from '../../../../../utils/Constants';


export default function AddPopup() {

    var { curItem, allLanguage, dataErrorType, dataErrorLevel, dataErrorState, dataDeviceGroup } = this.state;
    const { t } = this.props;
    var tabNavLanguage, tabContent = null;

    if (allLanguage) {
        tabNavLanguage = allLanguage.map((language, index) => {
            return (<li key={index} className="nav-item">
                <span onClick={(e) => { this.onClickShowTab(e, language.iso_code) }} className={curItem.tabActive === language.iso_code ? "nav-link active" : "nav-link"} id={"name-tab-" + language.iso_code} >{language.name}</span>
            </li>);
        });

        tabContent = allLanguage.map((language, index) => {
            return (
                <div key={index} className={curItem.tabActive === language.iso_code ? "tab-pane fade show active" : "tab-pane fade"} id={"name-" + language.iso_code} role="tabpanel" aria-labelledby="home-tab">
                    <div className="info">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="mb-3">
                                    <RTextArea label={t('error.message')}
                                        inputClass="form-control"
                                        inputId={"message_" + language.iso_code}
                                        inputName={"message_" + language.iso_code}
                                        value={curItem.data[index].message}
                                        onChange={(e) => { this.handleInputTranslateChange(e); this.validateOne(e); }}
                                        maxLength={400} />
                                </div>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="mb-3">
                                    <RTextArea label={t('error.description')}
                                        inputClass="form-control"
                                        inputId={"description_" + language.iso_code}
                                        inputName={"description_" + language.iso_code}
                                        value={curItem.data[index].description}
                                        onChange={(e) => { this.handleInputTranslateChange(e); this.validateOne(e); }}
                                        maxLength={1000} />
                                </div>

                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="mb-3">
                                    <RTextArea label={t('error.solutions')}
                                        inputClass="form-control"
                                        inputId={"solutions_" + language.iso_code}
                                        inputName={"solutions_" + language.iso_code}
                                        value={curItem.data[index].solutions}
                                        onChange={(e) => { this.handleInputTranslateChange(e); this.validateOne(e); }}
                                        maxLength={1000} />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            );
        });
    }


    return (
        <Modal visible={true} className="modal-add" dialogClassName="modal-lg modal-dialog-scrollable" >
            <div className="modal-header">
                <h5 className="modal-title">
                    {(curItem.screen_mode === Constants.SCREEN_MODE.EDIT) ? t('error.edit_title') : t('error.add_title')}
                </h5>
                <span className="close" onClick={this.props.onClickCloseAdd.bind(this, false)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">
                <div className="box-info">
                    <h2>{t('common.info')}</h2>
                    <div className="box-info-content">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                <div className="mb-3">
                                    <p className="control-label">{t('employee.status')}</p>
                                    <div className="checkmark">
                                        <RSwitch
                                            inputId="status"
                                            inputName="status"
                                            checked={curItem.status}
                                            onChange={(e) => { this.handleInputChange(e) }}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <FormReactSelect
                                        required="required"
                                        label={t('error.id_error_type')}
                                        instanceId="id_error_type"
                                        className="id_error_type"
                                        name="id_error_type"
                                        value={dataErrorType.filter(function (item) { return item.id === curItem.id_error_type })}
                                        onChange={(e) => { this.handleDropdownChange(e, 'id_error_type') }}
                                        optionList={dataErrorType}
                                        placeHolder={t('common.choose')}
                                    />
                                </div>
                            </div>


                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <FormReactSelect
                                        label={t('error.id_error_level')}
                                        required="required"
                                        instanceId="id_error_level"
                                        className="id_error_level"
                                        name="id_error_level"
                                        value={dataErrorLevel.filter(function (item) { return item.id === curItem.id_error_level })}
                                        onChange={(e) => { this.handleDropdownChange(e, 'id_error_level') }}
                                        optionList={dataErrorLevel}
                                        placeHolder={t('common.choose')}
                                    />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <FormReactSelect
                                        label={t('error.id_error_state')}
                                        required="required"
                                        instanceId="id_error_state"
                                        className="id_error_state"
                                        name="id_error_state"
                                        value={dataErrorState.filter(function (item) { return item.id === curItem.id_error_state })}
                                        onChange={(e) => { this.handleDropdownChange(e, 'id_error_state') }}
                                        optionList={dataErrorState}
                                        placeHolder={t('common.choose')}
                                    />
                                </div>
                            </div>


                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <FormReactSelect
                                        label={t('error.id_device_group')}
                                        required="required"
                                        instanceId="id_device_group"
                                        className="id_device_group"
                                        name="id_device_group"
                                        value={dataDeviceGroup.filter(function (item) { return item.id === curItem.id_device_group })}
                                        onChange={(e) => { this.handleDropdownChange(e, 'id_device_group') }}
                                        optionList={dataDeviceGroup}
                                        placeHolder={t('common.choose')}
                                    />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <RText label={t('error.error_code')}
                                        required="required"
                                        inputClass="form-control"
                                        inputId="error_code"
                                        inputName="error_code"
                                        value={curItem.error_code}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        maxLength={100} />
                                </div>
                            </div>


                        </div>
                    </div>

                </div>

                <div className="box-translate">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tab-main">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    {tabNavLanguage}
                                </ul>
                                <div className="tab-content" id="tabContent">
                                    {tabContent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-cancel" onClick={this.props.onClickCloseAdd.bind(this, false)}>
                    {t('common.cancel')}
                </button>
                <button type="button" className="btn btn-save" onClick={this.onSave.bind(this)}>
                    {(curItem.screen_mode === Constants.SCREEN_MODE.EDIT) ? t('common.update') : t('common.create')}
                </button>
            </div>
        </Modal>

    )
}