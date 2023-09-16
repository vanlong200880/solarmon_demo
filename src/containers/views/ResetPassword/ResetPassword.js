import BaseComponent from '../../BaseComponent';
import ResetPasswordJsx from './ResetPassword.jsx';
import { withTranslation } from 'react-i18next';
import ResetPasswordValidate from './ResetPasswordValidate';
import Libs from '../../../utils/Libs';
import Constants from '../../../utils/Constants';
import EmployeeService from '../../../services/EmployeeService';

class ResetPassword extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = ResetPasswordJsx;
        this.state = {
            curItem: {}
        };
    }

    async onSaveAction() {
        var { t } = this.props;
        let curItem = this.state.curItem, self = this;
        var errorFlag = false;
        var token = '';
        if (Libs.isBlank(this.props) || Libs.isBlank(this.props.location) || Libs.isBlank(this.props.location.search)) {
            window.location.href = Constants.SITE_URL.LOGIN;
        }
        token = this.props.location.search;
        token = token.replace("?token=", "");

        if (Libs.isBlank(token)) {
            window.location.href = Constants.SITE_URL.LOGIN;
        }

        let user = {
            password: Libs.SHA3(curItem.password),
            token: token
        };

        let v = new ResetPasswordValidate(this.props);
        let errors = await v.FLValidationAll(curItem);
        if (!Libs.isBlank(curItem.password) || !Libs.isBlank(curItem.password_confirm)) {
            const regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
            var password = curItem.password;
            if (password.length < 8 || regexp.exec(password) === null) {
                errors = Object.assign(Libs.isObjectEmpty(errors) ? {} : errors, { password: t('employee.password_valid_min_8character') });
                errorFlag = true;
            } else {
                if (!Libs.isObjectEmpty(errors)) {
                    delete errors[password];
                }
                errorFlag = false;
            }

            var password_confirm = curItem.password_confirm;
            if (password_confirm !== password || Libs.isBlank(curItem.password_confirm)) {
                errors = Object.assign(Libs.isObjectEmpty(errors) ? {} : errors, { password_confirm: t('employee.password_incorrect') });
                errorFlag = true;
            } else {
                errorFlag = false;
                if (!Libs.isObjectEmpty(errors)) {
                    delete errors[password_confirm];
                }
            }
        }


        if (errors) {
            this.setValidateMessage(errors, true);
            errorFlag = true;
            return;
        }
        //remove message validation
        this.removeAllValidateMessage();
        if (errorFlag) {
            return;
        }


        EmployeeService.instance.getResetPassword(user, function (data, status, mess) {
            if (!Libs.isObjectEmpty(data)) {
                self.toast(mess, "info");
                setTimeout(
                    function () { window.location.href = Constants.SITE_URL.LOGIN; }.bind(this), 2000
                );
            }
            else {
                self.toast(mess, "error");
            }
        }, false);
    }


    /**
     * @description validate a field input
     * @author Long.Pham 13/06/2021
     * @param {*} event 
     */
    async validateOne(event) {
        var { t } = this.props;
        let target = event.target;
        let name = target.name;
        let value = target.value;
        var curItem = this.state.curItem;
        if (name) {
            let param = {
                [name]: value
            }
            let v = new ResetPasswordValidate(this.props);
            let error = await v.validateOne(param, name);
            const regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
            if (name === 'password') {
                if (value.length < 8 || regexp.exec(value) === null) {
                    error = { password: t('employee.password_valid_min_8character') };
                } else {
                    error = { password: '' };
                }
            }

            if (name === 'password_confirm' && Libs.isBlank(error.password_confirm)) {
                if (curItem.password !== value) {
                    error = { password_confirm: t('employee.password_incorrect') };
                } else {
                    error = { password_confirm: '' };
                }
            }

            if (error != null) {
                this.setValidateMessage(error, true);
            }
        }
    }

    render() {
        return this.jsxTemplate.call(this);
    }

}

const HighOrderComponentTranslated = withTranslation('common')(ResetPassword)
export default HighOrderComponentTranslated;