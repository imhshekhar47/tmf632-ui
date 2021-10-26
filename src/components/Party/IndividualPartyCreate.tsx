import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@material-ui/core/Icon";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import clsx from 'clsx';
import React from "react";
import { API } from "../../Api";
import { Individual } from "../../gen/tmf632/models/Individual";
import { Individual_Create } from "../../gen/tmf632/models/Individual_Create";
import { UTIL } from "../../Util";


const stepLabelIconStyle = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        borderRadius: '50%',
        borderColor: theme.palette.grey[300],
        backgroundColor: theme.palette.grey[100],
    },
    active: {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.background.paper,
    }
}))
interface StepLabelIconProps {
    icon: string,
    active: boolean
}
const StepLabelIcon: React.FunctionComponent<StepLabelIconProps> = ({ icon, active }) => {
    const classes = stepLabelIconStyle()
    return (
        <div className={clsx(classes.root, {
            [classes.active]: active
        })}>
            <Icon>{icon}</Icon>
        </div>
    )
}


const defaultIndividual: Individual | Individual_Create = {
    id: '',
    title: '',
    givenName: '',
    middleName: '',
    familyName: '',
    gender: '',
    birthDate: '1971-01-01',
    countryOfBirth: '',
    deathDate: '2999-12-31',
};

const formStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2, 0),
        },
        heading: {
            color: theme.palette.info.main,
            fontWeight: theme.typography.fontWeightLight,
            fontSize: theme.spacing(2),
        },
        form: {
            marginTop: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',

            '& .row': {
                padding: theme.spacing(1, 0),
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
            },

            '& .row-action': {
                padding: theme.spacing(2, 0),
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',

                '& .MuiButtonBase-root': {
                    margin: theme.spacing(2, 2, 2, 0),
                }
            },

            '& .row.reverse': {
                display: 'flex',
                flexDirection: 'row-reverse',
            },

            '& .MuiFormControl-root': {
                margin: theme.spacing(1, 1, 1, 0),
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
                width: 360,
            },
            '& .MuiFormControl-root.fluid': {
                flexGrow: 1,
            }
        },

        footer: {
            padding: theme.spacing(2),

            '& .MuiButtonBase-root': {
                margin: theme.spacing(0, 2, 0, 2),
            }
        },
        stepper: {
            padding: theme.spacing(2),

            '& .MuiStepLabel-root': {
                color: theme.palette.grey[500],
            },
            '& .MuiStepLabel-label.MuiStepLabel-active': {
                color: theme.palette.info.dark,
            },
            '& .MuiStepContent-root': {
                marginLeft: theme.spacing(2.5),
            },
            '& .MuiStepConnector-vertical': {
                marginLeft: theme.spacing(2.5),
            }
        }
    }));

