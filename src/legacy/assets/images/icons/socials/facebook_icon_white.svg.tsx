// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgFacebookIconWhite(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 10.262,
    height: 20,
    viewBox: "0 0 10.262 20",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "facebook_icon_white",
    d: "M63.638,75.719v-9h2.8l.458-4H63.638V60.771c0-1.029.027-2.052,1.5-2.052h1.5v-2.86a16.983,16.983,0,0,0-2.586-.14c-2.714,0-4.414,1.657-4.414,4.7v2.3h-3v4h3v9Z",
    transform: "translate(-56.638 -55.719)",
    fill: "#fff"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgFacebookIconWhite);
export default "/" + "static/media/facebook_icon_white.23e59c176b2459de8966c058b16ee067.svg";
export { ForwardRef as ReactComponent };