import React, {useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {GameLoop} from 'react-native-game-engine';
import Player from './entities/Player';

const AShortWalk = () => {
  let [dimensions, setDimensions] = useState(Dimensions.get('window'));

  const updateHandler = ({touches, screen, layout, time}) => {
    setDimensions(screen);
  };

  return (
    <GameLoop style={styles.container} onUpdate={updateHandler}>
      <Player dimensions={dimensions} />
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
