import React from 'react';
import { RCheckbox } from '../../../../../../components/Controls';
import Libs from '../../../../../../utils/Libs';

export default function DataField() {
    const { t } = this.props;
    var { itemDevice, curItem, dataFields } = this.state;
    var i = 24;
    switch (parseInt(itemDevice.id_device_group)) {
        case 18: // 6 string 
        case 21: // 6 string 
            i = 6;
            break;
        case 28: // 12 string
            i = 12;
            break;
        default:
            i = 24;
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
                                    <h3>Measured</h3>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        Field
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    Enable
                                </div>

                            </div>

                            {Libs.isArrayData(dataFields) ?
                                dataFields.slice(0, i).map((item, index) => {
                                    return (
                                        <div className="row" key={index}>
                                            <div className="col-md-4">
                                                {item.name}
                                            </div>
                                            <div className="col-md-8">
                                                <RCheckbox
                                                    inputId={item.key}
                                                    inputName={item.key}
                                                    labelClass="no-label"
                                                    disabled={itemDevice.id ? false : true}
                                                    checked={curItem[item.key]}
                                                    onChange={(e) => { this.handleInputChange(e, index); }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                                : ""}

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <button type="button" disabled={itemDevice.id ? false : true} className="btn btn-save" onClick={this.onSave.bind(this)}>
                                            {t('common.save')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};