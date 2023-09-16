import React from 'react';
import Libs from '../../../../../../utils/Libs';
import RowItemOnOff from './RowItemOnOff';
import OnOffPopup from './OnOffPopup';
import ControlCalendar from './ControlCalendar';
import { RButton, RCheckbox, RText, RSwitch } from '../../../../../../components/Controls';
import ChangeModePopup from './ChangeModePopup';

export default function Manual() {

    var { curItem, dataListInverter, searchParam } = this.state;
    const { t } = this.props;
    var OnOffPopupLayout = this.state.showOnOffPopup
        ? <OnOffPopup
            t={t}
            curItem={curItem}
            onClickCloseOnOff={this.onClickCloseOnOff}
            auth={this.props.auth}
            actions={this.actions}
        /> : '';

    var ControlCalendarLayout = this.state.showControlCalendar
        ? <ControlCalendar
            t={t}
            curItem={curItem}
            onCloseControlCalender={this.onCloseControlCalender}
            auth={this.props.auth}
            actions={this.actions}
            hash_id={this.state.hash_id}
        /> : '';

    var ChangeModeLayout = this.state.changeMode
        ? <ChangeModePopup
            t={t}
            curItem={this.state.curItem}
            searchParam={searchParam}
            onClickCloseChangeMode={this.onClickCloseChangeMode}
            calbackChangeMode={this.calbackChangeMode}
            auth={this.props.auth}
            actions={this.actions}
        /> : '';

    return (
        <div className="tab-control">
            {OnOffPopupLayout}
            {ControlCalendarLayout}
            {ChangeModeLayout}
            <div className="main-manual">
                <div className="row">
                    <div className="col-md-2">
                        <div className="mb-3">
                            <div className="checkmark">
                                <RCheckbox
                                    label="Manual Mode"
                                    inputId={"scheduled_manual_mode"}
                                    inputName="scheduled_manual_mode"
                                    checked={(searchParam.scheduled_mode == 1) ? 1 : 0}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className="mb-3">
                            <div className="checkmark">
                                <RCheckbox
                                    label="Auto Mode"
                                    inputId={"scheduled_auto_mode"}
                                    inputName="scheduled_auto_mode"
                                    checked={(searchParam.scheduled_mode == 2) ? 1 : 0}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {searchParam.scheduled_mode == 2 ?
                    <div className="row">
                        <div className="col-md-3">
                            <fieldset>
                                <legend><span>{t('device.limit_power')}</span></legend>
                                <div className="mb-3">
                                    <div className="checkmark">
                                        <RSwitch
                                            inputId={"limit_power_status"}
                                            inputName="limit_power_status"
                                            checked={(searchParam.limit_power_status * 1 === 1) ? 1 : 0}
                                            onChange={this.handleInputChange.bind(this)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3s">
                                    <RText
                                        placeholder={t('device.limit_power')}
                                        inputClass="form-control"
                                        inputId="limit_power"
                                        inputName="limit_power"
                                        value={searchParam.limit_power}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^(?!0\d)\d*[\.]{0,1}(\.\d+)?$"
                                        disabled={searchParam.limit_power_status ? false : true}
                                        maxLength={20} />
                                </div>
                            </fieldset>
                        </div>

                        <div className="col-md-3">
                            <fieldset>
                                <legend><span>{t('device.limit_energy')}</span></legend>
                                <div className="mb-3">
                                    <div className="checkmark">
                                        <RSwitch
                                            inputId={"limit_energy_status"}
                                            inputName="limit_energy_status"
                                            checked={(searchParam.limit_energy_status * 1 === 1) ? 1 : 0}
                                            onChange={this.handleInputChange.bind(this)}
                                        />
                                    </div>
                                </div>


                                <div className="mb-3s">
                                    <RText
                                        placeholder={t('device.limit_energy')}
                                        inputClass="form-control"
                                        inputId="limit_energy"
                                        inputName="limit_energy"
                                        value={searchParam.limit_energy}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^(?!0\d)\d*[\.]{0,1}(\.\d+)?$"
                                        disabled={searchParam.limit_energy_status ? false : true}
                                        maxLength={20} />
                                </div>

                            </fieldset>
                        </div>

                        <div className="col-md-3">
                            <RButton
                                onClick={this.onClickSaveExportLimitationAction.bind(this)}
                                className="btn btn-save"
                                text={t('device.add')}
                                title={t('device.add')} />
                        </div>
                    </div>
                    : ""}

            </div>
            <div className="main-device-limit">
                <ul className="row">
                    {Libs.isArrayData(dataListInverter) ?
                        dataListInverter.map((item, index) => {
                            return (
                                <RowItemOnOff
                                    key={'row_item_' + index}
                                    index={index}
                                    dataItem={item}
                                    actions={this.actions}
                                    onClickOnOff={this.onClickOnOff}
                                    onClickControlCalender={this.onClickControlCalender}
                                    t={t}
                                />
                            );
                        })
                        : ""}
                </ul>
            </div>

        </div>

    )
}