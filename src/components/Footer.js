import React from "react"
import { Divider } from "@mui/material"
import makeStyles from "@mui/styles/makeStyles"
import Grid from "@mui/material/Grid"
import Feedback from "./Feedback"
import packageJson from "../../package.json";

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
          <Grid size={{ xs: 12, md: 10 }} className={classes.links}>
            <Feedback />
          </Grid>
          <Grid container justifyContent="center">
            <small>{packageJson.version}</small>
          </Grid>
        </Grid>
      </footer>
    </>
  )
}

Footer.propTypes = {}

export default Footer
