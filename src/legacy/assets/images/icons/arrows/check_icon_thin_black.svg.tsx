// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgCheckIconThinBlack(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 11,
    viewBox: "0 0 20 11",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "arrow_down_black",
    d: "M414,98.89l-1.406-1.39-8.607,8.261-.918-.881.005,0-7.647-7.339L394,98.914l9.987,9.586C405.453,107.094,404.024,108.465,414,98.89Z",
    transform: "translate(-394 -97.5)"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgCheckIconThinBlack);
export default "/" + "static/media/check_icon_thin_black.3821c746b21af13c664bcbc525f09478.svg";
export { ForwardRef as ReactComponent };