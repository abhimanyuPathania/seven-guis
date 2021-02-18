import { useState } from 'react';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import { useActor } from '@xstate/react';
import PropTypes from 'prop-types';

import { cellActions } from '../../machines/cell';

function Cell(props) {
  const { cell, cellBorderColor } = props;
  const [testState, setTestState] = useState(false);
  const [state, send] = useActor(cell.ref);
  const {
    context: { value },
    context,
    value: currentState,
  } = state;

  function viewCell() {
    send(cellActions.VIEW_CELL);
  }

  // console.log('cell', context, state);
  console.log('currentState', currentState);
  return (
    <Editable
      value={value}
      borderColor={cellBorderColor}
      borderWidth="1px"
      selectAllOnFocus={false}
      onChange={(value) => {
        send({ type: cellActions.UPDATE_VALUE, value });
      }}
      onSubmit={viewCell}
      onCancel={viewCell}>
      <EditablePreview w="100%" h="100%" pl="2" />
      <EditableInput
        borderRadius="0"
        pl="2"
        // <Editable> `onEdit` is broken. Cannot call setState from inside it.
        onFocus={() => send(cellActions.EDIT_CELL)}
      />
    </Editable>
  );
}
Cell.propTypes = {
  cellBorderColor: PropTypes.string.isRequired,
};

export default Cell;
