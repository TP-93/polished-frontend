// @ts-nocheck
var _desc, _defs, _g;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgDiscountTag(_ref, svgRef) {
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
  }, "tag_fill_round [#1176]") : title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _desc || (_desc = /*#__PURE__*/React.createElement("desc", null, "Created with Sketch.")), _defs || (_defs = /*#__PURE__*/React.createElement("defs", null)), _g || (_g = /*#__PURE__*/React.createElement("g", {
    id: "Page-1",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("g", {
    id: "Dribbble-Light-Preview",
    transform: "translate(-180.000000, -2959.000000)",
    fill: "#000000"
  }, /*#__PURE__*/React.createElement("g", {
    id: "icons",
    transform: "translate(56.000000, 160.000000)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M129.020148,2805.2265 C128.444271,2805.2265 127.976892,2804.76459 127.976892,2804.19545 C127.976892,2803.62631 128.444271,2803.1644 129.020148,2803.1644 C129.596025,2803.1644 130.063404,2803.62631 130.063404,2804.19545 C130.063404,2804.76459 129.596025,2805.2265 129.020148,2805.2265 M143.388913,2809.64763 L139.933649,2806.2328 L139.933649,2806.2328 C134.061161,2800.42903 135.435129,2801.81888 133.157701,2799.41861 C132.961569,2799.22477 132.696582,2799 132.420119,2799 L126.085469,2799 C124.933714,2799 124,2800.15684 124,2801.29511 L124,2807.5546 C124,2807.82886 124.109542,2808.09075 124.304631,2808.28458 C128.396281,2812.32732 125.450126,2809.41564 134.536886,2818.39606 C135.351669,2819.20131 136.672431,2819.20131 137.487214,2818.39606 L137.487214,2818.39606 C142.018074,2813.91926 141.012376,2814.91215 143.388913,2812.56343 C144.203696,2811.75818 144.203696,2810.45287 143.388913,2809.64763",
    id: "tag_fill_round-[#1176]"
  }))))));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgDiscountTag);
export default "/" + "static/media/discount_tag.448bd24b09189a358668d4f3a43bec37.svg";
export { ForwardRef as ReactComponent };