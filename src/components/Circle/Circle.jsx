import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

function Circle(props) {
  const { size, style, ...otherProps } = props;
  const sizePx = `${size}px`;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: 'tomato',
        borderRadius: '50%',
        opacity: '0.9',
        width: sizePx,
        height: sizePx,
        ...style,
      }}
      {...otherProps}
    />
  );
}

Circle.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default Circle;
