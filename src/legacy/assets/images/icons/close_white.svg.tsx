// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgCloseWhite(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 9.416,
    height: 9.416,
    viewBox: "0 0 9.416 9.416",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "close_icon",
    d: "M23.389,97.847l4.027,4.027-.681.681-4.027-4.027-4.027,4.027L18,101.874l4.027-4.027L18,93.82l.681-.681,4.027,4.027,4.027-4.027.681.681Z",
    transform: "translate(-18 -93.139)",
    fill: "#fff"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgCloseWhite);
export default "/" + "static/media/close_white.4b304b7f8ecb4f2ba4148997c7972862.svg";
export { ForwardRef as ReactComponent };