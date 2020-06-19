import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import PropTypes from 'prop-types';
import SpriteSheet from 'rn-sprite-sheet';
import {
  PLAYER_HEIGHT,
  PLAYER_SHEET,
  PLAYER_SHEET_COLS,
  PLAYER_SHEET_ROWS,
  PLAYER_ANIM_FPS,
} from '../constants';

const Player = ({dimensions, action}) => {
  const [animationRef, setAnimationRef] = useState();

  useEffect(() => {
    if (animationRef) {
      if (animationRef.props.animations[action]) {
        animationRef.play({
          type: action,
          fps: PLAYER_ANIM_FPS,
          loop: true,
        });
      } else {
        animationRef.stop();
      }
    }
  }, [action, animationRef]);

  const {width: sheetWidth, height: sheetHeight} = resolveAssetSource(PLAYER_SHEET);
  
  const {width: spriteWidth, height: spriteHeight} = {
    width: sheetWidth / PLAYER_SHEET_COLS,
    height: sheetHeight / PLAYER_SHEET_ROWS,
  };

  const {width: realWidth, height: realHeight} = {
    width: dimensions.height * PLAYER_HEIGHT * (spriteWidth / spriteHeight),
    height: dimensions.height * PLAYER_HEIGHT,
  };

  return (
    <SpriteSheet
      ref={setAnimationRef}
      source={PLAYER_SHEET}
      columns={PLAYER_SHEET_COLS}
      rows={PLAYER_SHEET_ROWS}
      height={realHeight}
      viewStyle={[
        styles.view,
        // Center the player
        {
          left: (dimensions.width - realWidth) / 2,
          top: (dimensions.height - realHeight) / 2,
        }
      ]}
      imageStyle={styles.image}
      animations={{
        idle_front: Array.from(
          {length: 48},
          (_, i) => i + 0 * PLAYER_SHEET_COLS, // 1st line.
        ),
        idle_left: Array.from(
          {length: 41},
          (_, i) => i + 7 * PLAYER_SHEET_COLS, // 8th line.
        ),
        idle_right: Array.from(
          {length: 41},
          (_, i) => i + 3 * PLAYER_SHEET_COLS, // 4th line.
        ),
        walk_left: Array.from(
          {length: 32},
          (_, i) => i + 6 * PLAYER_SHEET_COLS, // 7th line.
        ),
        walk_right: Array.from(
          {length: 32},
          (_, i) => i + 2 * PLAYER_SHEET_COLS, // 3rd line.
        ),
        run_left: Array.from(
          {length: 12},
          (_, i) => i + 5 * PLAYER_SHEET_COLS, // 6th line.
        ),
        run_right: Array.from(
          {length: 12},
          (_, i) => i + 1 * PLAYER_SHEET_COLS, // 2nd line.
        ),
      }}
    />
  );
};

Player.propTypes = {
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  action: PropTypes.oneOf([
    'idle_front',
    'idle_left',
    'idle_right',
    'walk_left',
    'walk_right',
    'run_left',
    'run_right',
  ]),
};

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
  },
  image: {
    marginTop: -1,
  },
});

export default Player;
