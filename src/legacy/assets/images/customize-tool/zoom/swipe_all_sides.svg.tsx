// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgSwipeAllSides(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 56.572,
    height: 55,
    viewBox: "0 0 56.572 55",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "swipe_all_sides",
    d: "M313.136,343.406l-.713,7.639c-.4,2.008-2.165,3.009-4.211,3.009H297.829c-.707,0-1.368.1-1.77-.485l-4.639-8.433a2.12,2.12,0,0,1,3.475-2.429l1.789,2.562V327.025a2.154,2.154,0,0,1,2.156-2.147A2.19,2.19,0,0,1,301,327.025l.015,10.832,9.273.855A4.045,4.045,0,0,1,313.136,343.406Zm12.354-19.78-.762-.767-6.831-6.831a2.148,2.148,0,1,0-3.039,3.036l3.612,3.352c.676.676.2,1.572-.76,1.572H306.683a2.147,2.147,0,0,0,0,4.295h11.032a1.267,1.267,0,0,1,.758,2.094l-3.612,3.741a2.226,2.226,0,0,0,0,3.1,2.149,2.149,0,0,0,3.037.032l7.593-7.578A4.266,4.266,0,0,0,325.49,323.626Zm-54.056,6.762,7.594,7.578a2.149,2.149,0,0,0,3.036-.032,2.226,2.226,0,0,0,0-3.1l-3.614-3.741a1.268,1.268,0,0,1,.76-2.094h11.032a2.147,2.147,0,1,0,0-4.295H279.214c-.958,0-1.437-.9-.76-1.572l3.61-3.352a2.147,2.147,0,0,0-3.036-3.036l-6.831,6.831-.762.767A4.266,4.266,0,0,0,271.434,330.388ZM295.6,300.317l-7.581,7.6a2.147,2.147,0,0,0,.032,3.034,2.226,2.226,0,0,0,3.1,0l3.743-3.612a1.265,1.265,0,0,1,2.092.758v11.032a2.147,2.147,0,1,0,4.295,0V308.1c0-.956.9-1.435,1.574-.758l3.35,3.61a2.148,2.148,0,0,0,3.037-3.039l-6.831-6.829-.767-.765A4.263,4.263,0,0,0,295.6,300.317Z",
    transform: "translate(-270.176 -299.059)",
    fill: "#fff"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgSwipeAllSides);
export default "/" + "static/media/swipe_all_sides.462a933be72123b31450a5a35db3a5d3.svg";
export { ForwardRef as ReactComponent };