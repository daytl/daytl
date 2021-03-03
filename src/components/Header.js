import { FormattedMessage, Link } from "gatsby-plugin-intl"
import PropTypes from "prop-types"
import React from "react"
import Language from "./Language"
import { AppBar, Grid } from "@material-ui/core"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import makeStyles from "@material-ui/core/styles/makeStyles"
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

const useStyles = makeStyles(theme => ({
    root: {
        borderBottom: '1px solid #ccc',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        fontSize: '2rem',
        fontWeight: "bold",
        textTransform: 'none',
        color: '#555',
        padding: 0,
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        paddingLeft: 10,
        paddingRight: 10,
    }
}))

const Header = ({siteTitle, showLogo}) => {
    const classes = useStyles()

    return (
        <AppBar position="static" elevation={false} className={classes.root}>
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
                <Grid item className={classes.title}>{' '}
                    {/*<Autocomplete*/}
                    {/*    freeSolo*/}
                    {/*    id="free-solo-2-demo"*/}
                    {/*    disableClearable*/}
                    {/*    className={styles.search}*/}
                    {/*    options={top100Films.map((option) => option.title)}*/}
                    {/*    renderInput={(params) => (*/}
                    {/*        <TextField*/}
                    {/*            {...params}*/}
                    {/*            label="Search input"*/}
                    {/*            margin="normal"*/}
                    {/*            variant="outlined"*/}
                    {/*            InputProps={{...params.InputProps, type: 'search'}}*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*/>*/}
                </Grid>
                <Language />
            </Toolbar>
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
