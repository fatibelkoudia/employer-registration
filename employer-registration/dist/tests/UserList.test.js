"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _UserList = _interopRequireDefault(require("../components/UserList"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe("UserList Component", () => {
  const mockUsers = [{
    firstName: "Jané",
    lastName: "Doe",
    email: "jané.doe@example.com",
    birthDate: "1995-05-15",
    city: "Lyon",
    postalCode: "69000"
  }, {
    firstName: "Ali",
    lastName: "Ben",
    email: "ali.ben@example.com",
    birthDate: "1990-03-12",
    city: "Toulouse",
    postalCode: "31000"
  }];
  test("Displays list of users in a table", () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UserList.default, {
      users: mockUsers
    }));

    // Check table headers
    const headers = _react2.screen.getAllByRole("columnheader").map(th => th.textContent);
    expect(headers).toEqual(expect.arrayContaining(["Prénom", "Nom", "Email", "Date de naissance", "Ville", "Code postal"]));

    // Check user data
    expect(_react2.screen.getByText("Jané")).toBeInTheDocument();
    expect(_react2.screen.getByText("Doe")).toBeInTheDocument();
    expect(_react2.screen.getByText("jané.doe@example.com")).toBeInTheDocument();
    expect(_react2.screen.getByText("Ali")).toBeInTheDocument();
    expect(_react2.screen.getByText("Ben")).toBeInTheDocument();
    expect(_react2.screen.getByText("ali.ben@example.com")).toBeInTheDocument();
  });
});