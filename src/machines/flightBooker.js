import { Machine, assign } from 'xstate';

export const flightBookerActions = {
  SET_TRAVEL_DATE: 'SET_TRAVEL_DATE',
  SET_RETURN_DATE: 'SET_RETURN_DATE',
  SET_TRIP_TYPE: 'SET_TRIP_TYPE',
  SUBMIT: 'SUBMIT',
  RESET: 'RESET',
};

export const TRIP_TYPES_LIST = [
  {
    value: 'oneWay',
    label: 'One Way Trip',
  },
  {
    value: 'return',
    label: 'Return Trip',
  },
];

export const TRIP_TYPES = Object.fromEntries(
  TRIP_TYPES_LIST.map((tripType) => [tripType.value, tripType.value]),
);

export function canSubmit(context) {
  if (context.tripType === TRIP_TYPES.oneWay) {
    return Boolean(context.travelDate);
  } else {
    return (
      context.travelDate &&
      context.returnDate &&
      context.returnDate >= context.travelDate
    );
  }
}

export function canSetReturnDate(context) {
  return context.tripType === TRIP_TYPES.return && context.travelDate;
}

const flightBookerMachine = Machine(
  {
    id: 'flightBooker',
    initial: 'editing',
    context: {
      travelDate: undefined,
      returnDate: undefined,
      tripType: TRIP_TYPES.oneWay,
    },
    states: {
      editing: {
        on: {
          [flightBookerActions.SET_TRAVEL_DATE]: {
            actions: assign({
              travelDate: (context, event) => event.value,
            }),
          },
          [flightBookerActions.SET_RETURN_DATE]: {
            actions: assign({
              returnDate: (context, event) => event.value,
            }),
            cond: 'canSetReturnDate',
          },
          [flightBookerActions.SET_TRIP_TYPE]: {
            actions: assign({
              tripType: (context, event) => event.value,
            }),
            cond: (context, event) =>
              Object.values(TRIP_TYPES).includes(event.value),
          },
          [flightBookerActions.SUBMIT]: {
            target: 'final',
            cond: 'canSubmit',
          },
          [flightBookerActions.RESET]: {
            actions: 'resetFlightBooker',
          },
        },
      },
      final: {
        on: {
          [flightBookerActions.RESET]: {
            actions: 'resetFlightBooker',
            target: 'editing',
          },
        },
      },
    },
  },
  {
    actions: {
      resetFlightBooker: assign(() => ({
        travelDate: undefined,
        returnDate: undefined,
        tripType: TRIP_TYPES.oneWay,
      })),
    },
    guards: {
      canSubmit,
      canSetReturnDate,
    },
  },
);

export default flightBookerMachine;
