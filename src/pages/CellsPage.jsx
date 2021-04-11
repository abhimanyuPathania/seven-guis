import { useMachine } from '@xstate/react';
import {
  Box,
  SimpleGrid,
  Flex,
  useColorMode,
  Text,
  Code,
} from '@chakra-ui/react';

import cellsMachine from '../machines/cells';
import Cell from '../components/Cell/Cell';
import { getColumnCode } from '../commons/cells';
import PageHeader from '../components/PageHeader/PageHeader';
import * as shapes from '../commons/shapes';

function CellsPage(props) {
  const { routeConfig } = props;
  const [state] = useMachine(cellsMachine);
  const { colorMode } = useColorMode();
  const {
    context: { cells, columns, rows },
  } = state;
  const cellWidth = 90;
  const cellHeight = 35;
  const cellBorderColor = colorMode === 'dark' ? 'gray.600' : 'gray.300';
  const headerBackgroundColor = colorMode === 'dark' ? 'gray.700' : 'gray.200';

  function renderColumnHeaders() {
    const columnHeaders = [];
    for (let c = 1; c <= columns; c += 1) {
      columnHeaders.push(
        <Flex
          width={cellWidth}
          key={c}
          flexShrink="0"
          backgroundColor={headerBackgroundColor}
          borderColor={cellBorderColor}
          borderWidth="1px"
          justify="center"
          align="center"
          fontWeight="bold">
          {getColumnCode(c)}
        </Flex>,
      );
    }
    return columnHeaders;
  }

  function renderRowHeaders() {
    const columnHeaders = [];
    // render one extra row
    for (let r = 0; r <= rows; r += 1) {
      columnHeaders.push(
        <Flex
          width="50px"
          height={cellHeight}
          key={r}
          backgroundColor={headerBackgroundColor}
          borderColor={cellBorderColor}
          borderWidth="1px"
          justify="center"
          align="center"
          fontWeight="bold">
          {r > 0 ? r : ' '}
        </Flex>,
      );
    }
    return columnHeaders;
  }

  function renderCells() {
    if (!cells) return null;

    const cellComponents = [];
    Object.values(cells).forEach((row) => {
      const cellsInRow = Object.values(row);
      cellsInRow.forEach((cell) => {
        const cellKey = `${cell.row}${cell.column}`;
        const cellComponent = (
          <Cell key={cellKey} cell={cell} cellBorderColor={cellBorderColor} />
        );
        cellComponents.push(cellComponent);
      });
    });
    return cellComponents;
  }

  return (
    <Box>
      <PageHeader routeConfig={routeConfig} />
      <Text mb="4" fontSize="sm">
        <Text as="span" fontWeight="bold">
          Supported formulas
        </Text>
        : SUM (=sum) and AVERAGE (=avg). Example, <Code>=avg(a1:10)</Code>
        will average cells a1 to a10.
      </Text>
      <Box maxW="calc(100vw - 40px)" mx="auto" p="2">
        <Flex>
          <Flex direction="column" backgroundColor={headerBackgroundColor}>
            {renderRowHeaders()}
          </Flex>
          <Box overflowX="scroll">
            <Flex h={cellHeight}>{renderColumnHeaders()}</Flex>
            <SimpleGrid
              templateColumns={`repeat(10, ${cellWidth}px)`}
              templateRows={`repeat(10, ${cellHeight}px)`}>
              {renderCells()}
            </SimpleGrid>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

CellsPage.propTypes = {
  routeConfig: shapes.routeConfig,
};

export default CellsPage;
