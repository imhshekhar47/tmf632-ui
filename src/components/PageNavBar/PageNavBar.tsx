import { Box, Button, ButtonGroup, Icon, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

type PageNavRoute = {
    label: string,
    icon?: string
    path: string,
    component: React.ReactNode,
    exact?: boolean,

}

type PageNavBarProps = {
    title: string,
    links?: PageNavRoute[],
}

const pageNavBarStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.grey[300],
            marginTop: "-8px",
            marginLeft: theme.spacing(2) * -1,
            marginRight: theme.spacing(2) * -1,
            padding: theme.spacing(1),
        }
    }));

export const PageNavBar: React.FunctionComponent<PageNavBarProps> = ({ title, links }) => {
    const css = pageNavBarStyle();

    return (
        <Box display='flex' className={css.root}>
            <Box flex={1}>
                <Typography component="span" variant="h6" color="primary">{title}</Typography>
            </Box>
            {
                links && <ButtonGroup>
                    {
                        links.map((nav, idx) => (
                            <Button
                                key={`b-${idx}-${nav.label}`}
                                component={RouterLink}
                                to={nav.path}
                                startIcon={<Icon>{nav.icon}</Icon>}
                            />
                        ))
                    }
                </ButtonGroup>
            }
        </Box>
    )
}