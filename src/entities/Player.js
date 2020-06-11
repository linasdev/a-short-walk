import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';

const Player = ({dimensions: {width, height}}) => {
  return <View style={[styles.player, {left: width / 2, top: height / 2}]} />;
};

Player.propTypes = {
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
    backgroundColor: 'pink',
    width: 20,
    height: 20,
    borderRadius: 20,
  },
});

export default Player;
