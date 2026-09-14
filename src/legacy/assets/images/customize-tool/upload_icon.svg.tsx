// @ts-nocheck
var _g;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgUploadIcon(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 60,
    height: 60,
    viewBox: "0 0 30 30",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _g || (_g = /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    fill: "#2c2c2e",
    d: "M7.641 7.007l2.023 2.18 3.887-3.64v12.548h3V5.547l3.816 3.64 2.043-2.18L14.988 0zM30 15h-6v3h3v9H3v-9h3v-3H0v15h30z"
  })))));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgUploadIcon);
export default "/" + "static/media/upload_icon.b7d113f026df49ab7e1a66d7c64ffa82.svg";
export { ForwardRef as ReactComponent };