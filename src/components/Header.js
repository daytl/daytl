import PropTypes from "prop-types";
import { AppBar, Grid, Toolbar, Button, IconButton } from "@mui/material";
import packageJson from "../../package.json";
import { FaGithub as GitHubIcon } from "react-icons/fa";
import FormattedMessage from "./FormattedMessage";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "@/components/_shared/Link";

const Header = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        borderBottom: "1px solid #ccc",
      }}
    >
      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, md: 10 }}>
          <Toolbar
            disableGutters
            sx={{
              paddingLeft: 1.25,
              paddingRight: 1.25,
            }}
          >
            <Button
              to={`/`}
              component={Link}
              variant="text"
              edge="start"
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
                textTransform: "none",
                color: "#555",
                padding: 0,
              }}
              color="inherit"
              aria-label="menu"
            >
              <FormattedMessage id="title" />
            </Button>
            <Grid sx={{ flexGrow: 1 }} />
            <LanguageSwitcher />
            <IconButton
              href={packageJson.repository.url}
              size="small"
              title="Github source"
              aria-label="View source on Github"
            >
              <GitHubIcon />
            </IconButton>
          </Toolbar>
        </Grid>
      </Grid>
    </AppBar>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
  showLogo: PropTypes.bool,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
