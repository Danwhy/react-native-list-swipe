"use strict";

var React = require('react-native');
var Item = require('./item.js');
var {
  StyleSheet,
  ListView,
  View,
} = React;

var List = React.createClass({

  getInitialState: function() {

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.props.list),
    }
  },

  renderRow: function(rowData, sectionID, rowID) {

    return (
      <Item 
        key={rowID}
        data={rowData}
        toggleDeletable={this.toggleDeletable}
        rowID={rowID}
      />
    );
  },

  renderSeparator: function(sectionID, rowID, adjacentRowHighlighted) {

    return (
      <View style={styles.separator}/>
    );
  },

  toggleDeletable: function(id, deletable) {

    this.props.list[id].deletable = deletable;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.list)
    });
  },

  render: function() {

    return (
      <ListView
        style={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
      />
    );
  }
});

var styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});

module.exports = List;
