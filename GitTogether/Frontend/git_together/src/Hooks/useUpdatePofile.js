import { useRef } from 'react';

import { toast } from 'react-toastify';
import { BASE_URL } from '../Utils/constants';
import { useNavigate } from 'react-router-dom';

const UseUpdatePofile = (
    firstNameRef, lastNameRef, emailRef, discriptionRef, ageRef, genderRef, skilsRef,photoUrlRef
) => {
    const isSubmitting = useRef(false);
    const navigate = useNavigate();
    return async (loading, setLoading) => {
        if (isSubmitting.current || loading) return;
        isSubmitting.current = true;

        setLoading(true);

        try {
            const res = await fetch(BASE_URL + "/profile/update", {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: firstNameRef.current.value,
                    lastName: lastNameRef.current.value,
                    email: emailRef.current.value,
                    disc: discriptionRef.current.value,
                    age: ageRef.current.value,
                    gender: genderRef.current.value,
                    skils: skilsRef.current.vlaue,
                    photoUrl: photoUrlRef.current.value
                })
            })
            const data = await res.json();
            if (data.err !== undefined) {
                toast.error(data.err, {
                    theme: "light",
                    position: "top-right",
                })
            } else {
                toast.success("Susscessfully Updated Profile", {
                    theme: "light",
                    position: "top-right",
                    draggable: true,
                    autoClose: 3000

                })
                setTimeout(() => {
                    navigate("/profile")
                }, 3000);
            }

        } catch (error) {
            toast.error(error.message, {
                theme: "dark",
                position: "top-right",



            })
        } finally {
            setLoading(false);
            isSubmitting.current = false;

        }

    }
}

export default UseUpdatePofile;
