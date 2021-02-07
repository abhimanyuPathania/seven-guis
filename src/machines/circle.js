import { Machine, assign, sendParent } from 'xstate';

export const circleActions = {
  RESIZE: 'RESIZE',
  UPDATE_DIAMETER: 'UPDATE_DIAMETER',
  UPDATE_DIAMETER_END: 'UPDATE_DIAMETER_END',
  UNDO_UPDATE_DIAMETER: 'UNDO_UPDATE_DIAMETER',
};

export const createCircleMachine = ({ x, y, diameter, id }) =>
  Machine(
    {
      id,
      initial: 'viewing',
      context: {
        x,
        y,
        id,
        diameter,
        diameterHistory: [diameter],
      },
      states: {
        viewing: {
          on: {
            [circleActions.RESIZE]: 'resizing',
            [circleActions.UNDO_UPDATE_DIAMETER]: {
              actions: assign((context) => {
                const { diameterHistory } = context;
                diameterHistory.pop();
                return {
                  diameter: diameterHistory[diameterHistory.length - 1],
                  diameterHistory: [...diameterHistory],
                };
              }),
            },
          },
        },
        resizing: {
          on: {
            [circleActions.UPDATE_DIAMETER]: {
              actions: ['updateDiameter'],
            },
            [circleActions.UPDATE_DIAMETER_END]: [
              { target: 'updateHistory', cond: 'shouldUpdateDiameterHistory' },
              { target: 'viewing' },
            ],
          },
        },
        updateHistory: {
          entry: ['updateDiameterHistory', 'notifyCircleParent'],
          always: 'viewing',
        },
      },
    },
    {
      actions: {
        updateDiameter: assign({
          diameter: (_, event) => event.value,
        }),
        updateDiameterHistory: assign({
          diameterHistory: (context) => {
            const { diameterHistory, diameter } = context;
            return [...diameterHistory, diameter];
          },
        }),
        notifyCircleParent: sendParent({
          type: circleActions.UPDATE_DIAMETER,
          id,
        }),
      },
      guards: {
        shouldUpdateDiameterHistory: (context) => {
          const { diameterHistory, diameter } = context;
          const previousDiameter = diameterHistory[diameterHistory.length - 1];
          return previousDiameter !== diameter;
        },
      },
    },
  );
