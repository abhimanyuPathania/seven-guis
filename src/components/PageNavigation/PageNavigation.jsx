import { Box, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

import { ROUTES } from '../../commons/routesConfig';
import * as shapes from '../../commons/shapes';

function PageNavigation(props) {
  const { routeConfig, ...otherProps } = props;
  const currentRouteIndex = routeConfig.no - 1;
  const previousRoute = ROUTES[currentRouteIndex - 1];
  const nextRoute = ROUTES[currentRouteIndex + 1];
  const previousLabel = (previousRoute && previousRoute.label) || 'Home';
  const previousPath = (previousRoute && previousRoute.path) || '/';
  const nextLabel = (nextRoute && nextRoute.label) || 'Home';
  const nextPath = (nextRoute && nextRoute.path) || '/';

  return (
    <Box fontSize="xs" {...otherProps}>
      <Link as={RouterLink} to={previousPath}>
        <ChevronLeftIcon />
        {previousLabel}
      </Link>
      <Text as="span" mx="2">
        /
      </Text>
      <Link as={RouterLink} to={nextPath}>
        {nextLabel}
        <ChevronRightIcon />
      </Link>
    </Box>
  );
}

PageNavigation.propTypes = {
  routeConfig: shapes.routeConfig,
};

export default PageNavigation;
