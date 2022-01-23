import { useState, useEffect } from "react";

const BuyerUI = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName("BuyerUI");
  }, []);

  return <div style={{ textAlign: "center" }}>Buyer UI - {name}</div>;
};

export default BuyerUI;
