import PropTypes from 'prop-types';

export const routeConfig = PropTypes.shape({
  no: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});
