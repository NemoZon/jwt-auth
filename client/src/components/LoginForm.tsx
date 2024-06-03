import React, { FC, useState, useContext } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);
  const SignIn = () => {
    store.login(email, password);
  };

  const SignUp = () => {
    store.registration(email, password);
  };

  return (
    <form
      style={{
        padding: "20px",
        background: "#f0f0f0",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <input
        required={true}
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        style={{
          padding: "10px",
          margin: "10px 0",
          width: "calc(100% - 22px)",
          boxSizing: "border-box",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <input
        required={true}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        style={{
          padding: "10px",
          margin: "10px 0",
          width: "calc(100% - 22px)",
          boxSizing: "border-box",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      {store.authError && (
        <p>
          <span style={{ color: "red", fontSize: 12 }}>{store.authError}</span>
        </p>
      )}
      <button
        type="button"
        onClick={SignIn}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={SignUp}
        style={{
          padding: "10px 20px",
          background: "#008CBA",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Sign Up
      </button>
    </form>
  );
};

export default observer(LoginForm);
