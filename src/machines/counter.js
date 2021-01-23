import { Machine, assign } from 'xstate';

export const counterActions = {
  INCREMENT: 'INCREMENT',
  RESET: 'RESET',
};

const counterMachine = Machine({
  id: 'counter',
  initial: 'active',
  context: {
    count: 0,
  },
  states: {
    active: {
      on: {
        [counterActions.INCREMENT]: {
          actions: assign({ count: (context) => context.count + 1 }),
        },
        [counterActions.RESET]: {
          actions: assign({ count: () => 0 }),
        },
      },
    },
  },
});

export default counterMachine;
