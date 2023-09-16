
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import Constants from '../../../../../../utils/Constants';
import AddDeviceSharePopupJsx from './AddDeviceSharePopup.jsx';
import DeviceService from '../../../../../../services/DeviceService';
import ProjectService from '../../../../../../services/ProjectService';

class AddDeviceSharePopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: {},
            curItemProject: this.props.curItemProject,
            dataListProject: [],
            dataList: [],
            searchParam: {},
        }

        this.jsxTemplate = AddDeviceSharePopupJsx;
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }
    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 12/05/2021
     */
    componentDidMount() {
        this.getList();
        this.getDataListProject();
    }


    onIsCheckedChange = (index) => {
        var {dataList} = this.state;
        if(!Libs.isArrayData(dataList)) return;
        var item = dataList[index];
        if(Libs.isObjectEmpty(item)) return;
        dataList[index].is_checked = dataList[index].is_checked ? 0: 1;

        this.setState({
            dataList: dataList
        });
    }
    /**
     * get list
     * @author Long.Pham 2019-06-03
     */
    getList() {
        let self = this;
        var { curItem } = this.state;
        let params = this.state.searchParam;
        params.id_language = this.employee.id_language;
        params.id_project = curItem.id_project;
        if(Libs.isBlank(curItem.id_project)) return;
        DeviceService.instance.getListDeviceByProjectShare(params, (data, total_row) => {
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
     * ge list project
     * @author Long.Pham 2019-06-03
     */
     getDataListProject() {
        let self = this;
        var {curItemProject} = this.state;
        var params = {
            id_language: this.employee.id_language,
            id_project: curItemProject.id ? curItemProject.id : null
        };

        ProjectService.instance.getDropdownList(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataListProject: data
                });
            } else {
                self.setState({
                    dataListProject: []
                });
            }
        })
    }


    handleDropdownChange = (item, name) => {
        var self = this;
        let curItem = self.state.curItem;

        if (Libs.isObjectEmpty(item)) {
            curItem.id_project = '';
        } else {
            var value = item.value;
            curItem[name] = value;
        }

        self.setState({
            curItem: curItem
        }, () => {
            self.getList();
        });
    }



    /**
     * @description save data
     * @author long.pham 12/05/2021
     */
    async onSave() {
        var {curItemProject, dataList } = this.state, self = this;
        if(Libs.isBlank(curItemProject.id) || !Libs.isArrayData(dataList)) return;
        var params = {};
        var dataParams = [];
        for(var i = 0, len = dataList.length; i < len; i++){
            if(dataList[i].is_checked == 1){
                dataParams.push({
                    id_project: curItemProject.id,
                    id_device: dataList[i].id
                })
            }
        }

        if(!Libs.isArrayData(dataParams)) return;
        params.dataParams = dataParams;
        params.screen_mode = Constants.SCREEN_MODE.ADD;
    
        DeviceService.instance.saveDeviceShare(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.onClickCloseDeviceShare(true);
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
export default AddDeviceSharePopup;