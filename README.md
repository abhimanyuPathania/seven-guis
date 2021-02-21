# Seven GUIs

7 GUIs is a popular list of seven user interface development tasks. These tasks try to cover many challenges faced in UI development. The tasks are taken from [here](https://eugenkiss.github.io/7guis/).

## Demo

Webapp can be accessed here: [https://seven-guis.netlify.app/](https://seven-guis.netlify.app/)

## Goal

Explore finite state machines for building reactive UIs. [XState](1) is a popular library that that implements finite state machines and statecharts in JavaScript. It adheres to the State Chart XML(SCXML) specification.

## Implementation

Tasks were implemented as a React based web app. State management was offloaded to XState state machines. UI is built using Chakra's component library.

- [React](2): UI framework
- [XState](1): State management
- [Chakra](3): Component library

## Key Results

State machines encapsulate entire business and even UI logic for the applications. State machines are re-usable and can be used with any UI framework.

**In this React implementation, `setState` was used zero times.**

State machines drive the entire functionality and React becomes purely a UI layer. Although, there is considerable learning curve involved.

[1]: https://xstate.js.org/docs/
[2]: https://reactjs.org/
[3]: https://chakra-ui.com/
