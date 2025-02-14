import React, { useState, useEffect } from 'react';
import './UserFormStyle.css';

function UserForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (firstName && lastName && email && birthDate && city && postalCode) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [firstName, lastName, email, birthDate, city, postalCode]);

  const validateField = (name, value) => {
    let errorMessage = '';

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!/^[a-zA-Z]+$/.test(value)) {
          errorMessage = 'Only letters are allowed';
        }
        break;
      case 'email':
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          errorMessage = 'Invalid email format';
        }
        break;
      case 'birthDate':
        if (!value) {
          errorMessage = 'Birthdate is required';
        }
        break;
      case 'city':
        if (value.length < 2) {
          errorMessage = 'City must be at least 2 characters';
        }
        break;
      case 'postalCode':
        if (!/^\d{5}$/.test(value)) {
          errorMessage = 'Postal code must be 5 digits';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleChange = (setter, name) => (e) => {
    const value = e.target.value;
    setter(value);
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ firstName, lastName, email, birthDate, city, postalCode });

    // Ensure all fields are validated before submission
    validateField('firstName', firstName);
    validateField('lastName', lastName);
    validateField('email', email);
    validateField('birthDate', birthDate);
    validateField('city', city);
    validateField('postalCode', postalCode);

    if (Object.values(errors).some((err) => err)) {
      console.log('Form has errors:', errors);
      return;
    }

    alert('Form submitted successfully!');
  };

  return (
    <div className="container">
      <h2 className="title">User Registration</h2>

      <form>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className={`input-field ${errors.firstName ? 'error' : ''}`}
            value={firstName}
            onChange={handleChange(setFirstName, 'firstName')}
          />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className={`input-field ${errors.lastName ? 'error' : ''}`}
            value={lastName}
            onChange={handleChange(setLastName, 'lastName')}
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`input-field ${errors.email ? 'error' : ''}`}
            value={email}
            onChange={handleChange(setEmail, 'email')}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <input
            type="date"
            name="birthDate"
            className={`input-field ${errors.birthDate ? 'error' : ''}`}
            value={birthDate}
            onChange={handleChange(setBirthDate, 'birthDate')}
          />
          {errors.birthDate && <p className="error-message">{errors.birthDate}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="city"
            placeholder="City"
            className={`input-field ${errors.city ? 'error' : ''}`}
            value={city}
            onChange={handleChange(setCity, 'city')}
          />
          {errors.city && <p className="error-message">{errors.city}</p>}
        </div>

        <div className="form-group">
          <input
            type="number"
            name="postalCode"
            placeholder="Postal Code"
            className={`input-field ${errors.postalCode ? 'error' : ''}`}
            value={postalCode}
            onChange={handleChange(setPostalCode, 'postalCode')}
          />
          {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}
        </div>

        <button type="submit" disabled={isDisabled} onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;
