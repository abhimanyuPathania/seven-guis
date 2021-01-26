import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { ROUTES } from '../../commons/enums';

export default function LandingPage() {
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
    </div>
  );
}
