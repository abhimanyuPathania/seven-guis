import { forwardRef, useEffect } from 'react';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import ReactDatePicker from 'react-datepicker';

import flightBookerMachine, {
  flightBookerActions,
  canSubmit,
  canSetReturnDate,
  TRIP_TYPES_LIST,
  TRIP_TYPES,
} from '../machines/flightBooker';
import '../components/DatePicker/datePicker.css';

export default function FlightBookerPage() {
  const [current, send] = useMachine(flightBookerMachine);
  const { context, value } = current;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  // Required since table is being rendered in modal whose bgc is shade lighter in dark mode
  const tableBorderColor = colorMode === 'dark' ? 'gray.600' : 'gray.100';

  const dateFormat = 'do MMM, yyyy';

  useEffect(() => {
    if (value === 'final') onOpen();

    if (value === 'editing' && isOpen) onClose();
  }, [value]);

  function closeSubmitModal() {
    send(flightBookerActions.RESET);
    onClose();
  }

  function getFormattedDate(date) {
    if (!date) return '';

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  function renderTableBody() {
    if (value !== 'final') return null;

    return (
      <Tbody>
        <Tr>
          <Td borderColor={tableBorderColor}>Traveling</Td>
          <Td borderColor={tableBorderColor}>
            {getFormattedDate(context.travelDate)}
          </Td>
        </Tr>
        {context.tripType === TRIP_TYPES.return && (
          <Tr>
            <Td borderColor={tableBorderColor}>Return</Td>
            <Td borderColor={tableBorderColor}>
              {getFormattedDate(context.returnDate)}
            </Td>
          </Tr>
        )}
      </Tbody>
    );
  }

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
    <Box maxW="md" mx="auto">
      <Heading mb="6">3. Flight Booker</Heading>
      <Box
        borderColor="gray.200"
        borderWidth="1px"
        borderRadius="md"
        w="100%"
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
              minDate={new Date()}
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

      <Modal isOpen={isOpen} onClose={closeSubmitModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Flight Booker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="4">Your flight has been booked:</Text>
            <Table variant="simple">
              <TableCaption>Flight details</TableCaption>
              <Thead>
                <Tr>
                  <Th borderColor={tableBorderColor}>flight</Th>
                  <Th borderColor={tableBorderColor}>date</Th>
                </Tr>
              </Thead>
              {renderTableBody()}
            </Table>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" onClick={closeSubmitModal} size="md">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
