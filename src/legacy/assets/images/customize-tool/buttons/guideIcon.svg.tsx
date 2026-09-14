// @ts-nocheck
var _g;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgGuideIcon(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 30,
    height: 30,
    viewBox: "0 0 30 30",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _g || (_g = /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    fill: "#ffd60a",
    d: "M13.167 20.268a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8.667 7.5c0 .828.67 1.5 1.5 1.5h6a1.5 1.5 0 0 1 0 3h-1.5A2.667 2.667 0 0 0 12 14.667v2.601a1.5 1.5 0 0 0 3 0v-1.505c0-.421.342-.763.764-.763H18c1.65 0 3-1.35 3-3V8.268A2.268 2.268 0 0 0 18.732 6h-8.565a1.5 1.5 0 0 0-1.5 1.5zM25.5 27h-21A1.5 1.5 0 0 1 3 25.5v-21A1.5 1.5 0 0 1 4.5 3h21A1.5 1.5 0 0 1 27 4.5v21a1.5 1.5 0 0 1-1.5 1.5zM0 3v24a3 3 0 0 0 3 3h24a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3a3 3 0 0 0-3 3z"
  })))));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgGuideIcon);
export default "/" + "static/media/guideIcon.13c00fb2b71e314d7b06f1f4382cf4cb.svg";
export { ForwardRef as ReactComponent };