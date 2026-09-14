// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgCheckIconThinWhite(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 9.029,
    height: 4.966,
    viewBox: "0 0 9.029 4.966",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "chevron",
    d: "M403.029,98.128l-.635-.628-3.886,3.73-.414-.4,0,0-3.452-3.313-.644.618,4.509,4.328Z",
    transform: "translate(-394 -97.5)",
    fill: "#fff"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgCheckIconThinWhite);
export default "/" + "static/media/check_icon_thin_white.1f1d1ac806cea388dda035a61da5566a.svg";
export { ForwardRef as ReactComponent };