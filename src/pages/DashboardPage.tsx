import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { PageToolbar } from '../components';
import { WipDraw } from '../logos/undraw/index';



type DahboardPageProps = {

}
export const DashboardPage: React.FunctionComponent<DahboardPageProps> = () => {
    return (
        <div>
            <PageToolbar title="Dashboard" />
            
            <Box display="flex" justifyContent="center">
                <img src={WipDraw} />
                {/* <Box flexGrow={1} p={2}>
                    <IndividualPartyList />
                </Box>

                <Box flexGrow={1} p={2}>
                    <OrganizationPartyList />
                </Box> */}
            </Box>
            <Typography variant="h5" component="h2" color="error" align="center">Work In Progress</Typography>

        </div>
    )
}