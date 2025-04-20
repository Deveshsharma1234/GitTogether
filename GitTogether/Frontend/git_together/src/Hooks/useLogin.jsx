// useLogin.js (not async function anymore!)
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { BASE_URL } from '../Utils/constants';
import loginValidation from '../Utils/validation/loginValidation';
import { addUser } from '../Redux/Slice/userSlice';
import { useCallback } from 'react';

const useLogin = () => {
  const dispatch = useDispatch();

  const loginHandler = useCallback(async (emailRef, passwordRef, navigate) => {
    try {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      const isValid = loginValidation(email, password);
      if (!isValid) {
        toast.error("Credentials are invalid", { theme: "dark" });
        return;
      }

      let loggedInUser = await fetch(BASE_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });

      loggedInUser = await loggedInUser.json();

      if (loggedInUser.error === undefined) {
        //just for testing purpose
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        //for redux store
        dispatch(addUser(loggedInUser.user));
        navigate("/home");
      } else {
        toast.error(loggedInUser.error, { theme: "dark" });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, { theme: "dark" });
    }
  }, [dispatch]);

  return loginHandler;
};

export default useLogin;
