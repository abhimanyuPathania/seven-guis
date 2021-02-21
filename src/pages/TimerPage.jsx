import { useMachine } from '@xstate/react';
import {
  Box,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Progress,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from '@chakra-ui/react';

import timerMachine, { timerActions } from '../machines/timer';
import PageHeader from '../components/PageHeader/PageHeader';
import * as shapes from '../commons/shapes';
import { boxWrapperStyles } from '../commons/enums';

function TimerPage(props) {
  const { routeConfig } = props;
  const [current, send] = useMachine(timerMachine);
  const { context } = current;
  const { targetTime, timeElapsed } = context;
  const timeElapsedPercent = parseInt((timeElapsed / targetTime) * 100);
  const timerText = `${timeElapsed.toFixed(1)}s / ${targetTime.toFixed(1)}s`;

  return (
    <Box>
      <PageHeader routeConfig={routeConfig} />
      <Stack spacing="6" {...boxWrapperStyles}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          letterSpacing={2}
          py="2"
          textAlign="center"
          borderWidth="2px"
          borderColor="teal.300"
          borderRadius="md">
          {timerText}
        </Text>
        <Box>
          <Progress
            value={timeElapsedPercent}
            hasStripe
            colorScheme="teal"
            borderRadius="sm"
          />
        </Box>
        <FormControl>
          <FormLabel>Set duration:</FormLabel>
          <Slider
            aria-label="timer-slider"
            defaultValue={targetTime}
            colorScheme="teal"
            min={0}
            max={30}
            onChange={(sliderValue) => {
              send({ type: timerActions.UPDATE_TARGET, value: sliderValue });
            }}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>
        <Box>
          <Button
            colorScheme="teal"
            onClick={() => send({ type: timerActions.RESET })}>
            Reset
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

TimerPage.propTypes = {
  routeConfig: shapes.routeConfig,
};

export default TimerPage;
