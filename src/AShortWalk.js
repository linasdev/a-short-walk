import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {GameLoop} from 'react-native-game-engine';
import {DOUBLE_TAP_TIMING} from './constants';
import Player from './entities/Player';

const AShortWalk = () => {
  let [dimensions, setDimensions] = useState(Dimensions.get('window'));
  let [playerAction, setPlayerAction] = useState('idle_front');
  let [controlTouch, setControlTouch] = useState(null);
  let [lastControlTouch, setLastControlTouch] = useState(null); // Used for double-tap functionality.
  let [isRunning, setRunning] = useState(false);

  const updateHandler = ({touches, screen, layout, time}) => {
    if (controlTouch) {
      // We need to look at all touches so we don't miss the 'end' event
      touches
        .filter((t) => t.id === controlTouch.id)
        .forEach((touch) => {
          switch (touch.type) {
            case 'move':
              setControlTouch(touch);
              break;

            case 'end':
              setControlTouch(null);
              setLastControlTouch(touch);
              setRunning(false); // Removes some stuttering
              break;
          }
        });
    } else {
      // Only single-touch controls are needed
      const touch = touches.find((t) => t.type === 'start');

      if (touch) {
        setControlTouch(touch);

        setRunning(
          lastControlTouch &&
            touch.event.timestamp - lastControlTouch.event.timestamp <=
              DOUBLE_TAP_TIMING,
        );
      }
    }

    setDimensions(screen);
  };

  useEffect(() => {
    if (controlTouch) {
      if (controlTouch.event.pageX < dimensions.width / 2) {
        setPlayerAction(isRunning ? 'run_left' : 'walk_left');
      } else {
        setPlayerAction(isRunning ? 'run_right' : 'walk_right');
      }
    } else {
      // Set idle state based on last orientation
      switch (playerAction) {
        case 'walk_left':
        case 'run_left':
          setPlayerAction('idle_left');
          break;

        case 'walk_right':
        case 'run_right':
          setPlayerAction('idle_right');
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlTouch, dimensions, isRunning]);

  return (
    <GameLoop style={styles.container} onUpdate={updateHandler}>
      <Player dimensions={dimensions} action={playerAction} />
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
