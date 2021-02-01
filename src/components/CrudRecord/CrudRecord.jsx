import PropTypes from 'prop-types';
import { Box, Text } from '@chakra-ui/react';

function CrudRecord(props) {
  const { record, onClick, ...otherProps } = props;
  const name = `${record.firstName} ${record.lastName}`;

  return (
    <Box onClick={() => onClick(record.id)} {...otherProps}>
      <Text>{name}</Text>
    </Box>
  );
}

CrudRecord.propTypes = {
  record: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CrudRecord;
