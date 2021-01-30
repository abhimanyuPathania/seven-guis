import { Machine, assign } from 'xstate';

export const timerActions = {
  TICK: 'TICK',
  RESET: 'RESET',
  UPDATE_TARGET: 'UPDATE_TARGET',
};

const timerMachine = Machine({
  id: 'timer',
  initial: 'running',
  context: {
    timeElapsed: 0,
    targetTime: 5,
    tickInterval: 100, // milliseconds
  },
  states: {
    running: {
      invoke: {
        id: 'ticker',
        src: (context, event) => (callback, onReceive) => {
          // This will send the 'TICK' event to the parent every second
          const id = setInterval(
            () => callback(timerActions.TICK),
            context.tickInterval,
          );

          // Perform cleanup
          return () => clearInterval(id);
        },
      },
      on: {
        [timerActions.TICK]: {
          actions: assign({
            timeElapsed: (context) => {
              const timeElapsed =
                context.timeElapsed + context.tickInterval / 1000;
              return parseFloat(timeElapsed.toFixed(2));
            },
          }),
        },
        '': {
          target: 'paused',
          cond: (context) => {
            return context.timeElapsed >= context.targetTime;
          },
        },
      },
    },
    paused: {
      on: {
        '': {
          target: 'running',
          cond: (context) => {
            return context.timeElapsed < context.targetTime;
          },
        },
      },
    },
  },
  on: {
    [timerActions.RESET]: {
      actions: assign({ timeElapsed: 0 }),
    },
    [timerActions.UPDATE_TARGET]: {
      actions: assign({
        targetTime: (_, event) => event.value,
      }),
    },
  },
});

export default timerMachine;
