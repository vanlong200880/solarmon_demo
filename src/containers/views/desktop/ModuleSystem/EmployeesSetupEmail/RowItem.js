import React, { Component } from 'react';
import { RCheckbox } from '../../../../../components/Controls';

class RowItem extends Component {
    render() {
        var item = this.props.dataItem;
        return (
            <div className="body-row" key={item.id}>
                <div className="body-col width10"><p>{item.id} </p></div>
                <div className="body-col width40"><p><strong>{item.name} </strong></p></div>
                <div className="body-col width10 text-center">
                    <div className="checkmark">
                        <RCheckbox
                            inputId={"mail_now_" + item.id}
                            inputName="mail_now"
                            checked={(item.mail_now * 1 === 1) ? 1 : 0}
                            onChange={this.props.onStatusChange.bind(this, this.props.index, 'now')}
                        />
                    </div>
                </div>
                <div className="body-col width10 text-center">
                    <div className="checkmark">
                        <RCheckbox
                            inputId={"mail_day_" + item.id}
                            inputName="mail_day"
                            checked={(item.mail_day * 1 === 1) ? 1 : 0}
                            onChange={this.props.onStatusChange.bind(this, this.props.index, 'day')}
                        />
                    </div>
                </div>

                <div className="body-col width10 text-center">
                    <div className="checkmark">
                        <RCheckbox
                            inputId={"mail_month_" + item.id}
                            inputName="mail_month"
                            checked={(item.mail_month * 1 === 1) ? 1 : 0}
                            onChange={this.props.onStatusChange.bind(this, this.props.index, 'month')}
                        />
                    </div>
                </div>

                <div className="body-col width10 text-center">
                    <div className="checkmark">
                        <RCheckbox
                            inputId={"mail_year_" + item.id}
                            inputName="mail_year"
                            checked={(item.mail_year * 1 === 1) ? 1 : 0}
                            onChange={this.props.onStatusChange.bind(this, this.props.index, 'year')}
                        />
                    </div>
                </div>

                <div className="body-col width10 text-center">
                    <div className="checkmark">
                        <RCheckbox
                            inputId={"mail_all_" + item.id}
                            inputName="mail_all"
                            checked={(item.mail_all * 1 === 1) ? 1 : 0}
                            onChange={this.props.onStatusChange.bind(this, this.props.index, 'all')}
                        />
                    </div>
                </div>


            </div>
        );
    }
}
export default RowItem;
