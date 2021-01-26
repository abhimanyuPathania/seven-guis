import { Machine, assign } from 'xstate';

export const temperatureConverterActions = {
  CELSIUS_INPUT: 'CELSIUS_INPUT',
  FARENHEIT_INPUT: 'FARENHEIT_INPUT',
  RESET: 'RESET',
};

function formatTemperature(temperature) {
  return temperature.toFixed();
}

function celsiusToFarenheit(celsius) {
  const celsiusValue = parseFloat(celsius);
  const farenheit = celsiusValue * (9 / 5) + 32;
  return formatTemperature(farenheit);
}

function farenheitToCelsius(farenheit) {
  const farenheitValue = parseFloat(farenheit);
  const celsius = (farenheitValue - 32) * (5 / 9);
  return formatTemperature(celsius);
}

const temperatureConverterMachine = Machine({
  id: 'temperatureConverter',
  initial: 'active',
  context: {
    celsius: '',
    farenheit: '',
  },
  states: {
    active: {
      on: {
        [temperatureConverterActions.CELSIUS_INPUT]: {
          actions: assign({
            celsius: (context, event) => event.value,
            farenheit: (context, event) => {
              const input = event.value;

              if (input === '') {
                return '';
              } else {
                return celsiusToFarenheit(event.value);
              }
            },
          }),
        },
        [temperatureConverterActions.FARENHEIT_INPUT]: {
          actions: assign({
            farenheit: (context, event) => event.value,
            celsius: (context, event) => {
              const input = event.value;

              if (input === '') {
                return '';
              } else {
                return farenheitToCelsius(event.value);
              }
            },
          }),
        },
        [temperatureConverterActions.RESET]: {
          actions: assign({
            celsius: '',
            farenheit: '',
          }),
        },
      },
    },
  },
});

export default temperatureConverterMachine;
