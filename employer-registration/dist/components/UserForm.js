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
 * @returns {JSX.Element} The rendered registration form.
 */function UserForm() {
  const [firstName, setFirstName] = (0, _react.useState)("");
  const [lastName, setLastName] = (0, _react.useState)("");
  const [email, setEmail] = (0, _react.useState)("");
  const [birthDate, setBirthDate] = (0, _react.useState)("");
  const [city, setCity] = (0, _react.useState)("");
  const [postalCode, setPostalCode] = (0, _react.useState)("");
  const [errors, setErrors] = (0, _react.useState)({});
  const [isDisabled, setIsDisabled] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    if (firstName && lastName && email && birthDate && city && postalCode) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [firstName, lastName, email, birthDate, city, postalCode]);
  /**
   * Validates a specific field based on its name and value.
   *
   * @param {string} name - The name of the field.
   * @param {string} value - The value of the field.
   * @returns {string} An error message if invalid, otherwise an empty string.
   */
  const validateField = (name, value) => {
    let errorMessage = "";
    switch (name) {
      case "firstName":
        if (!value || !(0, _validators.validateName)(value)) {
          errorMessage = "Nom invalide (lettres, accents, tirets uniquement)";
        }
        break;
      case "lastName":
        if (!value || !(0, _validators.validateName)(value)) {
          errorMessage = "Prénom invalide (lettres, accents, tirets uniquement)";
        }
        break;
      case "email":
        if (!value || !(0, _validators.validateEmail)(value)) {
          errorMessage = "Email invalide";
        }
        break;
      case "birthDate":
        if (!value || !(0, _validators.validateBirthDate)(value)) {
          errorMessage = "Vous devez avoir au moins 18 ans";
        }
        break;
      case "city":
        if (!value || !(0, _validators.validateName)(value)) {
          errorMessage = "Ville invalide";
        }
        break;
      case "postalCode":
        if (!value || !(0, _validators.validatePostalCode)(value)) {
          errorMessage = "Code postal invalide (5 chiffres)";
        }
        break;
      default:
        break;
    }
    return errorMessage;
  };
  const handleChange = (setter, fieldName) => e => {
    const value = e.target.value;
    setter(value);
    // Met à jour les erreurs pour le champ concerné
    setErrors(prevErrors => ({
      ...prevErrors,
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

    // Vérifier s'il y a des erreurs
    if (Object.values(newErrors).some(err => err !== "")) {
      console.log("Form has errors:", newErrors);
      return;
    }
    console.log({
      firstName,
      lastName,
      email,
      birthDate,
      city,
      postalCode
    });
    _reactToastify.toast.success("Form submitted successfully!");

    // Réinitialiser les champs
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
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "text",
          name: "firstName",
          placeholder: "First Name",
          className: `input-field ${errors.firstName ? "error" : ""}`,
          value: firstName,
          onChange: handleChange(setFirstName, "firstName")
        }), errors.firstName && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "error-message",
          children: errors.firstName
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "text",
          name: "lastName",
          placeholder: "Last Name",
          className: `input-field ${errors.lastName ? "error" : ""}`,
          value: lastName,
          onChange: handleChange(setLastName, "lastName")
        }), errors.lastName && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "error-message",
          children: errors.lastName
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "email",
          name: "email",
          placeholder: "Email",
          className: `input-field ${errors.email ? "error" : ""}`,
          value: email,
          onChange: handleChange(setEmail, "email")
        }), errors.email && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "error-message",
          children: errors.email
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "date",
          name: "birthDate",
          "aria-label": "birthDate",
          className: `input-field ${errors.birthDate ? "error" : ""}`,
          value: birthDate,
          onChange: handleChange(setBirthDate, "birthDate")
        }), errors.birthDate && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "error-message",
          children: errors.birthDate
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "text",
          name: "city",
          placeholder: "City",
          className: `input-field ${errors.city ? "error" : ""}`,
          value: city,
          onChange: handleChange(setCity, "city")
        }), errors.city && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "error-message",
          children: errors.city
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "text",
          name: "postalCode",
          placeholder: "Postal Code",
          className: `input-field ${errors.postalCode ? "error" : ""}`,
          value: postalCode,
          onChange: handleChange(setPostalCode, "postalCode")
        }), errors.postalCode && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "error-message",
          children: errors.postalCode
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        type: "submit",
        disabled: isDisabled,
        children: "Submit"
      })]
    })]
  });
}
var _default = exports.default = UserForm;