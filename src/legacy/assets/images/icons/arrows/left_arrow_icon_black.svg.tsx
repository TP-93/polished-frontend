// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgLeftArrowIconBlack(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 11,
    height: 20,
    viewBox: "0 0 11 20",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "arrow_left",
    d: "M300.11,113l1.39-1.406-8.261-8.607.881-.918,0,0,7.339-7.647L300.086,93l-9.586,9.987C291.906,104.453,290.535,103.024,300.11,113Z",
    transform: "translate(-290.5 -93)",
    fill: "#292929"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgLeftArrowIconBlack);
export default "/" + "static/media/left_arrow_icon_black.4e9da65a887fa07aaea86d6ce27eec70.svg";
export { ForwardRef as ReactComponent };