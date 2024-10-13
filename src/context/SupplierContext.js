import React, { createContext, useState } from "react";

const SupplierContext = createContext();

const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([
    "Supplier 1",
    "Supplier 2",
    "Supplier 3",
  ]);

  return (
    <SupplierContext.Provider value={{ suppliers }}>
      {children}
    </SupplierContext.Provider>
  );
};

export { SupplierProvider };
export default SupplierContext;
