import { Link, Button, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { ROUTES } from '../../commons/enums';

export default function LandingPage() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Link as={RouterLink} to="/">
        Home
      </Link>
      <Link as={RouterLink} to={`/${ROUTES.counter}`} ml="3">
        Counter
      </Link>
      <Link as={RouterLink} to={`/${ROUTES.temperatureConverter}`} ml="3">
        Temperature Converter
      </Link>
      <Button
        size="sm"
        ml="5"
        onClick={() => {
          colorMode === 'light'
            ? toggleColorMode('dark')
            : toggleColorMode('light');
        }}>
        Change Color Mode
      </Button>
    </div>
  );
}
