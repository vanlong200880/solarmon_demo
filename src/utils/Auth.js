import Constants from "./Constants";
import Libs from "./Libs";
var Auth = {};
Auth.checkIsLogin = function () {
	try {
		let ar = window.location.pathname.split("/");
		let path = ar.length>1?ar[1]:"";
		let isCheck = true;
		if(path!==''){
			isCheck = Constants.SITE_URL.PUBLIC_URL.indexOf(path)<0
		}
		if(!isCheck){
			return true;
		}
		let token = localStorage.getItem(Constants.COMMON.TOKEN);
		if (null === token || typeof token === 'undefined') {
			return false;
		}
		let info = localStorage.getItem(Constants.COMMON.EMPLOYEE_INFO);
		let userInfo = JSON.parse(Libs.base64Decrypt(info));
		if (null === userInfo || typeof userInfo === 'undefined') {
			return false;
		}
		if (null === userInfo.email || typeof userInfo.email === 'undefined') {
			return false;
		}
		let expired = userInfo.timeout * 1;
		let now = new Date().getTime();
		if (now > expired*1000) {
			localStorage.removeItem(Constants.COMMON.TOKEN)
			return false;
		}
		return true;
	} catch (e) {
		return false;
	}
}

/**
 * check the action permission
 * @param {int} actions: permissions
 * @param {int} bitIdx: action index to check
 */
Auth.getPermisson = function (actions, bitIdx) {
	return Libs.checkBitOnOff(actions, bitIdx);
}

export default Auth;
