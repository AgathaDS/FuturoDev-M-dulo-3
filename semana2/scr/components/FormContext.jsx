import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

const useFormData = () => {
  return useContext(FormContext);
};

export { FormProvider, useFormData };
