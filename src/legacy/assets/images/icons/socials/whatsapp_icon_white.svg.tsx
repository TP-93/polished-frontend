// @ts-nocheck
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from "react";
function SvgWhatsappIconWhite(_ref, svgRef) {
  let {
    title,
    titleId,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 19.995,
    viewBox: "0 0 20 19.995",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, _path || (_path = /*#__PURE__*/React.createElement("path", {
    id: "whatsapp_icon_white",
    d: "M137,55.722H137A9.99,9.99,0,0,0,128.9,71.579l-1.246,3.714,3.844-1.228A10,10,0,1,0,137,55.722Zm5.818,14.118a2.818,2.818,0,0,1-1.963,1.41c-.523.112-1.205.2-3.5-.752-2.582-1.069-6.166-4.878-6.166-7.411,0-1.291.744-2.792,2.046-2.792.626,0,.763.012.969.505.241.582.829,2.016.9,2.163.289.6-.294.956-.718,1.481-.135.159-.287.33-.117.623a8.888,8.888,0,0,0,1.622,2.016,7.381,7.381,0,0,0,2.345,1.446.632.632,0,0,0,.705-.112,12.079,12.079,0,0,0,.782-1.034.558.558,0,0,1,.717-.218,20.774,20.774,0,0,1,2.551,1.287A2.493,2.493,0,0,1,142.821,69.84Z",
    transform: "translate(-127 -55.722)",
    fill: "#fff"
  })));
}
const ForwardRef = /*#__PURE__*/React.forwardRef(SvgWhatsappIconWhite);
export default "/" + "static/media/whatsapp_icon_white.c798202816d546346bc01dfeae33f451.svg";
export { ForwardRef as ReactComponent };