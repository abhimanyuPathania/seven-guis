import { Machine, assign } from 'xstate';

const storageKey = 'crudXstate';

const getNameObj = ({ firstName, lastName }) => {
  return {
    firstName,
    lastName,
    id: new Date().getTime(),
  };
};

export const crudActions = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  SEARCH: 'SEARCH',
  SET_FIRSTNAME: 'SET_FIRSTNAME',
  SET_LASTNAME: 'SET_LASTNAME',
};

export function canCreate(context) {
  return context.firstName && context.lastName;
}

export function canUpdateOrDelete(context) {
  return Boolean(context.selectedRecordId);
}

const crudMachine = Machine(
  {
    id: 'crud',
    initial: 'initialize',
    context: {
      records: [],
      searchedRecords: [],
      selectedRecordId: undefined,
      searchInput: '',
      firstName: '',
      lastName: '',
    },
    states: {
      initialize: {
        entry: 'getRecordsFromStorage',
        on: {
          '': 'active',
        },
      },
      active: {
        on: {
          '': {
            target: 'searching',
            cond: (context) => context.searchInput,
          },
          [crudActions.CREATE]: {
            cond: 'canCreate',
            actions: [
              assign({
                records: (context) => {
                  const { firstName, lastName } = context;
                  const newRecord = getNameObj({ firstName, lastName });
                  return [...context.records, newRecord];
                },
                firstName: '',
                lastName: '',
              }),
              'saveRecordsToStorage',
            ],
          },
        },
      },
      searching: {
        on: {
          '': {
            target: 'active',
            cond: (context) => !context.searchInput,
          },
        },
      },
    },
    on: {
      [crudActions.SEARCH]: {
        actions: ['handleSearch'],
      },
      [crudActions.SET_FIRSTNAME]: {
        actions: assign({
          firstName: (_, event) => event.value,
        }),
      },
      [crudActions.SET_LASTNAME]: {
        actions: assign({
          lastName: (_, event) => event.value,
        }),
      },
    },
  },
  {
    actions: {
      handleSearch: assign({
        searchInput: (_, event) => event.value,
        searchedRecords: (context, event) =>
          context.records.filter((record) => {
            const searchInput = event.value;
            return (
              record.firstName.includes(searchInput) ||
              record.lastName.includes(searchInput)
            );
          }),
      }),
      getRecordsFromStorage: assign({
        records: () => {
          const recordsJson = localStorage.getItem(storageKey);
          let records;

          if (recordsJson) {
            records = JSON.parse(recordsJson);
          } else {
            records = [];
          }
          return records;
        },
      }),
      saveRecordsToStorage: (context) => {
        localStorage.setItem(storageKey, JSON.stringify(context.records));
      },
    },
    guards: {
      canCreate,
      canUpdateOrDelete,
    },
  },
);

export default crudMachine;
