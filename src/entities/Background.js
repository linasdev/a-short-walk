import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import SpriteSheet from 'rn-sprite-sheet';
import {
  BACKGROUND_HEIGHT,
  BACKGROUND_SHEET_COLS,
  BACKGROUND_SHEET_ROWS,
  BACKGROUND_ANIM_FPS,
} from '../constants';

const Background = ({dimensions, playerPosition, source}) => {
  const [animationRef, setAnimationRef] = useState();

  useEffect(() => {
    if (animationRef) {
      animationRef.play({
        type: 'idle',
        fps: BACKGROUND_ANIM_FPS,
        loop: true,
      });
    }
  }, [animationRef]);

  const realHeight = dimensions.height * BACKGROUND_HEIGHT;

  return (
    <SpriteSheet
      ref={setAnimationRef}
      source={source}
      columns={BACKGROUND_SHEET_COLS}
      rows={BACKGROUND_SHEET_ROWS}
      height={realHeight}
      viewStyle={[
        styles.view,
        {
          // Move the world, not the player.
          left: -playerPosition,
          top: (dimensions.height - realHeight) / 2,
        },
      ]}
      animations={{
        idle: Array.from(
          {length: BACKGROUND_SHEET_COLS * BACKGROUND_SHEET_ROWS},
          (_, i) => i,
        ),
      }}
    />
  );
};

Background.propTypes = {
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  playerPosition: PropTypes.number.isRequired,
  source: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
  },
});

export default Background;
