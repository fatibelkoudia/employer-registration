"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _UserForm = _interopRequireDefault(require("../components/UserForm"));
var _reactToastify = require("react-toastify");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});
describe("UserForm Component", () => {
  const setup = () => {
    const mockUsers = [];
    const setUsers = jest.fn();
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_UserForm.default, {
        users: mockUsers,
        setUsers: setUsers
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactToastify.ToastContainer, {})]
    }));
    return {
      setUsers
    };
  };
  test("Submit button is disabled when fields are empty", () => {
    setup();
    const submitButton = _react2.screen.getByRole('button', {
      name: /submit/i
    });
    expect(submitButton).toBeDisabled();
  });
  test("Displays error messages for invalid inputs", async () => {
    setup();
    _react2.fireEvent.change(_react2.screen.getByPlaceholderText(/first name/i), {
      target: {
        value: "John123"
      }
    });
    _react2.fireEvent.change(_react2.screen.getByPlaceholderText(/last name/i), {
      target: {
        value: "Doe@"
      }
    });
    _react2.fireEvent.change(_react2.screen.getByPlaceholderText(/email/i), {
      target: {
        value: "invalidemail"
      }
    });
    _react2.fireEvent.change(_react2.screen.getByLabelText(/birthDate/i), {
      target: {
        value: "2010-01-01"
      }
    });
    _react2.fireEvent.change(_react2.screen.getByPlaceholderText(/city/i), {
      target: {
        value: "Paris123"
      }
    });
    _react2.fireEvent.change(_react2.screen.getByPlaceholderText(/postal code/i), {
      target: {
        value: "7500"
      }
    });
    const submitButton = _react2.screen.getByRole('button', {
      name: /submit/i
    });
    _react2.fireEvent.click(submitButton);
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getAllByText(/champ invalide/i).length).toBeGreaterThanOrEqual(3);
    });
    expect(_react2.screen.getByText("Email invalide")).toBeInTheDocument();
    expect(_react2.screen.getByText("Vous devez avoir au moins 18 ans")).toBeInTheDocument();
    expect(_react2.screen.getByText("Code postal invalide (5 chiffres)")).toBeInTheDocument();
  });
  test("Submits form successfully and resets fields", async () => {
    const {
      setUsers
    } = setup();
    _react2.fireEvent.change(_react2.screen.getByPlaceholderText(/first name/i), {
      target: {
        value: "Jane"
      }
    });
    _react2.fireEvent.change(_react2.screen.getByPlaceholderText(/last name/i), {
      target: {
        value: "Doe"
      }
    });
    _react2.fireEvent.change(_react2.screen.getByPlaceholderText(/email/i), {
      target: {
        value: "jane.doe@example.com"
      }
    });
    _react2.fireEvent.change(_react2.screen.getByLabelText(/birthDate/i), {
      target: {
        value: "1990-01-01"
      }
    });
    _react2.fireEvent.change(_react2.screen.getByPlaceholderText(/city/i), {
      target: {
        value: "Paris"
      }
    });
    _react2.fireEvent.change(_react2.screen.getByPlaceholderText(/postal code/i), {
      target: {
        value: "75000"
      }
    });
    const submitButton = _react2.screen.getByRole('button', {
      name: /submit/i
    });
    _react2.fireEvent.click(submitButton);
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText(/inscription réussie/i)).toBeInTheDocument();
    });
    expect(_react2.screen.getByPlaceholderText(/first name/i).value).toBe('');
    expect(_react2.screen.getByPlaceholderText(/last name/i).value).toBe('');
    expect(_react2.screen.getByPlaceholderText(/email/i).value).toBe('');
    expect(_react2.screen.getByLabelText(/birthDate/i).value).toBe('');
    expect(_react2.screen.getByPlaceholderText(/city/i).value).toBe('');
    expect(_react2.screen.getByPlaceholderText(/postal code/i).value).toBe('');
  });
});