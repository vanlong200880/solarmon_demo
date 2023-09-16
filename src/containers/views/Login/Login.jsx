import React from 'react';
import Particles from 'react-particles-js';
import './login.scss';
import Logo from '../../../assets/images/logo-color.png';
import { RPassword, RText, RButton } from '../../../components/Controls';
import { NavLink } from 'react-router-dom';

export default function Login() {
    const { t } = this.props;
    var { curItem } = this.state;
    return (
        <div className="login">
            <div className="main-login">
                <div className="content">
                    <div className="main-form">
                        <div className="logo">
                            <NavLink to="/"><img src={Logo} alt="Solarmon"/></NavLink>
                        </div>
                        <h1>{t('login.login_title')}</h1>
                        <div className="form">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-4 col-12">
                                    <div className="mb-3">
                                        <RText label={t('login.email')}
                                            inputClass="form-control"
                                            inputId="email"
                                            inputName="email"
                                            value={curItem.email}
                                            onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                            maxLength={100} />
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-4 col-12">
                                    <div className="mb-3">
                                        <RPassword label={t('login.password')}
                                            inputClass="form-control"
                                            inputId={"password"}
                                            inputName={"password"}
                                            value={curItem.password}
                                            onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                            maxLength={30} />
                                    </div>
                                </div>
                                
                                <div className="col-xl-12 col-lg-12 col-md-4 col-12">
                                    <div className="mb-3">
                                        <NavLink to="/forgot-password">{t('login.forgot_password')}</NavLink>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-4 col-12">
                                    <RButton
                                        onClick={this.onSaveAction.bind(this)}
                                        className="btn btn-save"
                                        text={t('login.save')}
                                        title={t('login.save')} />
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Particles
                style={{ width: "100%", height: "100%" }}
                params={{
                    "particles": {
                        "number": {
                            "value": 80,
                            "density": {
                                "enable": true,
                                "value_area": 800
                            }
                        },
                        "color": {
                            "value": "#ffffff"
                        },
                        "shape": {
                            "type": "circle",
                            "stroke": {
                                "width": 0,
                                "color": "#000000"
                            },
                            "polygon": {
                                "nb_sides": 5
                            },
                            "image": {
                                "src": "img/github.svg",
                                "width": 100,
                                "height": 100
                            }
                        },
                        "opacity": {
                            "value": 0.5,
                            "random": false,
                            "anim": {
                                "enable": false,
                                "speed": 1,
                                "opacity_min": 0.1,
                                "sync": false
                            }
                        },
                        "size": {
                            "value": 3,
                            "random": true,
                            "anim": {
                                "enable": false,
                                "speed": 40,
                                "size_min": 0.1,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 150,
                            "color": "#ffffff",
                            "opacity": 0.4,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 6,
                            "direction": "none",
                            "random": false,
                            "straight": false,
                            "out_mode": "out",
                            "bounce": false,
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onclick": {
                                "enable": true,
                                "mode": "push"
                            }
                        },
                        "modes": {
                            "push": {
                                "particles_nb": 1
                            }
                        }
                    },
                    "retina_detect": true
                }}
            />
        </div>

    )
}