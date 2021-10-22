import { Box } from '@material-ui/core';
import React from 'react';
import { PageNavBar } from '../components';
import { OrganizationPartyList } from '../components/Party/OrganizationParty';


export const OrganizationPage: React.FunctionComponent = () => {
    return (
        <Box display="flex" flexDirection="column">
            <PageNavBar title="Organization" />
            <Box flexGrow={1} mt={2}>
                <OrganizationPartyList />
            </Box>
        </Box>
    )
}