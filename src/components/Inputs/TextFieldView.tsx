import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from 'clsx';
import React from 'react';

const useStyle = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'inline',
    },
    textView: {
        display: 'flex',
        borderRadius: theme.spacing(0.5),
        borderColor: theme.palette.grey[300],
        borderWidth: 1,
        borderStyle: 'solid',
        padding: theme.spacing(1),
        margin: theme.spacing(0, 2, 2, 0),
        position: 'relative',

        '& .text-label': {
            color: theme.palette.grey[500],
            backgroundColor: theme.palette.common.white,
            fontSize: '12px',
            position: 'absolute',
            top: '-8px',
            padding: '0 4px',
        },

        '& .text-value': {
            color: theme.palette.grey[800],
            paddingLeft: '6px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            minHeight: '18px',
        }
    },
    textViewXS: {
        width: '90px',
    },
    textViewSM: {
        width: '180px',
    }
}))
type TextFieldViewProps = {
    size: 'xs' | 'sm' | 'md' | 'lg',
    type?: 'text' | 'timestamp' | 'number',
    label: string,
    value?: string | number,
}
export const TextFieldView: React.FunctionComponent<TextFieldViewProps> = ({ size, label, type, value }) => {
    const [textValue, setTextValue] = React.useState<string>(value as string);

    React.useEffect(() => {
        if (type === 'timestamp') {
            const date = new Date(value as number * 1000);
            setTextValue(date.toISOString().slice(0,16));
        } else {
            setTextValue(value as string);
        }
    }, [value, type])

    const classes = useStyle();
    return (
        <div className={classes.root}>
            <div className={clsx(classes.textView, {
                [classes.textViewXS]: size === 'xs',
                [classes.textViewSM]: size === 'sm',
            })}>
                <span className='text-label'>{label}</span>
                <span className='text-value'>{textValue}</span>
            </div>
        </div>
    )
}