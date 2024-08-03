import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import React from "react"
import {object} from "prop-types"
import {Link} from "../_shared/Link";
import FormattedMessage from "../FormattedMessage";
import {useI18n} from "@/utils/useI18n";


export const Tool = ({config}) => {
    const {name} = config
    const {t} = useI18n();
    return (
        <Link
            to={`/${name}`}
            style={{textDecoration: "none"}}
            title={t(`${name}.title`)}
        >
            <Card sx={{
                cursor: "pointer",
                "&:hover": {
                    color: "primary.contrastText",
                    backgroundColor: "primary.main",
                },
                minHeight: "8rem",
                height: "100%",
            }}
                  fullWidth
            >
                <CardContent>
                    <Typography variant="h5" component="h2">
                        <FormattedMessage id={`${name}.title`} namespace="tools"/>
                    </Typography>
                    <Typography variant="body2" component="p">
                        <FormattedMessage id={`${name}.info`} namespace="tools"/>
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}

Tool.displayName = "Tool"

Tool.propTypes = {
    config: object,
}
