// @ts-nocheck
var _defs, _g;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgFlagNl(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    width: 20,
    height: 12.745,
    viewBox: "0 0 20 12.745",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _defs || (_defs = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "clip-path"
  }, /*#__PURE__*/React.createElement("path", {
    id: "Path_104",
    "data-name": "Path 104",
    d: "M62.811,102.475c6.667,1.867,13.333-1.867,20,0v11.667c-6.667-1.867-13.333,1.867-20,0Z",
    transform: "translate(-62.811 -101.936)"
  })))), _g || (_g = /*#__PURE__*/React.createElement("g", {
    id: "FLAG",
    transform: "translate(-62.811 -101.936)"
  }, /*#__PURE__*/React.createElement("g", {
    id: "Group_70",
    "data-name": "Group 70",
    transform: "translate(62.811 101.936)",
    clipPath: "url(#clip-path)"
  }, /*#__PURE__*/React.createElement("path", {
    id: "Path_103",
    "data-name": "Path 103",
    d: "M62.811,114.142c6.667,1.867,13.333-1.867,20,0V102.475c-6.667-1.867-13.333,1.867-20,0Z",
    transform: "translate(-62.811 -101.936)",
    fill: "#314789"
  })), /*#__PURE__*/React.createElement("g", {
    id: "Group_71",
    "data-name": "Group 71",
    transform: "translate(62.811 101.936)",
    clipPath: "url(#clip-path)"
  }, /*#__PURE__*/React.createElement("path", {
    id: "Path_105",
    "data-name": "Path 105",
    d: "M62.811,110.253c6.667,1.867,13.333-1.867,20,0v-7.778c-6.667-1.867-13.333,1.867-20,0Z",
    transform: "translate(-62.811 -101.936)",
    fill: "#fff"
  })), /*#__PURE__*/React.createElement("g", {
    id: "Group_72",
    "data-name": "Group 72",
    transform: "translate(62.811 101.936)",
    clipPath: "url(#clip-path)"
  }, /*#__PURE__*/React.createElement("path", {
    id: "Path_107",
    "data-name": "Path 107",
    d: "M62.811,106.364c6.667,1.867,13.333-1.867,20,0v-3.889c-6.667-1.867-13.333,1.867-20,0Z",
    transform: "translate(-62.811 -101.936)",
    fill: "#9f1c34"
  })))));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgFlagNl);
export default "/" + "static/media/FLAG_NL.26e72c6eda308ab9ce82f2c5d72b79b0.svg";
export { ForwardRef as ReactComponent };