import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div>
      <Link as={RouterLink} to="/">
        Home
      </Link>
      <Link as={RouterLink} to="/counter" ml="10px">
        Counter
      </Link>
    </div>
  );
}
