import React from "react"
import PropTypes from "prop-types"
import { Divider } from "@material-ui/core"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Grid from "@material-ui/core/Grid"
import Feedback from "./Feedback"

const useStyles = makeStyles(() => {
  return {
    root: {},
    divider: {
      marginTop: 10,
      marginBottom: 10,
    },
    links: {
      padding: 10,
    },
  }
})

const Footer = () => {
  const classes = useStyles()
  return (
    <>
      <footer className={classes.root}>
        <br />
        <Divider className={classes.divider} />
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} className={classes.links}>
            <Feedback />
          </Grid>
        </Grid>
      </footer>
    </>
  )
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Footer
