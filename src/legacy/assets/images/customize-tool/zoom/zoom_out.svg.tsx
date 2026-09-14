// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgZoomOut(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 53.878,
    height: 55,
    viewBox: "0 0 53.878 55",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "zoom_out",
    d: "M86.5,305.96a22.056,22.056,0,1,0,22.056,22.056A22.055,22.055,0,0,0,86.5,305.96Zm0,38.6a16.542,16.542,0,1,1,16.542-16.542A16.56,16.56,0,0,1,86.5,344.557Zm31.016,11.695a2.762,2.762,0,0,1,0,3.9h0a2.762,2.762,0,0,1-3.9,0l-11.226-10.89,3.9-3.9ZM78.232,325.118H94.774a2.758,2.758,0,0,1,2.757,2.757h0a2.756,2.756,0,0,1-2.757,2.757H78.232a2.754,2.754,0,0,1-2.757-2.757h0A2.756,2.756,0,0,1,78.232,325.118Z",
    transform: "translate(-64.447 -305.96)",
    fill: "#fff"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgZoomOut);
export default "/" + "static/media/zoom_out.4a3ef5cd99806d03583b22cdf0df9cb5.svg";
export { ForwardRef as ReactComponent };