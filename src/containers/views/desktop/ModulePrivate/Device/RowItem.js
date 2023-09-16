import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import Constants from '../../../../../utils/Constants';
import Libs from '../../../../../utils/Libs';
import Auth from '../../../../../utils/Auth';

class RowItem extends Component {
    onClickViewDevice = () => {
        if (!this.props.onClickViewDevice || typeof this.props.onClickViewDevice !== 'function') return;
        this.props.onClickViewDevice(this.props.index);
        return;
    }

    onClickChartDevice = () => {
        if (!this.props.onClickViewDevice || typeof this.props.onClickChartDevice !== 'function') return;
        this.props.onClickChartDevice(this.props.index);
        return;
    }

    viewAlertDevice = () => {
        if (!this.props.viewAlertDevice || typeof this.props.viewAlertDevice !== 'function') return;
        this.props.viewAlertDevice(this.props.index);
        return;
    }

    render() {
        var item = this.props.dataItem;
        const { t } = this.props;
        var alerts = item.alerts;

        console.log(item)
        return (
            <div className="body-row" key={item.id}>
                <ReactTooltip />
                <div style={{width: "100px"}}  className="body-col width5">
                    <div className="device-status text-center">
                        {Libs.isArrayData(alerts) ?
                            alerts.map((v, i) => {
                                return (
                                    <a key={i} onClick={this.viewAlertDevice.bind(this)} data-tip={v.name} data-type="warning" data-class="tooltip-action">
                                        <img src={Constants.SERVER_DATA + "/" + v.thumbnail} />
                                        <span className="count-alert">{v.total_alert}</span>
                                    </a>
                                )
                            })
                            :
                            <a onClick={this.viewAlertDevice.bind(this)} >
                                {item.id_device_type == 1 ?
                                    <img src={item.power_now > 0 && item.id_device_type == 1 ? "/greencheck.png" : "/off.png"} />
                                    :
                                    <img src="/greencheck.png" />}
                            </a>
                        }

                    </div>

                </div>
                <div style={{width: "150px"}}  className="body-col width10 text-break"><p style={{ cursor: "pointer" }} onClick={this.onClickViewDevice.bind(this)} ><strong>{item.name}</strong></p></div>
                <div style={{width: "150px"}}  className="body-col width10 text-break"><p>{item.model} </p></div>
                <div style={{width: "250px"}}  className="body-col width15 text-break"><p>{item.serial_number}</p></div>
                <div style={{width: "150px"}}  className="body-col width10 text-break"><p>{item.device_type_name}</p></div>
                <div style={{width: "150px"}}  className="body-col width10">
                    {!Libs.isBlank(item.power_now) ? <p>{Libs.formatNum(item.power_now, '#,###.##')} kW</p> : "N/A"}
                </div>
                <div style={{width: "150px"}}  className="body-col width10">
                    {!Libs.isBlank(item.energy_today) ? <p>{Libs.formatNum(item.energy_today, '#,###.##')} kWh</p> : "N/A"}
                </div>
                <div style={{width: "150px"}}  className="body-col width10">
                    {!Libs.isBlank(item.last_month) ? <p>{Libs.formatNum(item.last_month, '#,###.##')} kWh</p> : "N/A"}
                </div>

                <div style={{width: "150px"}}  className="body-col width10">
                    {!Libs.isBlank(item.lifetime) ? <p>{Libs.formatElectricalUnit(item.lifetime, 'h')}</p> : "N/A"}
                </div>


                <div style={{width: "150px"}}  className="body-col width10">
                    <p>{item.last_updated}</p>
                </div>



                <div style={{width: "150px"}}  className="body-col width10">
                    <div className="functions">
                        <ul>
                            <li onClick={Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.VIEW) ? this.onClickChartDevice.bind(this) : ''} data-tip={t('device.chart')} data-type="warning" data-class="tooltip-action"><var className="icon-graph-bar" aria-hidden="true"></var></li>
                            <li onClick={Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.VIEW) ? this.onClickViewDevice.bind(this) : ''} data-tip={t('common.view')} data-type="warning" data-class="tooltip-action"><var className="icon-eye" aria-hidden="true"></var></li>
                        </ul>
                    </div>
                </div>

            </div>
        );
    }
}
export default RowItem;
