import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useActor } from '@xstate/react';
import {
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

import { circleActions } from '../../machines/circle';
import css from './circle.module.css';

function Circle(props) {
  const { circleRef, defaultDiameter, style, ...otherProps } = props;
  const [state, send] = useActor(circleRef);
  const {
    context: { x, y, diameter },
    value: currentState,
  } = state;
  const sizePx = `${diameter}px`;
  const radius = diameter / 2;
  const top = y - radius;
  const left = x - radius;

  function onClosePopover() {
    send(circleActions.UPDATE_DIAMETER_END);
  }

  function onCircleClick(e) {
    send(circleActions.RESIZE);
  }

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={currentState === 'resizing'}
      onClose={onClosePopover}>
      <PopoverTrigger>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.5 }}
          className={css.circle}
          style={{
            width: sizePx,
            height: sizePx,
            position: 'absolute',
            top: `${top}px`,
            left: `${left}px`,
            ...style,
          }}
          {...otherProps}
          onClick={onCircleClick}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Change Diameter</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Slider
              aria-label="timer-slider"
              defaultValue={diameter}
              colorScheme="teal"
              min={defaultDiameter / 2}
              max={defaultDiameter * 2}
              onChange={(sliderValue) => {
                send({
                  type: circleActions.UPDATE_DIAMETER,
                  value: sliderValue,
                });
              }}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

Circle.propTypes = {
  circleRef: PropTypes.object.isRequired,
  style: PropTypes.object,
};

export default Circle;
