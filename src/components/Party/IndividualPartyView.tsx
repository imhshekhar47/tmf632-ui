import { Button, Icon } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { API } from '../../Api';
import { Individual } from '../../gen/tmf632';
import { TextFieldView } from '../Inputs';


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

    },
    step: {
        '& .step-lable': {

        },
        '& .step-content': {

        }
    }

}))

export const IndividualPartyView: React.FunctionComponent = () => {
    const [individual, setIndividual] = React.useState<Individual | undefined>()
    const { id } = useParams<{ id: string }>();

    const classes = useStyle();

    React.useEffect(() => {
        API.individualService.retrieveIndividual(id)
            .then(response => {
                setIndividual(response as Individual);
            })
            .catch(err => {
                throw new Error(err);
            })
            .finally(() => {

            })
    }, [id]);

    return (
        <div className={classes.root}>
            <Typography variant="h6" component="h2" className={classes.heading}>View Individual [{individual?.id}] {individual?.formattedName} </Typography>
            <div className={classes.body}>
                <IndividualPartyDetailView data={individual!!} expand />
            </div>
        </div>
    )
}

const useDetailStyle = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.common.white,
        margin: theme.spacing(2, 0),
        padding: theme.spacing(2)
    },
    step: {
        display: 'flex',
        flexDirection: 'column',

        '& .step-lable': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',

            '& .step-icon': {
                width: theme.spacing(5),
                height: theme.spacing(5),
                backgroundColor: theme.palette.info.main,
                color: theme.palette.common.white,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                marginRight: theme.spacing(1),
            },

            '& .step-lable-text': {
                color: theme.palette.info.dark,
                fontWeight: theme.typography.fontWeightMedium,
            }
        },
        '& .step-content': {
            margin: theme.spacing(0.5, 0),
            minHeight: theme.spacing(2),
            borderLeftWidth: 1,
            borderLeftColor: theme.palette.info.main,
            borderLeftStyle: 'solid',
            marginLeft: theme.spacing(2.5),
            padding: theme.spacing(1, 3),
        }
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        margin: theme.spacing(1, 0),
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2),
    }
}))
type IndividualPartyDetailProps = {
    data: Individual
    expand?: boolean
}
export const IndividualPartyDetailView: React.FunctionComponent<IndividualPartyDetailProps> = ({ data, expand }) => {
    const history = useHistory();
    const classes = useDetailStyle();
    return (
        <div className={classes.root}>
            {
                data && <div>
                    <div className={classes.step}>
                        <div className="step-lable">
                            <div className="step-icon"><Icon>person</Icon></div>
                            <div className="step-lable-text">Personal Details</div>
                        </div>
                        <div className="step-content">
                            <div className={classes.row}>
                                <TextFieldView size="xs" label="Title" value={data.title} />
                                <TextFieldView size="sm" label="Given Name" value={data.givenName} />
                                <TextFieldView size="sm" label="Middle Name" value={data.middleName} />
                                <TextFieldView size="sm" label="Family Name" value={data.familyName} />
                            </div>
                            <div className={classes.row}>
                                <TextFieldView size="xs" label="Gender" value={data.gender} />
                            </div>
                            <div className={classes.row}>
                                <TextFieldView size="sm" label="Birth Date" value={data.birthDate} type="timestamp" />
                                <TextFieldView size="sm" label="Birth Place" value={data.placeOfBirth} />
                                <TextFieldView size="sm" label="Birth Country" value={data.countryOfBirth} />
                            </div>
                        </div>
                    </div>
                    <div className={classes.step}>
                        <div className="step-lable">
                            <div className="step-icon"><Icon>contact_page</Icon></div>
                            <div className="step-lable-text">Contact Details</div>
                        </div>
                        <div className="step-content">

                        </div>
                    </div>
                    <div className={classes.step}>
                        <div className="step-lable">
                            <div className="step-icon"><Icon>credit_card</Icon></div>
                            <div className="step-lable-text">Credit Details</div>
                        </div>
                        <div className="step-content">

                        </div>
                    </div>
                    <div className={classes.footer}>
                        <Button variant="contained" size="small" onClick={() => history.go(-1)}><Icon>undo</Icon> Back</Button>
                        <Button variant="contained" size="small" component={RouterLink} to={`/individual/edit/${data.id}`}><Icon>edit</Icon> Edit</Button>
                    </div>
                </div>
            }
        </div>
    )
}