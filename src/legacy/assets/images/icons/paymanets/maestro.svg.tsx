// @ts-nocheck
var _g;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgMaestro(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 21,
    viewBox: "0 0 32 21",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _g || (_g = /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("g", {
    opacity: 0.07
  }, /*#__PURE__*/React.createElement("path", {
    d: "M29.167.464H2.5C1.083.464 0 1.548 0 2.964v15c0 1.417 1.167 2.5 2.5 2.5h26.667c1.416 0 2.5-1.083 2.5-2.5v-15c0-1.416-1.167-2.5-2.5-2.5z"
  })), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M29.172 1.292c.917 0 1.667.75 1.667 1.668v15.01c0 .916-.75 1.667-1.667 1.667H2.495c-.917 0-1.668-.75-1.668-1.668V2.96c0-.917.75-1.667 1.668-1.667h26.677"
  })), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    fill: "#eb001b",
    d: "M6.694 10.464c0-3.238 2.593-5.862 5.792-5.862s5.792 2.624 5.792 5.862-2.593 5.863-5.792 5.863-5.792-2.625-5.792-5.863z"
  })), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    fill: "#00a2e5",
    d: "M13.388 10.464c0-3.238 2.593-5.862 5.792-5.862 3.2 0 5.792 2.624 5.792 5.862s-2.593 5.863-5.792 5.863-5.792-2.625-5.792-5.863z"
  })), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    fill: "#7375cf",
    d: "M18.316 10.464c0-1.985-.993-3.723-2.483-4.716-1.49 1.076-2.482 2.813-2.482 4.716s.993 3.724 2.482 4.717c1.49-.993 2.483-2.73 2.483-4.717z"
  }))))));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgMaestro);
export default "/" + "static/media/maestro.df08c7fda6f826d32827e911d2a93b59.svg";
export { ForwardRef as ReactComponent };