import React, { Component } from 'react';
import Libs from '../../utils/Libs';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range";
import './CMSDatePicker.scss';
import moment from 'moment';
/**
 * @description CMS date picker
 * @author Long.Pham
 * @since 20/05/2021
 */

export default class CMSDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      minDate: null,
      maxDate: null,
      showTimeSelect: false,
      showDisabledMonthNavigation: false,
      timeCaption: "Time",
      dateFormat: "dd/MM/yyyy HH:mm",
      timeFormat: "HH:mm",
      timeIntervals: 15,
      readOnly: false,
      disabled: false,
      isClearable: false,
      isOpen: false,
      showIconCalendar: true,
      showMonthYearPicker: false,
      showFullMonthYearPicker: false,
      showTwoColumnMonthYearPicker: false,
      showYearPicker: false,
      yearItemNumber: 1,
      showCustomMonth: true
    };

    this.focus = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }
  componentDidMount() {
    let { showTimeSelect, readOnly, disabled, dateFormat, format, minDate, maxDate, value, showIconCalendar, showMonthYearPicker, showFullMonthYearPicker, showTwoColumnMonthYearPicker, showYearPicker, yearItemNumber, showCustomMonth, timeIntervals } = this.props;
    if (Libs.isBlank(dateFormat)) {
      dateFormat = "dd/MM/yyyy";
    }
    if (Libs.isBlank(format)) {
      format = "dd/MM/yyyy";
    }
    if (!Libs.isBlank(minDate)) {
      minDate = Libs.convertStrtoDate(minDate, format);
    }
    if (!Libs.isBlank(maxDate)) {
      maxDate = Libs.convertStrtoDate(maxDate, format);
    }
    if (!Libs.isBlank(value)) {
      value = Libs.convertStrtoDate(value, format);
    } else {
      value = null;
    }
    this.setState({
      startDate: value,
      readOnly: !Libs.isBlank(readOnly) ? readOnly : false,
      disabled: !Libs.isBlank(disabled) ? disabled : false,
      format: format,
      dateFormat: dateFormat,
      showTimeSelect: !Libs.isBlank(showTimeSelect) ? showTimeSelect : false,
      minDate: !Libs.isBlank(minDate) ? minDate : null,
      maxDate: !Libs.isBlank(maxDate) ? maxDate : null,
      showIconCalendar: showIconCalendar,
      showMonthYearPicker: !Libs.isBlank(showMonthYearPicker) ? showMonthYearPicker : false,
      showFullMonthYearPicker: !Libs.isBlank(showFullMonthYearPicker) ? showFullMonthYearPicker : false,
      showTwoColumnMonthYearPicker: !Libs.isBlank(showTwoColumnMonthYearPicker) ? showTwoColumnMonthYearPicker : false,
      showYearPicker: !Libs.isBlank(showYearPicker) ? showYearPicker : false,
      yearItemNumber: !Libs.isBlank(yearItemNumber) ? yearItemNumber : 1,
      showCustomMonth: !Libs.isBlank(showCustomMonth) ? showCustomMonth : true,
      timeIntervals: !Libs.isBlank(timeIntervals) ? timeIntervals : 15,

    })


  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    let { showTimeSelect, readOnly, disabled, dateFormat, format, minDate, maxDate, value, showMonthYearPicker, showFullMonthYearPicker, showTwoColumnMonthYearPicker, showYearPicker, yearItemNumber, showCustomMonth, timeIntervals } = this.props;
    if (prevProps.disabled !== disabled || prevProps.minDate !== minDate ||
      prevProps.maxDate !== maxDate || prevProps.value !== value) {
      if (Libs.isBlank(dateFormat)) {
        dateFormat = "dd/MM/yyyy";
      }
      if (Libs.isBlank(format)) {
        format = "dd/MM/yyyy";
      }
      if (!Libs.isBlank(minDate)) {
        minDate = Libs.convertStrtoDate(minDate, format);
      }
      if (!Libs.isBlank(maxDate)) {
        maxDate = Libs.convertStrtoDate(maxDate, format);
      }
      if (!Libs.isBlank(value)) {
        value = Libs.convertStrtoDate(value, format);
      }
      this.setState({
        startDate: value,
        readOnly: !Libs.isBlank(readOnly) ? readOnly : false,
        disabled: !Libs.isBlank(disabled) ? disabled : false,
        format: format,
        dateFormat: dateFormat,
        showTimeSelect: !Libs.isBlank(showTimeSelect) ? showTimeSelect : false,
        minDate: !Libs.isBlank(minDate) ? minDate : null,
        maxDate: !Libs.isBlank(maxDate) ? maxDate : null,
        showMonthYearPicker: !Libs.isBlank(showMonthYearPicker) ? showMonthYearPicker : false,
        showFullMonthYearPicker: !Libs.isBlank(showFullMonthYearPicker) ? showFullMonthYearPicker : false,
        showTwoColumnMonthYearPicker: !Libs.isBlank(showTwoColumnMonthYearPicker) ? showTwoColumnMonthYearPicker : false,
        showYearPicker: !Libs.isBlank(showYearPicker) ? showYearPicker : false,
        yearItemNumber: !Libs.isBlank(yearItemNumber) ? yearItemNumber : 1,
        showCustomMonth: !Libs.isBlank(showCustomMonth) ? showCustomMonth : true,
        timeIntervals: !Libs.isBlank(timeIntervals) ? timeIntervals : 15
      })
    }
  }
  handleChange(date, e, name) {
    if (typeof this.props.handleChange === 'function') {
      let _date = Libs.dateFormat(date, this.state.format);
      let target = {
        target: {
          name: name,
          value: _date
        }
      }
      this.props.handleChange(target, name, _date);
    }
  }
  handleOnBlur(e) {
    if (typeof this.props.handleOnBlur === 'function') {
      this.props.handleOnBlur(e);
    }
    else if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(e);
    }
  }

  /**
   * @description em chuyển lại this.focus = false;
   * lỗi trường hợp nó sẽ nhảy từ true -> false
   * click 2 lần mới open calendar
   * @author Tam.Nguyen 21-12-2018
   */
  toggle = (e) => {
    // let open = this.component.isCalendarOpen();
    this.component.setOpen(!this.focus);
    // this.focus = !this.focus;
  }

  render() {

    const inputClass = typeof this.props.inputClass === 'string' && this.props.inputClass !== "" ? this.props.inputClass : null;
    const inputName = typeof this.props.inputName === 'string' && this.props.inputName !== "" ? this.props.inputName : null;
    const placeholder = typeof this.props.placeholder === 'string' && this.props.placeholder !== "" ? this.props.placeholder : null;
    const inputId = typeof this.props.inputId === 'string' && this.props.inputId !== "" ? this.props.inputId : null;

    const years = range(1990, getYear(new Date()) + 1, 1);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return (
      <React.Fragment>

        {(this.props.label !== "" && typeof this.props.label !== 'undefined') ?
          <label className="control-label">{this.props.label}
            {this.props.required === 'required' ? <span className="required">*</span> : null}
          </label> : null}
        <div className={'input-group cmsdatepicker pl-0 pr-0' + (this.state.disabled ? ' bg-disabled' : '')}>
          <div className={inputClass}>
            <DatePicker
              id={inputId}
              name={inputName}
              autoComplete="off"
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled
              }) => (
                <div
                  style={{
                    margin: "0 10px 10px 10px",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}><var className="icon-angle-left"></var></button>
                  {this.state.showCustomMonth ?
                    <select
                      value={months[getMonth(date)]}
                      onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                      }
                    >
                      {months.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    : ""}


                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}><var className="icon-angle-right"></var></button>
                </div>
              )}

              // className={"input-datepicker " + inputClass}
              selected={this.state.startDate}
              onChange={(d, e) => this.handleChange(d, e, inputName)}
              onBlur={this.handleOnBlur}
              showTimeSelect={this.state.showTimeSelect}
              timeFormat={this.state.timeFormat}
              timeIntervals={this.state.timeIntervals}
              dateFormat={this.state.dateFormat}
              timeCaption={this.state.timeCaption}
              todayButton={"Today"}
              placeholderText={placeholder}
              minDate={this.state.minDate}
              maxDate={this.state.maxDate}
              readOnly={this.state.readOnly}
              disabled={this.state.disabled}
              isClearable={this.state.isClearable}
              showDisabledMonthNavigation={this.state.showDisabledMonthNavigation}
              // popperPlacement="bottom-start"
              fixedHeight={true}
              popperPlacement="bottom-start"
              showMonthYearPicker={this.state.showMonthYearPicker}
              showFullMonthYearPicker={this.state.showFullMonthYearPicker}
              showTwoColumnMonthYearPicker={this.state.showTwoColumnMonthYearPicker}
              showYearPicker={this.state.showYearPicker}
              yearItemNumber={this.state.yearItemNumber}
              ref={(r) => {
                this.component = r;
              }}
            />
          </div>
          {this.state.showIconCalendar ?
            <div className="input-group-append">
              <button onClick={(e) => this.toggle(e)} className="btn btn-outline-secondary datepickerbutton" type="button"><span className="icon icon-calendar"></span></button>
            </div>
            : ""}

        </div>
        {typeof this.props.validate === 'boolean' && this.props.validate === true ?
          <p className="pl-0 col-sm-12 validate-message d-none"></p> :
          null
        }
      </React.Fragment>
    );

  }
}