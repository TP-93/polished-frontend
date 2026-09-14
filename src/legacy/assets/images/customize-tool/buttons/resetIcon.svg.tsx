// @ts-nocheck
var _g;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgResetIcon(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 30,
    height: 34,
    viewBox: "0 0 30 34",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _g || (_g = /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    fill: "#ff453a",
    d: "M26.25 18.875c0 5.625-5.048 11.25-11.25 11.25-6.203 0-11.25-5.047-11.25-11.25 0-6.202 5.047-11.25 11.25-11.25v3.75l9.374-5.625L15 .125v3.75c-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15 8.283 0 15-5.625 15-15z"
  })))));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgResetIcon);
export default "/" + "static/media/resetIcon.c4b2c951500be4fa1cf613f496e77016.svg";
export { ForwardRef as ReactComponent };