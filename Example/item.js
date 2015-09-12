"use strict";

var React = require("react-native");
var {
  StyleSheet,
  Text,
  View,
  PanResponder,
  LayoutAnimation,
  Dimensions,
} = React;

var screenWidth = Dimensions.get('window').width;

var Item = React.createClass({

  getInitialState: function () {

    return {
      opacity: 1,
      left: 0,
    }
  },

  componentWillMount: function () {

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => this.highlight(),
      onPanResponderMove: (evt, gestureState) => this.move(gestureState),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => this.end(gestureState),
      onPanResponderTerminate: (evt, gestureState) => this.unhighlight(),
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  },

  end: function (gestureState) {

    this.done = false;
    this.setState({opacity: 1});
  },

  move: function (gestureState) {

    if (gestureState.dx <= -80 && !this.done){
      this.props.toggleDeletable(this.props.rowID, true);
      this.done = true;
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({left: -50});
    } else if (gestureState.dx >= 80 && !this.done) {
      this.props.toggleDeletable(this.props.rowID, false);
      this.done = true;
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({left: 0});
    }
  },

  highlight: function () {

    this.setState({opacity: 0.25});
  },

  unhighlight: function () {

    this.setState({opacity: 1});
  },

  render: function() {

    return (
      <View style={{flexDirection: 'row', left: this.state.left}}>
        <View
          style={{opacity: this.state.opacity, width: screenWidth}}
          {...this._panResponder.panHandlers}
        >
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{this.props.data.title}</Text>
            </View>
          </View>
        </View>
        <View style={styles.delete}>
            <Text style={styles.x}>X</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
  },
  contentContainer: {
    flex: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 15,
    marginLeft: 20,
  },
  delete: {
    width: 50,
    alignItems: 'center',
    backgroundColor: 'red',
    flexDirection: 'column',
  },
  x: {
    fontSize: 40,
    color: 'white',
    fontWeight: '300',
  }
});


module.exports = Item;
