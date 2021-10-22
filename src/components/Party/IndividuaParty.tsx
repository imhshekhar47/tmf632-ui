import { Box, Button, Icon, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Search } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { API } from '../../Api';
import { Individual, Individual_Create } from '../../gen/tmf632';


const formStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'row',
        },
        main: {
            flexGrow: 1,
        },
        docs: {
            width: 320,
            backgroundColor: theme.palette.grey[200],
            borderRadius: 4,
            padding: theme.spacing(1),
        },
        heading: {
            color: theme.palette.primary.light,
        },
        form: {
            marginTop: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',

            '& .row': {
                padding: theme.spacing(1, 0),
                display: 'flex',
                flexDirection: 'row',
            },

            '& .row.reverse': {
                display: 'flex',
                flexDirection: 'row-reverse',
            },

            '& .MuiFormControl-root': {
                margin: theme.spacing(1, 1),
            },
            '& .MuiFormControl-root.xs': {
                width: 90,
            },
            '& .MuiFormControl-root.sm': {
                width: 180,
            },
            '& .MuiFormControl-root.md': {
                width: 270,
            },
            '& .MuiFormControl-root.lg': {
                flexGrow: 1,
            }

        },
    }));

type IndividualFormProps = {
    data?: Individual | Individual_Create
}
export const IndividualPartyForm: React.FunctionComponent<IndividualFormProps> = ({ data }) => {
    const css = formStyle();
    return (
        <div className={css.root}>
            <div className={css.main}>
                <Typography variant="h6" component="h2" className={css.heading}>Create Individual Party</Typography>
                <form noValidate className={css.form}>
                    <div className='row'>
                        <TextField label="Title" id='title' name="title"
                            size="small" variant="outlined" type="text"
                            InputLabelProps={{ shrink: true }}
                            className='xs' />

                        <TextField label="Given Name" id='givenName' name="givenName"
                            size="small" variant="outlined" type="text"
                            InputLabelProps={{ shrink: true }}
                            className='md' />

                        <TextField label="Middle Name" id='middleName' name="middleName"
                            size="small" variant="outlined" type="text"
                            InputLabelProps={{ shrink: true }}
                            className='sm' />

                        <TextField label="Family Name" id='familyName' name="familyName"
                            size="small" variant="outlined" type="text"
                            InputLabelProps={{ shrink: true }}
                            className="sm" />

                        <TextField label="Full Name" id='fullName' name="fullName"
                            size="small" variant="outlined" type="text"
                            InputLabelProps={{ shrink: true }}
                            className="lg" />
                    </div>
                    <div className="row">

                        <TextField label="Gender" id='gender' name="gender"
                            size="small" variant="outlined" type="text"
                            InputLabelProps={{ shrink: true }}
                            className='min' />
                    </div>
                    <div className='row'>
                        <TextField label="Aristocratic Title"
                            id='aristocraticTitle' name="aristocraticTitle"
                            size="small" variant="outlined" type="text"
                            InputLabelProps={{ shrink: true }}
                            className='min' />

                        <TextField label="Family Prefix"
                            id='familyNamePrefix' name="familyNamePrefix"
                            size="small" variant="outlined" type="text"
                            InputLabelProps={{ shrink: true }}
                            className='min' />

                        <TextField label="Generation" id='generation' name="generation"
                            size="small" variant="outlined" type="text"
                            InputLabelProps={{ shrink: true }}
                            className='min' />

                        <TextField label="Formatted Name" id='formattedName' name="formattedName"
                            size="small" variant="outlined" type="text"
                            InputLabelProps={{ shrink: true }}
                            className='min' />

                        <TextField label="Legal Name" id='legalName' name="legalName"
                            size="small" variant="outlined" type="text"
                            InputLabelProps={{ shrink: true }}
                            className='min' />

                    </div>
                    <div className='row'>
                        <TextField label="Birth Date" id="birthDate" name="birthDate"
                            size="small" variant="outlined" type="date" defaultValue="1971-01-01"
                            InputLabelProps={{ shrink: true }}
                            className='min' />

                        <TextField label="Death Date" id="deathDate" name="deathDate"
                            size="small" variant="outlined" type="date" defaultValue="1971-01-01"
                            InputLabelProps={{ shrink: true }}
                            className='min' />
                    </div>
                    <div className='row'>
                        <TextField label="Country Of Birth" id="countryOfBirth" name="countryOfBirth"
                            size="small" variant="outlined" type="text"
                            InputLabelProps={{ shrink: true }}
                            className='medium' />
                    </div>
                    <div className='row'>
                        <TextField label="Death Date" id="deathDate" name="deathDate"
                            size="small" variant="outlined" type="date" defaultValue="1971-01-01"
                            InputLabelProps={{ shrink: true }}
                            className='min' />
                    </div>
                    <div className='row'>
                        <Button variant="contained" color="primary">Save</Button>
                    </div>
                </form>
            </div>
            <div className={css.docs}>
                <Icon>help</Icon><Typography variant="h6" component="div" color="primary">Help</Typography>
            </div>
        </div>

    )
}

export const IndividualPartyList: React.FunctionComponent = () => {
    const [individuals, setIndividuals] = React.useState<Individual[]>([])

    useEffect(() => {
        API.individualService.listIndividual()
            .then(response => {
                console.log(response);
                setIndividuals(response);
            })
            .catch(err => {
                throw new Error(err);
            })

    }, [])

    return (
        <Box display='flex' flexDirection="column">
            <Box display="flex" flexGrow={1}>
                <TextField fullWidth variant="outlined" size="small" id="" type="search" placeholder="Name" />
                <IconButton color="primary" component="span"><Search /></IconButton>
            </Box>
            <List>
                {
                    individuals.map((party, idx) => (
                        <ListItem key={`p-${idx}-${party.id}`}>
                            <ListItemIcon><Icon>star</Icon></ListItemIcon>
                            <ListItemText primary={party.fullName} secondary={party.id} />
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    )
}