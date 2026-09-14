// @ts-nocheck
var _g;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgPaypal(_ref, svgRef) {
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
    fill: "#003087",
    d: "M19.888 7.387c.165-.828 0-1.407-.497-1.904-.496-.579-1.407-.827-2.565-.827h-3.392c-.249 0-.414.165-.497.414l-1.241 8.357c0 .165.083.33.248.33h2.234l.331-2.813L16 9.124l3.889-1.737z"
  })), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    fill: "#3086c8",
    d: "M19.9 7.415l-.165.165c-.413 2.317-1.82 3.145-3.806 3.145h-.91c-.248 0-.414.165-.496.413l-.497 3.227-.165.828c0 .165.082.33.248.33h1.737c.249 0 .414-.165.414-.33v-.083l.331-1.986v-.083c0-.165.248-.33.414-.33h.248c1.738 0 3.062-.663 3.393-2.648.165-.828.082-1.49-.331-1.986-.083-.414-.249-.58-.414-.662z"
  })), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    fill: "#012169",
    d: "M19.403 7.225c-.083-.083-.166-.083-.248-.083-.083 0-.166 0-.249-.083-.248-.083-.579-.083-.91-.083h-2.482c-.083 0-.166 0-.166.083-.165.083-.248.166-.248.331l-.579 3.64v.084c0-.249.248-.414.497-.414h1.075c2.069 0 3.393-.828 3.806-3.144V7.39a.632.632 0 0 0-.413-.165h-.083z"
  }))))));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgPaypal);
export default "/" + "static/media/paypal.fa1a9f906ef2315c9e586cdddf6a050f.svg";
export { ForwardRef as ReactComponent };