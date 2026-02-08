import { Divider, Grid } from "@mui/material";
import Feedback from "./Feedback";
import packageJson from "../../package.json";

const Footer = () => {
  return (
    <footer>
      <Divider
        sx={{
          marginTop: 1.25,
          marginBottom: 1.25,
        }}
      />
      <Grid container justifyContent="center">
        <Grid
          size={{ xs: 12 }}
          sx={{
            padding: 1.25,
          }}
        >
          <Feedback />
        </Grid>
        <Grid container justifyContent="center">
          <small>{packageJson.version}</small>
        </Grid>
      </Grid>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
