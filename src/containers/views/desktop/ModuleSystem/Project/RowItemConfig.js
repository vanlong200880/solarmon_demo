import React, { Component } from 'react';
import { RText } from '../../../../../components/Controls';
import CMSDatePicker from '../../../../../components/CMSDatePicker/CMSDatePicker';

class RowItemConfig extends Component {
    onItemClickDelete = () => {
        if (!this.props.onItemClickDelete || typeof this.props.onItemClickDelete !== 'function') return;
        this.props.onItemClickDelete(this.props.index);
    }

    render() {
        var item = this.props.dataItem;
        return (
            <div className="body-row" key={item.id}>
                <div className="body-col width10">
                    {(this.props.index) + 1}
                </div>
                <div className="body-col width25">
                    <RText
                        inputClass="form-control"
                        inputId="config_revenue"
                        inputName="config_revenue"
                        value={item.config_revenue}
                        onChange={(e) => { this.props.handleInputChangeItem(e, this.props.index) }}
                        pattern="^[0-9.]*$"
                        maxLength={20} />

                </div>
                <div className="body-col width25">
                    <CMSDatePicker
                        value={item.start_date}
                        inputId="start_date"
                        format="DD/MM/YYYY"
                        dateFormat="dd/MM/yyyy"
                        inputClass="form-control"
                        inputName="start_date"
                        handleChange={(e) => { this.props.handleInputChangeItem(e, this.props.index); }}
                        maxLength={20}
                        showIconCalendar={false}
                    />

                </div>
                <div className="body-col width25">
                    <CMSDatePicker
                        value={item.end_date}
                        inputId="end_date"
                        format="DD/MM/YYYY"
                        dateFormat="dd/MM/yyyy"
                        inputClass="form-control"
                        inputName="end_date"
                        handleChange={(e) => { this.props.handleInputChangeItem(e, this.props.index); }}
                        maxLength={20}
                        showIconCalendar={false}
                    />

                </div>
                <div className="body-col width15">
                    <div className="functions">
                        <ul>

                            <li onClick={this.onItemClickDelete.bind(this)} ><var className="icon-trash-o" aria-hidden="true"></var></li>
                        </ul>
                    </div>
                </div>

            </div>
        );
    }
}
export default RowItemConfig;
