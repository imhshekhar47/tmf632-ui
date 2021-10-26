import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';


const pageToolbarStyle = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.grey[200],
        margin: theme.spacing(-1, -2, 0, -2),
        padding: theme.spacing(1, 2, 1, 2),

        '& .page-toolbar': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

            '& .page-title': {
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.grey[800],
            }
        }
    }
}))

type PageToolbarProps = {
    title: string,
    breadcrumb?: React.ReactNode
}
export const PageToolbar: React.FunctionComponent<PageToolbarProps> = ({ title, breadcrumb, children }) => {

    const classes = pageToolbarStyle();

    return (
        <div className={classes.root}>
            <div className='page-toolbar'>
                <span className='page-title'>{title}</span>
                {children}
            </div>
            {breadcrumb}
        </div>
    )
}

