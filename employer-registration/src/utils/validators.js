/**
 * Validates a name (letters, spaces, accents, and hyphens allowed).
 * @param {string} value - The name to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
export const validateName = (value) => {
    // Autorise lettres (accentuées), espaces et tirets
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\- ]+$/;
  return regex.test(value);
};
/**
 * Validates an email address.
 * @param {string} value - The email to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
export const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };
/**
 * Calculates age from a birthdate.
 * @param {string} birthDate - The birthdate in ISO format (YYYY-MM-DD).
 * @returns {number} The calculated age.
 */
  export const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };
  
  /**
 * Validates a birthdate to ensure the user is at least 18 years old.
 * @param {string} value - The birthdate.
 * @returns {boolean} True if user is 18 or older, false otherwise.
 */
  export const validateBirthDate = (value) => {
    // Vérifier que l'utilisateur a au moins 18 ans
    const age = calculateAge(value);
    return age >= 18;
  };
  /**
 * Validates a French postal code (5 digits).
 * @param {string} value - The postal code to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
  export const validatePostalCode = (value) => {
    const regex = /^\d{5}$/;
    return regex.test(value);
  };