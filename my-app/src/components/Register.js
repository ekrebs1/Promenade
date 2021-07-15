import {
  Button,
  TextField,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

const Register = () => {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  // const [errorMessage, setErrorMessage] = useState();
  async function registerUser(username, password) {
    return await axios
      .post("api/users/register", {
        email,
        username,
        password,
        address,
        city,
        state,
        zip,
      })
      .then(({ data: { token } }) => {
        if (token) {
          localStorage.setItem("token", JSON.stringify(token));
          window.location.href = "/";
        } else {
          console.error("Could not register with that info.");
        }
      })
      .catch((error) => {
        console.log(error);

        console.error("Something went horribly wrong");
      });
  }
  const onFormSubmit = (event) => {
    event.preventDefault();
    registerUser(email, username, password, address, city, state, zip);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop: "100px",

      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
        display: "inline-block",
      },
    },
    btn: {
      fontSize: 20,
      backgroundColor: "#E2725A",
      "&:hover": {
        backgroundColor: "#94ACBF",
      },
    },

    subTitle: {
      color: "black",
      fontSize: 30,
      fontFamily: "anton",
    },
    textField: {
      color: "#F9DDD2",
      backgroundColor: "#F9DDD2",
      display: "flex",
      justifyContent: "center",
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
            //color='secondary'
            defaultValue='Password'
            onInput={(event) => {
              setPassword(event.target.value);
            }}
          />
          <TextField
            className={classes.textField}
            id='outlined-required'
            type='email'
            label='Required'
            variant='outlined'
            //color='secondary'
            defaultValue='Email'
            onInput={(event) => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            className={classes.textField}
            id='outlined-required'
            type='text'
            label='Required'
            variant='outlined'
            //color='secondary'
            defaultValue='Address Line'
            onInput={(event) => {
              setAddress(event.target.value);
            }}
          />
          <TextField
            className={classes.textField}
            id='outlined-required'
            type='text'
            label='Required'
            variant='outlined'
            //color='secondary'
            defaultValue='City'
            onInput={(event) => {
              setCity(event.target.value);
            }}
          />
          <TextField
            className={classes.textField}
            id='outlined-required'
            type='text'
            label='Required'
            variant='outlined'
            //color='secondary'
            defaultValue='State'
            onInput={(event) => {
              setState(event.target.value);
            }}
          />
          <TextField
            className={classes.textField}
            id='outlined-required'
            type='text'
            label='Required'
            variant='outlined'
            //color='secondary'
            defaultValue='Zip'
            onInput={(event) => {
              setZip(event.target.value);
            }}
          />

          <Button
            className={classes.btn}
            type='submit'
            color='secondary'
            variant='contained'
            onSubmit={onFormSubmit}>
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Register;
