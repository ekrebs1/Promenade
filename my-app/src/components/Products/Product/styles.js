import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    height: 400,
    width: 300,

    justifyContent: "space-between",
  },
  media: {
    height: 200,
    width: 300,
    display: "flex",
    justifyContent: "center",
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
