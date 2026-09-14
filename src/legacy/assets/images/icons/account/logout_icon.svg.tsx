// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgLogoutIcon(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 9.952,
    height: 9.952,
    viewBox: "0 0 9.952 9.952",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "logout",
    d: "M137.952,103.091H128V98.115h1.99v1h-1V102.1h7.961V99.11h-1v-1h1.99Zm-7.417-7.627.671.723,1.289-1.208v4.162h1V94.979l1.266,1.208.678-.723-2.462-2.324Z",
    transform: "translate(103.091 -128) rotate(90)"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgLogoutIcon);
export default "/" + "static/media/logout_icon.b78d731be4c9e33e84216976615eed07.svg";
export { ForwardRef as ReactComponent };