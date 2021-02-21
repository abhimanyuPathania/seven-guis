import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage';
import { ROUTES } from './commons/routesConfig';
import theme from './commons/theme';

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Box
          marginTop="45px"
          mx="auto"
          py="8"
          width={{ md: '90%', lg: '60%' }}
          maxW={{ lg: '800px' }}
          px={{ base: '4', sm: '6' }}>
          <Switch>
            {ROUTES.map((route) => {
              const { path, component: PageComponent, no } = route;
              return (
                <Route
                  key={no}
                  path={path}
                  render={(routeProps) => (
                    <PageComponent {...routeProps} routeConfig={route} />
                  )}
                />
              );
            })}
            <Route component={LandingPage} />
          </Switch>
        </Box>
      </ChakraProvider>
    </Router>
  );
}

export default App;
