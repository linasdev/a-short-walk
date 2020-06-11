import React, {useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {GameLoop} from 'react-native-game-engine';
import {PLAYER_SIZE} from './constants';
import Player from './entities/Player';

const AShortWalk = () => {
  let [dimensions, setDimensions] = useState(Dimensions.get('window'));

  const updateHandler = ({touches, screen, layout, time}) => {
    setDimensions(screen);
  };

  const playerPosition = {
    x: (dimensions.width - PLAYER_SIZE) / 2,
    y: (dimensions.height - PLAYER_SIZE) / 2,
  };

  return (
    <GameLoop style={styles.container} onUpdate={updateHandler}>
      <Player position={playerPosition} size={PLAYER_SIZE} />
    </GameLoop>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default AShortWalk;
