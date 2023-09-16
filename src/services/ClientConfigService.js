import CMSHttp from '../utils/CMSHttp';
import Constants from '../utils/Constants';
import Libs from '../utils/Libs';

export default class ClientConfigService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new ClientConfigService();
        }
        return this._instance;
    }

    /**
         * @author long.pham 2018-07-27
         * @param  {RoleEntity} objE
         * @param  {function(data,total_row,msg)} callBack
         * @param  {Boolean} isShowProgress
         */
     getListAllDeviceByProject(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.CLIENT_CONFIG.LIST_DEVICE, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //lỗi do http nên không làm gì vì đã có http thư viện xử lý
                        return;
                    }
                    var data = [];
                    var total_row = 0;
                    if (rs.status && Array.isArray(rs.data)) {
                        data = rs.data;
                        total_row = rs.total_row;
                    }
                    callBack(data, total_row, "");
                }
            });
        } catch (error) {
            var msg = error;
            callBack(false, 0, msg);
        }
    }


    /**
     * API get detail
     * @author Long.Pham 2019-05-28
     * @param {RegenncyEntity} objE 
     * @param {function(data)} callBack
     * @param {boolean} isShowProgress 
     */

     getDeviceDetail(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.CLIENT_CONFIG.DEVICE_DETAIL, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //error http => lib http  proccess
                        return;
                    }
                    var data = {};
                    if (rs.status && typeof rs.data === 'object') {
                        data = rs.data;
                    }
                    callBack(data);
                }
            })
        } catch (error) {
            callBack({});
        }
    }

    
    /**
     * API call for save data
     * @author long.pham 2018-07-27
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
     updateDevice(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.CLIENT_CONFIG.UPDATE_DEVICE, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var data = null;
                    var msg = rs.mess;
                    if (!Libs.isObjectEmpty(rs.data)) {
                        data = rs.data;
                    }
                    callBack(rs.status, data, msg);
                }
            })
        } catch (error) {
            callBack(false, null, error);
        }
    }
}
