import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const CMSToast = (props) => (
    <ToastContainer limit={1} position="top-right" autoClose={props.autoClose} hideProgressBar={props.hideProgressBar} newestOnTop={props.newestOnTop} closeOnClick
        pauseOnVisibilityChange draggable pauseOnHover />
)
