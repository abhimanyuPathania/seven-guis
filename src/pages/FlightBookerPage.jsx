import { useEffect, useRef } from 'react';
import { useMachine } from '@xstate/react';
import {
  Box,
  Button,
  Stack,
  FormControl,
  FormLabel,
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

import flightBookerMachine, {
  flightBookerActions,
  canSubmit,
  canSetReturnDate,
  TRIP_TYPES_LIST,
  TRIP_TYPES,
} from '../machines/flightBooker';
import PageHeader from '../components/PageHeader/PageHeader';
import * as shapes from '../commons/shapes';
import { boxWrapperStyles } from '../commons/enums';
import DateTimePicker from '../components/DateTimePicker/DateTimePicker';

function FlightBookerPage(props) {
  const { routeConfig } = props;
  const [current, send] = useMachine(flightBookerMachine);
  const { context, value } = current;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const travelDatePickerRef = useRef(null);
  const returnDatePickerRef = useRef(null);
  // Required since table is being rendered in modal whose bgc is shade lighter in dark mode
  const tableBorderColor = colorMode === 'dark' ? 'gray.600' : 'gray.100';

  useEffect(() => {
    if (value === 'final') onOpen();

    if (value === 'editing' && isOpen) onClose();
  }, [value]);

  function getFormattedDate(date) {
    if (!date) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  function reset() {
    if (travelDatePickerRef.current) travelDatePickerRef.current.clear();
    if (returnDatePickerRef.current) returnDatePickerRef.current.clear();

    send(flightBookerActions.RESET);
  }

  function closeSubmitModal() {
    reset();
    onClose();
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

  return (
    <Box>
      <PageHeader routeConfig={routeConfig} />
      <Box maxW="md" mx="auto">
        <Box {...boxWrapperStyles} w="100%">
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
              <DateTimePicker
                label="Travel Date"
                options={{
                  minDate: new Date(),
                }}
                onChange={([travelDate]) => {
                  send({
                    type: flightBookerActions.SET_TRAVEL_DATE,
                    value: travelDate,
                  });
                }}
                onCreate={(pickerRef) =>
                  (travelDatePickerRef.current = pickerRef)
                }
              />
            </Box>
            <Box>
              <DateTimePicker
                label="Return Date"
                options={{
                  minDate: context.travelDate,
                }}
                disabled={!canSetReturnDate(context)}
                onChange={([returnDate]) =>
                  send({
                    type: flightBookerActions.SET_RETURN_DATE,
                    value: returnDate,
                  })
                }
                onCreate={(pickerRef) =>
                  (returnDatePickerRef.current = pickerRef)
                }
              />
            </Box>
            <Stack direction="row" spacing="4">
              <Button
                colorScheme="teal"
                variant="outline"
                flex="1"
                onClick={reset}>
                Reset
              </Button>
              <Button
                colorScheme="teal"
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
    </Box>
  );
}

FlightBookerPage.propTypes = {
  routeConfig: shapes.routeConfig,
};

export default FlightBookerPage;
