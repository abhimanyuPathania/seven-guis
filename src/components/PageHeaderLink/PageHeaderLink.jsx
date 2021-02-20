import PropTypes from 'prop-types';
import { Text, Link, useColorMode } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

function PageHeaderLink(props) {
  const { routeConfig, ...otherProps } = props;
  const { colorMode } = useColorMode();
  return (
    <Text mb="4" {...otherProps}>
      <Text as="span" mr="1">
        First task of
      </Text>
      <Link
        href={routeConfig.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        color={colorMode === 'dark' ? 'blue.300' : 'blue.500'}>
        The 7 Tasks from 7GUIs
        <ExternalLinkIcon ml="1" position="relative" top="-2px" />
      </Link>
    </Text>
  );
}

PageHeaderLink.propTypes = {
  routeConfig: PropTypes.shape({
    no: PropTypes.number.isRequired,
    externalLink: PropTypes.string.isRequired,
  }),
};

export default PageHeaderLink;
