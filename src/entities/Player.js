import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import SpriteSheet from 'rn-sprite-sheet';
import {ANIMATION_FPS} from '../constants';

const Player = ({position: {x, y}, size}) => {
  const [animationRef, setAnimationRef] = useState();

  animationRef &&
    animationRef.play({
      type: 'idle_side',
      fps: ANIMATION_FPS,
      loop: true,
    });

  return (
    <SpriteSheet
      ref={setAnimationRef}
      source={require('../assets/character.png')}
      columns={64}
      rows={4}
      height={size}
      viewStyle={[styles.view, {left: x, top: y}]}
      imageStyle={styles.image}
      animations={{
        idle_front: Array.from({length: 48}, (_, i) => i),
        run: Array.from({length: 12}, (_, i) => i + 64),
        walk: Array.from({length: 32}, (_, i) => i + 128),
        idle_side: Array.from({length: 41}, (_, i) => i + 192),
      }}
    />
  );
};

Player.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  size: PropTypes.number.isRequired,
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
