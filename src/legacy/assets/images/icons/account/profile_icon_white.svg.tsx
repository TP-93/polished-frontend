// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgProfileIconWhite(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 20,
    viewBox: "0 0 20 20",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "profile_icon",
    d: "M314.758,26.365a6,6,0,1,0-7.516,0A9.62,9.62,0,0,0,301,35.692h20A9.62,9.62,0,0,0,314.758,26.365ZM307,21.692a4,4,0,1,1,4,4A4,4,0,0,1,307,21.692Zm4,6a7.6,7.6,0,0,1,7.784,6H303.216A7.6,7.6,0,0,1,311,27.692Z",
    transform: "translate(-301 -15.692)",
    fill: "#fff"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgProfileIconWhite);
export default "/" + "static/media/profile_icon_white.28837fc4b579b4b563c11a762d95c4fe.svg";
export { ForwardRef as ReactComponent };