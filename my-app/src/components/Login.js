import {
  Button,
  TextField,
  Typography,
  Container,
  makeStyles,
  formatMs,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useState } from "react";
//import { loginUser } from "../api";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

const Login = ({ setIsAdmin, isAdmin }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const loginUser = async () => {
    return await axios
      .post("/api/users/login", {
        username,
        password,
      })
      .then(({ data: { token } }) => {
        if (token) {
          localStorage.setItem("token", JSON.stringify(token));
          window.location.href = "/";
        } else {
          console.error("Incorrect Login!!");
        }
      })
      .catch((error) => {
        console.log(error);
        console.error("Something went wrong");
      });
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    await loginUser();
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop: "100px",
      display: "block",
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    form: {
      display: "block",
      paddingTop: "100px",
    },
    btn: {
      fontSize: 20,
      backgroundColor: "#E2725A",
      "&:hover": {
        backgroundColor: "#94ACBF",
      },
    },
    title: {
      marginTop: 20,

      color: "#79AEB2",
      fontSize: 40,
    },
    subTitle: {
      color: "black",
      fontSize: 30,
      fontFamily: "anton",
    },
    textField: {
      color: "#F9DDD2",
      backgroundColor: "#F9DDD2",
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
          gutterBottom></Typography>
        <Typography
          className={classes.subTitle}
          variant='h1'
          color='secondary'
          component='h2'
          align='center'
          gutterBottom>
          Hi There! Please enter your Username and Password.
        </Typography>
        {errorMessage}
        <form
          noValidate
          autoComplete='off'
          onSubmit={onFormSubmit}
          className={classes.form}>
          <TextField
            className={classes.textField}
            required
            id='outlined-required'
            label='Username'
            variant='outlined'
            color='#F9DDD2'
            defaultValue='Required'
            onInput={(event) => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            className={classes.textField}
            id='outlined-required'
            type='password'
            label='Password'
            variant='outlined'
            //color='secondary'
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
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Login;
