import {
  Link,
  useColorMode,
  Flex,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
  IconButton,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import DarkModeToggle from 'react-dark-mode-toggle';
import { ChevronDownIcon } from '@chakra-ui/icons';

import Logo from '../Logo/Logo';
import { ROUTES } from '../../commons/routesConfig';

export default function LandingPage() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      bgColor="teal.400"
      height="45px"
      px={{ base: 10, md: 12 }}
      pos="fixed"
      zIndex="docked"
      top="0"
      left="0"
      w="100%"
      align="center"
      justify="space-between">
      <Flex align="center">
        <Link as={RouterLink} to="/" marginRight="4">
          <Logo />
        </Link>

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<ChevronDownIcon />}
            size="sm"
          />
          <MenuList>
            {ROUTES.map((route) => {
              return (
                <MenuItem key={route.name}>
                  <Link
                    as={RouterLink}
                    to={route.path}
                    w="100%"
                    textDecoration="none">
                    {route.label}
                  </Link>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </Flex>
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
