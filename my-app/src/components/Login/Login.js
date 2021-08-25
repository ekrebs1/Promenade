import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Redirect } from "react-router";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Person from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { loggedAdmin } from "../../api/utils";
import { userLogin } from "../../api/users";

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inherit' href='/'>
        Promenade
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ setLoggedIn, setAdmin, setUser }) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          className={classes.avatar}
          style={{ backgroundColor: "#76AACE" }}>
          <Person />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <form
          className={classes.form}
          noValidate
          onChange={(event) => event.preventDefault()}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            style={{ backgroundColor: "#76AACE" }}
            className={classes.submit}
            onClick={async (event) => {
              event.preventDefault();
              try {
                let submit = await userLogin(username, password);

                if (submit.name) {
                  alert(submit.message);
                  return <Redirect to='/' />;
                } else {
                  if (submit.user.admin === true) {
                    loggedAdmin();
                  }
                  alert(submit.message);
                  setAdmin(submit.user.admin);
                  setLoggedIn(true);
                  setUser(username);
                }
              } catch (error) {
                console.error(error);
              }
            }}>
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link href='/register' variant='body2' style={{ color: "black" }}>
                Don't have an account? Register Here
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
