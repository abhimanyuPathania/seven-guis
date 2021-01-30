export const ROUTES = [
  {
    no: 1,
    name: 'counter',
    path: '/counter',
    label: 'Counter',
  },
  {
    no: 2,
    name: 'temperatureConverter',
    path: '/temperature-converter',
    label: 'Temperature Converter',
  },
  {
    no: 3,
    name: 'flightBooker',
    path: '/flight-booker',
    label: 'Flight Booker',
  },
  {
    no: 4,
    name: 'timer',
    path: '/timer',
    label: 'Timer',
  },
];

export const ROUTES_MAP = Object.fromEntries(
  ROUTES.map((route) => [route.name, route.path]),
);
