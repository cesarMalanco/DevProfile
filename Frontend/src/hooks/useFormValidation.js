import { useState } from "react";

function useFormValidation() {
  const [errors, setErrors] = useState({});

  const clearErrors = () => {
    setErrors({});
  };

  return {
    errors,
    setErrors,
    clearErrors
  };
}

export default useFormValidation;