// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgProfileIconBlack(_ref, svgRef) {
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
    id: "account_icon_black",
    d: "M307.846,21a2.985,2.985,0,1,0-3.74,0A4.787,4.787,0,0,0,301,25.644h9.952A4.787,4.787,0,0,0,307.846,21Zm-3.86-2.325a1.99,1.99,0,1,1,1.99,1.99A1.992,1.992,0,0,1,303.986,18.678Zm1.99,2.986a3.783,3.783,0,0,1,3.873,2.986H302.1A3.782,3.782,0,0,1,305.976,21.663Z",
    transform: "translate(-301 -15.692)"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgProfileIconBlack);
export default "/" + "static/media/profile_icon_black.30b5e4fc0329e6cc5ef4aa5db56d737a.svg";
export { ForwardRef as ReactComponent };