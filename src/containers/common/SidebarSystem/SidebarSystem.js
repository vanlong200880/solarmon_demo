import { Component } from 'react';
import SidebarSystemJsx from './SidebarSystem.jsx';
import { withTranslation } from 'react-i18next';
import Constants from '../../../utils/Constants';
import Libs from '../../../utils/Libs';

class SidebarSystem extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = SidebarSystemJsx;
        this.state = {
            permissions: []
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

const HighOrderComponentTranslated = withTranslation('common')(SidebarSystem)
export default HighOrderComponentTranslated;