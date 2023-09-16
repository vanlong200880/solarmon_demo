import FilterParamJsx from './FilterParam.jsx';
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';

class FilterParam extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            curItem: { },
            dataListDevice: this.props.dataListDevice,
            show_parameter: false,
            dataParameter: this.props.dataParameter
        };
        this.jsxTemplate = FilterParamJsx;


    }

    showFilterParameter = () => {
        this.setState({
            show_parameter: true
        });
    }


    addFilterParameter = () => {
        var { dataListDevice, dataParameter} = this.state, self = this;
        if (!Libs.isArrayData(dataParameter)) return;
        var dataDevice = dataListDevice.filter((item) => item.is_checked == 1);
        if(!Libs.isArrayData(dataDevice)) return;

        var isChecked = 0;
        dataParameter.map((item, index) => {
            var childs = item.dataParameter;
            var findIsChecked = Libs.find(childs, 'is_checked', 1);
            if(!Libs.isObjectEmpty(findIsChecked)){
                isChecked = isChecked + 1;
            }
        });
        if(isChecked == 0) return;

        this.setState({
            show_parameter: false
        }, () => {
            self.props.callBackLoadChart(dataDevice, dataParameter);
        });
    }

    closeFilterParameter = () => {
        this.setState({
            show_parameter: false
        });
    }

    clearFilterParameter = () => {
        var { dataParameter } = this.state;
        if (!Libs.isArrayData(dataParameter)) return;

        dataParameter.map((item, index) => {
            var childs = item.dataParameter;
            if(Libs.isArrayData(childs)){
                for(var i = 0, len = childs.length; i < len; i++){
                    childs[i].is_checked = 0;
                }
            }
            dataParameter[index].dataParameter = childs;
        });
        
        this.setState({
            dataParameter: dataParameter
        });
    }

    handleParameterInputChange = (e, index, k) => {
        var { dataParameter } = this.state;
        if (!Libs.isArrayData(dataParameter)) return;
        var item = dataParameter[index];
        if (Libs.isObjectEmpty(item)) return;
        var childs = item.dataParameter;
        if (!Libs.isArrayData(childs)) return;

        dataParameter[index].dataParameter[k].is_checked = dataParameter[index].dataParameter[k].is_checked ? 0 : 1;
        this.setState({
            dataParameter: dataParameter
        });
    }

    handleDeviceInputChange = (e, index) => {
        var { dataListDevice } = this.state;
        if (!Libs.isArrayData(dataListDevice)) return;
        var item = dataListDevice[index];
        if (Libs.isObjectEmpty(item)) return;
        if(dataListDevice[index].is_checked == 0){
            var dataUnChecked = dataListDevice[index].dataParameter;
            if(Libs.isArrayData(dataUnChecked)){
                for(let i = 0, len = dataUnChecked.length; i < len;i++){
                    dataUnChecked[i].is_checked = 0;
                }
            }
            dataListDevice[index].dataParameter = dataUnChecked;
        }

        dataListDevice[index].is_checked = dataListDevice[index].is_checked ? 0 : 1;
        
        var dataParameterTmp = dataListDevice.filter((item) => item.is_checked == 1);
        this.setState({
            dataListDevice: dataListDevice,
            dataParameter: Libs.getUnique(dataParameterTmp, 'id_device_group'),
            show_parameter: true
        });
    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(FilterParam)
export default HighOrderComponentTranslated;