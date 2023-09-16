import BaseComponent from '../../BaseComponent';
import ForgotPasswordJsx from './ForgotPassword.jsx';
import { withTranslation } from 'react-i18next';
import ForgotPasswordValidate from './ForgotPasswordValidate';
import Libs from '../../../utils/Libs';
import EmployeeService from '../../../services/EmployeeService';

class ForgotPassword extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = ForgotPasswordJsx;
        this.state = {
            curItem: {},
            lang: "en",
            message: ""
        };
    }


    async onSaveAction() {
        let curItem = this.state.curItem, self = this;
        let user = {
            email: curItem.email,
            lang: this.state.lang,
            iso_code: curItem.iso_code
        };

        let v = new ForgotPasswordValidate(this.props);
        let errors = await v.FLValidationAll(curItem);
        if (errors) {
            this.setValidateMessage(errors);
            return;
        }
        var { t } = this.props;
        EmployeeService.instance.getForgotPassword(user, function (data) {
            if (!Libs.isObjectEmpty(data)) {
                self.setState({
                    message: t('forgot_password.success')
                })

            } else {
                self.toast(t('forgot_password.error'), "error");
            }
        }, false);
    }


    /**
     * @description validate a field input
     * @author Long.Pham 13/06/2021
     * @param {*} event 
     */
    async validateOne(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value
        if (name) {
            let param = {
                [name]: value
            }
            let v = new ForgotPasswordValidate(this.props);
            let error = await v.validateOne(param, name);
            if (error != null) {
                this.setValidateMessage(error, true);
            }
        }
    }

    render() {
        return this.jsxTemplate.call(this);
    }

}

const HighOrderComponentTranslated = withTranslation('common')(ForgotPassword)
export default HighOrderComponentTranslated;