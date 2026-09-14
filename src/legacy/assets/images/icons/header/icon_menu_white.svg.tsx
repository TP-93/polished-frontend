// @ts-nocheck
var _desc, _defs, _g;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgIconMenuWhite(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "20px",
    height: "16px",
    viewBox: "0 0 20 16",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title === undefined ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, "align_text_distribute [#914]") : title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _desc || (_desc = /*#__PURE__*/React.createElement("desc", null, "Created with Sketch.")), _defs || (_defs = /*#__PURE__*/React.createElement("defs", null)), _g || (_g = /*#__PURE__*/React.createElement("g", {
    id: "Page-1",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("g", {
    id: "Dribbble-Light-Preview",
    transform: "translate(-300.000000, -4161.000000)",
    fill: "#000000"
  }, /*#__PURE__*/React.createElement("g", {
    id: "icons",
    transform: "translate(56.000000, 160.000000)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M244,4017 L264,4017 L264,4015 L244,4015 L244,4017 Z M244,4003 L264,4003 L264,4001 L244,4001 L244,4003 Z M244,4010 L264,4010 L264,4008 L244,4008 L244,4010 Z",
    id: "align_text_distribute-[#914]"
  }))))));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgIconMenuWhite);
export default "/" + "static/media/icon_menu_white.6c33e85007eace13d744a0406a7cabaf.svg";
export { ForwardRef as ReactComponent };