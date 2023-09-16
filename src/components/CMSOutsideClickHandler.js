// import React, { useRef, useEffect } from "react";

// /**
//  * Hook that alerts clicks outside of the passed ref
//  */
// function useOutsideClickHandler(ref) {
//     useEffect(() => {
//         /**
//          * Alert if clicked on outside of element
//          */
//         function handleClickOutside(event) {
//             if (ref.current && !ref.current.contains(event.target)) {
//                 // alert("You clicked outside of me!");
//             }
//         }

//         // Bind the event listener
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             // Unbind the event listener on clean up
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [ref]);
// }

// /**
//  * Component that alerts if you click outside of it
//  */
// export default function OutsideClickHandler(props) {
//     const wrapperRef = useRef(props);
//     useOutsideClickHandler(wrapperRef);

//     return <div ref={wrapperRef}>{props.children}</div>;
// }




import React, { createRef } from "react";

class CMSOutsideClickHandler extends React.Component {
  wrapperRef = createRef();

  static defaultProps = {
    onOutsideClick: () => {}
  };

  UNSAFE_componentWillMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.props.onOutsideClick();
    }
  };

  render() {
    const { children } = this.props;

    return <div style = {{width: "100%"}} className="time-range-outsite" ref={this.wrapperRef}>{children}</div>;
  }
}

export default CMSOutsideClickHandler;
