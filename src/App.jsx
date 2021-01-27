import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage';
import CounterPage from './pages/CounterPage';
import TemperatureConverterPage from './pages/TemperatureConverterPage';
import { ROUTES } from './commons/enums';
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
          width={{ md: '90%', lg: '70%' }}
          px={{ base: '4', sm: '6' }}>
          <Switch>
            <Route path={`/${ROUTES.counter}`} component={CounterPage} />
            <Route
              path={`/${ROUTES.temperatureConverter}`}
              component={TemperatureConverterPage}
            />
            <Route component={LandingPage} />
          </Switch>
        </Box>
      </ChakraProvider>
    </Router>
  );
}

export default App;
