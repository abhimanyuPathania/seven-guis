import { useMachine } from '@xstate/react';
import {
  Box,
  Button,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Flex,
} from '@chakra-ui/react';

import temperatureConverterMachine, {
  temperatureConverterActions,
} from '../machines/temperatureConverter';

export default function TemperatureConverterPage() {
  const [current, send] = useMachine(temperatureConverterMachine);

  function handleCelsiusInput(e) {
    const celsius = e.target.value;
    send({
      type: temperatureConverterActions.CELSIUS_INPUT,
      value: celsius,
    });
  }

  function handleFarenheitInput(e) {
    const farenheit = e.target.value;
    send({
      type: temperatureConverterActions.FARENHEIT_INPUT,
      value: farenheit,
    });
  }

  return (
    <Box>
      <Heading>2. Temperature Converter</Heading>
      <Stack direction="row" spacing="4">
        <FormControl id="celsius">
          <FormLabel>Celsius</FormLabel>
          <Input
            placeholder="Celsius"
            type="number"
            value={current.context.celsius}
            onChange={handleCelsiusInput}
          />
        </FormControl>
        <FormControl id="farenheit">
          <FormLabel>Farenheit</FormLabel>
          <Input
            placeholder="Farenheit"
            type="number"
            value={current.context.farenheit}
            onChange={handleFarenheitInput}
          />
        </FormControl>
      </Stack>
      <Flex mt="4">
        <Button
          size="md"
          colorScheme="teal"
          onClick={() => send(temperatureConverterActions.RESET)}>
          Reset
        </Button>
      </Flex>
    </Box>
  );
}
