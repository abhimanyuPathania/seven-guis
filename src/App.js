import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <ChakraProvider>
        <Switch>
          <Route component={LandingPage} />
        </Switch>
      </ChakraProvider>
    </Router>
  );
}

export default App;
