import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Constants from '../../../../../utils/Constants';
import Libs from '../../../../../utils/Libs';

class RowItem extends Component {
    onItemClick = () => {
        if (!this.props.onItemClick || typeof this.props.onItemClick !== 'function') return;
        this.props.onItemClick(this.props.index);
    }

    onItemClickDelete = () => {
        if (!this.props.onItemClickDelete || typeof this.props.onItemClickDelete !== 'function') return;
        this.props.onItemClickDelete(this.props.index);
    }
    /**
     * @description Status change event
     * @author long.pham 27-07-2019
     */
    onStatusChange = () => {
        if (!this.props.onStatusChange || typeof this.props.onStatusChange !== 'function') return;
        this.props.onStatusChange(this.props.index);
        return;
    }

    render() {
        var item = this.props.dataItem;
        var irradiance = item.irradiance;
        var alerts = item.alerts;
        const { t } = this.props;

        return (
            <div className="body-row" key={item.id}>
                <ReactTooltip />
                <div className="body-col width5" style={{ width: "100px" }}>
                    <div className="project-status text-center">
                        {Libs.isArrayData(alerts) ?
                            alerts.map((v, i) => {
                                return (
                                    <NavLink key={i} to={"/project/" + item.hash_id + "/activities"} data-tip={v.name} data-type="warning" data-class="tooltip-action">
                                        <img src={Constants.SERVER_DATA + "/" + v.thumbnail} />
                                        <span className="count-alert">{v.total_alert}</span>
                                    </NavLink>
                                )
                            })
                            :
                            <NavLink to={"/project/" + item.hash_id + "/activities"}>
                                <img src="/greencheck.png" />
                            </NavLink>
                        }

                    </div>
                </div>
                <div className="body-col width15" style={{ width: "250px" }}><p>
                    <NavLink to={"/project/" + item.hash_id}><strong>{item.name}</strong></NavLink>

                </p></div>
                <div className="body-col width10 text-end" style={{ width: "150px" }}><p>{item.installed_power_client}</p></div>
                {Libs.isArrayData(irradiance) ?
                    irradiance.map((v, k) => {
                        if (k < 2) {
                            return (
                                <div key={k} className="body-col width10 text-end" style={{ width: "150px" }}>
                                    {!Libs.isBlank(v.irradiancePoA) ? <span>{v.irradiancePoA} W/m<sup className="sub">2</sup></span> : ""}
                                </div>
                            );
                        }

                    })
                    :
                    ""
                }

                <div className="body-col width10 text-end" style={{ width: "150px" }}>
                    {!Libs.isBlank(item.power_now) ? <p>{Libs.formatNum(item.power_now, '#,###.##')} kW</p> : ""}
                </div>

                <div className="body-col width10 text-end" style={{ width: "150px" }}>
                    {!Libs.isBlank(item.energy_today) ? <p>{Libs.formatNum(item.energy_today, '#,###.##')} kWh</p> : ""}
                </div>

                <div className="body-col width10 text-end" style={{ width: "150px" }}>
                    {!Libs.isBlank(item.last_month) ? <p>{Libs.formatNum(item.last_month, '#,###.##')} kWh</p> : ""}
                </div>

                <div className="body-col width10 text-end" style={{ width: "150px" }}>
                    {!Libs.isBlank(item.lifetime) ? <p>{Libs.formatElectricalUnit(item.lifetime, 'h')}</p> : ""}
                </div>
                <div className="body-col width10 text-end" style={{ width: "150px" }}><p>{Libs.formatNum(item.revenue, '#.###')} VNĐ</p></div>
                <div className="body-col width10 text-end" style={{ width: "150px" }}><p>{item.last_updated}</p></div>
            </div>
        );
    }
}
export default RowItem;
