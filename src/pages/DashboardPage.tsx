import { Box } from '@material-ui/core';
import React from 'react';
import { PageToolbar } from '../components';
import { IndividualPartyList } from '../components/Party';
import { OrganizationPartyList } from '../components/Party';



type DahboardPageProps = {

}
export const DashboardPage: React.FunctionComponent<DahboardPageProps> = () => {
    return (
        <div>
            <PageToolbar title="Dashboard" />
            <Box display="flex">
                <Box flexGrow={1} p={2}>
                    <IndividualPartyList />
                </Box>

                <Box flexGrow={1} p={2}>
                    <OrganizationPartyList />
                </Box>
            </Box>
        </div>
    )
}