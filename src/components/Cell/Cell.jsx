import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function Cell(props) {
  const { cellBorderColor } = props;
  return (
    <Editable
      defaultValue="123"
      borderColor={cellBorderColor}
      borderWidth="1px">
      <EditablePreview w="100%" pl="2" />
      <EditableInput borderRadius="0" pl="2" />
    </Editable>
  );
}
Cell.propTypes = {
  cellBorderColor: PropTypes.string.isRequired,
};

export default Cell;
