import {
  Link,
  useColorMode,
  Box,
  Flex,
  MenuButton,
  Button,
  MenuItem,
  MenuList,
  Menu,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import DarkModeToggle from 'react-dark-mode-toggle';

import { ROUTES } from '../../commons/enums';

export default function LandingPage() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      bgColor="blue.300"
      height="45px"
      px={{ base: 10, md: 12 }}
      pos="fixed"
      zIndex="docked"
      top="0"
      left="0"
      w="100%"
      align="center"
      justify="space-between">
      <Box>
        <Link as={RouterLink} to="/">
          Home
        </Link>
        <Link as={RouterLink} to={`/${ROUTES.counter}`} ml="3">
          Counter
        </Link>
        <Link as={RouterLink} to={`/${ROUTES.temperatureConverter}`} ml="3">
          Temperature Converter
        </Link>
        <Menu>
          <MenuButton as={Button}>Actions</MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <DarkModeToggle
        onChange={(isDarkMode) =>
          toggleColorMode(isDarkMode ? 'dark' : 'light')
        }
        checked={colorMode === 'dark'}
        size={50}
      />
    </Flex>
  );
}
