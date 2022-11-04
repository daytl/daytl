import { FormattedMessage, Link } from "gatsby-plugin-intl"
import PropTypes from "prop-types"
import React from "react"
import Language from "./Language"
import { AppBar, Grid } from "@mui/material"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import makeStyles from '@mui/styles/makeStyles';
import packageJson from "../../package.json"
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';

const useStyles = makeStyles((theme) => ({
    root: {
        borderBottom: "1px solid #ccc",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        fontSize: "2rem",
        fontWeight: "bold",
        textTransform: "none",
        color: "#555",
        padding: 0,
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        paddingLeft: 10,
        paddingRight: 10,
    },
}))

const Header = () => {
    const classes = useStyles()

    return (
        <AppBar position="static" elevation={0} className={classes.root}>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={10}>
                    <Toolbar disableGutters className={classes.toolbar}>
                        <Button
                            to={`/`}
                            component={Link}
                            variant="text"
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                            <FormattedMessage id="common.title" />
                        </Button>
                        <Grid item className={classes.title}>
                            {" "}
                        </Grid>
                        <Language />{' '}
                        <IconButton href={packageJson.repository.url} size="small">
                            <GitHubIcon />
                        </IconButton>
                    </Toolbar>
                </Grid>
            </Grid>
        </AppBar>
    )
}

Header.propTypes = {
    siteTitle: PropTypes.string,
    showLogo: PropTypes.bool,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header
