import PropTypes from 'prop-types';
import { useMachine } from '@xstate/react';
import {
  Box,
  Button,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Text,
} from '@chakra-ui/react';

import counterMachine, { counterActions } from '../machines/counter';
import Blockquote from '../components/Blockquote/Blockquote';
import PageHeading from '../components/PageHeading/PageHeading';
import PageHeaderLink from '../components/PageHeaderLink/PageHeaderLink';

function CounterPage(props) {
  const { routeConfig } = props;
  const [current, send] = useMachine(counterMachine);

  return (
    <Box>
      <PageHeading routeConfig={routeConfig} />
      <PageHeaderLink routeConfig={routeConfig} />
      <Blockquote cite="https://tools.ietf.org/html/rfc1149">
        <Text as="i">
          Challenge: Understanding the basic ideas of a language/toolkit.
        </Text>
        <Text mt="4">
          The task is to build a frame containing a label or read-only textfield
          T and a button B. Initially, the value in T is “0” and each click of B
          increases the value in T by one.
        </Text>
      </Blockquote>

      <Box maxW="lg" mx="auto">
        <Box
          padding="3"
          mt="3"
          borderColor="gray.200"
          borderWidth="1px"
          borderRadius="md">
          <Box>
            <FormControl id="email">
              <FormLabel>Count</FormLabel>
              <Input variant="filled" value={current.context.count} disabled />
            </FormControl>
          </Box>
          <Stack
            direction="row"
            spacing={4}
            align="center"
            mt="1rem"
            justify="center">
            <Button
              colorScheme="teal"
              size="sm"
              variant="solid"
              onClick={() => send(counterActions.INCREMENT)}>
              Increment
            </Button>
            <Button
              colorScheme="teal"
              size="sm"
              variant="outline"
              onClick={() => send(counterActions.RESET)}>
              Reset
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

CounterPage.propTypes = {
  routeConfig: PropTypes.shape({
    no: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
};

export default CounterPage;
