import { useRef } from 'react';
import { useMachine } from '@xstate/react';
import { AnimatePresence } from 'framer-motion';
import { Box, Button, Stack, useColorMode } from '@chakra-ui/react';

import Circle from '../components/Circle/Circle';
import circlesMachine, {
  circlesActions,
  canUndo,
  canRedo,
  DEFAULT_DIAMETER,
} from '../machines/circles';
import PageHeader from '../components/PageHeader/PageHeader';
import * as shapes from '../commons/shapes';
import { boxWrapperStyles } from '../commons/enums';

function CirclesPage(props) {
  const { routeConfig } = props;
  const [current, send] = useMachine(circlesMachine);
  const { colorMode } = useColorMode();
  const {
    context,
    context: { circles },
  } = current;
  const canvasDivRef = useRef(null);

  function onCanvasClick(event) {
    const { current: canvasDiv } = canvasDivRef;

    if (!(canvasDiv && event.target === canvasDiv)) return;

    const canvasBoundingRect = canvasDiv.getBoundingClientRect();
    const { clientX = 0, clientY = 0 } = event;
    send({
      type: circlesActions.DRAW,
      x: clientX - canvasBoundingRect.x,
      y: clientY - canvasBoundingRect.y,
    });
  }

  return (
    <Box>
      <PageHeader routeConfig={routeConfig} />
      <Box maxW="lg" mx="auto">
        <Stack spacing="6" {...boxWrapperStyles}>
          <Box
            borderRadius="md"
            borderWidth="1px"
            h="240px"
            backgroundColor={colorMode === 'dark' ? 'gray.900' : 'gray.100'}
            borderColor={colorMode === 'dark' ? 'gray.400' : 'gray.200'}
            overflow="hidden"
            position="relative"
            onClick={onCanvasClick}
            ref={canvasDivRef}>
            <AnimatePresence>
              {circles.map((circle) => {
                return (
                  <Circle
                    key={circle.id}
                    circleRef={circle.ref}
                    defaultDiameter={DEFAULT_DIAMETER}
                  />
                );
              })}
            </AnimatePresence>
          </Box>
          <Stack direction="row" spacing="6" justify="center">
            <Button
              colorScheme="teal"
              flex="1"
              onClick={() => send(circlesActions.UNDO)}
              disabled={!canUndo(context)}>
              Undo
            </Button>
            <Button
              colorScheme="teal"
              flex="1"
              onClick={() => send(circlesActions.REDO)}
              disabled={!canRedo(context)}>
              Redo
            </Button>
            <Button
              colorScheme="teal"
              flex="1"
              variant="outline"
              onClick={() => send(circlesActions.RESET)}>
              Reset
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

CirclesPage.propTypes = {
  routeConfig: shapes.routeConfig,
};

export default CirclesPage;
