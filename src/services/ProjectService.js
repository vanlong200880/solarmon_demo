import Libs from '../utils/Libs';
import CMSHttp from '../utils/CMSHttp';
import Constants from '../utils/Constants';

export default class ProjectService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new ProjectService();
        }
        return this._instance;
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
            // var data = [
            //     {
            //         id: 1,
            //         name: "Project 1",
            //         power: '144.61 kW',
            //         irradiance: '368.75 W/m2',
            //         today: '1.79 MWh',
            //         lifetime: '450.12 MWh',
            //         revenue: 870539220.328,
            //         lat: 10.786918,
            //         lng: 106.661354,
            //         thumbnail: '/energy.jpeg',
            //         group_name: "Group 1",
            //         device_total: 5,
            //         status: 1
            //     },
            //     {
            //         id: 1,
            //         name: "Project 2",
            //         power: '144.61 kW',
            //         irradiance: '368.75 W/m2',
            //         today: '1.79 MWh',
            //         lifetime: '450.12 MWh',
            //         revenue: 870539220.328,
            //         lat: 10.791103,
            //         lng: 106.670945,
            //         thumbnail: '/energy.jpeg',
            //         group_name: "Group 1",
            //         device_total: 5,
            //         status: 1
            //     },
            //     {
            //         id: 1,
            //         name: "Project 3",
            //         power: '144.61 kW',
            //         irradiance: '368.75 W/m2',
            //         today: '1.79 MWh',
            //         lifetime: '450.12 MWh',
            //         revenue: 870539220.328,
            //         lat: 10.790265,
            //         lng: 106.668345,
            //         thumbnail: '/energy.jpeg',
            //         group_name: "Group 1",
            //         device_total: 5,
            //         status: 1
            //     },
            //     {
            //         id: 1,
            //         name: "Project 4",
            //         power: '144.61 kW',
            //         irradiance: '368.75 W/m2',
            //         today: '1.79 MWh',
            //         lifetime: '450.12 MWh',
            //         revenue: 870539220.328,
            //         lat: 10.792987,
            //         lng: 106.665831,
            //         thumbnail: '/energy.jpeg',
            //         group_name: "Group 1",
            //         device_total: 5,
            //         status: 1
            //     },
            //     {
            //         id: 1,
            //         name: "Project 5",
            //         power: '144.61 kW',
            //         irradiance: '368.75 W/m2',
            //         today: '1.79 MWh',
            //         lifetime: '450.12 MWh',
            //         revenue: 870539220.328,
            //         lat: 10.781097,
            //         lng: 106.657563,
            //         thumbnail: '/energy.jpeg',
            //         group_name: "Group 1",
            //         device_total: 5,
            //         status: 1
            //     },
            //     {
            //         id: 1,
            //         name: "Project 6",
            //         power: '144.61 kW',
            //         irradiance: '368.75 W/m2',
            //         today: '1.79 MWh',
            //         lifetime: '450.12 MWh',
            //         revenue: 870539220.328,
            //         lat: 10.785547,
            //         lng: 106.648547,
            //         thumbnail: '/energy.jpeg',
            //         group_name: "Group 1",
            //         device_total: 5,
            //         status: 1
            //     },
            //     {
            //         id: 1,
            //         name: "Project 7",
            //         power: '144.61 kW',
            //         irradiance: '368.75 W/m2',
            //         today: '1.79 MWh',
            //         lifetime: '450.12 MWh',
            //         revenue: 870539220.328,
            //         lat: 10.791238,
            //         lng: 106.655843,
            //         thumbnail: '/energy.jpeg',
            //         group_name: "Group 1",
            //         device_total: 5,
            //         status: 1
            //     },
            //     {
            //         id: 1,
            //         name: "Project 8",
            //         power: '144.61 kW',
            //         irradiance: '368.75 W/m2',
            //         today: '1.79 MWh',
            //         lifetime: '450.12 MWh',
            //         revenue: 870539220.328,
            //         lat: 10.795074,
            //         lng: 106.664941,
            //         thumbnail: '/energy.jpeg',
            //         group_name: "Group 1",
            //         device_total: 5,
            //         status: 1
            //     },
            //     {
            //         id: 1,
            //         name: "Project 9",
            //         power: '144.61 kW',
            //         irradiance: '368.75 W/m2',
            //         today: '1.79 MWh',
            //         lifetime: '450.12 MWh',
            //         revenue: 870539220.328,
            //         lat: 10.789931,
            //         lng: 106.684682,
            //         thumbnail: '/energy.jpeg',
            //         group_name: "Group 1",
            //         device_total: 5,
            //         status: 1
            //     },
            //     {
            //         id: 1,
            //         name: "Project 10",
            //         power: '144.61 kW',
            //         irradiance: '368.75 W/m2',
            //         today: '1.79 MWh',
            //         lifetime: '450.12 MWh',
            //         revenue: 870539220.328,
            //         lat: 10.793093,
            //         lng: 106.667344,
            //         thumbnail: '/energy.jpeg',
            //         group_name: "Group 1",
            //         device_total: 5,
            //         status: 1
            //     }
            // ];
            // callBack(data, 40, "");

            http.post(Constants.URL.PROJECT.LIST, objE, function (status, rs) {
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
      * API call for update Role status
      * @author long.pham
      * @param @param {RoleEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
    updateStatus(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.PROJECT.UPDATE_STATUS, objE, function (status, rs) {
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
     * API call for save data
     * @author long.pham 2018-07-27
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    save(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.PROJECT.SAVE, objE, function (status, rs) {
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
     * API call for save data
     * @author long.pham 2018-07-27
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    saveConfig(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.PROJECT.SAVE_CONFIG, objE, function (status, rs) {
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
     * API call for save data
     * @author long.pham 2018-07-27
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
      saveMoveDevice(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.PROJECT.SAVE_MOVE_DEVICE, objE, function (status, rs) {
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
         * API call for save data
         * @author long.pham 2018-07-27
         * @param {Function} callBack
         * @param {boolean} isShowProgress
         */
    saveConfigEstimationSenSor(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.PROJECT.SAVE_CONFIG_SENSOR, objE, function (status, rs) {
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
      * API call for delete
      * @author long.pham
      * @param @param {RoleEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
    delete(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.PROJECT.DELETE, objE, function (status, rs) {
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
     * API get detail
     * @author Long.Pham 2019-05-28
     * @param {RegenncyEntity} objE 
     * @param {function(data)} callBack
     * @param {boolean} isShowProgress 
     */

    getDetail(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.PROJECT.DETAIL, objE, function (status, rs) {
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
     * API get detail config
     * @author Long.Pham 2019-05-28
     * @param {RegenncyEntity} objE 
     * @param {function(data)} callBack
     * @param {boolean} isShowProgress 
     */

    getDetailConfig(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.PROJECT.DETAIL_CONFIG, objE, function (status, rs) {
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
    * Get dropdown list
    * @author Long.Pham
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getDropdownList(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.PROJECT.DROPDOWN_LIST, objE, function (status, rs) {
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
        } catch (error) {
            var msg = error;
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
            http.post(Constants.URL.PROJECT.DROPDOWN_LIST_ATTR, objE, function (status, rs) {
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
        } catch (error) {
            var msg = error;
            callBack(false, 0, msg);
        }
    }

}
