import { Component } from 'react';
import MenuPrivateProjectJsx from './MenuPrivateProject.jsx';
import { withTranslation } from 'react-i18next';
import './MenuPrivateProject.scss';

class MenuPrivateProject extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = MenuPrivateProjectJsx;
        this.state = {
            hash_id: this.props.hash_id,
            curItem: this.props.curItem,
            dataList: []
        };
    }

    setActivePage = () => {
        // alert('a')
        // return;
    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(MenuPrivateProject)
export default HighOrderComponentTranslated;