// @ts-nocheck
var _defs, _g;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgMagnifier70X70(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 70,
    height: 70,
    viewBox: "0 0 140 140",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _defs || (_defs = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("mask", {
    id: "jwcnb",
    width: 2,
    height: 2,
    x: -1,
    y: -1
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M10 10h100v100H10z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 60c0-27.614 22.386-50 50-50s50 22.386 50 50-22.386 50-50 50-50-22.386-50-50z"
  })), /*#__PURE__*/React.createElement("filter", {
    id: "jwcna",
    width: 170,
    height: 170,
    x: -20,
    y: -20,
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("feOffset", {
    dx: 10,
    dy: 10,
    in: "SourceGraphic",
    result: "FeOffset1023Out"
  }), /*#__PURE__*/React.createElement("feGaussianBlur", {
    in: "FeOffset1023Out",
    result: "FeGaussianBlur1024Out",
    stdDeviation: "8 8"
  })))), _g || (_g = /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("g", {
    filter: "url(#jwcna)"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M10 60c0-27.614 22.386-50 50-50s50 22.386 50 50-22.386 50-50 50-50-22.386-50-50z",
    mask: "url(\"#jwcnb\")"
  }), /*#__PURE__*/React.createElement("path", {
    fillOpacity: 0.16,
    d: "M10 60c0-27.614 22.386-50 50-50s50 22.386 50 50-22.386 50-50 50-50-22.386-50-50z"
  })), /*#__PURE__*/React.createElement("path", {
    fill: "#ebebeb",
    d: "M10 60c0-27.614 22.386-50 50-50s50 22.386 50 50-22.386 50-50 50-50-22.386-50-50z"
  })), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    fill: "#8c8c8c",
    d: "M74.393 70.858l-3.535 3.535L81.465 85 85 81.465zM55 70c-8.27 0-15-6.73-15-15s6.73-15 15-15 15 6.73 15 15-6.73 15-15 15zm0-35c-11.045 0-20 8.955-20 20s8.955 20 20 20 20-8.955 20-20-8.955-20-20-20z"
  })))));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgMagnifier70X70);
export default "/" + "static/media/magnifier70x70.836753f6689009c12bcd81f5ae1c1df9.svg";
export { ForwardRef as ReactComponent };