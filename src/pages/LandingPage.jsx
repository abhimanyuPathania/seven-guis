import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { ROUTES } from '../commons/routesConfig';

import Blockquote from '../components/Blockquote/Blockquote';
import ExternalLink from '../components/ExternalLink/ExternalLink';

export default function LandingPage() {
  return (
    <Box>
      <Heading mb="6">Seven GUI Tasks</Heading>
      <Text mb="2">
        7 GUIs is a popular list of seven user interface development tasks.
        These tasks try to cover many challenges faced in UI development.
        Quoting the author of tasks list:
      </Text>
      <Blockquote mb="2">
        There are countless GUI toolkits in different languages and with diverse
        approaches to GUI development. Yet, diligent comparisons between them
        are rare. Whereas in a traditional benchmark competing implementations
        are compared in terms of their resource consumption, here
        implementations are compared in terms of their notation. To that end,
        7GUIs defines seven tasks that represent typical challenges in GUI
        programming.
      </Blockquote>
      <Text mb="6">
        <ExternalLink href="https://eugenkiss.github.io/7guis/">
          The 7 Tasks from 7GUIs Homepage
        </ExternalLink>
      </Text>
      <Box mb="6">
        <Text mb="2">
          The tasks have{' '}
          <ExternalLink href="https://eugenkiss.github.io/7guis/implementations">
            implementations
          </ExternalLink>{' '}
          in various programming languages like JAVA, Clojure, Elm, Kotlin etc.
          This, web browser based, solution uses:
        </Text>
        <UnorderedList paddingLeft="4">
          <ListItem>
            <ExternalLink href="https://reactjs.org/">React</ExternalLink>: UI
            framework
          </ListItem>
          <ListItem>
            <ExternalLink href="https://xstate.js.org/docs/">
              XState
            </ExternalLink>
            : State management
          </ListItem>
          <ListItem>
            <ExternalLink href="https://chakra-ui.com/">Chakra</ExternalLink>:
            Component library
          </ListItem>
        </UnorderedList>
      </Box>
      <Text mb="2">
        The goal of this activity was to learn using{' '}
        <ExternalLink href="https://en.wikipedia.org/wiki/Finite-state_machine">
          finite state machines
        </ExternalLink>{' '}
        for building reactive UIs.{' '}
        <ExternalLink href="https://xstate.js.org/docs/">XState</ExternalLink>{' '}
        is a popular library that that implements finite state machines and
        statecharts in JavaScript. It adheres to the{' '}
        <ExternalLink href="https://www.w3.org/TR/scxml/">
          State Chart XML(SCXML) specification
        </ExternalLink>
        .
      </Text>
      <Box>
        <Link
          as={RouterLink}
          to={ROUTES[0].path}
          fontWeight="bold"
          fontSize="lg">
          Start here <ChevronRightIcon />
        </Link>
      </Box>
    </Box>
  );
}
