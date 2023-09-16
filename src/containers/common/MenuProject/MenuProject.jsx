import React from 'react';
import { NavLink } from 'react-router-dom';
import Libs from '../../../utils/Libs';
import Constants from '../../../utils/Constants';
import Auth from '../../../utils/Auth';

export default function MenuProject() {
    const { t } = this.props;
    const { pathname } = window.location;
    let info = localStorage.getItem(Constants.COMMON.ACCESS_PARAM);
    let permissions = JSON.parse(Libs.base64Decrypt(info));

    return (
        <div className="sidebar-top">
            <ul>


                {!Libs.isObjectEmpty(permissions) && !Libs.isBlank(permissions['/dashboard']) && Auth.getPermisson(permissions['/dashboard'].auth, Constants.AUTH_MODE.VIEW) ?
                    <li><NavLink to="/dashboard">{t('common.plant')}</NavLink></li>
                    : ""}

                {!Libs.isObjectEmpty(permissions) && !Libs.isBlank(permissions['/project/:id/dashboard']) && Auth.getPermisson(permissions['/project/:id/dashboard'].auth, Constants.AUTH_MODE.VIEW) ?
                    <li>
                        <NavLink
                            isActive={() => [
                                '/project/' + this.state.hash_id,
                                '/project/' + this.state.hash_id + '/dashboard'
                            ].includes(pathname)}

                            to={"/project/" + this.state.hash_id + "/dashboard"}>{t('common.dashboard')}</NavLink></li>
                    : ""}

                {!Libs.isObjectEmpty(permissions) && !Libs.isBlank(permissions['/project/:id/devices']) && Auth.getPermisson(permissions['/project/:id/devices'].auth, Constants.AUTH_MODE.VIEW) ?
                    <li><NavLink to={"/project/" + this.state.hash_id + "/devices"}>{t('common.device')}</NavLink></li>
                    : ""}

                {!Libs.isObjectEmpty(permissions) && !Libs.isBlank(permissions['/project/:id/activities']) && Auth.getPermisson(permissions['/project/:id/activities'].auth, Constants.AUTH_MODE.VIEW) ?
                    <li><NavLink to={"/project/" + this.state.hash_id + "/activities"}>{t('common.alert')}</NavLink></li>
                    : ""}

                {!Libs.isObjectEmpty(permissions) && !Libs.isBlank(permissions['/project/:id/analytics']) && Auth.getPermisson(permissions['/project/:id/analytics'].auth, Constants.AUTH_MODE.VIEW) ?
                    <li><NavLink to={"/project/" + this.state.hash_id + "/analytics"}>{t('common.analytics')}</NavLink></li>
                    : ""}


                {!Libs.isObjectEmpty(permissions) && !Libs.isBlank(permissions['/project/:id/reports']) && Auth.getPermisson(permissions['/project/:id/reports'].auth, Constants.AUTH_MODE.VIEW) ?
                    <li><NavLink to={"/project/" + this.state.hash_id + "/reports"}>{t('common.report')}</NavLink></li>
                    : ""}

                {!Libs.isObjectEmpty(permissions) && !Libs.isBlank(permissions['/project/:id/config']) && Auth.getPermisson(permissions['/project/:id/config'].auth, Constants.AUTH_MODE.VIEW) ?
                    <li><NavLink to={"/project/" + this.state.hash_id + "/config"}>{t('common.config')}</NavLink></li>
                    : ""}

            </ul>
        </div>
    );
};