import { useMachine } from '@xstate/react';
import {
  Box,
  Button,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Heading,
} from '@chakra-ui/react';

import counterMachine, { counterActions } from '../machines/counter';

export default function CounterPage() {
  const [current, send] = useMachine(counterMachine);

  return (
    <Box maxW="lg" mx="auto">
      <Heading mb="6">1. Counter</Heading>
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
  );
}
