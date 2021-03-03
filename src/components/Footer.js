import React from "react"
import PropTypes from "prop-types"
import { Divider } from "@material-ui/core"
import GitHubIcon from "@material-ui/icons/GitHub"
import packageJson from "../../package.json"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Feedback from "./Feedback"

const useStyles = makeStyles(theme => {
  return {
    root: {
    },
    divider: {
      marginTop: 10,
      marginBottom: 10,
    },
    links: {
      marginTop: 10,
      textAlign: "center",
    },
  }
})

const Footer = ({ children }) => {
  const classes = useStyles()
  return (
    <>
      <footer className={classes.root}>
        <br />
        <Divider className={classes.divider} />
        <Grid container className={classes.links}>
          <Button href={packageJson.repository.url} size="small">
            <GitHubIcon />
          </Button>
          <Divider orientation="vertical" flexItem />
          <Feedback />
        </Grid>
      </footer>
    </>
  )
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Footer
