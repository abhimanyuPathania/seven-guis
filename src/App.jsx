import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'flatpickr/dist/themes/dark.css';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage';
import { ROUTES } from './commons/routesConfig';
import { NAVBAR_HEIGHT } from './commons/enums';
import theme from './commons/theme';

function App() {
  const paddingTop = `calc(${NAVBAR_HEIGHT} + 2rem)`;

  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Flex minH="100vh" direction="column">
          <Navbar />
          <Box
            flex="1"
            mx="auto"
            paddingTop={paddingTop}
            paddingBottom="8"
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
          <Footer />
        </Flex>
      </ChakraProvider>
    </Router>
  );
}

export default App;
