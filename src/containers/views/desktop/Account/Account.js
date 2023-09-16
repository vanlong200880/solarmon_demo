import BaseComponent from '../../../BaseComponent';
import AccountJsx from './Account.jsx';
import { withTranslation } from 'react-i18next';
import AccountValidate from './AccountValidate';
import Libs from '../../../../utils/Libs';
import Constants from '../../../../utils/Constants';
import EmployeeService from '../../../../services/EmployeeService';
import './Account.scss';

class Account extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = AccountJsx;
        this.state = {
            curItem: {
                max_date: Libs.getCurrentDDMMYYYY()
            },
            add: false
        };
    }

    componentDidMount() {
        this.getDetail();
    }

    onAddChangePassword = () => {
        this.setState({
            add: true
        })
    }

    onCloseChangePassword = () => {
        this.setState({
            add: false
        })
    }

    /**
     * get employee detail
     * @author Long.Pham 15/06/2021
     */
    getDetail() {
        let self = this, curItem = this.state.curItem;
        var params = {
            id: this.employee.id_employee,
            iso_code: this.employee.iso_code
        };

        EmployeeService.instance.getDetailEmployee(params, (status, msg, data) => {
            if (status) {
                if (data != null) {
                    self.setState({ curItem: Object.assign(curItem, data) });
                }
            } else {
                self.toast(msg, "error");
            }
        })
    }

    async onSaveAction() {
        var curItem = this.state.curItem, self = this;
        var screenMode = Constants.SCREEN_MODE.EDIT;
        let v = new AccountValidate(this.props);
        let errors = await v.FLValidationAll(curItem);
        if (errors) {
            this.setValidateMessage(errors);
            return;
        }
        //remove message validation
        this.removeAllValidateMessage();
        curItem.screen_mode = screenMode;
        curItem.iso_code = this.employee.iso_code;
        var params = Object.assign({}, curItem);

        EmployeeService.instance.saveUpdateProfile(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                let info = localStorage.getItem(Constants.COMMON.EMPLOYEE_INFO);
                let employeeInfo = JSON.parse(Libs.base64Decrypt(info));
                employeeInfo.first_name = data.first_name;
                employeeInfo.last_name = data.last_name;
                employeeInfo.full_name = data.first_name + " " + data.last_name;
                employeeInfo.avatar = data.avatar;
                let jsonUser = JSON.stringify(employeeInfo);
                localStorage.setItem(Constants.COMMON.EMPLOYEE_INFO, Libs.base64Encrypt(jsonUser));
                setTimeout(function () {
                    window.location.reload();
                }, 4000);

            }
            else if (data) {
                self.setValidateMessage(data);
            }
            else if (!Libs.isBlank(msg)) {
                self.toast(msg, "error");
            }
        }, true);

    }


    /**
     * @description Upload icon  
     * @author Long.Pham 12/05/2021
     */
    onFileAvatarChange = (event) => {
        var { t } = this.props;
        var target = event.target;
        var file = target.files[0];
        if (!file || file === undefined || file === null) return;
        var fileName = file.name, fileSize = file.size;
        var checkExtFile = Libs.checkExtensionFile(fileName, 1);
        var msgAvatarError = null;
        if (!checkExtFile) {
            msgAvatarError = t('message.msg_err_ext_image_file')
        }
        else if (fileSize <= 0) {
            msgAvatarError = t('message.msg_err_file_size');
        }
        else if (fileSize > Constants.COMMON.MAX_IMAGE_SIZE) {
            msgAvatarError = t('message.msg_err_max_size_upload');
        }

        var self = this;
        var { curItem } = this.state;
        if (!Libs.isBlank(msgAvatarError)) {
            curItem.file_upload = '';
            curItem.file_message = msgAvatarError;
            this.setState({
                curItem: curItem
            });

            return;
        } else {
            curItem.file_message = '';
            this.setState({
                curItem: curItem
            });
        }

        //Read file upload
        var reader = new FileReader();
        reader.onload = function (e) {
            curItem.file_upload = e.target.result;
            curItem.file_name = fileName;
            self.setState({
                curItem: curItem
            });
        };
        reader.readAsDataURL(file);
    }


    /**
     * @description Delete icon upload 
     * @author Long.Pham 12/05/2021
     */
    onClickDeleteAvatar = (event) => {
        var { curItem } = this.state;
        curItem.file_message = '';
        curItem.file_upload = '';
        curItem.avatar_full = null;

        this.setState({
            curItem: curItem
        });
    }

    /**
     * @description validate a field input
     * @author Long.Pham 12/05/2021
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
            let v = new AccountValidate(this.props);
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

const HighOrderComponentTranslated = withTranslation('common')(Account)
export default HighOrderComponentTranslated;