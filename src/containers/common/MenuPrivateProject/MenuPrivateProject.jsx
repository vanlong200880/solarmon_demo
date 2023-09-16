import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MenuPrivateProject() {
    const { t } = this.props;
    const { pathname } = window.location;

    console.log("this.props.hash_id", this.props.hash_id);
    return (
        <div className="sidebar-top">
            <ul>
                <li><NavLink to="/main">{t('common.plant')}</NavLink></li>
                <li><NavLink
                    isActive={() => [
                        '/private/' + this.state.hash_id,
                        '/private/' + this.state.hash_id + '/dashboard'
                    ].includes(pathname)}

                    to={"/private/" + this.state.hash_id + "/dashboard"}>{t('common.dashboard')}</NavLink></li>
                <li><NavLink to={"/private/" + this.state.hash_id + "/devices"}>{t('common.device')}</NavLink></li>
                <li><NavLink onClick={this.setActivePage.bind(this)}  to={"/private/" + this.state.hash_id + "/activities"}>{t('common.alert')}</NavLink></li>
                <li><NavLink to={"/private/" + this.state.hash_id + "/analytics"}>{t('common.analytics')}</NavLink></li>
                <li><NavLink to={"/private/" + this.state.hash_id + "/reports"}>{t('common.report')}</NavLink></li>
                <li><NavLink to={"/private/" + this.state.hash_id + "/config"}>{t('common.config')}</NavLink></li>
                <li><NavLink to={"/private/" + this.state.hash_id + "/control"}>{t('common.control')}</NavLink></li>
            </ul>
        </div>
    );
};
