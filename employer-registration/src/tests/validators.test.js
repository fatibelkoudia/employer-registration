import { 
    calculateAge, 
    validateBirthDate, 
    validateName, 
    validateEmail, 
    validatePostalCode 
  } from '../utils/validators';
  
  describe("Validators", () => {
    test("Validate first name, last name and city", () => {
      expect(validateName("Élodie")).toBe(true);
      expect(validateName("Jean-Pierre")).toBe(true);
      expect(validateName("Marie Claire")).toBe(true);
      expect(validateName("John123")).toBe(false);
      expect(validateName("Alice@")).toBe(false);
    });
  
    test("Validate email", () => {
      expect(validateEmail("test@example.com")).toBe(true);
      expect(validateEmail("test.example.com")).toBe(false);
      expect(validateEmail("test@.com")).toBe(false);
    });
  
    test("Validate postal code", () => {
      expect(validatePostalCode("75000")).toBe(true);
      expect(validatePostalCode("7500")).toBe(false);
      expect(validatePostalCode("750000")).toBe(false);
      expect(validatePostalCode("7500A")).toBe(false);
    });
  
    test("Validate birth date", () => {
      const today = new Date();
      const birthYear = today.getFullYear() - 18;
      const birthDate = new Date(birthYear, today.getMonth(), today.getDate());
      const isoBirthDate = birthDate.toISOString().split("T")[0];
      expect(validateBirthDate(isoBirthDate)).toBe(true);
  
      const birthYear2 = today.getFullYear() - 17;
      const birthDate2 = new Date(birthYear2, today.getMonth(), today.getDate());
      const isoBirthDate2 = birthDate2.toISOString().split("T")[0];
      expect(validateBirthDate(isoBirthDate2)).toBe(false);
    });
  });
  