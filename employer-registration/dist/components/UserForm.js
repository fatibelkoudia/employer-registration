"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./UserFormStyle.css");
var _reactToastify = require("react-toastify");
var _validators = require("../utils/validators");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * UserForm is a registration form component that captures user details,
 * validates them in real-time, and shows success/error messages on submission.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.users - The list of registered users.
 * @param {Function} props.setUsers - Function to update the user list.
 * @returns {JSX.Element} The rendered registration form.
 */function UserForm(_ref) {
  let {
    users,
    setUsers
  } = _ref;
  const [firstName, setFirstName] = (0, _react.useState)("");
  const [lastName, setLastName] = (0, _react.useState)("");
  const [email, setEmail] = (0, _react.useState)("");
  const [birthDate, setBirthDate] = (0, _react.useState)("");
  const [city, setCity] = (0, _react.useState)("");
  const [postalCode, setPostalCode] = (0, _react.useState)("");
  const [errors, setErrors] = (0, _react.useState)({});
  const [isDisabled, setIsDisabled] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    setIsDisabled(!(firstName && lastName && email && birthDate && city && postalCode));
  }, [firstName, lastName, email, birthDate, city, postalCode]);
  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
      case "city":
        return !value || !(0, _validators.validateName)(value) ? "Champ invalide (lettres, accents, tirets uniquement)" : "";
      case "email":
        return !value || !(0, _validators.validateEmail)(value) ? "Email invalide" : "";
      case "birthDate":
        return !value || !(0, _validators.validateBirthDate)(value) ? "Vous devez avoir au moins 18 ans" : "";
      case "postalCode":
        return !value || !(0, _validators.validatePostalCode)(value) ? "Code postal invalide (5 chiffres)" : "";
      default:
        return "";
    }
  };
  const handleChange = (setter, fieldName) => e => {
    const value = e.target.value;
    setter(value);
    setErrors(prev => ({
      ...prev,
      [fieldName]: validateField(fieldName, value)
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {
      firstName: validateField("firstName", firstName),
      lastName: validateField("lastName", lastName),
      email: validateField("email", email),
      birthDate: validateField("birthDate", birthDate),
      city: validateField("city", city),
      postalCode: validateField("postalCode", postalCode)
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(err => err)) {
      _reactToastify.toast.error("Veuillez corriger les erreurs du formulaire.");
      return;
    }
    const newUser = {
      firstName,
      lastName,
      email,
      birthDate,
      city,
      postalCode
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    _reactToastify.toast.success("Inscription réussie !");
    setFirstName("");
    setLastName("");
    setEmail("");
    setBirthDate("");
    setCity("");
    setPostalCode("");
    setErrors({});
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "container",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
      className: "title",
      children: "User Registration"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("form", {
      onSubmit: handleSubmit,
      children: [[{
        name: "firstName",
        placeholder: "First Name",
        value: firstName,
        setter: setFirstName
      }, {
        name: "lastName",
        placeholder: "Last Name",
        value: lastName,
        setter: setLastName
      }, {
        name: "email",
        placeholder: "Email",
        value: email,
        setter: setEmail
      }, {
        name: "birthDate",
        type: "date",
        value: birthDate,
        setter: setBirthDate
      }, {
        name: "city",
        placeholder: "City",
        value: city,
        setter: setCity
      }, {
        name: "postalCode",
        placeholder: "Postal Code",
        value: postalCode,
        setter: setPostalCode
      }].map(_ref2 => {
        let {
          name,
          placeholder,
          value,
          setter,
          type = "text"
        } = _ref2;
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            type: type,
            name: name,
            placeholder: placeholder,
            className: `input-field ${errors[name] ? "error" : ""}`,
            value: value,
            onChange: handleChange(setter, name),
            "aria-label": name
          }), errors[name] && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "error-message",
            children: errors[name]
          })]
        }, name);
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        type: "submit",
        disabled: isDisabled,
        children: "Submit"
      })]
    })]
  });
}
var _default = exports.default = UserForm;