import React from 'react';
import PropTypes from 'prop-types';
import { chakra, useColorMode } from '@chakra-ui/react';

function Blockquote(props) {
  const { children, ...otherProps } = props;
  const { colorMode } = useColorMode();
  return (
    <chakra.blockquote
      {...otherProps}
      color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}
      borderLeftWidth="4px"
      borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
      paddingLeft="4">
      {children}
    </chakra.blockquote>
  );
}

Blockquote.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Blockquote;
