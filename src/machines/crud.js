import { Machine, assign } from 'xstate';

const storageKey = 'crudXstate';
export const crudActions = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  SEARCH: 'SEARCH',
  SELECT_RECORD: 'SELECT_RECORD',
  CLEAR_SELECT_RECORD: 'CLEAR_SELECT_RECORD',
  SET_FIRSTNAME: 'SET_FIRSTNAME',
  SET_LASTNAME: 'SET_LASTNAME',
};

export function getNameObj({ firstName, lastName }) {
  return {
    firstName,
    lastName,
    id: new Date().getTime(),
  };
}

function getRecordById(context, recordId) {
  return context.records.find((record) => record.id === recordId);
}

export function canCreate(context) {
  return context.firstName && context.lastName;
}

export function canDelete(context) {
  return Boolean(context.selectedRecordId);
}

export function canUpdate(context) {
  const { selectedRecordId, firstName, lastName } = context;
  const record = getRecordById(context, selectedRecordId);

  return (
    selectedRecordId &&
    firstName &&
    lastName &&
    (firstName !== record.firstName || lastName !== record.lastName)
  );
}

export function getSearchedRecords(records, searchInput) {
  return records.filter((record) => {
    return (
      record.firstName.toLowerCase().includes(searchInput) ||
      record.lastName.toLowerCase().includes(searchInput)
    );
  });
}

const crudMachine = Machine(
  {
    id: 'crud',
    initial: 'initialize',
    context: {
      records: [],
      selectedRecordId: undefined,
      searchInput: '',
      firstName: '',
      lastName: '',
    },
    states: {
      initialize: {
        entry: 'getRecordsFromStorage',
        always: 'active',
      },
      active: {
        always: {
          target: 'searching',
          cond: (context) => context.searchInput,
        },
      },
      searching: {
        always: {
          target: 'active',
          cond: (context) => !context.searchInput,
        },
      },
    },
    on: {
      [crudActions.CREATE]: {
        cond: 'canCreate',
        actions: [
          assign({
            records: (context, event) => [...context.records, event.value],
            firstName: '',
            lastName: '',
          }),
          'saveRecordsToStorage',
        ],
      },
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
      [crudActions.SELECT_RECORD]: {
        actions: assign({
          selectedRecordId: (_, event) => event.value,
          firstName: (context, event) =>
            getRecordById(context, event.value).firstName,
          lastName: (context, event) =>
            getRecordById(context, event.value).lastName,
        }),
      },
      [crudActions.CLEAR_SELECT_RECORD]: {
        actions: assign({
          selectedRecordId: undefined,
          firstName: '',
          lastName: '',
        }),
      },
      [crudActions.UPDATE]: {
        cond: 'canUpdate',
        actions: [
          assign({
            records: (context, event) => {
              const updatedRecordData = event.value;
              const { selectedRecordId } = updatedRecordData;
              const record = getRecordById(context, selectedRecordId);

              record.firstName = updatedRecordData.firstName;
              record.lastName = updatedRecordData.lastName;
              return [...context.records];
            },
          }),
          'saveRecordsToStorage',
        ],
      },
      [crudActions.DELETE]: {
        cond: 'canDelete',
        actions: [
          assign({
            records: (context, event) =>
              context.records.filter((record) => record.id !== event.value),
            firstName: '',
            lastName: '',
            selectedRecordId: undefined,
          }),
          'saveRecordsToStorage',
        ],
      },
    },
  },
  {
    actions: {
      handleSearch: assign({
        searchInput: (_, event) => event.value,
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
      canDelete,
      canUpdate,
    },
  },
);

export default crudMachine;
