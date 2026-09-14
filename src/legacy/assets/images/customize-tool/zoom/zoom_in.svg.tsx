// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgZoomIn(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 55.138,
    height: 55,
    viewBox: "0 0 55.138 55",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "zoom_in",
    d: "M110.055,306.05A22.055,22.055,0,1,0,132.11,328.1,22.056,22.056,0,0,0,110.055,306.05Zm0,38.6A16.541,16.541,0,1,1,126.6,328.1,16.559,16.559,0,0,1,110.055,344.646Zm32.275,15.6h0a2.754,2.754,0,0,1-3.9,0l-10.89-10.89,3.9-3.9,10.89,10.89A2.754,2.754,0,0,1,142.329,360.242ZM112.812,325.21h5.514a2.758,2.758,0,0,1,2.757,2.757h0a2.758,2.758,0,0,1-2.757,2.757h-5.514v5.514a2.758,2.758,0,0,1-2.757,2.757h0a2.758,2.758,0,0,1-2.757-2.757v-5.514h-5.514a2.758,2.758,0,0,1-2.757-2.757h0a2.758,2.758,0,0,1,2.757-2.757H107.3V319.7a2.758,2.758,0,0,1,2.757-2.757h0a2.758,2.758,0,0,1,2.757,2.757Z",
    transform: "translate(-88 -306.05)",
    fill: "#fff"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgZoomIn);
export default "/" + "static/media/zoom_in.4f2e7155701f5444cb527e515c548561.svg";
export { ForwardRef as ReactComponent };