import { useState, useEffect } from "react";

const VendorUI = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName("VendorUI");
  }, []);

  return <div style={{ textAlign: "center" }}>VendorUI UI - {name}</div>;
};

export default VendorUI;
