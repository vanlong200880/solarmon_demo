import React from 'react';
import { RText, RCheckbox } from '../../../../../../components/Controls';

export default function AlertTrigger() {
    const { t } = this.props;
    var { itemDevice, curItem } = this.state;

    var showString = false;
    switch (parseInt(itemDevice.id_device_type)) {
        case 1: // inverter
        case 4: // meter
            showString = true;
            break;
        default:
            showString = false;
            break;
    }


    return (
        <div className="setting">
            <div className="title">
                <h2>Component: {itemDevice.name}</h2>
            </div>
            <div className="main-setting">
                <div className="row">
                    <div className="col-md-12">
                        <div className="item">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3><img src="/system-disconnect.png" /> System Disconnect</h3>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <RCheckbox
                                            label={"Enable System Disconnect Alerts"}
                                            inputId="enable_system_disconnect"
                                            inputName="enable_system_disconnect"
                                            labelClass="no-label"
                                            disabled={true}
                                            checked={curItem.enable_system_disconnect}
                                            onChange={(e) => { this.handleInputChange(e); }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <label>Time Threshold</label>
                                </div>
                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <RText
                                            inputClass="form-control"
                                            inputId="sd_time_threshold"
                                            inputName="sd_time_threshold"
                                            value={curItem.sd_time_threshold}
                                            pattern="^[0-9-.]*$"
                                            disabled={true}
                                            onChange={(e) => { this.handleInputChange(e); }}
                                            maxLength={20} />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <label>hours</label>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-4">
                                    <label>Sunrise/Sunset Buffer</label>
                                </div>
                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <RText
                                            inputClass="form-control"
                                            inputId="sd_sunrise_sunset"
                                            inputName="sd_sunrise_sunset"
                                            pattern="^[0-9-.]*$"
                                            value={curItem.sd_sunrise_sunset}
                                            disabled={true}
                                            onChange={(e) => { this.handleInputChange(e); }}
                                            maxLength={20} />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    {/* The disconnect condition must continue for the time period defined by the threshold before generating an alert. Allowed thresholds are 0.25 to 672 hours. */}
                                    <label>hours</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="item">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3><img src="/device-faults.png" /> Device Faults</h3>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <RCheckbox
                                            label={"Enable Device Faults"}
                                            inputId="enable_device_faults"
                                            inputName="enable_device_faults"
                                            labelClass="no-label"
                                            disabled={true}
                                            checked={curItem.enable_device_faults}
                                            onChange={(e) => { this.handleInputChange(e); }}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {showString ?
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="item">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h3><img src="/zero-generation.png" /> Zero Generation</h3>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <RCheckbox
                                                        label={"Enable Zero Generation Alerts"}
                                                        inputId="enable_zeo_generation"
                                                        inputName="enable_zeo_generation"
                                                        labelClass="no-label"
                                                        disabled={true}
                                                        checked={curItem.enable_zeo_generation}
                                                        onChange={(e) => { this.handleInputChange(e); }}
                                                    />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Time Threshold</label>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="mb-3">
                                                    <RText
                                                        inputClass="form-control"
                                                        inputId="zg_time_threshold"
                                                        inputName="zg_time_threshold"
                                                        value={curItem.zg_time_threshold}
                                                        pattern="^[0-9-.]*$"
                                                        disabled={true}
                                                        onChange={(e) => { this.handleInputChange(e); }}
                                                        maxLength={20} />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <label>daylight hours</label>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Sunrise/Sunset Buffer</label>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="mb-3">
                                                    <RText
                                                        inputClass="form-control"
                                                        inputId="emazg_sunrise_sunsetil"
                                                        inputName="zg_sunrise_sunset"
                                                        value={curItem.zg_sunrise_sunset}
                                                        pattern="^[0-9-.]*$"
                                                        disabled={true}
                                                        onChange={(e) => { this.handleInputChange(e); }}
                                                        maxLength={20} />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <label>hours</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="item">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h3><img src="/string-performance.png" /> String Performance</h3>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <RCheckbox
                                                        label={"Enable String Performance Alerts"}
                                                        inputId="enable_string_performance"
                                                        inputName="enable_string_performance"
                                                        labelClass="no-label"
                                                        disabled={true}
                                                        checked={curItem.enable_string_performance}
                                                        onChange={(e) => { this.handleInputChange(e); }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>String Performance Ratio</label>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="mb-3">
                                                    <RText
                                                        inputClass="form-control"
                                                        inputId="sp_ratio"
                                                        inputName="sp_ratio"
                                                        value={curItem.sp_ratio}
                                                        pattern="^[0-9-.]*$"
                                                        disabled={true}
                                                        onChange={(e) => { this.handleInputChange(e); }}
                                                        maxLength={20} />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <label></label>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Time Threshold</label>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="mb-3">
                                                    <RText
                                                        inputClass="form-control"
                                                        inputId="sp_time_threshold"
                                                        inputName="sp_time_threshold"
                                                        value={curItem.sp_time_threshold}
                                                        pattern="^[0-9-.]*$"
                                                        disabled={true}
                                                        onChange={(e) => { this.handleInputChange(e); }}
                                                        maxLength={20} />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <label>daylight hours</label>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>DC Current Threshold</label>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="mb-3">
                                                    <RText
                                                        inputClass="form-control"
                                                        inputId="sp_dc_current_threshold"
                                                        inputName="sp_dc_current_threshold"
                                                        value={curItem.sp_dc_current_threshold}
                                                        pattern="^[0-9-.]*$"
                                                        disabled={true}
                                                        onChange={(e) => { this.handleInputChange(e); }}
                                                        maxLength={20} />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <label>amps</label>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Sunrise/Sunset Buffer</label>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="mb-3">
                                                    <RText
                                                        inputClass="form-control"
                                                        inputId="sp_sunrise_sunset"
                                                        inputName="sp_sunrise_sunset"
                                                        value={curItem.sp_sunrise_sunset}
                                                        pattern="^[0-9-.]*$"
                                                        disabled={true}
                                                        onChange={(e) => { this.handleInputChange(e); }}
                                                        maxLength={20} />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <label>hours</label>
                                            </div>
                                        </div>



                                    </div>
                                </div>



                                <div className="col-md-12">
                                    <div className="item">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h3><img src="/performance-index.png" /> Performance Index</h3>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <RCheckbox
                                                        label={"Enable Performance Index Alerts"}
                                                        inputId="enable_performance_index"
                                                        inputName="enable_performance_index"
                                                        labelClass="no-label"
                                                        disabled={true}
                                                        checked={curItem.enable_performance_index}
                                                        onChange={(e) => { this.handleInputChange(e); }}
                                                    />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Performance Index Value</label>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="mb-3">
                                                    <RText
                                                        inputClass="form-control"
                                                        inputId="pi_index_value"
                                                        inputName="pi_index_value"
                                                        value={curItem.pi_index_value}
                                                        pattern="^[0-9-.]*$"
                                                        disabled={true}
                                                        onChange={(e) => { this.handleInputChange(e); }}
                                                        maxLength={20} />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <label></label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Time Threshold</label>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="mb-3">
                                                    <RText
                                                        inputClass="form-control"
                                                        inputId="pi_time_threshold"
                                                        inputName="pi_time_threshold"
                                                        pattern="^[0-9-.]*$"
                                                        disabled={true}
                                                        value={curItem.pi_time_threshold}
                                                        onChange={(e) => { this.handleInputChange(e); }}
                                                        maxLength={20} />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <label>daylight hours</label>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Sunrise/Sunset Buffer</label>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="mb-3">
                                                    <RText
                                                        inputClass="form-control"
                                                        pattern="^[0-9-.]*$"
                                                        inputId="pi_sunrise_sunset"
                                                        inputName="pi_sunrise_sunset"
                                                        value={curItem.pi_sunrise_sunset}
                                                        disabled={true}
                                                        onChange={(e) => { this.handleInputChange(e); }}
                                                        maxLength={20} />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <label>hours</label>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                        : ""}


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
    );
};