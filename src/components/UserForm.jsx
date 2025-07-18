import React, { useState, useEffect } from "react";
import "./UserFormStyle.css";
import axios from "axios";
import { toast } from "react-toastify";
import {
  validateName,
  validateEmail,
  validateBirthDate,
  validatePostalCode,
} from "../utils/validators";

/**
 * Formulaire d'inscription utilisateur avec validation
 * @component
 * @param {Object} props
 * @param {Array} props.users - liste des utilisateurs
 * @param {Function} props.setUsers - met à jour la liste
 * @param {string} props.apiUrl - URL de l'API
 * @returns {JSX.Element} formulaire de saisie
 */
function UserForm({ users, setUsers, apiUrl }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  // Récupère les utilisateurs au chargement
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/users`)
      .then((res) => {
        setUsers(res.data.utilisateurs || []);
      })
      .catch((err) => {
        console.error("Erreur de récupération :", err);
        toast.error("Impossible de charger les utilisateurs.");
      });
  }, [apiUrl, setUsers]);

  useEffect(() => {
    setIsDisabled(
      !(firstName && lastName && email && birthDate && city && postalCode)
    );
  }, [firstName, lastName, email, birthDate, city, postalCode]);

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
      case "city":
        return !value || !validateName(value)
          ? "Champ invalide (lettres, accents, tirets uniquement)"
          : "";
      case "email":
        return !value || !validateEmail(value) ? "Email invalide" : "";
      case "birthDate":
        return !value || !validateBirthDate(value)
          ? "Vous devez avoir au moins 18 ans"
          : "";
      case "postalCode":
        return !value || !validatePostalCode(value)
          ? "Code postal invalide (5 chiffres)"
          : "";
      default:
        return "";
    }
  };

  const handleChange = (setter, fieldName) => (e) => {
    const value = e.target.value;
    setter(value);
    setErrors((prev) => ({
      ...prev,
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

    if (Object.values(newErrors).some((err) => err)) {
      toast.error("Veuillez corriger les erreurs du formulaire.");
      return;
    }

    const newUser = { firstName, lastName, email, birthDate, city, postalCode };

    axios
      .post(`${apiUrl}/api/users`, newUser)
      .then((response) => {
        setUsers([...users, response.data.utilisateur]);
        toast.success("Inscription réussie !");
        setFirstName("");
        setLastName("");
        setEmail("");
        setBirthDate("");
        setCity("");
        setPostalCode("");
        setErrors({});
      })
      .catch((error) => {
        console.error("Erreur d’inscription :", error);
        toast.error("Échec de l’inscription.");
      });
  };

  return (
    <div className="container">
      <h2 className="title">User Registration</h2>
      <form onSubmit={handleSubmit}>
        {[
          {
            name: "firstName",
            placeholder: "First Name",
            value: firstName,
            setter: setFirstName,
          },
          {
            name: "lastName",
            placeholder: "Last Name",
            value: lastName,
            setter: setLastName,
          },
          {
            name: "email",
            placeholder: "Email",
            value: email,
            setter: setEmail,
          },
          {
            name: "birthDate",
            type: "date",
            value: birthDate,
            setter: setBirthDate,
          },
          { name: "city", placeholder: "City", value: city, setter: setCity },
          {
            name: "postalCode",
            placeholder: "Postal Code",
            value: postalCode,
            setter: setPostalCode,
          },
        ].map(({ name, placeholder, value, setter, type = "text" }) => (
          <div key={name} className="form-group">
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              className={`input-field ${errors[name] ? "error" : ""}`}
              value={value}
              onChange={handleChange(setter, name)}
              aria-label={name}
            />
            {errors[name] && <p className="error-message">{errors[name]}</p>}
          </div>
        ))}

        <button type="submit" disabled={isDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;
