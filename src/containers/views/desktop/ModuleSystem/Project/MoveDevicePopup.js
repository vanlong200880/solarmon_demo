
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import MoveDevicePopupJsx from './MoveDevicePopup.jsx';
import ProjectService from '../../../../../services/ProjectService';
import DeviceService from '../../../../../services/DeviceService';
import Constants from '../../../../../utils/Constants';

class MoveDevicePopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItemProject: this.props.curItem,
            curItem: {},
            dataList: [],
            dataListProject: [],
            searchParam: {}
        }

        this.jsxTemplate = MoveDevicePopupJsx;
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    componentDidMount(){
        this.getListDeviceByProject();
        this.getDataListProject();
    }



    handleDropdownChange = (item, name, index) => {
        if(Libs.isObjectEmpty(item)) return;
        var {dataList} = this.state;
        if(!Libs.isArrayData(dataList)) return;
        var dataItem = dataList[index];
        if(Libs.isObjectEmpty(dataItem)) return;

        dataList[index].id_project = item.id;

        this.setState({
            dataList: dataList
        });
    }


    /**
     * ge list project
     * @author Long.Pham 2019-06-03
     */
     getDataListProject() {
        let self = this;
        var params = {
            id_language: this.employee.id_language,
            id_project:  null
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
     * @description save data
     * @author long.pham 12/05/2021
     */
    async onSave() {
        var { curItem, dataList, curItemProject } = this.state, self = this;

        var params = Object.assign({}, curItem);
        params.screen_mode = Constants.SCREEN_MODE.EDIT;
        params.dataList = dataList;
        ProjectService.instance.saveMoveDevice(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.onItemClickCloseMove(false);
            }
        }, true);
    }
}
export default MoveDevicePopup;