import { Fragment } from 'react';
import { Text } from '@chakra-ui/react';

import CounterPage from '../pages/CounterPage';
import TemperatureConverterPage from '../pages/TemperatureConverterPage';
import FlightBookerPage from '../pages/FlightBookerPage';
import TimerPage from '../pages/TimerPage';
import CrudPage from '../pages/CrudPage';
import CirclesPage from '../pages/CirclesPage';
import CellsPage from '../pages/CellsPage';

export const ROUTES = [
  {
    no: 1,
    name: 'counter',
    path: '/counter',
    label: 'Counter',
    component: CounterPage,
    externalLink: 'https://eugenkiss.github.io/7guis/tasks#counter',
    citation: (
      <Fragment>
        <Text as="i">
          Challenge: Understanding the basic ideas of a language/toolkit.
        </Text>
        <Text mt="4">
          The task is to build a frame containing a label or read-only textfield
          T and a button B. Initially, the value in T is “0” and each click of B
          increases the value in T by one.
        </Text>
      </Fragment>
    ),
  },
  {
    no: 2,
    name: 'temperatureConverter',
    path: '/temperature-converter',
    label: 'Temperature Converter',
    component: TemperatureConverterPage,
  },
  {
    no: 3,
    name: 'flightBooker',
    path: '/flight-booker',
    label: 'Flight Booker',
    component: FlightBookerPage,
  },
  {
    no: 4,
    name: 'timer',
    path: '/timer',
    label: 'Timer',
    component: TimerPage,
  },
  {
    no: 5,
    name: 'crud',
    path: '/crud',
    label: 'CRUD',
    component: CrudPage,
  },
  {
    no: 6,
    name: 'circles',
    path: '/circle-drawer',
    label: 'Circle Drawer',
    component: CirclesPage,
  },
  {
    no: 7,
    name: 'cells',
    path: '/cells',
    label: 'Cells',
    component: CellsPage,
  },
];
