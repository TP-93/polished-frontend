// @ts-nocheck
var _desc, _defs, _g;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgDeleteIcon(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "21px",
    height: "20px",
    viewBox: "0 0 21 20",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title === undefined ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, "delete [#1487]") : title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _desc || (_desc = /*#__PURE__*/React.createElement("desc", null, "Created with Sketch.")), _defs || (_defs = /*#__PURE__*/React.createElement("defs", null)), _g || (_g = /*#__PURE__*/React.createElement("g", {
    id: "Page-1",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("g", {
    id: "Dribbble-Light-Preview",
    transform: "translate(-179.000000, -360.000000)",
    fill: "#000000"
  }, /*#__PURE__*/React.createElement("g", {
    id: "icons",
    transform: "translate(56.000000, 160.000000)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z",
    id: "delete-[#1487]"
  }))))));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgDeleteIcon);
export default "/" + "static/media/delete_icon.294868ed9396052d029890cf60476425.svg";
export { ForwardRef as ReactComponent };