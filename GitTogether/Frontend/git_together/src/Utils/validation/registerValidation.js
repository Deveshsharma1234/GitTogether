import { toast } from "react-toastify";
import loginValidation from "./loginValidation";

const registerValidation = (firstNameRow, lastNameRow, emailRow, passwordRow, ageRow, genderRow, skillsRow) => {
  // Data sanitization
  const sanitized = {
    firstName: firstNameRow.trim().toUpperCase(),
    lastName: lastNameRow.trim().toUpperCase(),
    email: emailRow.trim().toLowerCase(),
    password: passwordRow.trim(),
    age: ageRow.toString().trim(),
    gender: genderRow.trim().toLowerCase(),
    skils: skillsRow.split(",")
  };
  const { firstName, lastName, email, password, age, gender, skils } = sanitized;


  // Basic field validation
  if (!firstName || !lastName || !email || !password || !age || !gender || !skils) {
    toast.error("All fields are required", {
      theme: "dark",
      position: "top-right",
    });
    return false;
  }

  // Validate email and password format
  const isValidEmailPassword = loginValidation(email, password);
  if (!isValidEmailPassword) {
    toast.error("Make sure email and password follow the rules", {
      theme: "dark",
      position: "top-right",
    });
    return false;
  }

  // Age validation (should be a number and reasonable)
  const numericAge = parseInt(age);
  if (isNaN(numericAge) || numericAge < 10 || numericAge > 100) {
    toast.error("Age must be a number between 10 and 100", {
      theme: "dark",
      position: "top-right",
    });
    return false;
  }

  // Gender validation (optional: customize as per allowed values)
  const validGenders = ["male", "female", "other"];
  if (!validGenders.includes(gender)) {
    toast.error("Please select a valid gender", {
      theme: "dark",
      position: "top-right",
    });
    return {isValid :false};
  }

  // If all validations pass
  return {isValid : true,sanitized}
};

export default registerValidation;
