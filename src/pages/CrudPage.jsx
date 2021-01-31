import { useMachine } from '@xstate/react';
import {
  Box,
  Button,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
} from '@chakra-ui/react';

import crudMachine, {
  crudActions,
  canCreate,
  canUpdateOrDelete,
} from '../machines/crud';

export default function CrudPage() {
  const [current, send] = useMachine(crudMachine);
  const {
    value: currentState,
    context,
    context: { firstName, lastName, searchInput },
  } = current;

  console.log('currentState', currentState);
  console.log('context', current.context);

  return (
    <Box>
      <Heading>5. CRUD</Heading>
      <Stack spacing="5">
        <Text>Current State: {currentState}</Text>
        <Input
          name="firstName"
          placeholder="First name"
          value={firstName}
          onChange={(e) =>
            send({ type: crudActions.SET_FIRSTNAME, value: e.target.value })
          }
        />
        <Input
          name="lastName"
          placeholder="Last name"
          value={lastName}
          onChange={(e) =>
            send({ type: crudActions.SET_LASTNAME, value: e.target.value })
          }
        />
        <Input
          name="searchInput"
          placeholder="Search"
          value={searchInput}
          onChange={(e) =>
            send({ type: crudActions.SEARCH, value: e.target.value })
          }
        />
        <Stack direction="row">
          <Button
            colorScheme="teal"
            onClick={() => send(crudActions.CREATE)}
            disabled={!canCreate(context)}>
            Create
          </Button>
          <Button
            colorScheme="teal"
            onClick={() => send(crudActions.UPDATE)}
            disabled={!canUpdateOrDelete(context)}>
            Update
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => send(crudActions.DELETE)}
            disabled={!canUpdateOrDelete(context)}>
            Delete
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
