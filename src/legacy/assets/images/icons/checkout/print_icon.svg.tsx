// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgPrintIcon(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 9.029,
    height: 9.029,
    viewBox: "0 0 9.029 9.029",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "print_icon",
    d: "M-291.874,1778.709V1776.9a.9.9,0,0,0-.9-.9h-5.418a.9.9,0,0,0-.9.9v1.806a.9.9,0,0,0-.9.9v3.612a.9.9,0,0,0,.9.9h.452a.9.9,0,0,0,.9.9h4.515a.9.9,0,0,0,.9-.9h.451a.9.9,0,0,0,.9-.9v-3.612A.9.9,0,0,0-291.874,1778.709Zm-6.32-1.354a.452.452,0,0,1,.451-.451h4.515a.452.452,0,0,1,.452.451v1.354h-5.418Zm4.966,6.321a.452.452,0,0,1-.451.451h-3.612a.452.452,0,0,1-.451-.451v-1.354h4.515Zm1.354-.677a.226.226,0,0,1-.226.226h-.226v-1.806h-6.32v1.806h-.226a.226.226,0,0,1-.226-.226v-2.935a.452.452,0,0,1,.452-.451h6.32a.452.452,0,0,1,.451.451Zm-5.794-2.558a.451.451,0,0,1-.451.451.451.451,0,0,1-.451-.451.451.451,0,0,1,.451-.451A.452.452,0,0,1-297.667,1780.439Zm1.806,0a.451.451,0,0,1-.451.451.451.451,0,0,1-.451-.451.451.451,0,0,1,.451-.451A.452.452,0,0,1-295.861,1780.439Z",
    transform: "translate(300 -1776)"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgPrintIcon);
export default "/" + "static/media/print_icon.a6ec28e65b248a5c6ce78779de6f4229.svg";
export { ForwardRef as ReactComponent };