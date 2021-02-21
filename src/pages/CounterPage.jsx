import { useMachine } from '@xstate/react';
import {
  Box,
  Button,
  Stack,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

import counterMachine, { counterActions } from '../machines/counter';
import PageHeader from '../components/PageHeader/PageHeader';
import * as shapes from '../commons/shapes';
import { boxWrapperStyles } from '../commons/enums';

function CounterPage(props) {
  const { routeConfig } = props;
  const [current, send] = useMachine(counterMachine);

  return (
    <Box>
      <PageHeader routeConfig={routeConfig} />
      <Box maxW="lg" mx="auto">
        <Box mt="3" {...boxWrapperStyles}>
          <Box>
            <FormControl id="email">
              <FormLabel>Count</FormLabel>
              <Input value={current.context.count} disabled />
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
  routeConfig: shapes.routeConfig,
};

export default CounterPage;
