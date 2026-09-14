// @ts-nocheck
var _g;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgGeneratorIcon(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 56,
    height: 82,
    viewBox: "0 0 28 41",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _g || (_g = /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M20.077 16.274l-1.93-1.813 4.425-4.19H3.234v10.916H.504V7.54h22.068l-4.425-4.656 1.93-2.16 7.719 8.223zm4.99 4.913h2.729v13.645H5.728l4.426 4.195-1.93 1.699c-6.368-6.36-4.68-4.678-7.72-7.698 2.47-2.43.916-.895 7.72-7.63l1.93 2.047-4.426 4.658h19.339z"
  })))));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgGeneratorIcon);
export default "/" + "static/media/generatorIcon.6dd6b295ce678c510783bd674bc690c4.svg";
export { ForwardRef as ReactComponent };