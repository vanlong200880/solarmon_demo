
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import Constants from '../../../../../utils/Constants';
import AddDevicePopupJsx from './AddDevicePopup.jsx';
import AddDevicePopupValidate from './AddDevicePopupValidate';
import DeviceTypeService from '../../../../../services/DeviceTypeService';
import DeviceGroupService from '../../../../../services/DeviceGroupService';
import DeviceService from '../../../../../services/DeviceService';

class AddDevicePopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItemProject: this.props.curItem,
            curItem: {},
            curItemDelete: {},
            dataDeviceType: [],
            dataDeviceGroup: [],
            dataList: [],
            searchParam: {},
            showDeleteDevice: false,
            showDeviceShare: false
        }

        this.jsxTemplate = AddDevicePopupJsx;
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }
    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 12/05/2021
     */
    componentDidMount() {
        this.getDeviceType();
        this.getDeviceGroup();
        this.getListDeviceByProject();
    }

    
    onClickDeviceShare = () => {
        this.setState({
            showDeviceShare: true
        }, () => {
            document.body.classList.add('modal-multi');
        })
    }

    onClickCloseDeviceShare = (status) => {
        if (status) {
            this.getListDeviceByProject();
        }
        this.setState({
            showDeviceShare: false
        }, () => {
            document.body.classList.remove('modal-multi');
        });

    }


    onClickDeleteDevice = (index) => {
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index];
        if (Libs.isObjectEmpty(item)) return;
        this.setState({
            showDeleteDevice: true,
            curItemDelete: item
        }, () => {
            document.body.classList.add('modal-multi');
        })
    }

    onClickCloseDeleteDevice = (status) => {
        if (status) {
            this.getListDeviceByProject();
        }

        this.setState({
            curItemDelete: {},
            showDeleteDevice: false
        }, () => {
            document.body.classList.remove('modal-multi');
        });

    }


    /**
     * @description Item click event
     * @author Long.Pham 12-05-2021
     * @param index element in the list
     */
    onItemClick = (index) => {
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index];
        item.screen_mode = Constants.SCREEN_MODE.EDIT;
        if (Libs.isObjectEmpty(item)) return;
        this.setState({
            curItem: Object.assign({}, item)
        });
    }

    /**
     * @description Item click event change status
     * @author Long.Pham 12-05-2021
     * @param index element in the list
     */
    onIsVirtualChange = (index) => {
        var { curItemProject } = this.state;
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index], self = this;
        item.screen_mode = Constants.SCREEN_MODE.EDIT;
        item.id_language = this.employee.id_language;

        var isActiveUpdate = item.is_virtual;
        if (isActiveUpdate * 1 === 1) {
            isActiveUpdate = 0;
        }
        else {
            isActiveUpdate = 1;
        }
        item.id_project = curItemProject.id;
        item.is_virtual = isActiveUpdate;
        item.updated_by = this.employee.first_name + ' ' + this.employee.last_name;

        DeviceService.instance.updateIsVirtual(item, function (status, msg) {
            if (status) {
                self.setState({
                    dataList: self.state.dataList
                });
            }
        });
    }

    onStatusChange = (index) =>{
        var { curItemProject } = this.state;
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index], self = this;
        item.screen_mode = Constants.SCREEN_MODE.EDIT;
        item.id_language = this.employee.id_language;

        var isActiveUpdate = item.status;
        if (isActiveUpdate * 1 === 1) {
            isActiveUpdate = 0;
        }
        else {
            isActiveUpdate = 1;
        }
        item.id_project = curItemProject.id;
        item.status = isActiveUpdate;
        item.updated_by = this.employee.first_name + ' ' + this.employee.last_name;

        DeviceService.instance.updateStatus(item, function (status, msg) {
            if (status) {
                self.setState({
                    dataList: self.state.dataList
                });
            }
        });
    }

    /**
     * get list
     * @author Long.Pham 2019-06-03
     */
    getListDeviceByProject() {
        let self = this;
        var { curItemProject, searchParam } = this.state;
        searchParam.id_project = curItemProject.id;
        searchParam.id_language = this.employee.id_language;
        DeviceService.instance.getListDeviceByProject(searchParam, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataList: data
                });

            } else {
                self.setState({
                    dataList: []
                });
            }
            self.forceUpdate();
        });
    }

    /**
     * ge list device type
     * @author Long.Pham 2019-06-03
     */
    getDeviceType() {
        let self = this;
        var params = {
            id_language: this.employee.id_language
        };

        DeviceTypeService.instance.getDropdownList(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataDeviceType: data
                });
            } else {
                self.setState({
                    dataDeviceType: []
                });
            }
        })
    }


    /**
     * ge list device group
     * @author Long.Pham 2019-06-03
     */
    getDeviceGroup() {
        let self = this;
        var params = {
            id_language: this.employee.id_language
        };

        DeviceGroupService.instance.getDropdownList(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataDeviceGroup: data
                });
            } else {
                self.setState({
                    dataDeviceGroup: []
                });
            }
        })
    }

    handleDropdownChange = (item, name) => {
        var self = this;
        let curItem = self.state.curItem;
        var { t } = this.props;

        if (name === 'id_device_type') {
            if (Libs.isObjectEmpty(item)) {
                curItem.id_device_type = '';
            } else {
                var value = item.value;
                curItem[name] = value;
                self.setValidateMessage({ id_device_type: '' }, true);
            }
        }

        if (name === 'id_device_group') {
            if (Libs.isObjectEmpty(item)) {
                curItem.id_device_group = '';
            } else {
                var value = item.value;
                curItem[name] = value;
                self.setValidateMessage({ id_device_group: '' }, true);
            }
        }

        self.setState({
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
            let v = new AddDevicePopupValidate(this.props);
            let error = await v.validateOne(param, name);
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
        var { curItem, curItemProject } = this.state, self = this;
        curItem.id_project = curItemProject.id;
        var params = Object.assign({}, this.state.curItem);
        var screenMode = (!Libs.isBlank(curItem.id)) ? Constants.SCREEN_MODE.EDIT : ((!Libs.isBlank(this.props.curItem.screen_mode)) ? this.props.curItem.screen_mode : Constants.SCREEN_MODE.ADD);
        let v = new AddDevicePopupValidate(this.props);
        let errors = await v.FLValidationAll(curItem);
        if (errors) {
            this.setValidateMessage(errors);
            return;
        }
        //remove message validation
        this.removeAllValidateMessage();
        params.screen_mode = screenMode;
        params.iso_code_lang = this.employee.lang;
        params.id_language = this.employee.id_language;
        params.iso_code = this.employee.iso_code;

        DeviceService.instance.save(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.setState({
                    curItem: {}
                }, () => {
                    self.getListDeviceByProject();
                })
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
export default AddDevicePopup;