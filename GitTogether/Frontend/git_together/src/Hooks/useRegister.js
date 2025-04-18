import { toast } from "react-toastify";
import { BASE_URL } from "../Utils/constants"
import registerValidation from "../Utils/validation/registerValidation";
const useRegister = async (...args) => {


      try {
            //here bcose of ...args a rest operator it collent in array not object so we have to desturctre it using []
            const [firstNameRef, lastNameRef, emailRef, passwordRef, ageRef, genderRef, skillsRef] = args;
            const firstName = firstNameRef.current?.value;
            const lastName = lastNameRef.current?.value;
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;
            const age = ageRef.current?.value;
            const gender = genderRef.current?.value;
            const skills = skillsRef.current?.value;
            const isRegisterValid = registerValidation(firstName, lastName, email, password, age, gender, skills)

            if (isRegisterValid.isValid) {
                  const { firstName, lastName, email, password, age, gender, skils } = isRegisterValid.sanitized;
                  console.log(firstName, lastName, email, password, age, gender, skils);
                  const res = await fetch(BASE_URL + "/signup", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                              firstName,
                              lastName,
                              email,
                              password,
                              age,
                              gender,
                              skils

                        })
                  })


                  // ✅ Check if the response is not ok (e.g. 400, 500)
                  if (!res.ok) {
                        const errorData = await res.json();
                        toast.error(errorData.error || "Registration failed", {
                              theme: "dark",
                              position: "top-right",
                        });
                        return { success: false, error: errorData.error };
                  }
                  const data = await res.json();
                  console.log(data);



                  return { success: true, data };



            } else {
                  toast.error("Cannot register user...", {
                        theme: "dark",
                        position: "top-right",

                  })
                  return { success: false, error: "Validation failed" }; // ✅ Add this

            }

      } catch (error) {
            return { success: false, error: error.message };
      }




}

export default useRegister;