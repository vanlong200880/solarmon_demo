import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { RButton } from '../../../../../components/Controls';
import CMSDatePicker from '../../../../../components/CMSDatePicker/CMSDatePicker';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

export default function ControlCalendar() {
    var { curItem, eventsList, searchParam } = this.state;
    moment.locale('en-GB');
    console.log(curItem);
    var { t } = this.props;
    const localizer = momentLocalizer(moment)

    return (
        <Modal visible={true} className="modal-control-calendar" dialogClassName="modal-xl modal-dialog-scrollable">
            <div className="modal-header">
                <h5 className="modal-title">{t('device.control_calendar')}: Device {curItem.name} </h5>
                <span className="close" onClick={this.props.onCloseControlCalender.bind(this, false)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">
                <div className="add-date">
                    <div className="row">
                        <div className="col-md-3">
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

                        <div className="col-md-3">
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
                                    showTimeSelect={true}S
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
                <Calendar
                    localizer={localizer}
                    events={eventsList}
                    startAccessor="start"
                    endAccessor="end"
                    step={60}
                    // views={allViews}
                    style={{ height: 500 }}
                    defaultView='week'
                    // onSelectEvent = {this.onSelectEvent.bind(this)}
                // onSelectSlot={(this.handleSlotSelect.bind(this))}

                // onNavigate = {(this.handleSlotSelect)}
                // views={[]}
                />
            </div>

            {/* <div className="modal-footer">
                <RButton
                    onClick={this.props.onCloseControlCalender.bind(this, false)}
                    className="btn btn-cancel"
                    text={" " + t('common.no')}
                    data-dismiss="modal" aria-hidden="true"
                    title={t('common.no')} />

                <RButton
                    onClick={this.onClickOnOffAction.bind(this)}
                    className="btn btn-save"
                    text={t('common.yes')}
                    title={t('common.yes')} />
            </div> */}
        </Modal>
    )
}