import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/system';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppNavBar } from './components';
import { DashboardPage } from './pages/DashboardPage';
import { OrganizationPage } from './pages/OrganizationPage';
import { IndividualPage } from './pages/party/IndividualPage';



const theme = createTheme({

})

export const App: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="app-wrapper">
          <AppNavBar title="Party Management" subtitle="v1-SNAPSHOT"
            navlinks={[
              { label: 'Dashboard', path: '/', component: <DashboardPage />, exact: true, icon: 'dashboard' },
              { label: 'Individual', path: '/individual', component: <IndividualPage />, icon: 'person' },
              { label: 'Organization', path: '/organization', component: <OrganizationPage />, icon: 'business' }
            ]}>
          </AppNavBar>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
