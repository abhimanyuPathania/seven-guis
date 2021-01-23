import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import CounterPage from './pages/CounterPage';

function App() {
  return (
    <Router>
      <ChakraProvider>
        <Navbar />
        <div>
          <Switch>
            <Route path="/counter" component={CounterPage} />
            <Route component={LandingPage} />
          </Switch>
        </div>
      </ChakraProvider>
    </Router>
  );
}

export default App;
