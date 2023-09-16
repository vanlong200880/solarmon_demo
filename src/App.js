import React, { Component } from 'react';
import Routers from './router/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { CMSToast } from './components/CMSToast';
import Constants from './utils/Constants';
import Libs from './utils/Libs';

export default class App extends Component {
  constructor(props) {
    super(props)
    // if (!Auth.checkIsLogin()) {
    //     // TODO: show popup to login
    //     window.location.href = Constants.FRONT_SITE_URL.LOGIN;
    // }
    this.setPermission();
    // this.app_body = React.createRef();
    // this.app_header = React.createRef();
    // var userLang = navigator.language || navigator.userLanguage;
    // this.classLang = '';
    //     if(userLang == 'fr' || userLang == 'fr-FR'){
    //         this.classLang = 'fr'; 
    //     }
  }

  setPermission() {
    let accessParam = localStorage.getItem(Constants.COMMON.ACCESS_PARAM);
    if (!Libs.isBlank(accessParam)) {
      try {
        let jsonAccessParam = JSON.parse(Libs.base64Decrypt(accessParam));
        this.permission = jsonAccessParam;
      } catch (e) {
      }
    }
  }

  render() {
    return (
      <Router>
      <div className="App">
        <CMSToast position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} />
        <Routers auth={this.permission} parent={this} />
      </div>
      </Router>
    );
  };
}
// function App() {

//   return (
//     <div className="App">
//       <CMSToast position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} />
//       <Routers />
//     </div>
//   );
// }

// export default App;

