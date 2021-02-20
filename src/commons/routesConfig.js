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
    externalLink: 'https://eugenkiss.github.io/7guis/tasks#temp',
    citation: (
      <Fragment>
        <Text as="i">
          Challenges: bidirectional data flow, user-provided text input.
        </Text>
        <Text mt="4">
          The task is to build a frame containing two textfields TC and TF
          representing the temperature in Celsius and Fahrenheit, respectively.
          Initially, both TC and TF are empty. When the user enters a numerical
          value into TC the corresponding value in TF is automatically updated
          and vice versa. When the user enters a non-numerical string into TC
          the value in TF is not updated and vice versa. The formula for
          converting a temperature C in Celsius into a temperature F in
          Fahrenheit is C = (F - 32) * (5/9) and the dual direction is F = C *
          (9/5) + 32.
        </Text>
      </Fragment>
    ),
  },
  {
    no: 3,
    name: 'flightBooker',
    path: '/flight-booker',
    label: 'Flight Booker',
    component: FlightBookerPage,
    externalLink: 'https://eugenkiss.github.io/7guis/tasks#flight',
    citation: (
      <Fragment>
        <Text as="i">Challenge: Constraints.</Text>
        <Text mt="4">
          The task is to build a frame containing a combobox C with the two
          options “one-way flight” and “return flight”, two textfields T1 and T2
          representing the start and return date, respectively, and a button B
          for submitting the selected flight. T2 is enabled iff C’s value is
          “return flight”.
        </Text>
      </Fragment>
    ),
  },
  {
    no: 4,
    name: 'timer',
    path: '/timer',
    label: 'Timer',
    component: TimerPage,
    externalLink: 'https://eugenkiss.github.io/7guis/tasks#timer',
    citation: (
      <Fragment>
        <Text as="i">
          Challenges: concurrency, competing user/signal interactions,
          responsiveness.
        </Text>
        <Text mt="4">
          The task is to build a frame containing a gauge G for the elapsed time
          e, a label which shows the elapsed time as a numerical value, a slider
          S by which the duration d of the timer can be adjusted while the timer
          is running and a reset button R. Adjusting S must immediately reflect
          on d and not only when S is released. It follows that while moving S
          the filled amount of G will (usually) change immediately. When e ≥ d
          is true then the timer stops (and G will be full). If, thereafter, d
          is increased such that d &gt; e will be true then the timer restarts
          to tick until e ≥ d is true again. Clicking R will reset e to zero.
        </Text>
      </Fragment>
    ),
  },
  {
    no: 5,
    name: 'crud',
    path: '/crud',
    label: 'CRUD',
    component: CrudPage,
    externalLink: 'https://eugenkiss.github.io/7guis/tasks#crud',
    citation: (
      <Fragment>
        <Text as="i">
          Challenges: separating the domain and presentation logic, managing
          mutation, building a non-trivial layout.
        </Text>
        <Text mt="4">
          The task is to build a frame containing the following elements: a
          textfield Tprefix, a pair of textfields Tname and Tsurname, a listbox
          L, buttons BC, BU and BD and the three labels as seen in the
          screenshot. L presents a view of the data in the database that
          consists of a list of names. At most one entry can be selected in L at
          a time.
        </Text>
        <Text mt="4">
          By entering a string into Tprefix the user can filter the names whose
          surname start with the entered prefix—this should happen immediately
          without having to submit the prefix with enter. Clicking BC will
          append the resulting name from concatenating the strings in Tname and
          Tsurname to L. BU and BD are enabled iff an entry in L is selected. In
          contrast to BC, BU will not append the resulting name but instead
          replace the selected entry with the new name. BD will remove the
          selected entry. L presents a view of the data in the database that
          consists of a list of names.
        </Text>
      </Fragment>
    ),
  },
  {
    no: 6,
    name: 'circles',
    path: '/circle-drawer',
    label: 'Circle Drawer',
    component: CirclesPage,
    externalLink: 'https://eugenkiss.github.io/7guis/tasks#circle',
    citation: (
      <Fragment>
        <Text as="i">
          Challenges: undo/redo, custom drawing, dialog control.
        </Text>
        <Text mt="4">
          The task is to build a frame containing an undo and redo button as
          well as a canvas area underneath. Left-clicking inside an empty area
          inside the canvas will create an unfilled circle with a fixed diameter
          whose center is the left-clicked point. The circle nearest to the
          mouse pointer such that the distance from its center to the pointer is
          less than its radius, if it exists, is filled with the color gray. The
          gray circle is the selected circle C. Right-clicking C will make a
          popup menu appear with one entry “Adjust diameter..”. Clicking on this
          entry will open another frame with a slider inside that adjusts the
          diameter of C. Changes are applied immediately.
        </Text>
        <Text mt="4">
          Closing this frame will mark the last diameter as significant for the
          undo/redo history. Clicking undo will undo the last significant change
          (i.e. circle creation or diameter adjustment). Clicking redo will
          reapply the last undoed change unless new changes were made by the
          user in the meantime.
        </Text>
      </Fragment>
    ),
  },
  {
    no: 7,
    name: 'cells',
    path: '/cells',
    label: 'Cells',
    component: CellsPage,
    externalLink: 'https://eugenkiss.github.io/7guis/tasks#cells',
    citation: (
      <Fragment>
        <Text as="i">
          Challenges: change propagation, widget customization, implementing a
          more authentic/involved GUI application.
        </Text>
        <Text mt="4">
          The task is to create a simple but usable spreadsheet application. The
          spreadsheet should be scrollable. The rows should be numbered from 0
          to 99 and the columns from A to Z. Double-clicking a cell C lets the
          user change C’s formula. After having finished editing the formula is
          parsed and evaluated and its updated value is shown in C.
        </Text>
        <Text mt="4">
          In addition, all cells which depend on C must be reevaluated. This
          process repeats until there are no more changes in the values of any
          cell (change propagation). Note that one should not just recompute the
          value of every cell but only of those cells that depend on another
          cell’s changed value.
        </Text>
      </Fragment>
    ),
  },
];
