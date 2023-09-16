import Libs from '../utils/Libs';
import CMSHttp from '../utils/CMSHttp';
import Constants from '../utils/Constants';

export default class DeviceParameterService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new DeviceParameterService();
        }
        return this._instance;
    }

    /**
     * @author long.pham 2018-07-27
     * @param  {DeviceParameterEntity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
    getList(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            
            http.post(Constants.URL.DEVICE_PARAMETER.LIST, objE, function (status, rs) {
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
        } catch (DeviceParameter) {
            var msg = DeviceParameter;
            callBack(false, 0, msg);
        }
    }


    /**
      * API call for update Role status
      * @author long.pham
      * @param @param {DeviceParameterEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
    updateStatus(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.DEVICE_PARAMETER.UPDATE_STATUS, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var msg = rs.mess;
                    callBack(rs.status, msg);
                }
            })
        } catch (DeviceParameter) {
            callBack(false, DeviceParameter);
        }
    }




    /**
     * API call for save data
     * @author long.pham 2018-07-27
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    save(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.DEVICE_PARAMETER.SAVE, objE, function (status, rs) {
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
        } catch (DeviceParameter) {
            callBack(false, null, DeviceParameter);
        }
    }

    /**
      * API call for delete
      * @author long.pham
      * @param @param {DeviceParameterEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
    delete(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.DEVICE_PARAMETER.DELETE, objE, function (status, rs) {
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
        } catch (DeviceParameter) {
            callBack(false, DeviceParameter);
        }
    }


    /**
     * API get detail
     * @author Long.Pham 2019-05-28
     * @param {RegenncyEntity} objE 
     * @param {function(data)} callBack
     * @param {boolean} isShowProgress 
     */

    getDetail(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.DEVICE_PARAMETER.DETAIL, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //DeviceParameter http => lib http  proccess
                        return;
                    }
                    var data = {};
                    if (rs.status && typeof rs.data === 'object') {
                        data = rs.data;
                    }
                    callBack(data);
                }
            })
        } catch (DeviceParameter) {
            callBack({});
        }
    }



    /**
    * Get dropdown list
    * @author Long.Pham
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getDropdownList(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.DEVICE_PARAMETER.DROPDOWN_LIST, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
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
        } catch (DeviceParameter) {
            var msg = DeviceParameter;
            callBack(false, 0, msg);
        }
    }



    /**
    * Get dropdown list all attr
    * @author Long.Pham
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
     getDropdownListAttr(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.DEVICE_PARAMETER.DROPDOWN_LIST_ATTR, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
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
        } catch (DeviceParameter) {
            var msg = DeviceParameter;
            callBack(false, 0, msg);
        }
    }

}
