import { Machine, assign, sendParent } from 'xstate';

export const circleActions = {
  RESIZE: 'RESIZE',
  VIEW: 'VIEW',
  UPDATE_DIAMETER: 'UPDATE_DIAMETER',
};

export const createCircleMachine = ({ x, y, diameter, id }) =>
  Machine(
    {
      id: 'circle',
      initial: 'viewing',
      context: {
        x,
        y,
        id,
        diameter,
      },
      states: {
        viewing: {
          on: {
            [circleActions.RESIZE]: 'resizing',
          },
        },
        resizing: {
          on: {
            [circleActions.VIEW]: 'viewing',
            [circleActions.UPDATE_DIAMETER]: {
              actions: 'updateDiameter',
            },
          },
        },
      },
    },
    {
      actions: {
        updateDiameter: assign({
          diameter: (_, event) => event.value,
        }),
      },
    },
  );
