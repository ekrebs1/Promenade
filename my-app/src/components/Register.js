import {
  Button,
  TextField,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
// import { registerUser } from "../api";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import axios from "axios";
export const HOME_ROUTE = "/";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const registerUser = async () => {
    return await axios
      .post(`api/users/register`, {
        username,
        password,
      })
      .then(({ data: { token } }) => {
        if (token) {
          localStorage.setItem("token", JSON.stringify(token));
          window.location.href = `${window.location.origin}${HOME_ROUTE}`;
        } else {
          setErrorMessage("Something went wrong");
        }
      })
      .catch(() => {
        setErrorMessage("Something went wrong");
      });
  };

 const onFormSubmit =  (event) => {
    event.preventDefault();
    console.log(username,password, "username, password");
    registerUser(username, password);
  };
  
  

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    btn: {
      fontSize: 20,
      backgroundColor: "#e01414",
      "&:hover": {
        backgroundColor: "#e78686",
      },
    },
    title: {
      marginTop: 20,

      color: "#110303",
      fontSize: 40,
    },
    subTitle: {
      color: "#110303",
      fontSize: 30,
    },
    textField: {
      color: "white",
      backgroundColor: "white",
    },
    form: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "30vh",
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Typography
          className={classes.title}
          variant='h6'
          color='secondary'
          component='h2'
          align='center'
          gutterBottom>
          Please Create An Account.
        </Typography>
        <Typography
          className={classes.subTitle}
          variant='h1'
          color='secondary'
          component='h2'
          align='center'
          gutterBottom>
          Please create your account.
        </Typography>
        <form
          noValidate
          autoComplete='off'
          onSubmit={onFormSubmit}
          className={classes.form}>
          <TextField
            className={classes.textField}
            required
            id='outlined-required'
            label='Required'
            variant='outlined'
            color='#F9DDD2'
            defaultValue='Username'
            onInput={(event) => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            className={classes.textField}
            id='outlined-required'
            type='password'
            label='Required'
            variant='outlined'
            defaultValue='Password'
            onInput={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Button
            className={classes.btn}
            type='submit'
            color='secondary'
            variant='contained'
            endIcon={<KeyboardArrowRightIcon />}>
            Register
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Register;