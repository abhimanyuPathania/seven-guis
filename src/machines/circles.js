import { Machine, assign, spawn } from 'xstate';

import { createCircleMachine } from './circle';

export const DEFAULT_DIAMETER = 50; // px
export const circlesActions = {
  DRAW: 'DRAW',
  UNDO: 'UNDO',
  REDO: 'REDO',
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

export function canUndo(context) {
  return context.circles.length > 0;
}

export function canRedo(context) {
  return context.redoCircles.length > 0;
}

const circlesMachine = Machine(
  {
    id: 'circles',
    initial: 'active',
    context: {
      circles: [],
      redoCircles: [],
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
                  id: newCircle.id,
                  ref: spawn(createCircleMachine(newCircle)),
                });
              },
              redoCircles: [],
            }),
          },
          [circlesActions.UNDO]: {
            cond: 'canUndo',
            actions: [
              assign({
                redoCircles: (context) =>
                  context.redoCircles.concat(
                    context.circles[context.circles.length - 1],
                  ),
              }),
              assign({
                circles: (context) =>
                  context.circles.slice(0, context.circles.length - 1),
              }),
            ],
          },
          [circlesActions.REDO]: {
            cond: 'canRedo',
            actions: [
              assign({
                circles: (context) =>
                  context.circles.concat(
                    context.redoCircles[context.redoCircles.length - 1],
                  ),
              }),
              assign({
                redoCircles: (context) =>
                  context.redoCircles.slice(0, context.redoCircles.length - 1),
              }),
            ],
          },
          [circlesActions.RESET]: {
            actions: assign({ circles: [], redoCircles: [] }),
          },
        },
      },
    },
  },
  {
    guards: {
      canUndo,
      canRedo,
    },
  },
);

export default circlesMachine;
