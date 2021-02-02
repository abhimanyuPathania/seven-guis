import { Machine, assign, spawn } from 'xstate';

import { createCircleMachine } from './circle';

const DEFAULT_DIAMETER = 40; // px
export const circlesActions = {
  DRAW: 'DRAW',
  RESET: 'RESET',
};

function createCircle({ x, y }) {
  return {
    x,
    y,
    diameter: DEFAULT_DIAMETER,
    id: new Date().getTime(),
  };
}

const circlesMachine = Machine({
  id: 'circles',
  initial: 'active',
  context: {
    circles: [],
  },
  states: {
    active: {
      on: {
        [circlesActions.DRAW]: {
          actions: assign({
            circles: (context, event) => {
              const { x, y } = event;
              const newCircle = createCircle({ x, y });
              return context.circles.concat({
                ...newCircle,
                ref: spawn(createCircleMachine(newCircle)),
              });
            },
          }),
        },
        [circlesActions.RESET]: {
          actions: assign({ count: () => 0 }),
        },
      },
    },
  },
});

export default circlesMachine;
