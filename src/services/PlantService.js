import CMSHttp from '../utils/CMSHttp';
import Constants from '../utils/Constants';

export default class PlantService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new PlantService();
        }
        return this._instance;
    }

    /**
     * API get detail
     * @author Long.Pham 14/09/2021
     * @param {ProjectEntity} objE 
     * @param {function(data)} callBack
     * @param {boolean} isShowProgress 
     */

    getDetail(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.PLANT.DETAIL, objE, function (status, rs) {
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
     * API get chart site performance
     * @author long.pham 18/09/2021
     * @param {function(data)} callBack
     * @param {int} hash_id
     * @return Object
     */
     getDataChart(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.PLANT.CHART_DATA, objE, function (status, rs) {
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

}
