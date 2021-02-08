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
              const ref = spawn(createCircleMachine(newCircle));

              return {
                circles: circles.concat({
                  id: newCircle.id,
                  ref,
                }),
                commands: commands.concat({
                  type: circlesActions.DRAW,
                  id: newCircle.id,
                  ref,
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
              {
                cond: 'shouldUndoDraw',
                actions: ['undoDrawCircle', 'consumeUndoCommand'],
              },
              {
                cond: 'shouldUndoUpdateDiameter',
                actions: ['undoUpdateDiameter'],
              },
            ]),
          },
          [circlesActions.REDO]: {
            cond: 'canRedo',
            actions: actions.choose([
              { cond: 'shouldRedoDraw', actions: 'redoDrawCircle' },
              {
                cond: 'shouldRedoUpdateDiameter',
                actions: 'redoUpdateDiameter',
              },
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
      consumeUndoCommand: assign((context) => {
        const { commands, commandsToRedo } = context;
        const commandToUndo = commands[commands.length - 1];
        return {
          commands: commands.slice(0, commands.length - 1),
          commandsToRedo: commandsToRedo.concat(commandToUndo),
        };
      }),
      applyRedoUpdateDiameterCommand: assign((context) => {
        const { commands, commandsToRedo } = context;
        const commandToRedo = commandsToRedo[commandsToRedo.length - 1];

        return {
          commands: commands.concat(commandToRedo),
          commandsToRedo: commandsToRedo.slice(0, commandsToRedo.length - 1),
        };
      }),
      undoDrawCircle: assign((context) => {
        const { circles } = context;
        return {
          circles: circles.slice(0, circles.length - 1),
        };
      }),
      redoDrawCircle: assign((context) => {
        const { commands, circles, commandsToRedo } = context;
        const commandToRedo = commandsToRedo[commandsToRedo.length - 1];
        const { id, ref } = commandToRedo;

        return {
          circles: circles.concat({
            id,
            ref,
          }),
          commands: commands.concat({
            type: circlesActions.DRAW,
            id,
            ref,
          }),
          commandsToRedo: commandsToRedo.slice(0, commandsToRedo.length - 1),
        };
      }),
      undoUpdateDiameter: actions.pure((context) => {
        const { commands, circles } = context;
        const commandToUndo = commands[commands.length - 1];
        const circle = circles.find(
          (circle) => circle.id === commandToUndo.circleId,
        );
        return [
          send(circleActions.UNDO_UPDATE_DIAMETER, { to: circle.ref }),
          'consumeUndoCommand',
        ];
      }),
      redoUpdateDiameter: actions.pure((context) => {
        const { circles, commandsToRedo } = context;
        const commandToRedo = commandsToRedo[commandsToRedo.length - 1];
        const circle = circles.find(
          (circle) => circle.id === commandToRedo.circleId,
        );
        return [
          send(circleActions.REDO_UPDATE_DIAMETER, { to: circle.ref }),
          'applyRedoUpdateDiameterCommand',
        ];
      }),
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
