import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {GameLoop} from 'react-native-game-engine';
import {
  DOUBLE_TAP_TIMING,
  PLAYER_WALK_SPEED,
  PLAYER_RUN_SPEED,
  BACKGROUND_LIMIT,
  BACKGROUND_SHEET_0,
  BACKGROUND_SHEET_1,
  BACKGROUND_SHEET_2,
  BACKGROUND_SHEET_3,
  BACKGROUND_SHEET_4,
  BACKGROUND_SHEET_5,
} from './constants';
import Player from './entities/Player';
import Background from './entities/Background';

const AShortWalk = () => {
  let [dimensions, setDimensions] = useState(Dimensions.get('window'));
  let [playerAction, setPlayerAction] = useState('idle_front');
  let [playerPosition, setPlayerPosition] = useState(0);
  let [controlTouch, setControlTouch] = useState(null);
  let [lastControlTouch, setLastControlTouch] = useState(null); // Used for double-tap functionality.
  let [isRunning, setRunning] = useState(false);

  const updateHandler = ({touches, screen, layout, time}) => {
    if (controlTouch) {
      // We need to look at all touches so we don't miss the 'end' event.
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
              setRunning(false); // Removes some stuttering.
              break;
          }
        });
    } else {
      // Only single-touch controls are needed.
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

    let positionDelta = 0;

    switch (playerAction) {
      case 'walk_left':
        positionDelta = -PLAYER_WALK_SPEED;
        break;

      case 'walk_right':
        positionDelta = PLAYER_WALK_SPEED;
        break;

      case 'run_left':
        positionDelta = -PLAYER_RUN_SPEED;
        break;

      case 'run_right':
        positionDelta = PLAYER_RUN_SPEED;
        break;
    }

    positionDelta *= dimensions.height; // Convert to real units.
    positionDelta *= time.delta; // Decouple movement speed from framerate.
    positionDelta *= 0.001; // Convert time.delta to seconds.

    // Constrain position to the edges of the world
    let newPosition = playerPosition + positionDelta;
    newPosition = Math.max(newPosition, 0);
    newPosition = Math.min(newPosition, BACKGROUND_LIMIT * dimensions.height);

    // Move the player.
    setPlayerPosition(newPosition);
  };

  useEffect(() => {
    if (controlTouch) {
      if (controlTouch.event.pageX < dimensions.width / 2) {
        setPlayerAction(isRunning ? 'run_left' : 'walk_left');
      } else {
        setPlayerAction(isRunning ? 'run_right' : 'walk_right');
      }
    } else {
      // Set idle state based on last orientation.
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
      <Background
        dimensions={dimensions}
        playerAction={playerAction}
        playerPosition={playerPosition}
        source={BACKGROUND_SHEET_5}
        parallax={0.5}
      />

      <Background
        dimensions={dimensions}
        playerAction={playerAction}
        playerPosition={playerPosition}
        source={BACKGROUND_SHEET_4}
        parallax={0.6}
      />

      <Background
        dimensions={dimensions}
        playerAction={playerAction}
        playerPosition={playerPosition}
        source={BACKGROUND_SHEET_3}
        parallax={0.7}
      />

      <Background
        dimensions={dimensions}
        playerAction={playerAction}
        playerPosition={playerPosition}
        source={BACKGROUND_SHEET_2}
        parallax={0.8}
      />

      <Player dimensions={dimensions} action={playerAction} />

      <Background
        dimensions={dimensions}
        playerAction={playerAction}
        playerPosition={playerPosition}
        source={BACKGROUND_SHEET_1}
        parallax={0.9}
      />

      <Background
        dimensions={dimensions}
        playerAction={playerAction}
        playerPosition={playerPosition}
        source={BACKGROUND_SHEET_0}
        parallax={1}
      />
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
