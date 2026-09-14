// @ts-nocheck
var _defs, _g;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgMakePhoto(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 26.667 26.667",
    xmlns: "http://www.w3.org/2000/svg",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _defs || (_defs = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "b"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m101.1 104.01c11.027 0 20-8.9729 20-20 0-11.031-8.973-20-20-20-11.032 0-20 8.9688-20 20 0 11.027 8.9687 20 20 20zm0-60c22.089 0 40 17.91 40 40 0 22.09-17.911 40-40 40-22.09 0-40-17.91-40-40 0-22.09 17.91-40 40-40zm68.898-24.012h-140c-5.5195 0-10 4.4805-10 10v100c0 5.52 4.4805 10 10 10h140c5.52 0 10-4.48 10-10v-100c0-5.5195-4.48-10-10-10zm-90 160h40c5.52 0 10-4.48 10-10v-10h-60v10c0 5.52 4.4805 10 10 10zm110-20v10c0 5.52-4.48 10-10 10s-10-4.48-10-10v-10h-20v20c0 11.039-8.961 20-20 20h-60c-11.051 0-20-8.961-20-20v-20h-30c-11.051 0-20-8.961-20-20v-120c0-11.051 8.9492-20 20-20h160c11.039 0 20 8.9492 20 20v140z",
    clipRule: "evenodd"
  })), /*#__PURE__*/React.createElement("clipPath", {
    id: "a"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m0 0h200v200h-200z"
  })))), _g || (_g = /*#__PURE__*/React.createElement("g", {
    transform: "matrix(1.3333 0 0 -1.3333 0 26.667)"
  }, /*#__PURE__*/React.createElement("g", {
    transform: "scale(.1)"
  }, /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#b)"
  }, /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#a)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m-50-50h300v300h-300z",
    fill: "#000"
  })))))));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgMakePhoto);
export default "/" + "static/media/make-photo.718b2d176ec84a1cc1d3af03b3d8b3b8.svg";
export { ForwardRef as ReactComponent };