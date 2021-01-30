import { useMachine } from '@xstate/react';
import {
  Box,
  Button,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Select,
} from '@chakra-ui/react';

import flightBookerMachine, {
  flightBookerActions,
  canSubmit,
  TRIP_TYPES,
  TRIP_TYPES_LIST,
} from '../machines/flightBooker';

export default function FlightBookerPage() {
  const [current, send] = useMachine(flightBookerMachine);

  console.log('state', current.value);
  console.log('context', current.context);

  return (
    <Box>
      <Heading mb="6">3. Flight Booker</Heading>
      <Box
        borderColor="gray.200"
        borderWidth="1px"
        borderRadius="md"
        w="300px"
        p="4">
        <FormControl id="tripType">
          <FormLabel>Select Trip Type</FormLabel>
          <Select
            // placeholder="Trip Type"
            colorScheme="teal"
            value={current.context.tripType}
            onChange={(e) => {
              send({
                type: flightBookerActions.SET_TRIP_TYPE,
                value: e.target.value,
              });
            }}>
            {TRIP_TYPES_LIST.map((tripType) => (
              <option value={tripType.value} key={tripType.value}>
                {tripType.label}
              </option>
            ))}
          </Select>
        </FormControl>
        <Box mt="4">
          <Button
            colorScheme="teal"
            size="sm"
            variant="outline"
            // onClick={() => send(counterActions.RESET)}
          >
            Reset
          </Button>
          <Button
            colorScheme="teal"
            size="sm"
            // onClick={() => send(counterActions.RESET)}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <div>
        <button
          onClick={() =>
            send({
              type: flightBookerActions.SET_TRAVEL_DATE,
              value: new Date(),
            })
          }
          style={{ margin: '10px' }}>
          Set travel date
        </button>
        <button
          onClick={() =>
            send({
              type: flightBookerActions.SET_TRIP_TYPE,
              value: TRIP_TYPES.return,
            })
          }
          style={{ margin: '10px' }}>
          Set Return trip
        </button>
        <button
          onClick={() => send(flightBookerActions.SUBMIT)}
          style={{ margin: '10px' }}
          disabled={!canSubmit(current.context)}>
          Submit
        </button>
        <button
          onClick={() => send(flightBookerActions.RESET)}
          style={{ margin: '10px' }}>
          Reset
        </button>
      </div>
    </Box>
  );
}
