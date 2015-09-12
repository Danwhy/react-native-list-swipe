'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;

var List = require('./list.js');

var list = [
      {title: 'Example item 1'},
      {title: 'Example item 2'},
      {title: 'Example item 3'},
      {title: 'Example item 4'},
      {title: 'Example item 5'},
      {title: 'Example item 6'},
    ];

var Example = React.createClass({

  render: function() {

    return (
      <List list={list}/>
    );
  }
});

AppRegistry.registerComponent('Example', () => Example);
