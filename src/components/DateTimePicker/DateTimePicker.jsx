import PropTypes from 'prop-types';
import React from 'react';
import { Input, FormControl, FormLabel } from '@chakra-ui/react';
import Flatpickr from 'react-flatpickr';

function DateTimePicker(props) {
  const { label, options, disabled, ...otherProps } = props;

  return (
    <Flatpickr
      options={{
        dateFormat: 'J M, Y',
        ...options,
      }}
      render={({ defaultValue, value, ...props }, ref) => {
        return (
          <FormControl>
            <FormLabel htmlFor="travel-date">{label}</FormLabel>
            <Input
              value={value}
              defaultValue={defaultValue}
              readOnly
              disabled={disabled}
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
