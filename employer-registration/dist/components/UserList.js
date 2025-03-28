"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
require("./UserListStyle.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * UserList displays a list of registered users in a table.
 *
 * @component
 * @param {Object[]} users - Array of user objects.
 * @returns {JSX.Element} The rendered user table.
 */function UserList(_ref) {
  let {
    users
  } = _ref;
  if (!users.length) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "user-list",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
      children: "Liste des inscrits"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("table", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("thead", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
            children: "Pr\xE9nom"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
            children: "Nom"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
            children: "Email"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
            children: "Date de naissance"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
            children: "Ville"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
            children: "Code postal"
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
        children: users.map((user, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
            children: user.firstName
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
            children: user.lastName
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
            children: user.email
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
            children: user.birthDate
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
            children: user.city
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
            children: user.postalCode
          })]
        }, index))
      })]
    })]
  });
}
UserList.propTypes = {
  users: _propTypes.default.arrayOf(_propTypes.default.object).isRequired
};
var _default = exports.default = UserList;