import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
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
        <div>
          <Switch>
            <Route path={`/${ROUTES.counter}`} component={CounterPage} />
            <Route
              path={`/${ROUTES.temperatureConverter}`}
              component={TemperatureConverterPage}
            />
            <Route component={LandingPage} />
          </Switch>
        </div>
      </ChakraProvider>
    </Router>
  );
}

export default App;
