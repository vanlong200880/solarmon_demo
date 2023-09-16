import React, { Component } from 'react';

class RowItemOnOff extends Component {
  
    onClickOnOff = () => {
        if (!this.props.onClickOnOff || typeof this.props.onClickOnOff !== 'function') return;
        this.props.onClickOnOff(this.props.index);
        return;
    }

    onClickControlCalender = () => {
        if (!this.props.onClickControlCalender || typeof this.props.onClickControlCalender !== 'function') return;
        this.props.onClickControlCalender(this.props.index);
        return;
    }

    render() {
        var item = this.props.dataItem;
        return (
            <li key={this.props.index} className="col-md-2">
                <div className="inverter-item">
                    <div className="title">{item.name}</div>
                    <div className="iv-title">
                        <div className="row">
                            <div className="col-md-6">
                                <img src="/inverter.png" className={item.status_control == 1 ? "on" : "off"} />
                            </div>
                            <div className="col-md-6 text-center">
                                <div className="mccb">MCCB</div>
                                <div onClick={this.onClickOnOff.bind(this)} className={item.status_control == 1 ? "action-on-off on" : "action-on-off off"}>
                                    {item.status_control == 1 ? "ON" : "OFF"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="iv-content">
                        <div className="row">
                            <div className="col-md-4"><span>Power</span></div>
                            <div className="col-md-4 text-center"><span>{item.activePower}</span></div>
                            <div className="col-md-4 text-center"><span>kW</span></div>
                        </div>

                        <div className="row">
                            <div className="col-md-4"><span>PF</span></div>
                            <div className="col-md-4 text-center"><span>{item.powerFactor}</span></div>
                            <div className="col-md-4 text-center"><span></span></div>
                        </div>

                        <div className="row">
                            <div className="col-md-4"><span>Temp</span></div>
                            <div className="col-md-4 text-center"><span>{item.internalTemperature}</span></div>
                            <div className="col-md-4 text-center"><span>℃</span></div>
                        </div>


                        <div className="row">
                            <div className="col-md-4"><span>Setpoint</span></div>
                            <div className="col-md-4 text-center"><span>90</span></div>
                            <div className="col-md-4 text-center"><span>%</span></div>
                        </div>
                    </div>

                </div>
            </li>
        );
    }
}
export default RowItemOnOff;
