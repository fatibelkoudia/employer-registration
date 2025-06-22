"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;
var _react = _interopRequireWildcard(require("react"));
var _UserForm = _interopRequireDefault(require("./components/UserForm"));
var _UserList = _interopRequireDefault(require("./components/UserList"));
require("./App.css");
var _reactToastify = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function App() {
  const [users, setUsers] = (0, _react.useState)(() => {
    const saved = localStorage.getItem("registeredUsers");
    return saved ? JSON.parse(saved) : [];
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactToastify.ToastContainer, {
      position: "top-center",
      autoClose: 3000
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UserForm.default, {
      users: users,
      setUsers: setUsers
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UserList.default, {
      users: users
    })]
  });
}