import Libs from '../utils/Libs';
import CMSHttp from '../utils/CMSHttp';
import Constants from '../utils/Constants';

export default class ChartsDiagnosticsService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new ChartsDiagnosticsService();
        }
        return this._instance;
    }


    /**
     * API get chart mini site inverter performance
     * @author long.pham 2020-11-02
     * @param {function(data)} callBack
     * @param {int} id_site 
     * @return Object
     */
     getDataChart(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            var data = {
                "id": 0,
                "id_customer": 1,
                "id_country": 0,
                "id_time_zone": 0,
                "name": null,
                "street": null,
                "lat": 0,
                "lng": 0,
                "old_data": null,
                "number": null,
                "postal_code": null,
                "city": null,
                "state": null,
                "commissioning": null,
                "emergency_contact": null,
                "ac_capacity": 0,
                "dc_capacity": 0,
                "status": 0,
                "is_delete": 0,
                "created_date": null,
                "created_by": null,
                "updated_date": null,
                "updated_by": null,
                "built_since": null,
                "limit": 0,
                "offset": 0,
                "totalRecord": 0,
                "order_by": null,
                "sort_by": null,
                "address_short": null,
                "watts_3ph_total": 0,
                "sensor1_data": 0,
                "w_hours_total": 0,
                "w_hours_received": 0,
                "eer_this_month": 0,
                "total_energy_this_month": 0,
                "today_kwh": 0,
                "eer_last_month": 0,
                "total_error": 0,
                "alert_list": null,
                "kpi_type": null,
                "irradiance": null,
                "power": null,
                "energy": [
                    {
                        "total_energy": 1967,
                        "export_devicename": "RGM-01",
                        "data_energy": [
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 00:00:00 AM",
                                "download_time": "2021-08-12 00:00",
                                "local_time": "2021-08-12 00:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 00:00",
                                "id_device": 95,
                                "time": "2021-08-12T07:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809696
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 00:15:00 AM",
                                "download_time": "2021-08-12 00:15",
                                "local_time": "2021-08-12 00:15",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 00:15",
                                "id_device": 95,
                                "time": "2021-08-12T07:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809697
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 00:30:00 AM",
                                "download_time": "2021-08-12 00:30",
                                "local_time": "2021-08-12 00:30",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 00:30",
                                "id_device": 95,
                                "time": "2021-08-12T07:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809698
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 00:45:00 AM",
                                "download_time": "2021-08-12 00:45",
                                "local_time": "2021-08-12 00:45",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 00:45",
                                "id_device": 95,
                                "time": "2021-08-12T07:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809699
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 01:00:00 AM",
                                "download_time": "2021-08-12 01:00",
                                "local_time": "2021-08-12 01:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 01:00",
                                "id_device": 95,
                                "time": "2021-08-12T08:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809700
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 01:15:00 AM",
                                "download_time": "2021-08-12 01:15",
                                "local_time": "2021-08-12 01:15",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 01:15",
                                "id_device": 95,
                                "time": "2021-08-12T08:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809701
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 01:30:00 AM",
                                "download_time": "2021-08-12 01:30",
                                "local_time": "2021-08-12 01:30",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 01:30",
                                "id_device": 95,
                                "time": "2021-08-12T08:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809702
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 01:45:00 AM",
                                "download_time": "2021-08-12 01:45",
                                "local_time": "2021-08-12 01:45",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 01:45",
                                "id_device": 95,
                                "time": "2021-08-12T08:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809703
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 02:00:00 AM",
                                "download_time": "2021-08-12 02:00",
                                "local_time": "2021-08-12 02:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 02:00",
                                "id_device": 95,
                                "time": "2021-08-12T09:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809704
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 02:15:00 AM",
                                "download_time": "2021-08-12 02:15",
                                "local_time": "2021-08-12 02:15",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 02:15",
                                "id_device": 95,
                                "time": "2021-08-12T09:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809705
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 02:30:00 AM",
                                "download_time": "2021-08-12 02:30",
                                "local_time": "2021-08-12 02:30",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 02:30",
                                "id_device": 95,
                                "time": "2021-08-12T09:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809706
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 02:45:00 AM",
                                "download_time": "2021-08-12 02:45",
                                "local_time": "2021-08-12 02:45",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 02:45",
                                "id_device": 95,
                                "time": "2021-08-12T09:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809707
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 03:00:00 AM",
                                "download_time": "2021-08-12 03:00",
                                "local_time": "2021-08-12 03:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 03:00",
                                "id_device": 95,
                                "time": "2021-08-12T10:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809708
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 03:15:00 AM",
                                "download_time": "2021-08-12 03:15",
                                "local_time": "2021-08-12 03:15",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 03:15",
                                "id_device": 95,
                                "time": "2021-08-12T10:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809709
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 03:30:00 AM",
                                "download_time": "2021-08-12 03:30",
                                "local_time": "2021-08-12 03:30",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 03:30",
                                "id_device": 95,
                                "time": "2021-08-12T10:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809710
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 03:45:00 AM",
                                "download_time": "2021-08-12 03:45",
                                "local_time": "2021-08-12 03:45",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 03:45",
                                "id_device": 95,
                                "time": "2021-08-12T10:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809711
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 04:00:00 AM",
                                "download_time": "2021-08-12 04:00",
                                "local_time": "2021-08-12 04:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 04:00",
                                "id_device": 95,
                                "time": "2021-08-12T11:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809712
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 04:15:00 AM",
                                "download_time": "2021-08-12 04:15",
                                "local_time": "2021-08-12 04:15",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 04:15",
                                "id_device": 95,
                                "time": "2021-08-12T11:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809713
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 04:30:00 AM",
                                "download_time": "2021-08-12 04:30",
                                "local_time": "2021-08-12 04:30",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 04:30",
                                "id_device": 95,
                                "time": "2021-08-12T11:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809714
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 04:45:00 AM",
                                "download_time": "2021-08-12 04:45",
                                "local_time": "2021-08-12 04:45",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 04:45",
                                "id_device": 95,
                                "time": "2021-08-12T11:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809715
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 05:00:00 AM",
                                "download_time": "2021-08-12 05:00",
                                "local_time": "2021-08-12 05:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 05:00",
                                "id_device": 95,
                                "time": "2021-08-12T12:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809716
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 05:15:00 AM",
                                "download_time": "2021-08-12 05:15",
                                "local_time": "2021-08-12 05:15",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 05:15",
                                "id_device": 95,
                                "time": "2021-08-12T12:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809717
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 05:30:00 AM",
                                "download_time": "2021-08-12 05:30",
                                "local_time": "2021-08-12 05:30",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 05:30",
                                "id_device": 95,
                                "time": "2021-08-12T12:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809718
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 05:45:00 AM",
                                "download_time": "2021-08-12 05:45",
                                "local_time": "2021-08-12 05:45",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 05:45",
                                "id_device": 95,
                                "time": "2021-08-12T12:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809719
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 06:00:00 AM",
                                "download_time": "2021-08-12 06:00",
                                "local_time": "2021-08-12 06:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 06:00",
                                "id_device": 95,
                                "time": "2021-08-12T13:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809720
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 06:15:00 AM",
                                "download_time": "2021-08-12 06:15",
                                "local_time": "2021-08-12 06:15",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 06:15",
                                "id_device": 95,
                                "time": "2021-08-12T13:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809721
                            },
                            {
                                "energy_kwh": 8109311,
                                "last_updated": "2021-08-12 06:30:00 AM",
                                "download_time": "2021-08-12 06:30",
                                "local_time": "2021-08-12 06:30",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 06:30",
                                "id_device": 95,
                                "time": "2021-08-12T13:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809722
                            },
                            {
                                "energy_kwh": 8109313,
                                "last_updated": "2021-08-12 06:45:00 AM",
                                "download_time": "2021-08-12 06:45",
                                "local_time": "2021-08-12 06:45",
                                "chart_energy_kwh": 2,
                                "full_time": "2021-08-12 06:45",
                                "id_device": 95,
                                "time": "2021-08-12T13:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809723
                            },
                            {
                                "energy_kwh": 8109317,
                                "last_updated": "2021-08-12 07:00:00 AM",
                                "download_time": "2021-08-12 07:00",
                                "local_time": "2021-08-12 07:00",
                                "chart_energy_kwh": 4,
                                "full_time": "2021-08-12 07:00",
                                "id_device": 95,
                                "time": "2021-08-12T14:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809724
                            },
                            {
                                "energy_kwh": 8109324,
                                "last_updated": "2021-08-12 07:15:00 AM",
                                "download_time": "2021-08-12 07:15",
                                "local_time": "2021-08-12 07:15",
                                "chart_energy_kwh": 7,
                                "full_time": "2021-08-12 07:15",
                                "id_device": 95,
                                "time": "2021-08-12T14:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809725
                            },
                            {
                                "energy_kwh": 8109334,
                                "last_updated": "2021-08-12 07:30:00 AM",
                                "download_time": "2021-08-12 07:30",
                                "local_time": "2021-08-12 07:30",
                                "chart_energy_kwh": 10,
                                "full_time": "2021-08-12 07:30",
                                "id_device": 95,
                                "time": "2021-08-12T14:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809726
                            },
                            {
                                "energy_kwh": 8109347,
                                "last_updated": "2021-08-12 07:45:00 AM",
                                "download_time": "2021-08-12 07:45",
                                "local_time": "2021-08-12 07:45",
                                "chart_energy_kwh": 13,
                                "full_time": "2021-08-12 07:45",
                                "id_device": 95,
                                "time": "2021-08-12T14:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809727
                            },
                            {
                                "energy_kwh": 8109364,
                                "last_updated": "2021-08-12 08:00:00 AM",
                                "download_time": "2021-08-12 08:00",
                                "local_time": "2021-08-12 08:00",
                                "chart_energy_kwh": 17,
                                "full_time": "2021-08-12 08:00",
                                "id_device": 95,
                                "time": "2021-08-12T15:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809728
                            },
                            {
                                "energy_kwh": 8109384,
                                "last_updated": "2021-08-12 08:15:00 AM",
                                "download_time": "2021-08-12 08:15",
                                "local_time": "2021-08-12 08:15",
                                "chart_energy_kwh": 20,
                                "full_time": "2021-08-12 08:15",
                                "id_device": 95,
                                "time": "2021-08-12T15:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809729
                            },
                            {
                                "energy_kwh": 8109407,
                                "last_updated": "2021-08-12 08:30:00 AM",
                                "download_time": "2021-08-12 08:30",
                                "local_time": "2021-08-12 08:30",
                                "chart_energy_kwh": 23,
                                "full_time": "2021-08-12 08:30",
                                "id_device": 95,
                                "time": "2021-08-12T15:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809730
                            },
                            {
                                "energy_kwh": 8109433,
                                "last_updated": "2021-08-12 08:45:00 AM",
                                "download_time": "2021-08-12 08:45",
                                "local_time": "2021-08-12 08:45",
                                "chart_energy_kwh": 26,
                                "full_time": "2021-08-12 08:45",
                                "id_device": 95,
                                "time": "2021-08-12T15:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809731
                            },
                            {
                                "energy_kwh": 8109464,
                                "last_updated": "2021-08-12 09:00:00 AM",
                                "download_time": "2021-08-12 09:00",
                                "local_time": "2021-08-12 09:00",
                                "chart_energy_kwh": 31,
                                "full_time": "2021-08-12 09:00",
                                "id_device": 95,
                                "time": "2021-08-12T16:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809732
                            },
                            {
                                "energy_kwh": 8109501,
                                "last_updated": "2021-08-12 09:15:00 AM",
                                "download_time": "2021-08-12 09:15",
                                "local_time": "2021-08-12 09:15",
                                "chart_energy_kwh": 37,
                                "full_time": "2021-08-12 09:15",
                                "id_device": 95,
                                "time": "2021-08-12T16:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809733
                            },
                            {
                                "energy_kwh": 8109545,
                                "last_updated": "2021-08-12 09:30:00 AM",
                                "download_time": "2021-08-12 09:30",
                                "local_time": "2021-08-12 09:30",
                                "chart_energy_kwh": 44,
                                "full_time": "2021-08-12 09:30",
                                "id_device": 95,
                                "time": "2021-08-12T16:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809734
                            },
                            {
                                "energy_kwh": 8109597,
                                "last_updated": "2021-08-12 09:45:00 AM",
                                "download_time": "2021-08-12 09:45",
                                "local_time": "2021-08-12 09:45",
                                "chart_energy_kwh": 52,
                                "full_time": "2021-08-12 09:45",
                                "id_device": 95,
                                "time": "2021-08-12T16:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809735
                            },
                            {
                                "energy_kwh": 8109652,
                                "last_updated": "2021-08-12 10:00:00 AM",
                                "download_time": "2021-08-12 10:00",
                                "local_time": "2021-08-12 10:00",
                                "chart_energy_kwh": 55,
                                "full_time": "2021-08-12 10:00",
                                "id_device": 95,
                                "time": "2021-08-12T17:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809736
                            },
                            {
                                "energy_kwh": 8109710,
                                "last_updated": "2021-08-12 10:15:00 AM",
                                "download_time": "2021-08-12 10:15",
                                "local_time": "2021-08-12 10:15",
                                "chart_energy_kwh": 58,
                                "full_time": "2021-08-12 10:15",
                                "id_device": 95,
                                "time": "2021-08-12T17:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809737
                            },
                            {
                                "energy_kwh": 8109770,
                                "last_updated": "2021-08-12 10:30:00 AM",
                                "download_time": "2021-08-12 10:30",
                                "local_time": "2021-08-12 10:30",
                                "chart_energy_kwh": 60,
                                "full_time": "2021-08-12 10:30",
                                "id_device": 95,
                                "time": "2021-08-12T17:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809738
                            },
                            {
                                "energy_kwh": 8109830,
                                "last_updated": "2021-08-12 10:45:00 AM",
                                "download_time": "2021-08-12 10:45",
                                "local_time": "2021-08-12 10:45",
                                "chart_energy_kwh": 60,
                                "full_time": "2021-08-12 10:45",
                                "id_device": 95,
                                "time": "2021-08-12T17:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809739
                            },
                            {
                                "energy_kwh": 8109889,
                                "last_updated": "2021-08-12 11:00:00 AM",
                                "download_time": "2021-08-12 11:00",
                                "local_time": "2021-08-12 11:00",
                                "chart_energy_kwh": 59,
                                "full_time": "2021-08-12 11:00",
                                "id_device": 95,
                                "time": "2021-08-12T18:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809740
                            },
                            {
                                "energy_kwh": 8109947,
                                "last_updated": "2021-08-12 11:15:00 AM",
                                "download_time": "2021-08-12 11:15",
                                "local_time": "2021-08-12 11:15",
                                "chart_energy_kwh": 58,
                                "full_time": "2021-08-12 11:15",
                                "id_device": 95,
                                "time": "2021-08-12T18:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809741
                            },
                            {
                                "energy_kwh": 8110004,
                                "last_updated": "2021-08-12 11:30:00 AM",
                                "download_time": "2021-08-12 11:30",
                                "local_time": "2021-08-12 11:30",
                                "chart_energy_kwh": 57,
                                "full_time": "2021-08-12 11:30",
                                "id_device": 95,
                                "time": "2021-08-12T18:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809742
                            },
                            {
                                "energy_kwh": 8110062,
                                "last_updated": "2021-08-12 11:45:00 AM",
                                "download_time": "2021-08-12 11:45",
                                "local_time": "2021-08-12 11:45",
                                "chart_energy_kwh": 58,
                                "full_time": "2021-08-12 11:45",
                                "id_device": 95,
                                "time": "2021-08-12T18:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809743
                            },
                            {
                                "energy_kwh": 8110120,
                                "last_updated": "2021-08-12 12:00:00 PM",
                                "download_time": "2021-08-12 12:00",
                                "local_time": "2021-08-12 12:00",
                                "chart_energy_kwh": 58,
                                "full_time": "2021-08-12 12:00",
                                "id_device": 95,
                                "time": "2021-08-12T19:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809744
                            },
                            {
                                "energy_kwh": 8110178,
                                "last_updated": "2021-08-12 12:15:00 PM",
                                "download_time": "2021-08-12 12:15",
                                "local_time": "2021-08-12 12:15",
                                "chart_energy_kwh": 58,
                                "full_time": "2021-08-12 12:15",
                                "id_device": 95,
                                "time": "2021-08-12T19:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809745
                            },
                            {
                                "energy_kwh": 8110236,
                                "last_updated": "2021-08-12 12:30:00 PM",
                                "download_time": "2021-08-12 12:30",
                                "local_time": "2021-08-12 12:30",
                                "chart_energy_kwh": 58,
                                "full_time": "2021-08-12 12:30",
                                "id_device": 95,
                                "time": "2021-08-12T19:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809746
                            },
                            {
                                "energy_kwh": 8110294,
                                "last_updated": "2021-08-12 12:45:00 PM",
                                "download_time": "2021-08-12 12:45",
                                "local_time": "2021-08-12 12:45",
                                "chart_energy_kwh": 58,
                                "full_time": "2021-08-12 12:45",
                                "id_device": 95,
                                "time": "2021-08-12T19:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809747
                            },
                            {
                                "energy_kwh": 8110352,
                                "last_updated": "2021-08-12 13:00:00 PM",
                                "download_time": "2021-08-12 13:00",
                                "local_time": "2021-08-12 13:00",
                                "chart_energy_kwh": 58,
                                "full_time": "2021-08-12 13:00",
                                "id_device": 95,
                                "time": "2021-08-12T20:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809748
                            },
                            {
                                "energy_kwh": 8110409,
                                "last_updated": "2021-08-12 13:15:00 PM",
                                "download_time": "2021-08-12 13:15",
                                "local_time": "2021-08-12 13:15",
                                "chart_energy_kwh": 57,
                                "full_time": "2021-08-12 13:15",
                                "id_device": 95,
                                "time": "2021-08-12T20:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809749
                            },
                            {
                                "energy_kwh": 8110465,
                                "last_updated": "2021-08-12 13:30:00 PM",
                                "download_time": "2021-08-12 13:30",
                                "local_time": "2021-08-12 13:30",
                                "chart_energy_kwh": 56,
                                "full_time": "2021-08-12 13:30",
                                "id_device": 95,
                                "time": "2021-08-12T20:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809750
                            },
                            {
                                "energy_kwh": 8110520,
                                "last_updated": "2021-08-12 13:45:00 PM",
                                "download_time": "2021-08-12 13:45",
                                "local_time": "2021-08-12 13:45",
                                "chart_energy_kwh": 55,
                                "full_time": "2021-08-12 13:45",
                                "id_device": 95,
                                "time": "2021-08-12T20:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809751
                            },
                            {
                                "energy_kwh": 8110575,
                                "last_updated": "2021-08-12 14:00:00 PM",
                                "download_time": "2021-08-12 14:00",
                                "local_time": "2021-08-12 14:00",
                                "chart_energy_kwh": 55,
                                "full_time": "2021-08-12 14:00",
                                "id_device": 95,
                                "time": "2021-08-12T21:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809752
                            },
                            {
                                "energy_kwh": 8110629,
                                "last_updated": "2021-08-12 14:15:00 PM",
                                "download_time": "2021-08-12 14:15",
                                "local_time": "2021-08-12 14:15",
                                "chart_energy_kwh": 54,
                                "full_time": "2021-08-12 14:15",
                                "id_device": 95,
                                "time": "2021-08-12T21:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809753
                            },
                            {
                                "energy_kwh": 8110682,
                                "last_updated": "2021-08-12 14:30:00 PM",
                                "download_time": "2021-08-12 14:30",
                                "local_time": "2021-08-12 14:30",
                                "chart_energy_kwh": 53,
                                "full_time": "2021-08-12 14:30",
                                "id_device": 95,
                                "time": "2021-08-12T21:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809754
                            },
                            {
                                "energy_kwh": 8110734,
                                "last_updated": "2021-08-12 14:45:00 PM",
                                "download_time": "2021-08-12 14:45",
                                "local_time": "2021-08-12 14:45",
                                "chart_energy_kwh": 52,
                                "full_time": "2021-08-12 14:45",
                                "id_device": 95,
                                "time": "2021-08-12T21:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809755
                            },
                            {
                                "energy_kwh": 8110786,
                                "last_updated": "2021-08-12 15:00:00 PM",
                                "download_time": "2021-08-12 15:00",
                                "local_time": "2021-08-12 15:00",
                                "chart_energy_kwh": 52,
                                "full_time": "2021-08-12 15:00",
                                "id_device": 95,
                                "time": "2021-08-12T22:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809756
                            },
                            {
                                "energy_kwh": 8110840,
                                "last_updated": "2021-08-12 15:15:00 PM",
                                "download_time": "2021-08-12 15:15",
                                "local_time": "2021-08-12 15:15",
                                "chart_energy_kwh": 54,
                                "full_time": "2021-08-12 15:15",
                                "id_device": 95,
                                "time": "2021-08-12T22:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809757
                            },
                            {
                                "energy_kwh": 8110893,
                                "last_updated": "2021-08-12 15:30:00 PM",
                                "download_time": "2021-08-12 15:30",
                                "local_time": "2021-08-12 15:30",
                                "chart_energy_kwh": 53,
                                "full_time": "2021-08-12 15:30",
                                "id_device": 95,
                                "time": "2021-08-12T22:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809758
                            },
                            {
                                "energy_kwh": 8110949,
                                "last_updated": "2021-08-12 15:45:00 PM",
                                "download_time": "2021-08-12 15:45",
                                "local_time": "2021-08-12 15:45",
                                "chart_energy_kwh": 56,
                                "full_time": "2021-08-12 15:45",
                                "id_device": 95,
                                "time": "2021-08-12T22:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809759
                            },
                            {
                                "energy_kwh": 8111002,
                                "last_updated": "2021-08-12 16:00:00 PM",
                                "download_time": "2021-08-12 16:00",
                                "local_time": "2021-08-12 16:00",
                                "chart_energy_kwh": 53,
                                "full_time": "2021-08-12 16:00",
                                "id_device": 95,
                                "time": "2021-08-12T23:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809760
                            },
                            {
                                "energy_kwh": 8111052,
                                "last_updated": "2021-08-12 16:15:00 PM",
                                "download_time": "2021-08-12 16:15",
                                "local_time": "2021-08-12 16:15",
                                "chart_energy_kwh": 50,
                                "full_time": "2021-08-12 16:15",
                                "id_device": 95,
                                "time": "2021-08-12T23:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809761
                            },
                            {
                                "energy_kwh": 8111099,
                                "last_updated": "2021-08-12 16:30:00 PM",
                                "download_time": "2021-08-12 16:30",
                                "local_time": "2021-08-12 16:30",
                                "chart_energy_kwh": 47,
                                "full_time": "2021-08-12 16:30",
                                "id_device": 95,
                                "time": "2021-08-12T23:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809762
                            },
                            {
                                "energy_kwh": 8111140,
                                "last_updated": "2021-08-12 16:45:00 PM",
                                "download_time": "2021-08-12 16:45",
                                "local_time": "2021-08-12 16:45",
                                "chart_energy_kwh": 41,
                                "full_time": "2021-08-12 16:45",
                                "id_device": 95,
                                "time": "2021-08-12T23:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809763
                            },
                            {
                                "energy_kwh": 8111175,
                                "last_updated": "2021-08-12 17:00:00 PM",
                                "download_time": "2021-08-12 17:00",
                                "local_time": "2021-08-12 17:00",
                                "chart_energy_kwh": 35,
                                "full_time": "2021-08-12 17:00",
                                "id_device": 95,
                                "time": "2021-08-13T00:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809764
                            },
                            {
                                "energy_kwh": 8111204,
                                "last_updated": "2021-08-12 17:15:00 PM",
                                "download_time": "2021-08-12 17:15",
                                "local_time": "2021-08-12 17:15",
                                "chart_energy_kwh": 29,
                                "full_time": "2021-08-12 17:15",
                                "id_device": 95,
                                "time": "2021-08-13T00:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809765
                            },
                            {
                                "energy_kwh": 8111227,
                                "last_updated": "2021-08-12 17:30:00 PM",
                                "download_time": "2021-08-12 17:30",
                                "local_time": "2021-08-12 17:30",
                                "chart_energy_kwh": 23,
                                "full_time": "2021-08-12 17:30",
                                "id_device": 95,
                                "time": "2021-08-13T00:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809766
                            },
                            {
                                "energy_kwh": 8111240,
                                "last_updated": "2021-08-12 17:45:00 PM",
                                "download_time": "2021-08-12 17:45",
                                "local_time": "2021-08-12 17:45",
                                "chart_energy_kwh": 13,
                                "full_time": "2021-08-12 17:45",
                                "id_device": 95,
                                "time": "2021-08-13T00:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809767
                            },
                            {
                                "energy_kwh": 8111252,
                                "last_updated": "2021-08-12 18:00:00 PM",
                                "download_time": "2021-08-12 18:00",
                                "local_time": "2021-08-12 18:00",
                                "chart_energy_kwh": 12,
                                "full_time": "2021-08-12 18:00",
                                "id_device": 95,
                                "time": "2021-08-13T01:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809768
                            },
                            {
                                "energy_kwh": 8111260,
                                "last_updated": "2021-08-12 18:15:00 PM",
                                "download_time": "2021-08-12 18:15",
                                "local_time": "2021-08-12 18:15",
                                "chart_energy_kwh": 8,
                                "full_time": "2021-08-12 18:15",
                                "id_device": 95,
                                "time": "2021-08-13T01:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809769
                            },
                            {
                                "energy_kwh": 8111267,
                                "last_updated": "2021-08-12 18:30:00 PM",
                                "download_time": "2021-08-12 18:30",
                                "local_time": "2021-08-12 18:30",
                                "chart_energy_kwh": 7,
                                "full_time": "2021-08-12 18:30",
                                "id_device": 95,
                                "time": "2021-08-13T01:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809770
                            },
                            {
                                "energy_kwh": 8111272,
                                "last_updated": "2021-08-12 18:45:00 PM",
                                "download_time": "2021-08-12 18:45",
                                "local_time": "2021-08-12 18:45",
                                "chart_energy_kwh": 5,
                                "full_time": "2021-08-12 18:45",
                                "id_device": 95,
                                "time": "2021-08-13T01:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809771
                            },
                            {
                                "energy_kwh": 8111275,
                                "last_updated": "2021-08-12 19:00:00 PM",
                                "download_time": "2021-08-12 19:00",
                                "local_time": "2021-08-12 19:00",
                                "chart_energy_kwh": 3,
                                "full_time": "2021-08-12 19:00",
                                "id_device": 95,
                                "time": "2021-08-13T02:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809772
                            },
                            {
                                "energy_kwh": 8111277,
                                "last_updated": "2021-08-12 19:15:00 PM",
                                "download_time": "2021-08-12 19:15",
                                "local_time": "2021-08-12 19:15",
                                "chart_energy_kwh": 2,
                                "full_time": "2021-08-12 19:15",
                                "id_device": 95,
                                "time": "2021-08-13T02:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809773
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 19:30:00 PM",
                                "download_time": "2021-08-12 19:30",
                                "local_time": "2021-08-12 19:30",
                                "chart_energy_kwh": 1,
                                "full_time": "2021-08-12 19:30",
                                "id_device": 95,
                                "time": "2021-08-13T02:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809774
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 19:45:00 PM",
                                "download_time": "2021-08-12 19:45",
                                "local_time": "2021-08-12 19:45",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 19:45",
                                "id_device": 95,
                                "time": "2021-08-13T02:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809775
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 20:00:00 PM",
                                "download_time": "2021-08-12 20:00",
                                "local_time": "2021-08-12 20:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 20:00",
                                "id_device": 95,
                                "time": "2021-08-13T03:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809776
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 20:15:00 PM",
                                "download_time": "2021-08-12 20:15",
                                "local_time": "2021-08-12 20:15",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 20:15",
                                "id_device": 95,
                                "time": "2021-08-13T03:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809777
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 20:30:00 PM",
                                "download_time": "2021-08-12 20:30",
                                "local_time": "2021-08-12 20:30",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 20:30",
                                "id_device": 95,
                                "time": "2021-08-13T03:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809778
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 20:45:00 PM",
                                "download_time": "2021-08-12 20:45",
                                "local_time": "2021-08-12 20:45",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 20:45",
                                "id_device": 95,
                                "time": "2021-08-13T03:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809779
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 21:00:00 PM",
                                "download_time": "2021-08-12 21:00",
                                "local_time": "2021-08-12 21:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 21:00",
                                "id_device": 95,
                                "time": "2021-08-13T04:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809780
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 21:15:00 PM",
                                "download_time": "2021-08-12 21:15",
                                "local_time": "2021-08-12 21:15",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 21:15",
                                "id_device": 95,
                                "time": "2021-08-13T04:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809781
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 21:30:00 PM",
                                "download_time": "2021-08-12 21:30",
                                "local_time": "2021-08-12 21:30",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 21:30",
                                "id_device": 95,
                                "time": "2021-08-13T04:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809782
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 21:45:00 PM",
                                "download_time": "2021-08-12 21:45",
                                "local_time": "2021-08-12 21:45",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 21:45",
                                "id_device": 95,
                                "time": "2021-08-13T04:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809783
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 22:00:00 PM",
                                "download_time": "2021-08-12 22:00",
                                "local_time": "2021-08-12 22:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 22:00",
                                "id_device": 95,
                                "time": "2021-08-13T05:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809784
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 22:15:00 PM",
                                "download_time": "2021-08-12 22:15",
                                "local_time": "2021-08-12 22:15",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 22:15",
                                "id_device": 95,
                                "time": "2021-08-13T05:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809785
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 22:30:00 PM",
                                "download_time": "2021-08-12 22:30",
                                "local_time": "2021-08-12 22:30",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 22:30",
                                "id_device": 95,
                                "time": "2021-08-13T05:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809786
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 22:45:00 PM",
                                "download_time": "2021-08-12 22:45",
                                "local_time": "2021-08-12 22:45",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 22:45",
                                "id_device": 95,
                                "time": "2021-08-13T05:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809787
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 23:00:00 PM",
                                "download_time": "2021-08-12 23:00",
                                "local_time": "2021-08-12 23:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 23:00",
                                "id_device": 95,
                                "time": "2021-08-13T06:00:00.000+00:00",
                                "id": 13,
                                "timekey": 1809788
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 23:15:00 PM",
                                "download_time": "2021-08-12 23:15",
                                "local_time": "2021-08-12 23:15",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 23:15",
                                "id_device": 95,
                                "time": "2021-08-13T06:15:00.000+00:00",
                                "id": 13,
                                "timekey": 1809789
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 23:30:00 PM",
                                "download_time": "2021-08-12 23:30",
                                "local_time": "2021-08-12 23:30",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 23:30",
                                "id_device": 95,
                                "time": "2021-08-13T06:30:00.000+00:00",
                                "id": 13,
                                "timekey": 1809790
                            },
                            {
                                "energy_kwh": 8111278,
                                "last_updated": "2021-08-12 23:45:00 PM",
                                "download_time": "2021-08-12 23:45",
                                "local_time": "2021-08-12 23:45",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 23:45",
                                "id_device": 95,
                                "time": "2021-08-13T06:45:00.000+00:00",
                                "id": 13,
                                "timekey": 1809791
                            }
                        ],
                        "devicename": "PVS - 100",
                        "id": 95,
                        "type": "energy"
                    },
                    {
                        "total_energy": 0,
                        "export_devicename": "RT1",
                        "data_energy": [
                            {
                                "download_time": "2021-08-12 00:00",
                                "utc_time": "2021-08-12 07:00:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 00:00",
                                "id_device": 96,
                                "time_day": "00:00",
                                "id": 13,
                                "timekey": 1809696,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 00:15",
                                "utc_time": "2021-08-12 07:15:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 00:15",
                                "id_device": 96,
                                "time_day": "00:15",
                                "id": 13,
                                "timekey": 1809697,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 00:30",
                                "utc_time": "2021-08-12 07:30:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 00:30",
                                "id_device": 96,
                                "time_day": "00:30",
                                "id": 13,
                                "timekey": 1809698,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 00:45",
                                "utc_time": "2021-08-12 07:45:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 00:45",
                                "id_device": 96,
                                "time_day": "00:45",
                                "id": 13,
                                "timekey": 1809699,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 01:00",
                                "utc_time": "2021-08-12 08:00:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 01:00",
                                "id_device": 96,
                                "time_day": "01:00",
                                "id": 13,
                                "timekey": 1809700,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 01:15",
                                "utc_time": "2021-08-12 08:15:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 01:15",
                                "id_device": 96,
                                "time_day": "01:15",
                                "id": 13,
                                "timekey": 1809701,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 01:30",
                                "utc_time": "2021-08-12 08:30:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 01:30",
                                "id_device": 96,
                                "time_day": "01:30",
                                "id": 13,
                                "timekey": 1809702,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 01:45",
                                "utc_time": "2021-08-12 08:45:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 01:45",
                                "id_device": 96,
                                "time_day": "01:45",
                                "id": 13,
                                "timekey": 1809703,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 02:00",
                                "utc_time": "2021-08-12 09:00:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 02:00",
                                "id_device": 96,
                                "time_day": "02:00",
                                "id": 13,
                                "timekey": 1809704,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 02:15",
                                "utc_time": "2021-08-12 09:15:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 02:15",
                                "id_device": 96,
                                "time_day": "02:15",
                                "id": 13,
                                "timekey": 1809705,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 02:30",
                                "utc_time": "2021-08-12 09:30:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 02:30",
                                "id_device": 96,
                                "time_day": "02:30",
                                "id": 13,
                                "timekey": 1809706,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 02:45",
                                "utc_time": "2021-08-12 09:45:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 02:45",
                                "id_device": 96,
                                "time_day": "02:45",
                                "id": 13,
                                "timekey": 1809707,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 03:00",
                                "utc_time": "2021-08-12 10:00:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 03:00",
                                "id_device": 96,
                                "time_day": "03:00",
                                "id": 13,
                                "timekey": 1809708,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 03:15",
                                "utc_time": "2021-08-12 10:15:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 03:15",
                                "id_device": 96,
                                "time_day": "03:15",
                                "id": 13,
                                "timekey": 1809709,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 03:30",
                                "utc_time": "2021-08-12 10:30:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 03:30",
                                "id_device": 96,
                                "time_day": "03:30",
                                "id": 13,
                                "timekey": 1809710,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 03:45",
                                "utc_time": "2021-08-12 10:45:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 03:45",
                                "id_device": 96,
                                "time_day": "03:45",
                                "id": 13,
                                "timekey": 1809711,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 04:00",
                                "utc_time": "2021-08-12 11:00:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 04:00",
                                "id_device": 96,
                                "time_day": "04:00",
                                "id": 13,
                                "timekey": 1809712,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 04:15",
                                "utc_time": "2021-08-12 11:15:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 04:15",
                                "id_device": 96,
                                "time_day": "04:15",
                                "id": 13,
                                "timekey": 1809713,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 04:30",
                                "utc_time": "2021-08-12 11:30:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 04:30",
                                "id_device": 96,
                                "time_day": "04:30",
                                "id": 13,
                                "timekey": 1809714,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 04:45",
                                "utc_time": "2021-08-12 11:45:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 04:45",
                                "id_device": 96,
                                "time_day": "04:45",
                                "id": 13,
                                "timekey": 1809715,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 05:00",
                                "utc_time": "2021-08-12 12:00:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 05:00",
                                "id_device": 96,
                                "time_day": "05:00",
                                "id": 13,
                                "timekey": 1809716,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 05:15",
                                "utc_time": "2021-08-12 12:15:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 05:15",
                                "id_device": 96,
                                "time_day": "05:15",
                                "id": 13,
                                "timekey": 1809717,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 05:30",
                                "utc_time": "2021-08-12 12:30:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 05:30",
                                "id_device": 96,
                                "time_day": "05:30",
                                "id": 13,
                                "timekey": 1809718,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 05:45",
                                "utc_time": "2021-08-12 12:45:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 05:45",
                                "id_device": 96,
                                "time_day": "05:45",
                                "id": 13,
                                "timekey": 1809719,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 06:00",
                                "utc_time": "2021-08-12 13:00:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 06:00",
                                "id_device": 96,
                                "time_day": "06:00",
                                "id": 13,
                                "timekey": 1809720,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 06:15",
                                "utc_time": "2021-08-12 13:15:00",
                                "chart_energy_kwh": 3,
                                "full_time": "2021-08-12 06:15",
                                "id_device": 96,
                                "time_day": "06:15",
                                "id": 13,
                                "timekey": 1809721,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 06:30",
                                "utc_time": "2021-08-12 13:30:00",
                                "chart_energy_kwh": 18,
                                "full_time": "2021-08-12 06:30",
                                "id_device": 96,
                                "time_day": "06:30",
                                "id": 13,
                                "timekey": 1809722,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 06:45",
                                "utc_time": "2021-08-12 13:45:00",
                                "chart_energy_kwh": 36,
                                "full_time": "2021-08-12 06:45",
                                "id_device": 96,
                                "time_day": "06:45",
                                "id": 13,
                                "timekey": 1809723,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 07:00",
                                "utc_time": "2021-08-12 14:00:00",
                                "chart_energy_kwh": 57,
                                "full_time": "2021-08-12 07:00",
                                "id_device": 96,
                                "time_day": "07:00",
                                "id": 13,
                                "timekey": 1809724,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 07:15",
                                "utc_time": "2021-08-12 14:15:00",
                                "chart_energy_kwh": 83,
                                "full_time": "2021-08-12 07:15",
                                "id_device": 96,
                                "time_day": "07:15",
                                "id": 13,
                                "timekey": 1809725,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 07:30",
                                "utc_time": "2021-08-12 14:30:00",
                                "chart_energy_kwh": 111,
                                "full_time": "2021-08-12 07:30",
                                "id_device": 96,
                                "time_day": "07:30",
                                "id": 13,
                                "timekey": 1809726,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 07:45",
                                "utc_time": "2021-08-12 14:45:00",
                                "chart_energy_kwh": 142,
                                "full_time": "2021-08-12 07:45",
                                "id_device": 96,
                                "time_day": "07:45",
                                "id": 13,
                                "timekey": 1809727,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 08:00",
                                "utc_time": "2021-08-12 15:00:00",
                                "chart_energy_kwh": 177,
                                "full_time": "2021-08-12 08:00",
                                "id_device": 96,
                                "time_day": "08:00",
                                "id": 13,
                                "timekey": 1809728,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 08:15",
                                "utc_time": "2021-08-12 15:15:00",
                                "chart_energy_kwh": 217,
                                "full_time": "2021-08-12 08:15",
                                "id_device": 96,
                                "time_day": "08:15",
                                "id": 13,
                                "timekey": 1809729,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 08:30",
                                "utc_time": "2021-08-12 15:30:00",
                                "chart_energy_kwh": 260,
                                "full_time": "2021-08-12 08:30",
                                "id_device": 96,
                                "time_day": "08:30",
                                "id": 13,
                                "timekey": 1809730,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 08:45",
                                "utc_time": "2021-08-12 15:45:00",
                                "chart_energy_kwh": 299,
                                "full_time": "2021-08-12 08:45",
                                "id_device": 96,
                                "time_day": "08:45",
                                "id": 13,
                                "timekey": 1809731,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 09:00",
                                "utc_time": "2021-08-12 16:00:00",
                                "chart_energy_kwh": 362,
                                "full_time": "2021-08-12 09:00",
                                "id_device": 96,
                                "time_day": "09:00",
                                "id": 13,
                                "timekey": 1809732,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 09:15",
                                "utc_time": "2021-08-12 16:15:00",
                                "chart_energy_kwh": 410,
                                "full_time": "2021-08-12 09:15",
                                "id_device": 96,
                                "time_day": "09:15",
                                "id": 13,
                                "timekey": 1809733,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 09:30",
                                "utc_time": "2021-08-12 16:30:00",
                                "chart_energy_kwh": 591,
                                "full_time": "2021-08-12 09:30",
                                "id_device": 96,
                                "time_day": "09:30",
                                "id": 13,
                                "timekey": 1809734,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 09:45",
                                "utc_time": "2021-08-12 16:45:00",
                                "chart_energy_kwh": 644,
                                "full_time": "2021-08-12 09:45",
                                "id_device": 96,
                                "time_day": "09:45",
                                "id": 13,
                                "timekey": 1809735,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 10:00",
                                "utc_time": "2021-08-12 17:00:00",
                                "chart_energy_kwh": 737,
                                "full_time": "2021-08-12 10:00",
                                "id_device": 96,
                                "time_day": "10:00",
                                "id": 13,
                                "timekey": 1809736,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 10:15",
                                "utc_time": "2021-08-12 17:15:00",
                                "chart_energy_kwh": 805,
                                "full_time": "2021-08-12 10:15",
                                "id_device": 96,
                                "time_day": "10:15",
                                "id": 13,
                                "timekey": 1809737,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 10:30",
                                "utc_time": "2021-08-12 17:30:00",
                                "chart_energy_kwh": 809,
                                "full_time": "2021-08-12 10:30",
                                "id_device": 96,
                                "time_day": "10:30",
                                "id": 13,
                                "timekey": 1809738,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 10:45",
                                "utc_time": "2021-08-12 17:45:00",
                                "chart_energy_kwh": 803,
                                "full_time": "2021-08-12 10:45",
                                "id_device": 96,
                                "time_day": "10:45",
                                "id": 13,
                                "timekey": 1809739,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 11:00",
                                "utc_time": "2021-08-12 18:00:00",
                                "chart_energy_kwh": 805,
                                "full_time": "2021-08-12 11:00",
                                "id_device": 96,
                                "time_day": "11:00",
                                "id": 13,
                                "timekey": 1809740,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 11:15",
                                "utc_time": "2021-08-12 18:15:00",
                                "chart_energy_kwh": 804,
                                "full_time": "2021-08-12 11:15",
                                "id_device": 96,
                                "time_day": "11:15",
                                "id": 13,
                                "timekey": 1809741,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 11:30",
                                "utc_time": "2021-08-12 18:30:00",
                                "chart_energy_kwh": 807,
                                "full_time": "2021-08-12 11:30",
                                "id_device": 96,
                                "time_day": "11:30",
                                "id": 13,
                                "timekey": 1809742,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 11:45",
                                "utc_time": "2021-08-12 18:45:00",
                                "chart_energy_kwh": 813,
                                "full_time": "2021-08-12 11:45",
                                "id_device": 96,
                                "time_day": "11:45",
                                "id": 13,
                                "timekey": 1809743,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 12:00",
                                "utc_time": "2021-08-12 19:00:00",
                                "chart_energy_kwh": 812,
                                "full_time": "2021-08-12 12:00",
                                "id_device": 96,
                                "time_day": "12:00",
                                "id": 13,
                                "timekey": 1809744,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 12:15",
                                "utc_time": "2021-08-12 19:15:00",
                                "chart_energy_kwh": 808,
                                "full_time": "2021-08-12 12:15",
                                "id_device": 96,
                                "time_day": "12:15",
                                "id": 13,
                                "timekey": 1809745,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 12:30",
                                "utc_time": "2021-08-12 19:30:00",
                                "chart_energy_kwh": 808,
                                "full_time": "2021-08-12 12:30",
                                "id_device": 96,
                                "time_day": "12:30",
                                "id": 13,
                                "timekey": 1809746,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 12:45",
                                "utc_time": "2021-08-12 19:45:00",
                                "chart_energy_kwh": 806,
                                "full_time": "2021-08-12 12:45",
                                "id_device": 96,
                                "time_day": "12:45",
                                "id": 13,
                                "timekey": 1809747,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 13:00",
                                "utc_time": "2021-08-12 20:00:00",
                                "chart_energy_kwh": 800,
                                "full_time": "2021-08-12 13:00",
                                "id_device": 96,
                                "time_day": "13:00",
                                "id": 13,
                                "timekey": 1809748,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 13:15",
                                "utc_time": "2021-08-12 20:15:00",
                                "chart_energy_kwh": 797,
                                "full_time": "2021-08-12 13:15",
                                "id_device": 96,
                                "time_day": "13:15",
                                "id": 13,
                                "timekey": 1809749,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 13:30",
                                "utc_time": "2021-08-12 20:30:00",
                                "chart_energy_kwh": 791,
                                "full_time": "2021-08-12 13:30",
                                "id_device": 96,
                                "time_day": "13:30",
                                "id": 13,
                                "timekey": 1809750,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 13:45",
                                "utc_time": "2021-08-12 20:45:00",
                                "chart_energy_kwh": 782,
                                "full_time": "2021-08-12 13:45",
                                "id_device": 96,
                                "time_day": "13:45",
                                "id": 13,
                                "timekey": 1809751,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 14:00",
                                "utc_time": "2021-08-12 21:00:00",
                                "chart_energy_kwh": 775,
                                "full_time": "2021-08-12 14:00",
                                "id_device": 96,
                                "time_day": "14:00",
                                "id": 13,
                                "timekey": 1809752,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 14:15",
                                "utc_time": "2021-08-12 21:15:00",
                                "chart_energy_kwh": 763,
                                "full_time": "2021-08-12 14:15",
                                "id_device": 96,
                                "time_day": "14:15",
                                "id": 13,
                                "timekey": 1809753,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 14:30",
                                "utc_time": "2021-08-12 21:30:00",
                                "chart_energy_kwh": 755,
                                "full_time": "2021-08-12 14:30",
                                "id_device": 96,
                                "time_day": "14:30",
                                "id": 13,
                                "timekey": 1809754,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 14:45",
                                "utc_time": "2021-08-12 21:45:00",
                                "chart_energy_kwh": 719,
                                "full_time": "2021-08-12 14:45",
                                "id_device": 96,
                                "time_day": "14:45",
                                "id": 13,
                                "timekey": 1809755,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 15:00",
                                "utc_time": "2021-08-12 22:00:00",
                                "chart_energy_kwh": 759,
                                "full_time": "2021-08-12 15:00",
                                "id_device": 96,
                                "time_day": "15:00",
                                "id": 13,
                                "timekey": 1809756,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 15:15",
                                "utc_time": "2021-08-12 22:15:00",
                                "chart_energy_kwh": 783,
                                "full_time": "2021-08-12 15:15",
                                "id_device": 96,
                                "time_day": "15:15",
                                "id": 13,
                                "timekey": 1809757,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 15:30",
                                "utc_time": "2021-08-12 22:30:00",
                                "chart_energy_kwh": 856,
                                "full_time": "2021-08-12 15:30",
                                "id_device": 96,
                                "time_day": "15:30",
                                "id": 13,
                                "timekey": 1809758,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 15:45",
                                "utc_time": "2021-08-12 22:45:00",
                                "chart_energy_kwh": 842,
                                "full_time": "2021-08-12 15:45",
                                "id_device": 96,
                                "time_day": "15:45",
                                "id": 13,
                                "timekey": 1809759,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 16:00",
                                "utc_time": "2021-08-12 23:00:00",
                                "chart_energy_kwh": 772,
                                "full_time": "2021-08-12 16:00",
                                "id_device": 96,
                                "time_day": "16:00",
                                "id": 13,
                                "timekey": 1809760,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 16:15",
                                "utc_time": "2021-08-12 23:15:00",
                                "chart_energy_kwh": 775,
                                "full_time": "2021-08-12 16:15",
                                "id_device": 96,
                                "time_day": "16:15",
                                "id": 13,
                                "timekey": 1809761,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 16:30",
                                "utc_time": "2021-08-12 23:30:00",
                                "chart_energy_kwh": 711,
                                "full_time": "2021-08-12 16:30",
                                "id_device": 96,
                                "time_day": "16:30",
                                "id": 13,
                                "timekey": 1809762,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 16:45",
                                "utc_time": "2021-08-12 23:45:00",
                                "chart_energy_kwh": 650,
                                "full_time": "2021-08-12 16:45",
                                "id_device": 96,
                                "time_day": "16:45",
                                "id": 13,
                                "timekey": 1809763,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 17:00",
                                "utc_time": "2021-08-13 00:00:00",
                                "chart_energy_kwh": 560,
                                "full_time": "2021-08-12 17:00",
                                "id_device": 96,
                                "time_day": "17:00",
                                "id": 13,
                                "timekey": 1809764,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 17:15",
                                "utc_time": "2021-08-13 00:15:00",
                                "chart_energy_kwh": 489,
                                "full_time": "2021-08-12 17:15",
                                "id_device": 96,
                                "time_day": "17:15",
                                "id": 13,
                                "timekey": 1809765,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 17:30",
                                "utc_time": "2021-08-13 00:30:00",
                                "chart_energy_kwh": 357,
                                "full_time": "2021-08-12 17:30",
                                "id_device": 96,
                                "time_day": "17:30",
                                "id": 13,
                                "timekey": 1809766,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 17:45",
                                "utc_time": "2021-08-13 00:45:00",
                                "chart_energy_kwh": 306,
                                "full_time": "2021-08-12 17:45",
                                "id_device": 96,
                                "time_day": "17:45",
                                "id": 13,
                                "timekey": 1809767,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 18:00",
                                "utc_time": "2021-08-13 01:00:00",
                                "chart_energy_kwh": 264,
                                "full_time": "2021-08-12 18:00",
                                "id_device": 96,
                                "time_day": "18:00",
                                "id": 13,
                                "timekey": 1809768,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 18:15",
                                "utc_time": "2021-08-13 01:15:00",
                                "chart_energy_kwh": 212,
                                "full_time": "2021-08-12 18:15",
                                "id_device": 96,
                                "time_day": "18:15",
                                "id": 13,
                                "timekey": 1809769,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 18:30",
                                "utc_time": "2021-08-13 01:30:00",
                                "chart_energy_kwh": 171,
                                "full_time": "2021-08-12 18:30",
                                "id_device": 96,
                                "time_day": "18:30",
                                "id": 13,
                                "timekey": 1809770,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 18:45",
                                "utc_time": "2021-08-13 01:45:00",
                                "chart_energy_kwh": 122,
                                "full_time": "2021-08-12 18:45",
                                "id_device": 96,
                                "time_day": "18:45",
                                "id": 13,
                                "timekey": 1809771,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 19:00",
                                "utc_time": "2021-08-13 02:00:00",
                                "chart_energy_kwh": 88,
                                "full_time": "2021-08-12 19:00",
                                "id_device": 96,
                                "time_day": "19:00",
                                "id": 13,
                                "timekey": 1809772,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 19:15",
                                "utc_time": "2021-08-13 02:15:00",
                                "chart_energy_kwh": 53,
                                "full_time": "2021-08-12 19:15",
                                "id_device": 96,
                                "time_day": "19:15",
                                "id": 13,
                                "timekey": 1809773,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 19:30",
                                "utc_time": "2021-08-13 02:30:00",
                                "chart_energy_kwh": 21,
                                "full_time": "2021-08-12 19:30",
                                "id_device": 96,
                                "time_day": "19:30",
                                "id": 13,
                                "timekey": 1809774,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 19:45",
                                "utc_time": "2021-08-13 02:45:00",
                                "chart_energy_kwh": 7,
                                "full_time": "2021-08-12 19:45",
                                "id_device": 96,
                                "time_day": "19:45",
                                "id": 13,
                                "timekey": 1809775,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 20:00",
                                "utc_time": "2021-08-13 03:00:00",
                                "chart_energy_kwh": 1,
                                "full_time": "2021-08-12 20:00",
                                "id_device": 96,
                                "time_day": "20:00",
                                "id": 13,
                                "timekey": 1809776,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 20:15",
                                "utc_time": "2021-08-13 03:15:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 20:15",
                                "id_device": 96,
                                "time_day": "20:15",
                                "id": 13,
                                "timekey": 1809777,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 20:30",
                                "utc_time": "2021-08-13 03:30:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 20:30",
                                "id_device": 96,
                                "time_day": "20:30",
                                "id": 13,
                                "timekey": 1809778,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 20:45",
                                "utc_time": "2021-08-13 03:45:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 20:45",
                                "id_device": 96,
                                "time_day": "20:45",
                                "id": 13,
                                "timekey": 1809779,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 21:00",
                                "utc_time": "2021-08-13 04:00:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 21:00",
                                "id_device": 96,
                                "time_day": "21:00",
                                "id": 13,
                                "timekey": 1809780,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 21:15",
                                "utc_time": "2021-08-13 04:15:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 21:15",
                                "id_device": 96,
                                "time_day": "21:15",
                                "id": 13,
                                "timekey": 1809781,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 21:30",
                                "utc_time": "2021-08-13 04:30:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 21:30",
                                "id_device": 96,
                                "time_day": "21:30",
                                "id": 13,
                                "timekey": 1809782,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 21:45",
                                "utc_time": "2021-08-13 04:45:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 21:45",
                                "id_device": 96,
                                "time_day": "21:45",
                                "id": 13,
                                "timekey": 1809783,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 22:00",
                                "utc_time": "2021-08-13 05:00:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 22:00",
                                "id_device": 96,
                                "time_day": "22:00",
                                "id": 13,
                                "timekey": 1809784,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 22:15",
                                "utc_time": "2021-08-13 05:15:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 22:15",
                                "id_device": 96,
                                "time_day": "22:15",
                                "id": 13,
                                "timekey": 1809785,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 22:30",
                                "utc_time": "2021-08-13 05:30:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 22:30",
                                "id_device": 96,
                                "time_day": "22:30",
                                "id": 13,
                                "timekey": 1809786,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 22:45",
                                "utc_time": "2021-08-13 05:45:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 22:45",
                                "id_device": 96,
                                "time_day": "22:45",
                                "id": 13,
                                "timekey": 1809787,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 23:00",
                                "utc_time": "2021-08-13 06:00:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 23:00",
                                "id_device": 96,
                                "time_day": "23:00",
                                "id": 13,
                                "timekey": 1809788,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 23:15",
                                "utc_time": "2021-08-13 06:15:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 23:15",
                                "id_device": 96,
                                "time_day": "23:15",
                                "id": 13,
                                "timekey": 1809789,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 23:30",
                                "utc_time": "2021-08-13 06:30:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 23:30",
                                "id_device": 96,
                                "time_day": "23:30",
                                "id": 13,
                                "timekey": 1809790,
                                "id_time_zone": 129
                            },
                            {
                                "download_time": "2021-08-12 23:45",
                                "utc_time": "2021-08-13 06:45:00",
                                "chart_energy_kwh": 0,
                                "full_time": "2021-08-12 23:45",
                                "id_device": 96,
                                "time_day": "23:45",
                                "id": 13,
                                "timekey": 1809791,
                                "id_time_zone": 129
                            }
                        ],
                        "devicename": "PVS - 200",
                        "id": 96,
                        "type": "irradiance"
                    }
                ],
                "kpi_filter": null,
                "offset_timezone": "+07:00",
                "activeAlarm": null,
                "total_site": 0,
                "installed_capacity": 0,
                "expected_last_month": 0,
                "expected_this_month": 0,
                "measured_today": 0,
                "measured_this_month": 0,
                "measured_last_month": 0,
                "err_this_month": null,
                "err_last_month": null,
                "err_today": 0,
                "expected_today": 0,
                "today": null,
                "this_month": null,
                "last_month": null,
                "gallery": null,
                "id_site_type": 1,
                "street_ws": null,
                "file_upload": null,
                "current_time": null,
                "energy_this_year": 0,
                "energy_this_month": 0,
                "energy_today": 0,
                "ac_power": 0,
                "energy_lifetime": 0,
                "filterBy": "today",
                "start_date": "2021-08-12 00:00:00",
                "end_date": "2021-08-12 23:59:59",
                "device_type": 0,
                "id_site": 13,
                "id_device": 96,
                "localization_format": null,
                "format_sql_short": null,
                "format_sql_long": "%Y-%m-%d %H:%i:%s %p",
                "format_sql_string_short": null,
                "format_sql_string_long": null,
                "format_sql_string_mdy": null,
                "offset_from": null,
                "typeView": "month",
                "keyword": null,
                "sort_column": null,
                "screen_mode": 0,
                "is_manage": 0,
                "id_employee": 0,
                "id_sites": null,
                "hash_id": null,
                "view_minute": null,
                "data_send_time": 2,
                "setup_send_time": 1,
                "start_date_time": 0,
                "end_date_time": 0,
                "customer_type": "4ed69755138c0dde957520f6b995a98b",
                "dataCustomer": null,
                "label": null,
                "value": 0
            };
            callBack(data);
            // http.post(Constants.URL.CUSTOMER_VIEW.CHART_DATA, objE, function (status, rs) {
            //     if (typeof callBack === 'function') {
            //         if (!status || !rs) {
            //             //error http => lib http  proccess
            //             return;
            //         }
            //         var data = {};
            //         if (rs.status && typeof rs.data === 'object') {
            //             data = rs.data;
            //         }
            //         callBack(data);
            //     }
            // })
        } catch (error) {
            callBack({});
        }
    }


    // /**
    //  * @author long.pham 2018-07-27
    //  * @param  {RoleEntity} objE
    //  * @param  {function(data,total_row,msg)} callBack
    //  * @param  {Boolean} isShowProgress
    //  */
    // getList(objE, callBack) {
    //     try {
    //         var http = new CMSHttp(true);
    //         var data = [
    //             {
    //                 id: 1,
    //                 name: "Device 1",
    //                 model: 'PVS100',
    //                 serial_number: '109200-3Q15-4420',
    //                 manufacturer: "Manufacturer",
    //                 installed_at: '12/12/2021 00:00:00',
    //                 device_type: "Inverter",
    //                 status: 1
    //             },
    //             {
    //                 id: 1,
    //                 name: "Device 2",
    //                 model: 'PVS100',
    //                 serial_number: '109200-3Q15-4420',
    //                 manufacturer: "Manufacturer",
    //                 installed_at: '12/12/2021 00:00:00',
    //                 device_type: "Inverter",
    //                 status: 1
    //             },
    //             {
    //                 id: 1,
    //                 name: "Device 3",
    //                 model: 'PVS100',
    //                 serial_number: '109200-3Q15-4420',
    //                 manufacturer: "Manufacturer",
    //                 installed_at: '12/12/2021 00:00:00',
    //                 device_type: "Inverter",
    //                 status: 1
    //             },
    //             {
    //                 id: 1,
    //                 name: "Device 4",
    //                 model: 'PVS100',
    //                 serial_number: '109200-3Q15-4420',
    //                 manufacturer: "Manufacturer",
    //                 installed_at: '12/12/2021 00:00:00',
    //                 device_type: "Inverter",
    //                 status: 1
    //             },
    //             {
    //                 id: 1,
    //                 name: "Device 5",
    //                 model: 'PVS100',
    //                 serial_number: '109200-3Q15-4420',
    //                 manufacturer: "Manufacturer",
    //                 installed_at: '12/12/2021 00:00:00',
    //                 device_type: "Inverter",
    //                 status: 1
    //             },
    //             {
    //                 id: 1,
    //                 name: "Device 6",
    //                 model: 'PVS100',
    //                 serial_number: '109200-3Q15-4420',
    //                 manufacturer: "Manufacturer",
    //                 installed_at: '12/12/2021 00:00:00',
    //                 device_type: "Inverter",
    //                 status: 1
    //             },
    //         ];
    //         callBack(data, 40, "");

    //         // http.post(Constants.URL.GROUP_ATTRIBUTES.LIST, objE, function (status, rs) {
    //         //     if (typeof callBack === 'function') {
    //         //         if (!status || !rs) {
    //         //             //lỗi do http nên không làm gì vì đã có http thư viện xử lý
    //         //             return;
    //         //         }
    //         //         var data = [];
    //         //         var total_row = 0;
    //         //         if (rs.status && Array.isArray(rs.data)) {
    //         //             data = rs.data;
    //         //             total_row = rs.total_row;
    //         //         }
    //         //         callBack(data, total_row, "");
    //         //     }
    //         // });
    //     } catch (error) {
    //         var msg = error;
    //         callBack(false, 0, msg);
    //     }
    // }


    // /**
    //   * API call for update Role status
    //   * @author long.pham
    //   * @param @param {RoleEntity} objE
    //   * @param {function(status,msg)} callBack 
    //   * @param  {boolean} isShowProgress
    //   */
    // updateStatus(objE, callBack) {
    //     try {
    //         var http = new CMSHttp(false);
    //         http.post(Constants.URL.GROUP_ATTRIBUTES.UPDATE_STATUS, objE, function (status, rs) {
    //             if (typeof callBack === 'function') {
    //                 if (!status || !rs) {
    //                     return;
    //                 }
    //                 var msg = rs.mess;
    //                 callBack(rs.status, msg);
    //             }
    //         })
    //     } catch (error) {
    //         callBack(false, error);
    //     }
    // }




    // /**
    //  * API call for save data
    //  * @author long.pham 2018-07-27
    //  * @param {Function} callBack
    //  * @param {boolean} isShowProgress
    //  */
    // save(objE, callBack) {
    //     try {
    //         var http = new CMSHttp(true);
    //         http.post(Constants.URL.GROUP_ATTRIBUTES.SAVE, objE, function (status, rs) {
    //             if (typeof callBack === 'function') {
    //                 if (!status || !rs) {
    //                     return;
    //                 }
    //                 var data = null;
    //                 var msg = rs.mess;
    //                 if (!Libs.isObjectEmpty(rs.data)) {
    //                     data = rs.data;
    //                 }
    //                 callBack(rs.status, data, msg);
    //             }
    //         })
    //     } catch (error) {
    //         callBack(false, null, error);
    //     }
    // }

    // /**
    //   * API call for delete
    //   * @author long.pham
    //   * @param @param {RoleEntity} objE
    //   * @param {function(status,msg)} callBack 
    //   * @param  {boolean} isShowProgress
    //   */
    // delete(objE, callBack) {
    //     try {
    //         var http = new CMSHttp(true);
    //         http.post(Constants.URL.GROUP_ATTRIBUTES.DELETE, objE, function (status, rs) {
    //             if (typeof callBack === 'function') {
    //                 if (!status || !rs) {
    //                     return;
    //                 }
    //                 var data = null;
    //                 var msg = rs.mess;
    //                 if (!Libs.isObjectEmpty(rs.data)) {
    //                     data = rs.data;
    //                 }
    //                 callBack(rs.status, data, msg);
    //             }
    //         })
    //     } catch (error) {
    //         callBack(false, error);
    //     }
    // }


    // /**
    //  * API get detail
    //  * @author Long.Pham 2019-05-28
    //  * @param {RegenncyEntity} objE 
    //  * @param {function(data)} callBack
    //  * @param {boolean} isShowProgress 
    //  */

    // getDetail(objE, callBack) {
    //     try {
    //         var http = new CMSHttp(true);
    //         http.post(Constants.URL.GROUP_ATTRIBUTES.DETAIL, objE, function (status, rs) {
    //             if (typeof callBack === 'function') {
    //                 if (!status || !rs) {
    //                     //error http => lib http  proccess
    //                     return;
    //                 }
    //                 var data = {};
    //                 if (rs.status && typeof rs.data === 'object') {
    //                     data = rs.data;
    //                 }
    //                 callBack(data);
    //             }
    //         })
    //     } catch (error) {
    //         callBack({});
    //     }
    // }



    // /**
    // * Get dropdown list
    // * @author Long.Pham
    // * @param {function (data,total_row,msg)} callBack 
    // * @param {boolean} isShowProgress 
    // */
    // getDropdownList(objE, callBack) {
    //     try {
    //         var http = new CMSHttp(false);
    //         http.post(Constants.URL.GROUP_ATTRIBUTES.DROPDOWN_LIST, objE, function (status, rs) {
    //             if (typeof callBack === 'function') {
    //                 if (!status || !rs) {
    //                     return;
    //                 }
    //                 var data = [];
    //                 var total_row = 0;
    //                 if (rs.status && Array.isArray(rs.data)) {
    //                     data = rs.data;
    //                     total_row = rs.total_row;
    //                 }
    //                 callBack(data, total_row, "");
    //             }
    //         });
    //     } catch (error) {
    //         var msg = error;
    //         callBack(false, 0, msg);
    //     }
    // }



    // /**
    // * Get dropdown list all attr
    // * @author Long.Pham
    // * @param {function (data,total_row,msg)} callBack 
    // * @param {boolean} isShowProgress 
    // */
    //  getDropdownListAttr(objE, callBack) {
    //     try {
    //         var http = new CMSHttp(false);
    //         http.post(Constants.URL.GROUP_ATTRIBUTES.DROPDOWN_LIST_ATTR, objE, function (status, rs) {
    //             if (typeof callBack === 'function') {
    //                 if (!status || !rs) {
    //                     return;
    //                 }
    //                 var data = [];
    //                 var total_row = 0;
    //                 if (rs.status && Array.isArray(rs.data)) {
    //                     data = rs.data;
    //                     total_row = rs.total_row;
    //                 }
    //                 callBack(data, total_row, "");
    //             }
    //         });
    //     } catch (error) {
    //         var msg = error;
    //         callBack(false, 0, msg);
    //     }
    // }

}
