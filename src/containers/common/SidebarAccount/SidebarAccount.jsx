import React from 'react';
import NavLink from '../../../components/Link';
import Libs from '../../../utils/Libs';
import Constants from '../../../utils/Constants';
import Auth from '../../../utils/Auth';

export default function SidebarAccount() {
    let info = localStorage.getItem(Constants.COMMON.EMPLOYEE_INFO);
    let employee = JSON.parse(Libs.base64Decrypt(info));
    var { t } = this.props;
    let infoP = localStorage.getItem(Constants.COMMON.ACCESS_PARAM);
    let permissions = JSON.parse(Libs.base64Decrypt(infoP));

    return (
        <div className="sidebar-profile">
            <div className="title">
                <div className="avatar">
                    <span>
                        {employee.avatar !== null ? <img src={Constants.SERVER_DATA + "/" + employee.avatar} alt="Avatar" /> : <var className="icon-man-people-streamline-user"></var>}
                    </span>
                </div>
                <h2>{employee.full_name}</h2>
                <p>{t('account.manage_account')}</p>
            </div>
            <div className="content">
                <ul>
                    <li><NavLink to="/notify"><var className="icon icon-alert"></var>{t('account.alerts')}</NavLink></li>
                    <li><NavLink to="/user/documents"><var className="icon icon-book"></var>{t('account.documents')}</NavLink></li>
                    {!Libs.isObjectEmpty(permissions) && !Libs.isBlank(permissions['/user/config-receive-email']) && Auth.getPermisson(permissions['/user/config-receive-email'].auth, Constants.AUTH_MODE.VIEW) ?
                                                        <li><NavLink to="/user/config-receive-email"><var className="icon-email-mail-streamline"></var>{t('account.mail_notify')}</NavLink></li>
                                                        : ""}

                    
                    <li><NavLink to="/" onClick={this.logout.bind(this)} ><var className="icon icon-logout"></var>{t('account.logout')}</NavLink></li>

                </ul>
            </div>

        </div>
    );
};