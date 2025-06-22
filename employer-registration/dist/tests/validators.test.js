"use strict";

var _validators = require("../utils/validators");
describe("Validators", () => {
  test("Validate first name, last name and city", () => {
    expect((0, _validators.validateName)("Élodie")).toBe(true);
    expect((0, _validators.validateName)("Jean-Pierre")).toBe(true);
    expect((0, _validators.validateName)("Marie Claire")).toBe(true);
    expect((0, _validators.validateName)("John123")).toBe(false);
    expect((0, _validators.validateName)("Alice@")).toBe(false);
  });
  test("Validate email", () => {
    expect((0, _validators.validateEmail)("test@example.com")).toBe(true);
    expect((0, _validators.validateEmail)("test.example.com")).toBe(false);
    expect((0, _validators.validateEmail)("test@.com")).toBe(false);
  });
  test("Validate postal code", () => {
    expect((0, _validators.validatePostalCode)("75000")).toBe(true);
    expect((0, _validators.validatePostalCode)("7500")).toBe(false);
    expect((0, _validators.validatePostalCode)("750000")).toBe(false);
    expect((0, _validators.validatePostalCode)("7500A")).toBe(false);
  });
  test("Validate birth date", () => {
    const today = new Date();
    const birthYear = today.getFullYear() - 18;
    const birthDate = new Date(birthYear, today.getMonth(), today.getDate());
    const isoBirthDate = birthDate.toISOString().split("T")[0];
    expect((0, _validators.validateBirthDate)(isoBirthDate)).toBe(true);
    const birthYear2 = today.getFullYear() - 17;
    const birthDate2 = new Date(birthYear2, today.getMonth(), today.getDate());
    const isoBirthDate2 = birthDate2.toISOString().split("T")[0];
    expect((0, _validators.validateBirthDate)(isoBirthDate2)).toBe(false);
  });
});