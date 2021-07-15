// import { makeStyles } from "@material-ui/core";
// import logo from "../assets/LastCall-Carousel.png";
// import React from "react";
// const useStyles = makeStyles(() => ({
//   root: {
//     marginTop: "75px",
//     width: "auto",
//     display: "flex",
//     justifyContent: "center",
//   },
//   img: {
//     marginTop: "100px",
//     width: "100%",
//     justifyContent: "center",
//   },
// }));
// const Home = () => {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//       <img src={logo} alt='TitlePage' />
//     </div>
//   );
// };

// export default Home;

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import about from "../assets/About Page.png";
import products from "../assets/Products .png";
import contact from "../assets/Contact.png";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://source.unsplash.com/9ds9FNzUEwM")`,
    height: "750px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    blur: "2px",
  },

  content: {
    display: "center",
    textAlign: "center",
  },
  boxTitle: {
    fontFamily: "Montserrat",
    color: "#f6f2ef",
    fontSize: "5rem",
    paddingBottom: "200px",
  },
  svg: {
    paddingTop: "50px",
    color: "#fff",
  },
  img: {
    display: "flex",
    justifyContent: "center",
    backgroundSize: "cover",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.hero}>
        <Box className={classes.content}>
          <Box className={classes.boxTitle}>
            Welcome ! <br></br>
          </Box>
          <KeyboardArrowDownIcon style={{ fontSize: 100, color: "white" }} />
        </Box>
      </Box>
      <Box>
        <img className={classes.img} src={about}></img>
      </Box>
      <Box>
        <img className={classes.img} src={products}></img>
      </Box>
      <Box>
        <img className={classes.img} src={contact}></img>
      </Box>
    </>
  );
};

export default Home;
