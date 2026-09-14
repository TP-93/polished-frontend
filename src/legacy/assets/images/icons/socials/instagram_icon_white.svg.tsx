// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgInstagramIconWhite(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20.1,
    height: 20.15,
    viewBox: "0 0 20.1 20.15",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "instagram_icon_white",
    d: "M93.589,65.708a3.333,3.333,0,1,1,3.333,3.333,3.334,3.334,0,0,1-3.333-3.333m-1.8,0a5.135,5.135,0,1,0,5.135-5.135,5.135,5.135,0,0,0-5.135,5.135m9.273-5.339a1.2,1.2,0,1,0,1.2-1.2,1.2,1.2,0,0,0-1.2,1.2M92.882,73.847a5.494,5.494,0,0,1-1.857-.344,3.277,3.277,0,0,1-1.9-1.9c-.594-1.525-.4-8.768-.344-9.94a4.289,4.289,0,0,1,1.092-3.007c1-1,2.292-1.489,11.089-1.092a4.284,4.284,0,0,1,3.007,1.092c1,1,1.5,2.305,1.093,11.09a5.539,5.539,0,0,1-.345,1.857c-.9,2.325-2.987,2.648-11.836,2.241M92.8,55.768a5.548,5.548,0,0,0-5.816,5.817c-.047,1.013-.316,8.666.464,10.673a5.077,5.077,0,0,0,2.925,2.925,7.332,7.332,0,0,0,2.427.464c8.9.4,12.206.184,13.6-3.389a7.308,7.308,0,0,0,.464-2.428c.407-8.949-.066-10.89-1.618-12.444-1.231-1.231-2.678-2.069-12.444-1.618",
    transform: "translate(-86.9 -55.644)",
    fill: "#fff"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgInstagramIconWhite);
export default "/" + "static/media/instagram_icon_white.62a1e50ef2072d69650aef54e3aacd8c.svg";
export { ForwardRef as ReactComponent };