// @ts-nocheck
var _desc, _defs, _g;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgEuroIcon(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "20px",
    height: "20px",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title === undefined ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, "euro [#1188]") : title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _desc || (_desc = /*#__PURE__*/React.createElement("desc", null, "Created with Sketch.")), _defs || (_defs = /*#__PURE__*/React.createElement("defs", null)), _g || (_g = /*#__PURE__*/React.createElement("g", {
    id: "Page-1",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("g", {
    id: "Dribbble-Light-Preview",
    transform: "translate(-100.000000, -2919.000000)",
    fill: "#000000"
  }, /*#__PURE__*/React.createElement("g", {
    id: "icons",
    transform: "translate(56.000000, 160.000000)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M49.591,2766 L56,2766 L56,2768 L49.071,2768 C48.987,2768.664 48.987,2769.336 49.071,2770 L56,2770 L56,2772 L49.591,2772 C50.733,2774.783 53.534,2777 58,2777 L64,2777 L64,2779 L58,2779 C52.155,2779 48.647,2775.821 47.461,2772 L44,2772 L44,2770 L47.052,2770 C46.986,2769.335 46.986,2768.665 47.052,2768 L44,2768 L44,2766 L47.461,2766 C48.647,2762.179 52.155,2759 58,2759 L64,2759 L64,2761 L58,2761 C53.534,2761 50.733,2763.217 49.591,2766",
    id: "euro-[#1188]"
  }))))));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgEuroIcon);
export default "/" + "static/media/euro_icon.6c055e3f48248afab5783c1d69eee902.svg";
export { ForwardRef as ReactComponent };