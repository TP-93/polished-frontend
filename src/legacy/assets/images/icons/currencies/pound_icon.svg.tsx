// @ts-nocheck
var _style, _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgPoundIcon(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 15 20.1",
    style: {
      enableBackground: "new 0 0 15 20.1"
    },
    xmlSpace: "preserve",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _style || (_style = /*#__PURE__*/React.createElement("style", {
    type: "text/css"
  }, "\n\t.st0{fill:#010101;}\n")), _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "lire_2_",
    className: "st0",
    d: "M15,17v2c-4.4,0.8-4.3,1.2-5.6,1c-2-0.4-2.9-1.6-6.1-0.8L0,20v-2l0,0c1.3,0,1.5-0.7,2-1.9 C2.5,15,2.8,14,3,13H0v-2h3c-0.1-0.6-0.2-1.3-0.3-2H0V7h2.2C1.8,3.3,4.6,0,8.4,0H13v4h-2V2H8.5C5.8,2,3.8,4.4,4.2,7H10v2H4.6 c0.1,0.7,0.2,1.4,0.3,2H10v2H4.9c-0.2,1.5-0.3,2.2-1.4,4.2c2.5-0.7,3.4,0,5.4,0.6C10.4,18.2,10.5,17.7,15,17z"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgPoundIcon);
export default "/" + "static/media/pound_icon.5b132edfc771a3312ba72e95165a2af7.svg";
export { ForwardRef as ReactComponent };