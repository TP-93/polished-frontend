// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgRightArrowIconWhite(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 5.179,
    height: 9.416,
    viewBox: "0 0 5.179 9.416",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "chevron_right",
    d: "M331.654,93l-.654.662,3.889,4.052-.415.432,0,0-3.455,3.6.645.672,4.513-4.7Z",
    transform: "translate(-331 -93)",
    fill: "#fff"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgRightArrowIconWhite);
export default "/" + "static/media/right_arrow_icon_white.fe6317a9a8284e8f5e3c052e64a9570d.svg";
export { ForwardRef as ReactComponent };