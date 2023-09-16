import BaseComponent from '../../BaseComponent';
import LoginJsx from './Login.jsx';
import { withTranslation } from 'react-i18next';
import LoginValidate from './LoginValidate';
import Libs from '../../../utils/Libs';
import Constants from '../../../utils/Constants';
import EmployeeService from '../../../services/EmployeeService';

class Login extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = LoginJsx;
        this.state = {
            curItem: {},
            lang: "en"
        };
    }

    async componentWillMount() {
        await localStorage.clear();
        // if (!Libs.isBlank(localStorage.getItem(Constants.COMMON.TOKEN))) {
        //     window.location.href = Constants.SITE_URL.DEFAULT_PAGE;
        //     return;
        // }
        // else await localStorage.clear()
    }


    async onSaveAction() {
        let curItem = this.state.curItem, self = this;
        let user = {
            email: curItem.email,
            password: Libs.SHA3(curItem.password),
            lang: this.state.lang
        };

        let v = new LoginValidate(this.props);
        let errors = await v.FLValidationAll(curItem);
        if (errors) {
            this.setValidateMessage(errors);
            return;
        }
        var { t } = this.props;
        EmployeeService.instance.getLogin(user, function (data) {
            if (!Libs.isObjectEmpty(data)) {
                self.setAccessParam(data);
                var permissions = data.permissions;
                var dashboard = permissions["/dashboard"];
                var main = permissions["/main"];
                if(!Libs.isObjectEmpty(main) && main.auth > 0){
                    window.location.href = Constants.SITE_URL.DEFAULT_MAIN;
                } else if (!Libs.isObjectEmpty(dashboard) && dashboard.auth > 0){
                    window.location.href = Constants.SITE_URL.DEFAULT_PAGE;
                }

                return;
            }
            else {
                self.toast(t('login.error'), "error");
            }
        }, false);
    }


    /**
   * set user login parameters to localstore
   * @param {object} param 
   * @param {string} lang 
   */
    setAccessParam(param) {
        let token = param.token;
        let permissions = param.permissions;
        var type = 'dashboard';
        var dashboard = permissions["/dashboard"];
        var main = permissions["/main"];
        if(!Libs.isObjectEmpty(main) && main.auth > 0){
            type = 'main';
        } else if (!Libs.isObjectEmpty(dashboard) && dashboard.auth > 0){
            type = 'dashboard';
        }

        localStorage.setItem(Constants.COMMON.TOKEN, token);
        let jsonPermissions = JSON.stringify(permissions);
        localStorage.setItem(Constants.COMMON.ACCESS_PARAM, Libs.base64Encrypt(jsonPermissions));
        var lang = 'en';
        var id_language = '';
        if (Libs.isArrayData(param.languages)) {
            var findItemLang = Libs.find(param.languages, 'is_default', 1);
            if (!Libs.isObjectEmpty(findItemLang)) {
                lang = findItemLang.iso_code;
                id_language = findItemLang.id;
            }
        }

        let info = {
            lang: lang,
            id_language: id_language,
            email: param.email,
            first_name: param.first_name,
            last_name: param.last_name,
            full_name: param.full_name,
            avatar: param.avatar,
            id_employee: param.id_employee,
            timeout: param.timeout,
            roles: param.roles,
            languages: param.languages,
            menu_collapse: true,
            type: type
        }
        let jsonUser = JSON.stringify(info);
        localStorage.setItem(Constants.COMMON.EMPLOYEE_INFO, Libs.base64Encrypt(jsonUser));
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
            let v = new LoginValidate(this.props);
            let error = await v.validateOne(param, name);
            if (error != null) {
                this.setValidateMessage(error, true);
            }
        }
    }

    render() {
        if (!localStorage.getItem(Constants.COMMON.TOKEN)) {
            return this.jsxTemplate.call(this);
        }
        return null;
    }

}

const HighOrderComponentTranslated = withTranslation('common')(Login)
export default HighOrderComponentTranslated;