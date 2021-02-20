import PropTypes from 'prop-types';
import { Heading } from '@chakra-ui/react';

function PageHeading(props) {
  const { routeConfig, ...otherProps } = props;
  return (
    <Heading
      mb="6"
      {...otherProps}>{`${routeConfig.no}. ${routeConfig.label}`}</Heading>
  );
}

PageHeading.propTypes = {
  routeConfig: PropTypes.shape({
    no: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }),
};

export default PageHeading;
