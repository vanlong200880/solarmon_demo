import React from 'react';
import Particles from 'react-particles-js';
import './ForgotPassword.scss';
import Logo from '../../../assets/images/logo-color.png';
import { RText, RButton } from '../../../components/Controls';
import Libs from '../../../utils/Libs';
import { NavLink } from 'react-router-dom';

export default function ForgotPassword() {
    const { t } = this.props;
    var { curItem, message } = this.state;
    return (
        <div className="forgot-password">
            <div className="main-login">
                <div className="content">
                    <div className="main-form">
                        <div className="logo">
                            <NavLink to="/"><img src={Logo} alt="Phần mềm quản lý bán hàng" /></NavLink>
                        </div>
                        <h1>{t('forgot_password.title')}</h1>
                        <div className="form">
                            {!Libs.isBlank(message) ?
                                <div className="alert-message">
                                    <p><span className="icon-check-circle"></span></p>
                                    <p>{message}</p>
                                    <p><NavLink to="/">{t('common.close')}</NavLink></p>
                                </div>
                                :
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-4 col-12">
                                        <div className="mb-3">
                                            <RText label={t('forgot_password.email')}
                                                inputClass="form-control"
                                                inputId="email"
                                                inputName="email"
                                                value={curItem.email}
                                                onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                                maxLength={100} />
                                        </div>
                                    </div>

                                    
                                    <div className="col-xl-12 col-lg-12 col-md-4 col-12">
                                        <RButton
                                            onClick={this.onSaveAction.bind(this)}
                                            className="btn btn-save"
                                            text={t('forgot_password.save')}
                                            title={t('forgot_password.save')} />
                                    </div>

                                </div>
                            }

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