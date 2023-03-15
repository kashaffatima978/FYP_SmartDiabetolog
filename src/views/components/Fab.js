import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const Fab = (props) => (
  <FAB
    style={styles.fab}
    small
    icon="plus"
    color='white'
    
    onPress={props.onPress}
  />
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6A6DB0'
  },
})

export default Fab;