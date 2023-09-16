import ConfigJsx from './Config.jsx';
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import Constants from '../../../../../utils/Constants';
import MainConfigService from '../../../../../services/MainConfigService';
class Config extends BaseComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            hash_id: !Libs.isObjectEmpty(this.params) ? this.params.id : null,
            curItem: {
                type: 2
            },
            itemDevice: {},

            dataListDevice: [],
            dataList: [],
            searchParam: {
                limit: Constants.COMMON.LIMIT,
                offset: 0,
                index: 1,
            },
        };


        this.jsxTemplate = ConfigJsx;

    }

    componentDidMount() {
        
        this.getListAllDeviceByProject();
    }

    componentWillReceiveProps(nextProps) {
        let self = this;
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                hash_id: nextProps.match.params.id
            }, () => {
                self.getListAllDeviceByProject();
            });
        }
    }

    handleDeviceInputChange = (index) => {
        var { dataListDevice, curItem: curItem } = this.state;
        if (!Libs.isArrayData(dataListDevice)) return;
        var item = dataListDevice[index];
        if (Libs.isObjectEmpty(item)) return;
        for (var i = 0; i < dataListDevice.length; i++) {
            dataListDevice[i].is_checked = 0;
        }
        dataListDevice[index].is_checked = 1;
        this.setState({ dataListDevice: dataListDevice, itemDevice: item, curItem: curItem })
    }
    getListAllDeviceByProject() {
        let self = this;
        let params = {
            hash_id: this.state.hash_id,
            id_employee: this.employee.id_employee,
            id_language: this.employee.id_language
        };

        MainConfigService.instance.getListAllDeviceByProject(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataListDevice: data,
                    itemDevice: {}
                });
            } else {
                self.setState({
                    dataListDevice: [],
                    itemDevice: {}
                });
            }
            self.forceUpdate();
        });
    }
    onTabSetting = (type) => {
        var { curItem } = this.state;
        curItem.type = type;
        this.setState({
            curItem: curItem
        })
    }

    reloadData = () => {
        this.forceUpdate();
    }

    handleDropdownChange = (item, name) => {
        var self = this;
        let curItem = self.state.curItem;

        if (Libs.isObjectEmpty(item)) {
            curItem.type = 2;
        } else {
            var value = item.value;
            curItem[name] = value;
        }

        self.setState({
            curItem: curItem
        });
    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(Config)
export default HighOrderComponentTranslated;