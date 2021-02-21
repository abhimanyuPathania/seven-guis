import { useMachine } from '@xstate/react';
import {
  Box,
  Button,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Flex,
  useStyleConfig,
} from '@chakra-ui/react';

import CurdRecord from '../components/CrudRecord/CrudRecord';
import crudMachine, {
  crudActions,
  canCreate,
  canDelete,
  canUpdate,
  getSearchedRecords,
  getNameObj,
} from '../machines/crud';
import PageHeader from '../components/PageHeader/PageHeader';
import * as shapes from '../commons/shapes';
import { boxWrapperStyles } from '../commons/enums';

function CrudPage(props) {
  const { routeConfig } = props;
  const [current, send] = useMachine(crudMachine, { devTools: true });
  const tealButtonStyles = useStyleConfig('Button', { colorScheme: 'teal' });

  const {
    value: currentState,
    context,
    context: { firstName, lastName, searchInput, records, selectedRecordId },
  } = current;
  const recordsToRender =
    currentState === 'searching'
      ? getSearchedRecords(records, searchInput)
      : records;

  function onRecordClick(recordId) {
    if (recordId === selectedRecordId) {
      send({ type: crudActions.CLEAR_SELECT_RECORD });
      return;
    }
    send({ type: crudActions.SELECT_RECORD, value: recordId });
  }

  return (
    <Box>
      <PageHeader routeConfig={routeConfig} />
      <Box maxW="xl" mx="auto">
        <Stack spacing="4" {...boxWrapperStyles}>
          <FormControl id="search">
            <FormLabel>Search</FormLabel>
            <Input
              name="searchInput"
              placeholder="Search"
              value={searchInput}
              onChange={(e) =>
                send({ type: crudActions.SEARCH, value: e.target.value })
              }
            />
          </FormControl>
          <Flex direction={{ base: 'column', sm: 'row' }}>
            <Stack flex="1" spacing="4" marginBottom={{ base: 4, sm: 0 }}>
              <FormControl id="firstName">
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstName"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) =>
                    send({
                      type: crudActions.SET_FIRSTNAME,
                      value: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastName"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) =>
                    send({
                      type: crudActions.SET_LASTNAME,
                      value: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Stack>

            <Stack
              spacing="0"
              flex="1"
              order={{ base: 0, sm: -1 }}
              marginRight={{ base: 0, sm: 4 }}
              borderWidth="1px"
              height="200px"
              borderRadius="md"
              py="3">
              {recordsToRender.map((record) => (
                <CurdRecord
                  record={record}
                  key={record.id}
                  onClick={onRecordClick}
                  py="1"
                  px="3"
                  backgroundColor={
                    selectedRecordId === record.id
                      ? tealButtonStyles.bg
                      : undefined
                  }
                  color={
                    selectedRecordId === record.id
                      ? tealButtonStyles.color
                      : undefined
                  }
                  cursor="pointer"
                />
              ))}
            </Stack>
          </Flex>

          <Stack direction="row" spacing="4">
            <Button
              colorScheme="teal"
              flex="1"
              onClick={() =>
                send({
                  type: crudActions.CREATE,
                  value: getNameObj({ firstName, lastName }),
                })
              }
              disabled={!canCreate(context)}>
              Create
            </Button>
            <Button
              colorScheme="teal"
              flex="1"
              onClick={() =>
                send({
                  type: crudActions.UPDATE,
                  value: { firstName, lastName, selectedRecordId },
                })
              }
              disabled={!canUpdate(context)}>
              Update
            </Button>
            <Button
              colorScheme="teal"
              flex="1"
              variant="outline"
              onClick={() =>
                send({ type: crudActions.DELETE, value: selectedRecordId })
              }
              disabled={!canDelete(context)}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

CrudPage.propTypes = {
  routeConfig: shapes.routeConfig,
};

export default CrudPage;
