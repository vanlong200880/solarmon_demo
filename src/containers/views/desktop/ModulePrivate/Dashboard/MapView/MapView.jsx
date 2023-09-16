import React from 'react';
import { Paging } from '../../../../../../components/Paging';
import Libs from '../../../../../../utils/Libs';
import { NavLink } from 'react-router-dom';
import Constants from '../../../../../../utils/Constants';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './MapView.scss';

export default function MapView() {
  const { t } = this.props;
  var { dataList, showInfoWindow, showIconHover } = this.state;

  console.log("dataList99: ", dataList);
  var positionCenter = {
    lat: 10.801660, lng: 106.647058
  };


  var rowItemMaps = null;
  var icon = "/house-place-orange.png";
  var iconHover = "/house-place.png";

  if (Libs.isArrayData(dataList)) {
    var count = 0;
    rowItemMaps = dataList.map((item, index) => {
      if (!Libs.isBlank(item.lat) && !Libs.isBlank(item.lat)) {
        if (count == 0) {
          positionCenter.lat = parseFloat(item.lat);
          positionCenter.lng = parseFloat(item.lng);
        }
        count++;
        var irradiance = item.irradiance;
        var alerts = item.alerts;

        return <Marker
          key={'row_item_' + index}
          index={index}
          position={{ lat: parseFloat(item.lat), lng: parseFloat(item.lng) }}
          onClick={this.handleMouseOver.bind(this, item)}
          onMouseOver={this.onMouseoverMarker.bind(this, item)}
          onMouseOut={this.mouseMoveOutOfMarker.bind(this, item)}
          icon={showIconHover == item ? iconHover : icon}
          zIndex={index}
        >
          {showInfoWindow && showInfoWindow == item && (
            <InfoWindow onCloseClick={this.handleMouseExit.bind(this, item)} >
              <div className="info-window">
                <NavLink to={"/private/" + item.hash_id + "/activities"}>
                  <img width="300" src={!Libs.isBlank(item.thumbnail) ? (Constants.SERVER_DATA + "/" + item.thumbnail) : "/energy.jpeg"} alt={item.name} title={item.name} />
                </NavLink>

                <div className="info-content">

                  <p><strong>Project name:</strong> <NavLink to={"/private/" + item.hash_id + "/activities"}>{item.name}</NavLink></p>
                  <p><strong>Site name:</strong> {item.site_name}</p>
                  <p><strong>Address:</strong> {item.address}</p>
                  <hr></hr>


                  {Libs.isArrayData(irradiance) ?
                    irradiance.map((v, k) => {
                      return (
                        <p key={k} className="irradiance-item">
                          {irradiance.length > 1 ?
                            <span><strong>Irradiance{++k}: </strong>{v.irradiancePoA} W/m<sup className="sub">2</sup> <hr></hr> </span>
                            :
                            <span><strong>Irradiance:</strong> {v.irradiancePoA} W/m<sup className="sub">2</sup></span>
                          }
                        </p>
                      );
                    })
                    :
                    <p><strong>Irradiance:</strong> 0 W/m<sup className="sub">2</sup></p>
                  }

                  <p><strong>Today:</strong> {Libs.formatNum(item.energy_today, '#,###.##')} kWh</p>
                  <p><strong>Lifetime:</strong> {Libs.formatNum(item.lifetime, '#,###.##')} kWh</p>
                  <p><strong>Revenue:</strong> {Libs.formatNum(item.revenue, '#,###.##')} vnđ</p>

                  <hr></hr>

                  <p><strong>Installed power:</strong> {item.installed_power}</p>
                  <p><strong>Commisioning date:</strong> {item.commisioning_date}</p>
                  <p><strong>Instaled date:</strong> {item.installed_date}</p>
                  <p><strong>Last updated:</strong> {item.last_updated}</p>

                  <hr></hr>

                  <div className="project-status text-center">
                    {Libs.isArrayData(alerts) ?
                      alerts.map((v, i) => {
                        return (
                          <NavLink key={i} to={"/private/" + item.hash_id + "/activities"} data-tip={v.name} data-type="warning" data-class="tooltip-action">
                            <img src={Constants.SERVER_DATA + "/" + v.thumbnail} />
                            <span className="count-alert">{v.total_alert}</span>
                          </NavLink>
                        )
                      })
                      :
                      <NavLink to={"/private/" + item.hash_id + "/activities"}>
                        <img src="/greencheck.png" />
                      </NavLink>
                    }

                  </div>

                </div>
              </div>

            </InfoWindow>
          )}
        </Marker>
      }
    });
  }


  let mapOptionsCreator = {
    mapTypeControlOptions: {
      position: 'BOTTOM_RIGHT'
    }
  };

  return (
    <div className="view-map">
      <div className="data-view-map">
        <LoadScript id="script-loader" googleMapsApiKey={Constants.GOOLGE_APP.KEY} >
          <GoogleMap id='post_view_map'
            options={mapOptionsCreator}
            zoom={14}
            center={positionCenter} >
            {rowItemMaps}
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="main-paging">
        <Paging
          total={parseInt(this.paging.total)}
          current={(this.paging.current)}
          currentInput={this.paging.currentInput}
          inputChangedHandler={this.inputChangedHandler}
          inputChangedEnter={this.inputChangedEnter}
          inputChangedBlue={this.inputChangedBlue}
          onClickReload={(e) => this.onClickReload.bind(this)}
          onSelectPage={(index) => this.onSelectPage.bind(this, index)}>
        </Paging>
      </div>
    </div>
  );
};