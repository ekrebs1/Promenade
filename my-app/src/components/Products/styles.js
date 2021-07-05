import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(5),
  },
  grid: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,

    backgroundColor: theme.palette.background.default,
  },
}));
