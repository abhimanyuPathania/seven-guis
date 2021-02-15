import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import { useActor } from '@xstate/react';
import PropTypes from 'prop-types';

import { cellActions } from '../../machines/cell';

function Cell(props) {
  const { cell, cellBorderColor } = props;
  const [state, send] = useActor(cell.ref);
  const {
    context: { value },
    context,
    value: currentState,
  } = state;

  // console.log('cell', context, state);
  return (
    <Editable
      value={value}
      borderColor={cellBorderColor}
      borderWidth="1px"
      onChange={(value) => {
        send({ type: cellActions.UPDATE_VALUE, value });
      }}>
      <EditablePreview w="100%" h="100%" pl="2" />
      <EditableInput borderRadius="0" pl="2" />
    </Editable>
  );
}
Cell.propTypes = {
  cellBorderColor: PropTypes.string.isRequired,
};

export default Cell;
