// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgTrashIcon(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 9.029,
    height: 9.029,
    viewBox: "0 0 9.029 9.029",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "delete_icon",
    d: "M-293.228,217.806V216h-4.515v1.806H-300v.9h1.354v6.32h6.32v-6.32h1.354v-.9Zm-3.612-.9h2.709v.9h-2.709Zm3.612,7.223h-4.515v-5.418h4.515Zm-.9-.9h-.9v-3.612h.9Zm-1.806,0h-.9v-3.612h.9Z",
    transform: "translate(300 -216)",
    fill: "#fff"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgTrashIcon);
export default "/" + "static/media/trash_icon.4293bd7351f12b7193a87ea1a6313234.svg";
export { ForwardRef as ReactComponent };