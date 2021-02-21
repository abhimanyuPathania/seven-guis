import { Link, useColorMode } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

function ExternalLink(props) {
  const { children, ...otherProps } = props;
  const { colorMode } = useColorMode();

  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      color={colorMode === 'dark' ? 'blue.300' : 'blue.500'}
      {...otherProps}>
      {children}
      <ExternalLinkIcon ml="1" position="relative" top="-2px" />
    </Link>
  );
}

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExternalLink;
