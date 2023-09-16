import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Libs from '../../../../../../utils/Libs';

class RowItem extends Component {

    render() {
        var item = this.props.dataItem;
        var irradiance = item.irradiance;
        var alerts = item.alerts;
        const { t } = this.props;

        return (
            <div className="body-row" key={item.id}>
                
                <div className="body-col width15" style={{ width: "250px" }}><p>
                    <NavLink to={"/private/" + item.hash_id}><strong>{item.project_name}</strong></NavLink>

                </p></div>
                <div className="body-col width10" style={{ width: "250px" }}><p>{item.name}</p></div>
                

                <div className="body-col width10 text-end" style={{ width: "150px" }}>
                    {!Libs.isBlank(item.activePower) ? <p>{Libs.formatNum(item.activePower, '#,###.##')} kWh</p> : ""}
                </div>

                <div className="body-col width10 text-end" style={{ width: "150px" }}>
                    {!Libs.isBlank(item.activeEnergy) ? <p>{Libs.formatElectricalUnit(item.activeEnergy, 'h')}</p> : ""}
                </div>

                <div className="body-col width10 text-end" style={{ width: "150px" }}>
                    {!Libs.isBlank(item.currentPhaseA) ? <p>{Libs.formatNum(item.currentPhaseA, '#,###.##')} A</p> : ""}
                </div>

                <div className="body-col width10 text-end" style={{ width: "150px" }}>
                    {!Libs.isBlank(item.currentPhaseB) ? <p>{Libs.formatNum(item.currentPhaseB, '#,###.##')} A</p> : ""}
                </div>

                <div className="body-col width10 text-end" style={{ width: "150px" }}>
                    {!Libs.isBlank(item.currentPhaseC) ? <p>{Libs.formatNum(item.currentPhaseC, '#,###.##')} A</p> : ""}
                </div>

                <div className="body-col width10 text-end" style={{ width: "200px" }}>
                    {!Libs.isBlank(item.activeEnergyRate1) ? <p>{Libs.formatNum(item.activeEnergyRate1, '#,###.##')} kWh</p> : ""}
                </div>

                <div className="body-col width10 text-end" style={{ width: "200px" }}>
                    {!Libs.isBlank(item.activeEnergyRate2) ? <p>{Libs.formatNum(item.activeEnergyRate2, '#,###.##')} kWh</p> : ""}
                </div>

                <div className="body-col width10 text-end" style={{ width: "200px" }}>
                    {!Libs.isBlank(item.activeEnergyRate3) ? <p>{Libs.formatNum(item.activeEnergyRate3, '#,###.##')} kWh</p> : ""}
                </div>

                <div className="body-col width10 text-end" style={{ width: "150px" }}>
                    {!Libs.isBlank(item.powerFactor) ? <p>{Libs.formatNum(item.powerFactor, '#,###.##')} </p> : ""}
                </div>
            </div>
        );
    }
}
export default RowItem;
