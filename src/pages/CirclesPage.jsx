import { useRef, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { AnimatePresence } from 'framer-motion';
import { Box, Button, Stack, Heading } from '@chakra-ui/react';

import Circle from '../components/Circle/Circle';
import circlesMachine, {
  circlesActions,
  canUndo,
  canRedo,
  DEFAULT_DIAMETER,
} from '../machines/circles';

export default function CirclesPage() {
  const [current, send] = useMachine(circlesMachine);
  const {
    context,
    context: { circles },
  } = current;
  const canvasDivRef = useRef(null);
  const canvasBoundingRef = useRef(null);

  useEffect(() => {
    if (!canvasDivRef.current || canvasBoundingRef.current) return;
    canvasBoundingRef.current = canvasDivRef.current.getBoundingClientRect();
  }, []);

  console.log('context', current.context);

  function onCanvasClick(event) {
    const { current: canvasBoundingRect } = canvasBoundingRef;
    const { current: canvasDiv } = canvasDivRef;

    if (!(canvasBoundingRect && canvasDiv && event.target === canvasDiv))
      return;

    // relative to canvas div
    const { clientX = 0, clientY = 0 } = event;
    send({
      type: circlesActions.DRAW,
      x: clientX - canvasBoundingRect.x,
      y: clientY - canvasBoundingRect.y,
    });
  }

  return (
    <Box maxW="lg" mx="auto">
      <Heading mb="6">6. Circle Drawer</Heading>
      <Stack spacing="6" borderWidth="1px" padding="4" borderRadius="md">
        <Box
          borderRadius="md"
          borderWidth="1px"
          h="240px"
          backgroundColor="gray.900"
          borderColor="gray.400"
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
  );
}
