import { Machine, assign, spawn, send, actions } from 'xstate';

import { createCircleMachine } from './circle';
import { circleActions } from './circle';

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
  return context.commands.length > 0;
}

export function canRedo(context) {
  return context.commandsToRedo.length > 0;
}

const circlesMachine = Machine(
  {
    id: 'circles',
    initial: 'active',
    context: {
      circles: [],
      commands: [],
      commandsToRedo: [],
    },
    states: {
      active: {
        on: {
          [circlesActions.DRAW]: {
            actions: assign((context, event) => {
              const { commands, circles } = context;
              const { x, y } = event;
              const newCircle = createCircle({ x, y });

              return {
                circles: circles.concat({
                  id: newCircle.id,
                  ref: spawn(createCircleMachine(newCircle)),
                }),
                commands: commands.concat({
                  type: circlesActions.DRAW,
                  x,
                  y,
                }),
              };
            }),
          },
          [circleActions.UPDATE_DIAMETER]: {
            actions: assign((context, event) => {
              return {
                commands: context.commands.concat({
                  type: circleActions.UPDATE_DIAMETER,
                  circleId: event.id,
                }),
              };
            }),
          },
          [circlesActions.UNDO]: {
            cond: 'canUndo',
            actions: actions.choose([
              { cond: 'shouldUndoDraw', actions: 'undoDrawCircle' },
              {
                cond: 'shouldUndoUpdateDiameter',
                actions: 'undoUpdateDiameter',
              },
            ]),
          },
          [circlesActions.REDO]: {
            cond: 'canRedo',
            actions: actions.choose([
              { cond: 'shouldRedoDraw', actions: 'undoDrawCircle' },
              // {
              //   cond: 'shouldUndoUpdateDiameter',
              //   actions: 'undoUpdateDiameter',
              // },
            ]),
          },
          [circlesActions.RESET]: {
            actions: assign({ circles: [], commands: [], commandsToRedo: [] }),
          },
        },
      },
    },
  },
  {
    actions: {
      undoDrawCircle: assign((context) => {
        const { circles, commands, commandsToRedo } = context;
        const commandToUndo = commands[commands.length - 1];
        return {
          circles: circles.slice(0, circles.length - 1),
          commands: commands.slice(0, circles.length - 1),
          commandsToRedo: commandsToRedo.concat(commandToUndo),
        };
      }),
      redoCircles: assign((context) => {
        const { circles, redoCircles } = context;
        const circleToRedo = redoCircles[redoCircles.length - 1];
        return {
          circles: circles.concat(circleToRedo),
          // redoCircles: redoCircles.slice(0, redoCircles.length - 1),
        };
      }),
      // addCommandToRedo:
    },
    guards: {
      canUndo,
      canRedo,
      shouldUndoDraw: (context) =>
        context.commands[context.commands.length - 1].type ===
        circlesActions.DRAW,
      shouldUndoUpdateDiameter: (context) =>
        context.commands[context.commands.length - 1].type ===
        circleActions.UPDATE_DIAMETER,
      shouldRedoDraw: (context) =>
        context.commandsToRedo[context.commandsToRedo.length - 1].type ===
        circlesActions.DRAW,
      shouldRedoUpdateDiameter: (context) =>
        context.commandsToRedo[context.commandsToRedo.length - 1].type ===
        circleActions.UPDATE_DIAMETER,
    },
  },
);

export default circlesMachine;
