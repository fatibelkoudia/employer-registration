"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;
var _react = _interopRequireDefault(require("react"));
var _UserForm = _interopRequireDefault(require("./components/UserForm"));
require("./App.css");
var _reactToastify = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function App() {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactToastify.ToastContainer, {
      position: "top-center",
      autoClose: 3000
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UserForm.default, {})]
  });
}