// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgLeftArrowIconWhite(_ref, svgRef) {
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
    id: "chevron_left",
    d: "M295.024,102.416l.654-.662L291.79,97.7l.415-.432,0,0,3.455-3.6L295.013,93,290.5,97.7Z",
    transform: "translate(-290.5 -93)",
    fill: "#fff"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgLeftArrowIconWhite);
export default "/" + "static/media/left_arrow_icon_white.3bca36e1a6c1ba173a09d9e768482f7c.svg";
export { ForwardRef as ReactComponent };