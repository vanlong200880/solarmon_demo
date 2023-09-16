import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import MainLogin from '../containers/layouts/MainLogin';
import MainModuleSystem from '../containers/layouts/MainModuleSystem';
import MainDashboard from '../containers/layouts/MainDashboard';
import MainAcount from '../containers/layouts/MainAcount';
import MainPrivateDashboard from '../containers/layouts/MainPrivateDashboard'



// views
import Login from '../containers/views/Login/Login';
import ForgotPassword from '../containers/views/ForgotPassword/ForgotPassword';
import ResetPassword from '../containers/views/ResetPassword/ResetPassword';
import Account from '../containers/views/desktop/Account/Account';
import ErrorPage from '../containers/views/desktop/ErrorPage/ErrorPage';

// admin Views
import Dashboard from '../containers/views/desktop/Dashboard/DashBoard';
import Role from '../containers/views/desktop/ModuleSystem/Role/Role';
import Permissions from '../containers/views/desktop/ModuleSystem/Permissions/Permissions';
import Employees from '../containers/views/desktop/ModuleSystem/Employees/Employees';
import Project from '../containers/views/desktop/ModuleSystem/Project/Project';
import ProjectGroup from '../containers/views/desktop/ModuleSystem/ProjectGroup/ProjectGroup';

import DashboardProject from '../containers/views/desktop/ModuleProject/Dashboard/DashBoard';
import Plant from '../containers/views/desktop/ModuleProject/Plant/Plant';
import Device from '../containers/views/desktop/ModuleProject/Device/Device';
import Activities from '../containers/views/desktop/ModuleProject/Activities/Activities';
import Analytics from '../containers/views/desktop/ModuleProject/Analytics/Analytics';
import Reports from '../containers/views/desktop/ModuleProject/Reports/Reports';
import ClientConfig from '../containers/views/desktop/ModuleProject/Config/Config';


import MainDashboardProject from '../containers/views/desktop/ModulePrivate/Dashboard/DashBoard';
import PrivatePlant from '../containers/views/desktop/ModulePrivate/Plant/Plant';
import PrivateDevice from '../containers/views/desktop/ModulePrivate/Device/Device';
import PrivateActivities from '../containers/views/desktop/ModulePrivate/Activities/Activities';
import PrivateAnalytics from '../containers/views/desktop/ModulePrivate/Analytics/Analytics';
import PrivateReports from '../containers/views/desktop/ModulePrivate/Reports/Reports';
import PrivateConfig from '../containers/views/desktop/ModulePrivate/Config/Config';

import Notify from '../containers/views/desktop/Notify/Notify';
import ErrorLevel from '../containers/views/desktop/ModuleSystem/ErrorLevel/ErrorLevel';
import ErrorType from '../containers/views/desktop/ModuleSystem/ErrorType/ErrorType';
import ErrorState from '../containers/views/desktop/ModuleSystem/ErrorState/ErrorState';
import Error from '../containers/views/desktop/ModuleSystem/Error/Error';
import DeviceParameter from '../containers/views/desktop/ModuleSystem/DeviceParameter/DeviceParameter';
import EmployeesSetupEmail from '../containers/views/desktop/ModuleSystem/EmployeesSetupEmail/EmployeesSetupEmail';
import Documents from '../containers/views/desktop/Documents/Documents';
import Control from '../containers/views/desktop/ModulePrivate/Control/Control';

class MainRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Router>
            <Switch>

                <Route path='/' exact>
                    <MainLogin>
                        <Switch>
                            <Route path='/' component={Login} />
                        </Switch>
                    </MainLogin>
                </Route>

                <Route path='/forgot-password'>
                    <MainLogin>
                        <Switch>
                            <Route path='/forgot-password' exact component={ForgotPassword} />
                        </Switch>
                    </MainLogin>
                </Route>

                <Route path='/error-404'>
                    <MainLogin>
                        <Switch>
                            <Route path='/error-404' exact component={ErrorPage} />
                        </Switch>
                    </MainLogin>
                </Route>

                <Route path='/reset-password'>
                    <MainLogin>
                        <Switch>
                            <Route path='/reset-password' exact component={ResetPassword} />
                        </Switch>
                    </MainLogin>
                </Route>


                <Route path="/dashboard">
                    <MainDashboard>
                        <Switch>
                            <Route path="/dashboard" exact component={(props) => <DashboardProject parent={this.props.parent} auth={this.props.auth} baseParam={props} />} />
                        </Switch>
                    </MainDashboard>
                </Route>

                <Route path="/main">
                    <MainPrivateDashboard parent={this.props.parent}>
                        <Switch>
                            <Route path="/main" exact component={(props) => <MainDashboardProject parent={this.props.parent} auth={this.props.auth} baseParam={props} />} />
                        </Switch>
                    </MainPrivateDashboard>
                </Route>


                {/* <Route path='/main'>
                    <MainPrivateDashboard>
                        <Switch>
                            <Route path="/main" exact component={(props) => <PrivateDashboard parent={this.props.parent} auth={this.props.auth} baseParam={props} />} />
                        </Switch>
                    </MainPrivateDashboard>
                </Route> */}

                <Route path='/user'>
                    <MainAcount>
                        <Switch>
                            <Route path="/user" exact component={(props) => <Account auth={this.props.auth} baseParam={props} />} />
                            <Route path="/user/config-receive-email" exact component={(props) => <EmployeesSetupEmail parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                            <Route path="/user/documents" exact component={(props) => <Documents parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                            <Route path="/user/notifications" exact component={(props) => <Notify parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                        </Switch>
                    </MainAcount>
                </Route>


                <Route path='/system/:path?'>
                    <MainModuleSystem>
                        <Switch>
                            <Route path="/system" exact component={(props) => <Dashboard auth={this.props.auth} baseParam={props} />} />
                            <Route path="/system/project-group" exact component={(props) => <ProjectGroup auth={this.props.auth} baseParam={props} />} />
                            <Route path="/system/project" exact component={(props) => <Project auth={this.props.auth} baseParam={props} />} />
                            <Route path="/system/role" exact component={(props) => <Role auth={this.props.auth} baseParam={props} />} />
                            <Route path="/system/permission" exact component={(props) => <Permissions auth={this.props.auth} baseParam={props} />} />
                            <Route path="/system/user" exact component={(props) => <Employees auth={this.props.auth} baseParam={props} />} />
                            <Route path="/system/error-level" exact component={(props) => <ErrorLevel auth={this.props.auth} baseParam={props} />} />
                            <Route path="/system/error-type" exact component={(props) => <ErrorType auth={this.props.auth} baseParam={props} />} />
                            <Route path="/system/error-state" exact component={(props) => <ErrorState auth={this.props.auth} baseParam={props} />} />
                            <Route path="/system/error" exact component={(props) => <Error auth={this.props.auth} baseParam={props} />} />
                            <Route path="/system/device-parameter" exact component={(props) => <DeviceParameter auth={this.props.auth} baseParam={props} />} />
                        </Switch>
                    </MainModuleSystem>
                </Route>

                <Route  path= "/private">
                    <MainPrivateDashboard parent={this.props.parent}>
                        <Switch>
                            <Route path={"/private/:id"} exact component={(props) => <PrivatePlant parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                            <Route path={"/private/:id/dashboard"} exact component={(props) => <PrivatePlant parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                            <Route path="/private/:id/devices" exact component={(props) => <PrivateDevice parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                            <Route path="/private/:id/activities" exact component={(props) => <PrivateActivities parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                            <Route path="/private/:id/analytics" exact component={(props) => <PrivateAnalytics parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                            <Route path="/private/:id/reports" exact component={(props) => <PrivateReports parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                            <Route path="/project/notifications" exact component={(props) => <Notify parent={this.props.parent} auth={this.props.auth} baseParam={props} />} />
                            <Route path="/private/:id/config" exact component={(props) => <PrivateConfig parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                            <Route path="/private/:id/control" exact component={(props) => <Control parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                        </Switch>
                    </MainPrivateDashboard>
                </Route>

                <Route path="/notify">
                    <MainDashboard>
                        <Switch>
                            <Route path="/notify" exact component={(props) => <Notify parent={this.props.parent} auth={this.props.auth} baseParam={props} />} />
                        </Switch>
                    </MainDashboard>
                </Route>

                <Route path="/project">
                    <MainDashboard parent={this.props.parent}>
                        <Switch>
                            <Route path={"/project/:id"} exact component={(props) => <Plant parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                            <Route path={"/project/:id/dashboard"} exact component={(props) => <Plant parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                            <Route path="/project/:id/devices" exact component={(props) => <Device parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                            <Route path="/project/:id/activities" exact component={(props) => <Activities parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                            <Route path="/project/:id/analytics" exact component={(props) => <Analytics parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                            <Route path="/project/:id/reports" exact component={(props) => <Reports parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                            <Route path="/project/:id/config" exact component={(props) => <ClientConfig parent={this.props.parent} auth={this.props.auth} baseParam={props} {...props} />} />
                            
                            <Route path="/project/notifications" exact component={(props) => <Notify parent={this.props.parent} auth={this.props.auth} baseParam={props} />} />
                        </Switch>
                    </MainDashboard>
                </Route>





            </Switch>
        </Router>
    }
}

export default MainRoute;