import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/styles";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { API } from "../../Api";
import { Individual } from "../../gen/tmf632/models/Individual";


const useStyle = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(2, 0),
    },
    heading: {
        color: theme.palette.info.main,
        fontWeight: theme.typography.fontWeightLight,
        fontSize: theme.spacing(2),
    },
    body: {
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.common.white,
    }
}))

export const IndividualPartyList: React.FunctionComponent = () => {
    const [individuals, setIndividuals] = React.useState<Individual[]>([])

    React.useEffect(() => {
        API.individualService.listIndividual()
            .then(response => {
                console.log(response);
                setIndividuals(response);
            })
            .catch(err => {
                throw new Error(err);
            })

    }, [])

    const classes = useStyle();
    return (
        <div className={classes.root}>
            <Typography variant="h6" component="h2" className={classes.heading}>List Individual Party</Typography>
            <div className={classes.body}>
                <List>
                    {
                        individuals.map((party, idx) => (
                            <ListItem key={`p-${idx}-${party.id}`} component={RouterLink} to={`/individual/view/${party.id}`}>
                                <ListItemIcon><Avatar><Icon>person</Icon></Avatar></ListItemIcon>
                                <ListItemText primary={party.fullName} secondary={party.id} />
                            </ListItem>
                        ))
                    }
                </List>
            </div>
        </div>
    )
}