import { Box, useColorMode, Text, Flex, Link } from '@chakra-ui/react';
import React from 'react';

import GithubIcon from '../GithubIcon/GithubIcon';

export default function Footer() {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'gray.700' : 'gray.100';

  return (
    <Box h="45px" bgColor={bgColor}>
      <Flex h="100%" justify="center" align="center">
        <Text as="span" fontSize="sm">
          Built and maintained by{' '}
          <Link
            href="https://github.com/abhimanyuPathania"
            target="_blank"
            rel="noopener noreferrer"
            textDecoration="none"
            border="0px">
            <Text as="span" color="teal.400" fontWeight="bold">
              Abhimanyu Pathania
            </Text>
          </Link>
        </Text>
        <Link
          href="https://github.com/abhimanyuPathania"
          target="_blank"
          rel="noopener noreferrer"
          ml="2">
          <GithubIcon boxSize="5" />
        </Link>
      </Flex>
    </Box>
  );
}
