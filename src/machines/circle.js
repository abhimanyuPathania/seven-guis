import { Machine, assign, sendParent } from 'xstate';

export const createCircleMachine = ({ x, y, diameter, id }) =>
  Machine({
    id: 'circle',
    initial: 'viewing',
    context: {
      x,
      y,
      id,
      diameter,
    },
    states: {
      viewing: {},
      resizing: {},
    },
  });
