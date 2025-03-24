import React, { useState, useEffect } from "react";
import "./UserFormStyle.css";
import { toast } from "react-toastify";
import {
  validateName,
  validateEmail,
  validateBirthDate,
  validatePostalCode,
} from "../utils/validators";
/**
 * UserForm is a registration form component that captures user details,
 * validates them in real-time, and shows success/error messages on submission.
 *
 * @component
 * @returns {JSX.Element} The rendered registration form.
 */
function UserForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
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
        if (!value || !validateName(value)) {
          errorMessage = "Nom invalide (lettres, accents, tirets uniquement)";
        }
        break;
      case "lastName":
        if (!value || !validateName(value)) {
          errorMessage =
            "Prénom invalide (lettres, accents, tirets uniquement)";
        }
        break;
      case "email":
        if (!value || !validateEmail(value)) {
          errorMessage = "Email invalide";
        }
        break;
      case "birthDate":
        if (!value || !validateBirthDate(value)) {
          errorMessage = "Vous devez avoir au moins 18 ans";
        }
        break;
      case "city":
        if (!value || !validateName(value)) {
          errorMessage = "Ville invalide";
        }
        break;
      case "postalCode":
        if (!value || !validatePostalCode(value)) {
          errorMessage = "Code postal invalide (5 chiffres)";
        }
        break;
      default:
        break;
    }
    return errorMessage;
  };

  const handleChange = (setter, fieldName) => (e) => {
    const value = e.target.value;
    setter(value);
    // Met à jour les erreurs pour le champ concerné
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: validateField(fieldName, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      firstName: validateField("firstName", firstName),
      lastName: validateField("lastName", lastName),
      email: validateField("email", email),
      birthDate: validateField("birthDate", birthDate),
      city: validateField("city", city),
      postalCode: validateField("postalCode", postalCode),
    };

    setErrors(newErrors);

    // Vérifier s'il y a des erreurs
    if (Object.values(newErrors).some((err) => err !== "")) {
      console.log("Form has errors:", newErrors);
      return;
    }

    console.log({ firstName, lastName, email, birthDate, city, postalCode });

    toast.success("Form submitted successfully!");

    // Réinitialiser les champs
    setFirstName("");
    setLastName("");
    setEmail("");
    setBirthDate("");
    setCity("");
    setPostalCode("");
    setErrors({});
  };

  return (
    <div className="container">
      <h2 className="title">User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className={`input-field ${errors.firstName ? "error" : ""}`}
            value={firstName}
            onChange={handleChange(setFirstName, "firstName")}
          />
          {errors.firstName && (
            <p className="error-message">{errors.firstName}</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className={`input-field ${errors.lastName ? "error" : ""}`}
            value={lastName}
            onChange={handleChange(setLastName, "lastName")}
          />
          {errors.lastName && (
            <p className="error-message">{errors.lastName}</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`input-field ${errors.email ? "error" : ""}`}
            value={email}
            onChange={handleChange(setEmail, "email")}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <input
            type="date"
            name="birthDate"
            aria-label="birthDate"
            className={`input-field ${errors.birthDate ? "error" : ""}`}
            value={birthDate}
            onChange={handleChange(setBirthDate, "birthDate")}
          />
          {errors.birthDate && (
            <p className="error-message">{errors.birthDate}</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="city"
            placeholder="City"
            className={`input-field ${errors.city ? "error" : ""}`}
            value={city}
            onChange={handleChange(setCity, "city")}
          />
          {errors.city && <p className="error-message">{errors.city}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            className={`input-field ${errors.postalCode ? "error" : ""}`}
            value={postalCode}
            onChange={handleChange(setPostalCode, "postalCode")}
          />
          {errors.postalCode && (
            <p className="error-message">{errors.postalCode}</p>
          )}
        </div>

        <button type="submit" disabled={isDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;
