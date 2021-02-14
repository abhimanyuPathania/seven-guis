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
  SimpleGrid,
} from '@chakra-ui/react';

import cellsMachine from '../machines/cells';
import Cell from '../components/Cell/Cell';

export default function CellsPage() {
  const [state, send] = useMachine(cellsMachine);
  const {
    context: { cells },
  } = state;
  console.log('cells', cells);

  function renderCells() {
    const cellComponents = [];

    Object.values(cells).forEach((row) => {
      const cellsInRow = Object.values(row);
      cellsInRow.forEach((cell) => {
        const cellKey = `${cell.row}${cell.column}`;
        const cellComponent = <Cell key={cellKey} cell={cell} />;
        cellComponents.push(cellComponent);
      });
    });

    return cellComponents;
  }

  return (
    <Box maxW="2xl" mx="auto" borderColor="red.200" borderWidth="1px" p="2">
      <Heading mb="6">7. Cells</Heading>
      <Box borderColor="gray.200" borderWidth="1px" mt="2" py="2">
        <SimpleGrid
          // w="600px"
          h="400px"
          templateColumns="repeat(10, 90px)"
          templateRows="repeat(10, 35px)"
          overflowX="scroll">
          {renderCells()}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
