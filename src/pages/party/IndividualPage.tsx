import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import React from 'react';
import Icon from '@material-ui/core/Icon';
import { PageToolbar } from '../../components';
import { Route, Link as RouterLink, Redirect } from 'react-router-dom';
import { IndividualPartyCreate, IndividualPartyList, IndividualPartyView } from '../../components/Party';


export const IndividualPage: React.FunctionComponent = () => {
    return (
        <div className='wrapper'>
            <PageToolbar title="Individual">
                <ButtonGroup>
                    <Button size="small" component={RouterLink} to='/individual/list' startIcon={<Icon>list</Icon>} />
                    <Button size="small" component={RouterLink} to='/individual/create' startIcon={<Icon>add</Icon>} />
                </ButtonGroup>    
            </PageToolbar>
            <Route path="/individual" exact={true}><Redirect to="/individual/list" /></Route>
            <Route path="/individual/list" component={IndividualPartyList} />
            <Route path="/individual/create" component={IndividualPartyCreate} />
            <Route path="/individual/view/:id" exact={true} component={IndividualPartyView} />
            <Route path="/individual/edit/:id" exact={true} component={IndividualPartyView} />
        </div>
    )
}