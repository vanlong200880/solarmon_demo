import React from 'react';
import { useTranslation } from "react-i18next";

export const Paging = (props) => {
    let pages = [];
    let max_show = 2;
    let half = parseInt(max_show / 2);
    var start = 1;
    if (props.total > max_show) {

        if (props.current > half) {
            start = props.current - half;
        }
        if (parseInt(props.current) + half >= props.total) {
            start = props.total - max_show;
        }
    }
    max_show += start;
    for (var i = start; i <= max_show && i <= props.total; i++) {
        pages[i] = (i == props.current) ?
            <li key={"page_" + i} className="active" aria-current="page">
                <span>{i}</span>
            </li>
            : <li key={"page_" + i}><span onClick={props.onSelectPage(i)}>{i}</span></li>
    }

    const [t] = useTranslation('common');

    return <React.Fragment>
        {props.total > 1 &&
            <div className="paging">
                <div className="row">
                    <div className="col-md-6 text-start">
                        <ul>
                            <li>
                                <select onChange={(event) => props.inputChangedHandler(event)} name="limit" className="form-select input-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </li>
                            <li>
                                <span onClick = { props.onClickReload() }><var className="icon-arrows-ccw"></var></span>
                            </li>
                        </ul>

                    </div>
                    <div className="col-md-6 text-end">
                        <ul>
                            <li>
                                {t('common.page')} 
                                <input type="text"
                                    name="current"
                                    value={props.currentInput}
                                    onChange={(event) => props.inputChangedHandler(event)}
                                    onBlur={(event) => props.inputChangedBlue(event)}
                                    onKeyUp = {(event) => props.inputChangedEnter(event)}
                                    className="paging-number" /> / {props.total}
                            </li>

                            {props.current == 1 ? <li className="page-item disabled previous">
                                <span>
                                    <i className="icon-angle-double-left"></i>
                                </span>
                            </li>
                                : <li className="page-item previous">
                                    <span onClick={props.onSelectPage(1)}>
                                        <i className="icon-angle-double-left" aria-hidden="true"></i>
                                    </span>
                                </li>
                            }

                            {props.current == 1 ? <li className="page-item disabled previous">
                                <span>
                                    <i className="icon-angle-left" aria-hidden="true"></i>
                                </span>
                            </li>
                                : <li className="page-item previous">
                                    <span onClick={props.onSelectPage(props.current - 1)}><i className="icon-angle-left"></i>
                                    </span>
                                </li>
                            }

                            {(start > 1) &&
                                <React.Fragment>
                                    <li><span onClick={props.onSelectPage(1)}>1</span></li>
                                    <li>
                                        <var>
                                            ...
                                </var>
                                    </li>
                                </React.Fragment>
                            }
                            {pages}
                            {(max_show < props.total) &&
                                <React.Fragment>
                                    <li className="page-item active" aria-current="page">
                                        <var>
                                            ...
                                </var>
                                    </li>
                                    <li className="page-item"><span onClick={props.onSelectPage(props.total)}>{props.total}</span></li>
                                </React.Fragment>
                            }
                            {props.current == props.total ?
                                <li className="page-item disabled next">
                                    <span>
                                        <i className="icon-angle-right"></i>
                                    </span>
                                </li>
                                : <li className="page-item next">
                                    <span onClick={props.onSelectPage(props.current + 1)}>
                                        <i className="icon-angle-right"></i>
                                    </span>
                                </li>
                            }

                            {props.current == props.total ?
                                <li className="page-item disabled next">
                                    <span>
                                        <i className="icon-angle-double-right"></i>
                                    </span>
                                </li>
                                : <li className="page-item next">
                                    <span onClick={props.onSelectPage(props.total)}>
                                        <i className="icon-angle-double-right"></i>
                                    </span>
                                </li>
                            }

                        </ul>
                    </div>
                </div>

            </div>
        }
    </React.Fragment>
}
