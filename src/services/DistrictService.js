import CMSHttp from '../utils/CMSHttp';
import Constants from '../utils/Constants';

export default class DistrictService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new DistrictService();
        }
        return this._instance;
    }
    constructor() {
    }

    /**
    * Get all District
    * @author long.pham
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getByIdProvince(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.DISTRICT.LIST, objE, function (status, rs) {
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
