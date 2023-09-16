import React from 'react';
import { RText } from '../../../../../../components/Controls';

export default function PVModelSetting() {
    const { t } = this.props;
    var { itemDevice, curItem } = this.state;

    return (
        <div className="setting">
            <div className="title">
                <h2>Component: {itemDevice.name}</h2>
            </div>
            <div className="main-setting">
                <div className="row">
                    <div className="col-md-7">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="item">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>DC Size</label>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="mb-3">
                                                <RText
                                                    inputClass="form-control"
                                                    inputId="dc_size"
                                                    inputName="dc_size"
                                                    value={curItem.dc_size}
                                                    disabled={true}
                                                    onChange={(e) => { this.handleInputChange(e); }}
                                                    pattern="^[0-9-.]*$"
                                                    maxLength={20} />
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <label>kW</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="item">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3>PV Model</h3>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Data Input for POA Irradiance</label>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="mb-3">
                                                <RText
                                                    inputClass="form-control"
                                                    inputId="poa_irradiance"
                                                    inputName="poa_irradiance"
                                                    disabled={true}
                                                    value={curItem.poa_irradiance}
                                                    pattern="^[0-9-.]*$"
                                                    onChange={(e) => { this.handleInputChange(e); }}
                                                    maxLength={20} />
                                            </div>
                                        </div>

                                    </div>


                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Data Input for Panel Temperature</label>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="mb-3">
                                                <RText
                                                    inputClass="form-control"
                                                    inputId="panel_temperature"
                                                    inputName="panel_temperature"
                                                    disabled={true}
                                                    value={curItem.panel_temperature}
                                                    pattern="^[0-9-.]*$"
                                                    onChange={(e) => { this.handleInputChange(e); }}
                                                    maxLength={20} />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Temperature Coefficient</label>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="mb-3">
                                                <RText
                                                    inputClass="form-control"
                                                    inputId="temperature_coefficient"
                                                    inputName="temperature_coefficient"
                                                    disabled={true}
                                                    value={curItem.temperature_coefficient}
                                                    pattern="^[0-9-.]*$"
                                                    onChange={(e) => { this.handleInputChange(e); }}
                                                    maxLength={20} />
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <label> % / °C</label>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>System Losses</label>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="mb-3">
                                                <RText
                                                    inputClass="form-control"
                                                    inputId="system_losses"
                                                    inputName="system_losses"
                                                    disabled={true}
                                                    value={curItem.system_losses}
                                                    pattern="^[0-9-.]*$"
                                                    onChange={(e) => { this.handleInputChange(e); }}
                                                    maxLength={20} />
                                            </div>
                                        </div>
                                        <div className="col-md-5">

                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Inverter Efficiency</label>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="mb-3">
                                                <RText
                                                    inputClass="form-control"
                                                    inputId="inverter_efficiency"
                                                    inputName="inverter_efficiency"
                                                    disabled={true}
                                                    value={curItem.inverter_efficiency}
                                                    pattern="^[0-9-.]*$"
                                                    onChange={(e) => { this.handleInputChange(e); }}
                                                    maxLength={20} />
                                            </div>
                                        </div>
                                        <div className="col-md-5">

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Max AC Output</label>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="mb-3">
                                                <RText
                                                    inputClass="form-control"
                                                    inputId="max_ac_output"
                                                    inputName="max_ac_output"
                                                    disabled={true}
                                                    value={curItem.max_ac_output}
                                                    pattern="^[0-9-.]*$"
                                                    onChange={(e) => { this.handleInputChange(e); }}
                                                    maxLength={20} />
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <label>kW AC</label>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <button type="button" disabled={true} className="btn btn-save" onClick={this.onSave.bind(this)}>
                                                    {t('common.save')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>
                    <div className="col-md-5">
                        <img src="/pv-model-setting.png" />
                    </div>
                </div>

            </div>
        </div>
    );
};