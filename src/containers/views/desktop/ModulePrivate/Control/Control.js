import ControlJsx from './Control.jsx';
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';

class Control extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = ControlJsx;
        this.state = {
            hash_id: !Libs.isObjectEmpty(this.params) ? this.params.id : null,
            curItem: {},
            type: 1
        };
    }

    componentDidMount(){
        this.setState({
            type: 1
        })
    }


    componentWillReceiveProps(nextProps) {
        let self = this;
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                hash_id: nextProps.match.params.id
            }, () => {
                // self.getListAllDeviceByProject();
            });
        }
    }

    setTabOnOff(index) {
        this.setState({
            type: index
        })
    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(Control)
export default HighOrderComponentTranslated;