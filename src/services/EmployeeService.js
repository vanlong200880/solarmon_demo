import Libs from '../utils/Libs';
import CMSHttp from '../utils/CMSHttp';
import Constants from '../utils/Constants';

/*
 * EmployeeService.js
 * Lớp service, xử lý gọi API cho danh mục người dùng
 * 
 * @author Long.Pham 13/06/2021
 */

export default class EmployeeService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new EmployeeService();
        }
        return this._instance;
    }

    /**
     * API login
     * @author ong.Pham 13/06/2021
     * @param {EmployeeEntity} objE 
     * @param {function(data)} callBack
     * @param {boolean} isShowProgress 
     */

    getLogin(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.EMPLOYEE.LOGIN, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //error http => lib http  proccess
                        return;
                    }
                    var data = {};
                    if (rs.status && typeof rs.data === 'object') {
                        data = rs.data;
                    }
                    callBack(data, rs.status, rs.mess);
                }
            })
        } catch (error) {
            callBack({});
        }
    }


    
    /**
     * Gọi API lấy thông tin chi tiết người dùng
     * @author thanh.bay
     * @param {UserEntity} objE 
     * @param {function(data)} callBack
     * @param {boolean} isShowProgress 
     */
    getForgotPassword(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.EMPLOYEE.FORGOT_PASSWORD, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //lỗi do http nên không làm gì vì đã có http thư viện xử lý
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
            callBack([]);
        }
    }


    /**
     * Gọi API lấy thông tin chi tiết người dùng
     * @author thanh.bay
     * @param {UserEntity} objE 
     * @param {function(data)} callBack
     * @param {boolean} isShowProgress 
     */
     getResetPassword(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.EMPLOYEE.RESET_PASSWORD, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //lỗi do http nên không làm gì vì đã có http thư viện xử lý
                        return;
                    }
                    var data = {};
                    if (rs.status && typeof rs.data === 'object') {
                        data = rs.data;
                    }
                    callBack(data, rs.status, rs.mess);
                }
            })
        } catch (error) {
            callBack([]);
        }
    }

    /**
     * Gọi API lấy thông tin chi tiết người dùng
     * @author Long.Pham
     * @param {UserEntity} objE 
     * @param {function(data)} callBack
     * @param {boolean} isShowProgress 
     */
    getDetailEmployee(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.EMPLOYEE.DETAIL_UPDATE_PROFILE, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //lỗi do http nên không làm gì vì đã có http thư viện xử lý
                        return;
                    }
                    var data = {};
                    if (rs.status && typeof rs.data === 'object') {
                        data = rs.data;
                    }
                    callBack(rs.status, rs.mess, data);
                }
            })
        } catch (error) {
            callBack([]);
        }
    }


    /**
     * Gọi API lưu hoặc thêm người dùng
     * @author thanh.bay 2018-09-18 09:51
     * @param {UserEntity} objE
     * @param {function(status, data, msg)} callBack
     * @param  {boolean} isShowProgress
     */
    saveUpdateProfile(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.EMPLOYEE.SAVE_UPDATE_PROFILE, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //lỗi do http nên không làm gì vì đã có http thư viện xử lý
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
            var data = null;
            var msg = error;
            callBack(false, data, msg);
        }
    }


    /**
     * API call for change password
     * @author long.pham 2019-07-27
     * @param {StaffEntity} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
     employeeChangePassword(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.EMPLOYEE.CHANGE_PASSWORD, objE, function (status, rs) {
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


    /**
     * @author long.pham 2018-07-27
     * @param  {RoleEntity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
     getList(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.EMPLOYEE.LIST, objE, function (status, rs) {
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
     * @author long.pham 2018-07-27
     * @param  {RoleEntity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
     getListProjectConfigMail(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.EMPLOYEE.LIST_CONFIG_MAIL, objE, function (status, rs) {
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
     * @author long.pham 2018-07-27
     * @param  {RoleEntity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
     getListAll(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.EMPLOYEE.LIST_ALL, objE, function (status, rs) {
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
     * API call for save data
     * @author long.pham 2018-07-27
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
     save(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.EMPLOYEE.SAVE, objE, function (status, rs) {
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


    /**
      * API call for update Role status
      * @author long.pham
      * @param @param {RoleEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
     updateStatus(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.EMPLOYEE.UPDATE_STATUS, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var msg = rs.mess;
                    callBack(rs.status, msg);
                }
            })
        } catch (error) {
            callBack(false, error);
        }
    }


    /**
      * API call for update Role status
      * @author long.pham
      * @param @param {RoleEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
     updateStatusMailConfig(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.EMPLOYEE.UPDATE_STATUS_MAIL_CONFIG, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var msg = rs.mess;
                    callBack(rs.status, msg);
                }
            })
        } catch (error) {
            callBack(false, error);
        }
    }


    /**
      * API call for delete
      * @author long.pham
      * @param @param {RoleEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
     delete(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.EMPLOYEE.DELETE, objE, function (status, rs) {
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
            callBack(false, error);
        }
    }



    /**
     * Gọi API lấy thông tin chi tiết người dùng
     * @author Long.Pham
     * @param {UserEntity} objE 
     * @param {function(data)} callBack
     * @param {boolean} isShowProgress 
     */
     getDetail(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.EMPLOYEE.DETAIL, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //lỗi do http nên không làm gì vì đã có http thư viện xử lý
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
            callBack([]);
        }
    }
}
