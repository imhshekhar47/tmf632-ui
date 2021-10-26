import { Box, Icon, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { API } from '../../Api';
import { Organization } from '../../gen/tmf632';


export const OrganizationPartyList: React.FunctionComponent = () => {
    const [organizations, setOrganizations] = React.useState<Organization[]>([])

    useEffect(() => {
        API.organizationService.listOrganization()
            .then(response => {
                console.log(response);
                setOrganizations(response);
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
                    organizations.map((party, idx) => (
                        <ListItem key={`p-${idx}-${party.id}`}>
                            <ListItemIcon><Icon>star</Icon></ListItemIcon>
                            <ListItemText primary={party.name} secondary={party.tradingName} />
                        </ListItem>
                    )) 
                }
            </List>
        </Box>
    )
}