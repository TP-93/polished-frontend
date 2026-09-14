// @ts-nocheck
var _g;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgCheckboxWhite(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 14,
    height: 14,
    viewBox: "0 0 14 14",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _g || (_g = /*#__PURE__*/React.createElement("g", {
    id: "check_icon_solid",
    transform: "translate(-1362 -148)"
  }, /*#__PURE__*/React.createElement("rect", {
    id: "Rectangle_3",
    "data-name": "Rectangle 3",
    width: 14,
    height: 14,
    transform: "translate(1362 148)",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("path", {
    id: "done_mini",
    d: "M64.522,129.268l-4.877,5.072h0L56.6,131.17l1.219-1.268,1.829,1.9L63.3,128Z",
    transform: "translate(1308.403 24)",
    fill: "#000"
  }))));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgCheckboxWhite);
export default "/" + "static/media/checkbox_white.f67e7ec323f90a07a59ab3a536061add.svg";
export { ForwardRef as ReactComponent };