/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
// var SearchPage = require('./SearchPage');
var Home = require('./Home');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var mindswiper = React.createClass({
  render: function() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Mindswiper',
          component: Home,
        }}/>
    );
  }
});

var styles = React.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#96B7CD',
  }
});
AppRegistry.registerComponent('mindswiper', () => mindswiper);
