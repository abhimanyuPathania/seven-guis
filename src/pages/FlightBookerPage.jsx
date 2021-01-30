import { forwardRef } from 'react';
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
import ReactDatePicker from 'react-datepicker';

import flightBookerMachine, {
  flightBookerActions,
  canSubmit,
  canSetReturnDate,
  TRIP_TYPES,
  TRIP_TYPES_LIST,
} from '../machines/flightBooker';
import '../components/DatePicker/datePicker.css';

export default function FlightBookerPage() {
  const [current, send] = useMachine(flightBookerMachine);
  const { context } = current;
  const dateFormat = 'do MMM, yyyy';

  console.log('state', current.value);
  console.log('context', context);

  const TravelDateInput = forwardRef(({ value, onClick }, ref) => (
    <FormControl>
      <FormLabel htmlFor="travel-date">Travel Date</FormLabel>
      <Input value={value} onClick={onClick} readOnly ref={ref} />
    </FormControl>
  ));

  const ReturnDateInput = forwardRef(({ value, onClick }, ref) => {
    const disabled = !canSetReturnDate(context);

    return (
      <FormControl>
        <FormLabel htmlFor="return-date">Return Date</FormLabel>
        <Input
          value={value}
          onClick={onClick}
          readOnly
          ref={ref}
          variant={disabled ? 'filled' : 'outline'}
          disabled={disabled}
        />
      </FormControl>
    );
  });

  return (
    <Box>
      <Heading mb="6">3. Flight Booker</Heading>

      <Box
        borderColor="gray.200"
        borderWidth="1px"
        borderRadius="md"
        w="300px"
        p="4">
        <Stack spacing="4">
          <FormControl id="tripType">
            <FormLabel>Select Trip Type</FormLabel>
            <Select
              colorScheme="teal"
              value={context.tripType}
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
          <Box>
            <ReactDatePicker
              id="travel-date"
              selected={context.travelDate}
              onChange={(date) =>
                send({ type: flightBookerActions.SET_TRAVEL_DATE, value: date })
              }
              customInput={<TravelDateInput />}
              dateFormat={dateFormat}
            />
          </Box>
          <Box>
            <ReactDatePicker
              id="return-date"
              selected={context.returnDate}
              onChange={(date) =>
                send({ type: flightBookerActions.SET_RETURN_DATE, value: date })
              }
              minDate={context.travelDate}
              customInput={<ReturnDateInput />}
              dateFormat={dateFormat}
            />
          </Box>
          <Stack direction="row" spacing="4">
            <Button
              colorScheme="teal"
              size="sm"
              variant="outline"
              flex="1"
              onClick={() => send(flightBookerActions.RESET)}>
              Reset
            </Button>
            <Button
              colorScheme="teal"
              size="sm"
              flex="1"
              onClick={() => send(flightBookerActions.SUBMIT)}
              disabled={!canSubmit(context)}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
