import React from 'react';
import Libs from '../../../../../../utils/Libs';
import RowItemOnOff from './RowItemOnOff';
import OnOffPopup from './OnOffPopup';
import ChangeModePopup from './ChangeModePopup';
import DeleteCalendarPopup from './DeleteCalendarPopup';
import { RButton, RCheckbox } from '../../../../../../components/Controls';
import CMSDatePicker from '../../../../../../components/CMSDatePicker/CMSDatePicker';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import './Auto.scss';


export default function Auto() {

    var { curItem, dataListInverter, searchParam, eventsList } = this.state;
    moment.locale('en-GB');
    var { t } = this.props;
    const localizer = momentLocalizer(moment)

    var OnOffPopupLayout = this.state.showOnOffPopup
        ? <OnOffPopup
            t={t}
            curItem={curItem}
            onClickCloseOnOff={this.onClickCloseOnOff}
            auth={this.props.auth}
            actions={this.actions}
        /> : '';

    var DeleteCalendarPopupLayout = this.state.deleteItemCalendar
        ? <DeleteCalendarPopup
            t={t}
            curItem={this.state.itemCalendar}
            closeDeleteCalendar={this.closeDeleteCalendar}
            auth={this.props.auth}
            actions={this.actions}
        /> : '';


    var ChangeModeLayout = this.state.changeMode
        ? <ChangeModePopup
            t={t}
            curItem={this.state.curItem}
            searchParam = {searchParam}
            onClickCloseChangeMode={this.onClickCloseChangeMode}
            calbackChangeMode = {this.calbackChangeMode}
            auth={this.props.auth}
            actions={this.actions}
        /> : '';


    return (
        <div className="main-auto">
            {OnOffPopupLayout}
            {DeleteCalendarPopupLayout}
            {ChangeModeLayout}
            <div className="add-date">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="mb-3">
                                    <div className="checkmark">
                                        <RCheckbox
                                            label="Manual Mode"
                                            inputId={"scheduled_mode_manual"}
                                            inputName="scheduled_mode_manual"
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
                                            inputId={"scheduled_mode_auto"}
                                            inputName="scheduled_mode_auto"
                                            checked={(searchParam.scheduled_mode == 2) ? 1 : 0}
                                            onChange={this.handleInputChange.bind(this)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                {searchParam.scheduled_mode == 2 ?
                                    <div className="scheduled">
                                        <fieldset>
                                            <legend><span>{t('device.scheduled')}</span></legend>

                                            <div className="choose-device">
                                                <h2>{t('device.device_list')} </h2>
                                                <ul className="row">
                                                    {Libs.isArrayData(dataListInverter) ?
                                                        dataListInverter.map((item, index) => {
                                                            return (
                                                                <li key={index} className="col-md-2">
                                                                    <div className="mb-3">
                                                                        <div className="checkmark">
                                                                            <RCheckbox
                                                                                label={item.name}
                                                                                inputId={"id_device_" + index}
                                                                                inputName={"id_device_" + index}
                                                                                checked={(item.checked == 1) ? 1 : 0}
                                                                                onChange={this.handleCheckedChange.bind(this, index)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            );
                                                        })
                                                        : ""}

                                                </ul>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <div className="mb-3">
                                                                <CMSDatePicker
                                                                    value={searchParam.date_from}
                                                                    inputId="date_from"
                                                                    format="DD/MM/YYYY HH:mm"
                                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                                    inputClass="form-control"
                                                                    inputName="date_from"
                                                                    minDate={searchParam.min_date}
                                                                    handleChange={(e) => { this.handleInputDateChange(e); this.validateOne(e); }}
                                                                    maxLength={20}
                                                                    showIconCalendar={true}
                                                                    timeIntervals={60}
                                                                    showTimeSelect={true}

                                                                />
                                                            </div>

                                                        </div>
                                                        <div className="col-md-1 text-center"><span className="to">To</span></div>

                                                        <div className="col-md-5">
                                                            <div className="mb-3">
                                                                <CMSDatePicker
                                                                    value={searchParam.date_to}
                                                                    inputId="date_to"
                                                                    format="DD/MM/YYYY HH:mm"
                                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                                    inputClass="form-control"
                                                                    inputName="date_to"
                                                                    minDate={searchParam.date_from}
                                                                    handleChange={(e) => { this.handleInputDateChange(e); this.validateOne(e); }}
                                                                    maxLength={20}
                                                                    showIconCalendar={true}
                                                                    timeIntervals={60}
                                                                    showTimeSelect={true} S
                                                                />
                                                            </div>

                                                        </div>

                                                        <div className="col-md-1">
                                                            <RButton
                                                                onClick={this.onClickAddControlCalendarAction.bind(this)}
                                                                className="btn btn-save"
                                                                text={t('device.add')}
                                                                title={t('device.add')} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6"></div>
                                            </div>


                                        </fieldset>
                                    </div>
                                    : ""}
                            </div>
                        </div>


                    </div>

                </div>
            </div>

            {searchParam.scheduled_mode == 2 ?
                <div className="main-calendar">
                    <Calendar
                        localizer={localizer}
                        events={eventsList}
                        startAccessor="start"
                        endAccessor="end"
                        step={60}
                        style={{ height: 500 }}
                        defaultView='week'
                        onSelectEvent={this.onSelectEvent.bind(this)}
                    />
                </div>
                : ""}

            <div className="manual-list-device">
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