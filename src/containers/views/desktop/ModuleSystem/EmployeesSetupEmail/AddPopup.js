
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import Constants from '../../../../../utils/Constants';
import AddPopupJsx from './AddPopup.jsx';
import AddPopupValidate from './AddPopupValidate';
import RoleService from '../../../../../services/RoleService';
import EmployeeService from '../../../../../services/EmployeeService';

class AddPopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: this.props.curItem,
            allLanguage: this.props.allLanguage,
            dataRoles: [],
            dataRegency: []
        }

        this.jsxTemplate = AddPopupJsx;
    }
    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 12/05/2021
     */
    componentDidMount() {
        var curItem = this.state.curItem;
        if (curItem.screen_mode === Constants.SCREEN_MODE.ADD) {
            curItem.status = 1;
            curItem.role_data = [];
            curItem.regency_data = [];
        }
        this.getDataRole();
        // this.getDataRegency();
    }

    /**
     * setValue method to Input
     * @author Long.Pham 2019-01-17
     */
    handleRoleInputChange(event, index) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }
        if (name) {
            let { curItem, dataRoles } = this.state;

            var role_data = curItem.role_data;
            var item = dataRoles[index];
            if (Libs.isObjectEmpty(item)) return;

            if (value === 1) {
                role_data.push({
                    id_employee: '',
                    id_role: item.id
                });
            } else {
                if (Libs.isArrayData(role_data)) {
                    role_data.map((v, index) => {
                        if (v.id_role === item.id) {
                            role_data.splice(index, 1);
                        }
                    })
                }
            }

            dataRoles[index].is_checked = value;
            curItem.role_data = role_data;

            if (Libs.isArrayData(role_data)) {
                curItem.role_message = null;
            }

            this.setState({
                curItem: curItem,
                dataRoles: dataRoles
            });
        }
    }


    /**
     * setValue method to Input
     * @author Long.Pham 2019-01-17
     */
    handleRegencyInputChange(event, index) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }
        if (name) {
            let { curItem, dataRegency } = this.state;

            var regency_data = curItem.regency_data;
            var item = dataRegency[index];
            if (Libs.isObjectEmpty(item)) return;

            if (value === 1) {
                regency_data.push({
                    id_employee: '',
                    id_regency: item.id
                });
            } else {
                
                if (Libs.isArrayData(regency_data)) {
                    regency_data.map((k, index) => {
                        if (k.id_regency === item.id) {
                            regency_data.splice(index, 1);
                        }
                    })
                }
            }

            dataRegency[index].is_checked = value;
            curItem.regency_data = regency_data;
            this.setState({
                curItem: curItem,
                dataRegency: dataRegency
            });
        }
    }


    /**
    * ge list roles
    * @author Long.Pham 2019-06-03
    */
    getDataRole() {
        let self = this;
        var params = {
            id_language: this.employee.id_language
        };

        RoleService.instance.getDropdownList(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataRoles: data
                }, () => {
                    let curItem = self.state.curItem;

                    if (curItem.screen_mode == Constants.SCREEN_MODE.EDIT) {

                        var dataRoles = self.state.dataRoles;
                        if (Libs.isArrayData(dataRoles)) {
                            dataRoles.map((v, i) => {
                                var findItem = Libs.find(curItem.role_data, 'id_role', v.id);
                                if (!Libs.isObjectEmpty(findItem)) {
                                    dataRoles[i].is_checked = 1;
                                }
                            })
                        }
                        self.setState({
                            dataRoles: dataRoles
                        });
                    }
                });
            }
        })
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
        curItem.avatar = null;

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
        var { t } = this.props;
        let target = event.target;
        let name = target.name;
        let value = target.value;
        var curItem = this.state.curItem;
        if (name) {
            let param = {
                [name]: value
            }
            let v = new AddPopupValidate(this.props);
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
        var params = Object.assign({}, curItem);
        var errorFlag = false;
        var screenMode = (!Libs.isBlank(curItem.id)) ? Constants.SCREEN_MODE.EDIT : ((!Libs.isBlank(this.props.curItem.screen_mode)) ? this.props.curItem.screen_mode : Constants.SCREEN_MODE.ADD);
        let v = new AddPopupValidate(this.props);
        let errors = await v.FLValidationAll(curItem);

        if (screenMode === Constants.SCREEN_MODE.ADD || !Libs.isBlank(curItem.password) || !Libs.isBlank(curItem.password_confirm)) {
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



        if (!Libs.isArrayData(curItem.role_data)) {
            curItem.role_message = t('employee.role_data');
            self.setState({
                curItem: curItem
            }, () => {
                self.toast(t('employee.role_data'), "error");
            });
            errorFlag = true;

        } else {
            curItem.role_message = null;
            errorFlag = false;
            self.setState({
                curItem: curItem
            });
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
        
        params.screen_mode = screenMode;
        params.id_language = this.employee.id_language;
        params.iso_code = this.employee.iso_code;
        params.password = Libs.SHA3(curItem.password);
        params.created_by = this.employee.first_name + " " + this.employee.last_name;

        EmployeeService.instance.save(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.onClickCloseAdd(true);
            }
            else if (data) {
                self.setValidateMessage(data);
            }
            else if (!Libs.isBlank(msg)) {
                self.toast(msg, "error");
            }
        }, true);
    }
}
export default AddPopup;