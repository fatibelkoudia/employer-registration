"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePostalCode = exports.validateName = exports.validateEmail = exports.validateBirthDate = exports.calculateAge = void 0;
const validateName = value => {
  // Autorise lettres (accentuées), espaces et tirets
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\- ]+$/;
  return regex.test(value);
};
exports.validateName = validateName;
const validateEmail = value => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};
exports.validateEmail = validateEmail;
const calculateAge = birthDate => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || m === 0 && today.getDate() < birth.getDate()) {
    age--;
  }
  return age;
};
exports.calculateAge = calculateAge;
const validateBirthDate = value => {
  // Vérifier que l'utilisateur a au moins 18 ans
  const age = calculateAge(value);
  return age >= 18;
};
exports.validateBirthDate = validateBirthDate;
const validatePostalCode = value => {
  const regex = /^\d{5}$/;
  return regex.test(value);
};
exports.validatePostalCode = validatePostalCode;