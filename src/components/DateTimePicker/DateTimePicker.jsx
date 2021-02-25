import PropTypes from 'prop-types';
import React from 'react';
import { Input, FormControl, FormLabel } from '@chakra-ui/react';
import Flatpickr from 'react-flatpickr';

function DateTimePicker(props) {
  /**
   * Trying to make this work controlled `value` and `render` was
   * causing issue internal custom input won't render properly `value` field
   */
  const { label, value, options, disabled, ...otherProps } = props;

  return (
    <Flatpickr
      options={{
        dateFormat: 'J M, Y',
        ...options,
      }}
      render={({ value, ...props }, ref) => {
        return (
          <FormControl>
            <FormLabel htmlFor="travel-date">{label}</FormLabel>
            <Input
              value={value}
              disabled={disabled}
              readOnly
              {...props}
              ref={ref}
            />
          </FormControl>
        );
      }}
      {...otherProps}
    />
  );
}

DateTimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  options: PropTypes.object,
};

export default DateTimePicker;
