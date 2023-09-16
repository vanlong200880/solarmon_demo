import { NavLink } from 'react-router-dom';
import Libs from '../../../utils/Libs';

export default function SidebarDashBoard() {
    var { dataProjects, des } = this.state;
    var { t } = this.props;
    const { pathname } = window.location;
    var res = pathname.split("/");
    var params = ['devices', 'activities', 'analytics', 'reports'];
    if (res) {
        des = res[res.length - 1];
        if (params.includes(des)) {
            des = des;
        } else {
            des = null;
        }
    }


    return (
        <div className="sidebar-project">
            <h2>{t('common.project')}</h2>
            <div className="sidebar-content">
                <ul>
                    {Libs.isArrayData(dataProjects) ?
                        dataProjects.map((item, index) => {
                            return (
                                <li key={index}>
                                    <div onClick={this.showChildMenu.bind(this, index)} className="group">
                                        <span className="icon-list-unordered"></span> {item.name} <div className="scal-ex">
                                            <var className={item.show_child ? "icon-angle-right rotate" : "icon-angle-right"}></var>
                                        </div>
                                    </div>
                                    <ul>
                                        {Libs.isArrayData(item.dataChilds) && item.show_child ?
                                            item.dataChilds.map((v, k) => {
                                                var urlActive = v.hash_id + (des ? ("/" + des) : '');
                                                return (
                                                    <li key={k}>
                                                        <NavLink
                                                            isActive={() => [
                                                                '/project/' + v.hash_id,
                                                                '/project/' + v.hash_id + '/dashboard',
                                                                '/project/' + v.hash_id + '/devices',
                                                                '/project/' + v.hash_id + '/activities',
                                                                '/project/' + v.hash_id + '/analytics',
                                                                '/project/' + v.hash_id + '/reports'
                                                            ].includes(pathname)}
                                                            onClick={(e) => { this.setActiveLink(v.hash_id); e.preventDefault(); }}
                                                            to={"/project/" + urlActive}
                                                        >
                                                            <span className="icon-building-o"></span> <label>{v.name}</label>
                                                        </NavLink>

                                                    </li>
                                                );
                                            })
                                            :
                                            ""}
                                    </ul>
                                </li>
                            );
                        })
                        : ""}
                </ul>
            </div>


        </div>
    );
};