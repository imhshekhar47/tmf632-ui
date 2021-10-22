import { Box } from '@material-ui/core';
import React from 'react';
import { Route } from 'react-router-dom';
import { PageNavBar } from '../components';
import { IndividualPartyForm, IndividualPartyList } from '../components/Party/IndividuaParty';



type PageContainerProps = {
    content: React.ReactNode
}
export function PageContainer({ content }: PageContainerProps): JSX.Element {
    return (
        <div>{content}</div>
    )
}

const navlinks = [
    {
        label: 'List',
        path: '/individual/',
        exact: true,
        icon: 'list',
        component: <IndividualPartyList />
    },
    {
        label: 'Create',
        path: '/individual/create',
        exact: true,
        icon: 'add',
        component: <IndividualPartyForm />
    }
];

export const IndividualPage: React.FunctionComponent = () => {
    return (
        <Box display="flex" flexDirection="column">
            <PageNavBar title="Individual" links={navlinks} />
            <Box flexGrow={1} mt={2}>
                {
                    navlinks.map((nav, idx) => (
                        <Route
                            key={`r-idx-${nav.label}`}
                            path={nav.path}
                            exact={nav.exact}
                            component={() => <PageContainer content={nav.component} />}
                        />
                    ))
                }
            </Box>
        </Box>
    )
}