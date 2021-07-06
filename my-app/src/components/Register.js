import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { HOME_ROUTE } from "../constants";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const registerUser = async () => {
    return await axios
      .post(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}users/register`, {
        username,
        password,
      })
      .then(({ data: { token } }) => {
        if (token) {
          localStorage.setItem("token", JSON.stringify(token));
          window.location.href = `${window.location.origin}${HOME_ROUTE}`;
        } else {
          setErrorMessage("Something went horribly wrong");
        }
      })
      .catch(() => {
        setErrorMessage("Something went horribly wrong");
      });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    registerUser();
  };
  return (
    <>
      {errorMessage}
      <form noValidate autoComplete="off" onSubmit={onFormSubmit}>
        <TextField
          id="username"
          label="Username"
          onInput={(event) => {
            setUsername(event.target.value);
          }}
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          onInput={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button type="submit" color="primary">
          Register
        </Button>
      </form>
    </>
  );
};

export default Register;
