import { Component } from 'react';
import SidebarAccountJsx from './SidebarAccount.jsx';
import { withTranslation } from 'react-i18next';
import './SidebarAccount.scss';

class SidebarAccount extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = SidebarAccountJsx;
        this.state = {};
    }

    logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(SidebarAccount)
export default HighOrderComponentTranslated;