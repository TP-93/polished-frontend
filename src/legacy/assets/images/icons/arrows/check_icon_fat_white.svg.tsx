// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgCheckIconFatWhite(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 9.029,
    height: 7.223,
    viewBox: "0 0 9.029 7.223",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "check_icon",
    d: "M65.626,129.445l-5.556,5.779h0L56.6,131.612l1.389-1.445,2.084,2.167L64.237,128Z",
    transform: "translate(-56.597 -128)",
    fill: "#fff"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgCheckIconFatWhite);
export default "/" + "static/media/check_icon_fat_white.bfa94bcb632f49b6121fba6d2e63e450.svg";
export { ForwardRef as ReactComponent };