// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgMailIconWhite(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 15,
    viewBox: "0 0 20 15",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "mail_icon_white",
    d: "M208,58.219v15h20v-15Zm2,13V63.164l8,7.035,8-7.027v8.047ZM226,60.51l-8,7.027L210,60.5v-.281h16Z",
    transform: "translate(-208 -58.219)",
    fill: "#fff"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgMailIconWhite);
export default "/" + "static/media/mail_icon_white.97fd748a3f1af1cb9b7e1d0a6064e0f1.svg";
export { ForwardRef as ReactComponent };