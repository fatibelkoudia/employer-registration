/**
 * Valide un nom (lettres, espaces, accents et tirets)
 * @param {string} value - nom à valider
 * @returns {boolean} true si valide
 */
export const validateName = (value) => {
    // Autorise lettres (accentuées), espaces et tirets
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\- ]+$/;
  return regex.test(value);
};
/**
 * Valide une adresse email
 * @param {string} value - email à vérifier
 * @returns {boolean} true si format correct
 */
export const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };
/**
 * Calcule l'âge à partir de la date de naissance
 * @param {string} birthDate - date de naissance (YYYY-MM-DD)
 * @returns {number} âge calculé
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
 * Vérifie que l'utilisateur a au moins 18 ans
 * @param {string} value - date de naissance
 * @returns {boolean} true si majeur
 */
  export const validateBirthDate = (value) => {
    // Vérifier que l'utilisateur a au moins 18 ans
    const age = calculateAge(value);
    return age >= 18;
  };
/**
 * Valide un code postal français (5 chiffres)
 * @param {string} value - code postal à vérifier
 * @returns {boolean} true si format valide
 */
  export const validatePostalCode = (value) => {
    const regex = /^\d{5}$/;
    return regex.test(value);
  };