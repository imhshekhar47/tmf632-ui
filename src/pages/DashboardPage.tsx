import { Box } from '@material-ui/core';
import React from 'react';
import { PageNavBar } from '../components';
import { IndividualPartyList } from '../components/Party/IndividuaParty';
import { OrganizationPartyList } from '../components/Party/OrganizationParty';



type DahboardPageProps = {

}
export const DashboardPage: React.FunctionComponent<DahboardPageProps> = () => {
    return (
        <div>
            <PageNavBar title="Dashboard" />
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