type IndividualFormProps = {
    data?: Individual | Individual_Create | undefined
}
export const IndividualPartyCreate: React.FunctionComponent<IndividualFormProps> = ({ data }) => {
    const [activeStep, setActiveStep] = React.useState<number>(0)
    const [individual, setIndividual] = React.useState<Individual | Individual_Create>({ ...defaultIndividual || data });
    const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState<boolean>(false);

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const handleNext = () => {
        console.log(individual)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleTitleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        console.log(e.target.value);
        setIndividual({ ...individual, 'title': e.target.value as string })
    }

    const handleGenderChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        console.log(e.target.value);
        setIndividual({ ...individual, 'gender': e.target.value as string });
    }

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIndividual({ ...individual, [e.target.name]: e.target.value });
    }

    const isActive = (index: number) => index === activeStep

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitBtnDisabled(true);
        const individualCreate = {
            ...individual,
            birthDate: UTIL.convertToOffsetDateTime(individual.birthDate),
            deathDate: UTIL.convertToOffsetDateTime(individual.deathDate),
        }
        API.individualService.createIndividual(individualCreate as Individual_Create)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                throw new Error(err);
            })
            .finally(() => {
                setSubmitBtnDisabled(false);
            });
    }

    const css = formStyle();

    return (
        <div className={css.root}>
            <Typography variant="h6" component="h2" className={css.heading}>Create Individual Party</Typography>
            <form noValidate className={css.form} onSubmit={handleFormSubmit}>
                <Stepper activeStep={activeStep} orientation="vertical" className={css.stepper}>
                    <Step key="0">
                        <StepLabel StepIconComponent={() => <StepLabelIcon icon="person" active={isActive(0)} />}>Personal Details</StepLabel>
                        <StepContent>
                            <div className='row'>
                                <FormControl required variant="outlined" size="small" className='xs'>
                                    <InputLabel id="ctrl-label-title" shrink>Title</InputLabel>
                                    <Select labelId="ctrl-label-title" id="title" name="title" label="Title"
                                        value={individual.title}
                                        onChange={handleTitleChange}
                                    >
                                        <MenuItem value="">Select</MenuItem>
                                        <MenuItem value="MR">Mr</MenuItem>
                                        <MenuItem value="MS">Ms</MenuItem>
                                        <MenuItem value="MRS">Mrs</MenuItem>
                                        <MenuItem value="DR">Dr</MenuItem>
                                        <MenuItem value="SIR">Sir</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField required label="Given Name" id='givenName' name="givenName"
                                    size="small" variant="outlined" type="text"
                                    InputLabelProps={{ shrink: true }}
                                    className='md' value={individual.givenName}
                                    onChange={onTextChange} />

                                <TextField label="Middle Name" id='middleName' name="middleName"
                                    size="small" variant="outlined" type="text"
                                    InputLabelProps={{ shrink: true }}
                                    className='sm' value={individual.middleName}
                                    onChange={onTextChange} />

                                <TextField required label="Family Name" id='familyName' name="familyName"
                                    size="small" variant="outlined" type="text"
                                    InputLabelProps={{ shrink: true }}
                                    className="sm" value={individual.familyName}
                                    onChange={onTextChange} />
                            </div>
                            <div className='row'>
                                <FormControl variant="outlined" size="small" className='xs'>
                                    <InputLabel id="ctrl-label-gender" shrink>Gender</InputLabel>
                                    <Select labelId="ctrl-label-gender" id="gender" name="gender" label="Gender"
                                        value={individual.gender}
                                        onChange={handleGenderChange}
                                    >
                                        <MenuItem value="">Select</MenuItem>
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="None">None</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='row'>
                                <TextField label="Birth Date" id="birthDate" name="birthDate"
                                    size="small" variant="outlined" type="date"
                                    InputLabelProps={{ shrink: true }}
                                    className='sm'
                                    defaultValue={individual.birthDate}
                                    value={individual.birthDate}
                                    onChange={onTextChange} />

                                <TextField label="Country Of Birth" id="countryOfBirth" name="countryOfBirth"
                                    size="small" variant="outlined" type="text"
                                    InputLabelProps={{ shrink: true }}
                                    className='sm'
                                    value={individual.countryOfBirth}
                                    onChange={onTextChange} />

                                <TextField label="Death Date" id="deathDate" name="deathDate"
                                    size="small" variant="outlined" type="date"
                                    InputLabelProps={{ shrink: true }}
                                    className='sm'
                                    defaultValue={individual.deathDate}
                                    value={individual.deathDate}
                                    onChange={onTextChange} />
                            </div>
                            <div className='row-action'>
                                <Button variant="contained" onClick={handleNext}><Icon>skip_next</Icon> Next</Button>
                            </div>
                        </StepContent>
                    </Step>
                    <Step key="1">
                        <StepLabel
                            StepIconComponent={() => <StepLabelIcon icon="contact_page" active={isActive(1)} />}
                            optional={<Typography variant="caption">Optional</Typography>}
                        >Contact Details</StepLabel>
                        <StepContent>
                            <div className='row-action'>
                                <Button variant="contained" onClick={handleBack}><Icon>skip_previous</Icon>Back</Button>
                                <Button variant="contained" onClick={handleNext}><Icon>skip_next</Icon> Next</Button>
                            </div>
                        </StepContent>
                    </Step>
                    <Step key="2">
                        <StepLabel StepIconComponent={() => <StepLabelIcon icon="credit_card" active={isActive(2)} />}>Credit Details</StepLabel>
                        <StepContent>
                            <div className='row-action'>
                                <Button variant="contained" onClick={handleBack}><Icon>skip_previous</Icon> Back</Button>
                                <Button variant="contained" onClick={handleNext}><Icon>skip_next</Icon> Next</Button>
                            </div>
                        </StepContent>
                    </Step>
                </Stepper>
                {
                    activeStep === 3 && (
                        <Paper square elevation={0}>
                            <div className={css.footer}>
                                <Button variant="contained" onClick={handleBack}>Back</Button>
                                <Button type="submit" variant="contained" color="primary" disabled={activeStep > 3 && submitBtnDisabled}>Submit</Button>
                            </div>
                        </Paper>
                    )
                }
            </form>
        </div>

    )
}
