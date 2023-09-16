import React from 'react';
import Libs from '../../../../../../utils/Libs';
import { RCheckbox } from '../../../../../../components/Controls';
import RowItemParam from './RowItemParam';


export default function FilterParam() {
    const { t } = this.props;
    var { curItem, dataListDevice, dataList, chartParams, dataFilter, chartOption, dataStatus, dataDevice, dataParameter } = this.state;

    var RowItemParams = null;
    if (Libs.isArrayData(dataParameter)) {
        RowItemParams = dataParameter.map((item, index) => {
            return <RowItemParam
                dataItem={item}
                key={index}
                index={index}
                handleParameterInputChange={this.handleParameterInputChange}
                auth={this.props.auth}
                actions={this.props.actions}
            />
        })
    }
    return (
        <div className="list-parameter">
            <div className="title">
                <h2>Devices <span onClick={this.showFilterParameter.bind(this)}><var className="icon-angle-right"></var></span></h2>
                <div className="list-device">
                    <ul>
                        {Libs.isArrayData(dataListDevice) ?
                            dataListDevice.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <RCheckbox
                                            inputId={"device_" + index}
                                            inputName={"device_" + index}
                                            labelClass="no-label"
                                            checked={item.is_checked}
                                            onChange={(e) => { this.handleDeviceInputChange(e, index); }}
                                            label={item.name}
                                        />
                                    </li>
                                );
                            })
                            : ""}
                    </ul>
                </div>

            </div>
            {this.state.show_parameter ?
                <div className="chart-device-param">
                    <h2>Parameter <span onClick={this.closeFilterParameter.bind(this)}><var className="icon-cancel-music"></var></span></h2>
                    <div className="device-parameter">
                        <ul>
                            {RowItemParams}
                        </ul>

                    </div>
                    <div className="parameter-footer">
                        <span onClick={this.clearFilterParameter.bind(this)} className="remove">Clear</span>
                        <span onClick={this.addFilterParameter.bind(this)} className="add">Add</span>
                    </div>
                </div>
                : ""}

        </div>
    );
};