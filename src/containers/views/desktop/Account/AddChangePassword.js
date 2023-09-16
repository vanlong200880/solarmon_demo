
import BaseComponent from '../../../BaseComponent';
import Libs from '../../../../utils/Libs';
import Constants from '../../../../utils/Constants';
import AddChangePasswordJsx from './AddChangePassword.jsx';
import AddChangePasswordValidate from './AddChangePasswordValidate';
import EmployeeService from '../../../../services/EmployeeService';

class AddChangePassword extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: {}
        }

        this.jsxTemplate = AddChangePasswordJsx;
    }


    generatePassword() {
        var curItem = this.state.curItem;
        var password = Libs.generateStrRandom(2, 2, 2, 2);
        curItem.password = password;
        curItem.password_confirm = password;
        this.setState({ curItem: curItem });
        this.setValidateMessage({ password: '' }, true);
        this.setValidateMessage({ password_confirm: '' }, true);
    }



    /**
     * @description validate a field input
     * @author Long.Pham 12/05/2021
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
            let v = new AddChangePasswordValidate(this.props);
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

    /**
     * @description save data
     * @author long.pham 12/05/2021
     */
    async onSave() {
        var { t } = this.props;
        var curItem = this.state.curItem, self = this;
        var params = Object.assign({}, this.state.curItem);
        var screenMode = Constants.SCREEN_MODE.EDIT;
        let v = new AddChangePasswordValidate(this.props);
        let errors = await v.FLValidationAll(params);

        if (!Libs.isBlank(curItem.password) || !Libs.isBlank(curItem.password_confirm)) {
            const regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
            var password = curItem.password;
            if (password.length < 8 || regexp.exec(password) === null) {
                errors = Object.assign(Libs.isObjectEmpty(errors) ? {} : errors, { password: t('employee.password_valid_min_8character') });
            } else {
                if (!Libs.isObjectEmpty(errors)) {
                    delete errors[password];
                }
            }

            var password_confirm = curItem.password_confirm;
            if (password_confirm !== password || Libs.isBlank(curItem.password_confirm)) {
                errors = Object.assign(Libs.isObjectEmpty(errors) ? {} : errors, { password_confirm: t('employee.password_incorrect') });
            } else {
                if (!Libs.isObjectEmpty(errors)) {
                    delete errors[password_confirm];
                }
            }
        }

        if (errors) {
            this.setValidateMessage(errors);
            return;
        }

        //remove message validation
        this.removeAllValidateMessage();
        params.screen_mode = screenMode;
        params.iso_code = this.employee.iso_code;
        params.email = this.employee.email;
        params.password = Libs.SHA3(curItem.password);
        params.current_password = Libs.SHA3(curItem.current_password);
        params.id = this.employee.id_employee;

        delete params.password_confirm;
        EmployeeService.instance.employeeChangePassword(params, (status, data, msg) => {
            if (status) {
                self.toast(msg, 'info');
                self.props.onCloseChangePassword();
            } else {
                if (data) {
                    self.setValidateMessage(data);
                } else {
                    if (!Libs.isBlank(msg)) {
                        self.toast(msg, 'error');
                    }
                }

            }
        }, true);
    }
}
export default AddChangePassword;