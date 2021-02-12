import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  return {
    values,
    handleChange: (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    },
    reset: () => {
      setValues(initialValues)
    }
  }
};

export default useForm;