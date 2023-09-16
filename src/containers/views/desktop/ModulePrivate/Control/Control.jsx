import React from 'react';
import Manual from './Manual/Manual';
import Auto from './Auto/Auto';
import MenuPrivateProject from '../../../../common/MenuPrivateProject/MenuPrivateProject';
import './Device.scss';

export default function Control() {
    const { t } = this.props;
    var { type } = this.state;
    var layout = null;
    switch (this.state.type) {
        case 1:
            layout = <Auto hash_id={this.state.hash_id} key={Math.random()} auth={this.props.auth} actions={this.actions} t={t} />
            break;
        case 2:
            layout = <Manual hash_id={this.state.hash_id} key={Math.random()} auth={this.props.auth} actions={this.actions} t={t} />
            break
    }

    return (
        <div className="devices">
            <MenuPrivateProject hash_id={this.state.hash_id} key={Math.random()} />
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-md-6">
                        <div className="device-tab-scada">
                            <ol>
                                <li onClick={this.setTabOnOff.bind(this, 1)} className={type == 1 ? "active" : ""}>{t('device.scheduled_control')}</li>
                                <li onClick={this.setTabOnOff.bind(this, 2)} className={type == 2 ? "active" : ""}>{t('device.export_limitation_control')}</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            {layout}
        </div>
    );
};