// import BaseComponent from '../../BaseComponent';
import { Component } from 'react';
import MenuProjectJsx from './MenuProject.jsx';
import { withTranslation } from 'react-i18next';
import './MenuProject.scss';
import Libs from '../../../utils/Libs';
import Constants from '../../../utils/Constants';


class MenuProject extends Component {
// class MenuProject extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = MenuProjectJsx;
        this.state = {
            hash_id: this.props.hash_id,
            curItem: this.props.curItem,
            dataList: []
        };
    }

    componentWillMount() {
        let permissions = this.state.permissions;
        let info = localStorage.getItem(Constants.COMMON.ACCESS_PARAM);
        let permission = JSON.parse(Libs.base64Decrypt(info));
        permissions = (Object.values(permission)).filter((item) => item.group_type === 'system');
        this.setState({permissions: permissions});
    }


    

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(MenuProject)
export default HighOrderComponentTranslated;