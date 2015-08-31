var React = require('react');
// bridge between firebase and our components
var ReactFire = require('reactfire');
// bridge between online database and our app
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');
// where we want firebase to reach out too to look for our data
var rootURL = 'https://blistering-inferno-5460.firebaseio.com/';

var App = React.createClass({
  // a mixin is a group of methods that sits on one object, that gets copied over to another object
  // in this case 'this', basically copies code from this object (ReactFire) onto our component
  mixins: [ ReactFire ],
  getInitialState: function() {
    return {
      items: {},
      loaded: false
    }
  },
  componentWillMount: function() {
    fb = new Firebase(rootURL + 'items/');
    // creating a new instance of Firebase which is the object that is going to make network requests
    // and communicate with our online database. bindAsObject() is a method defined by ReactFire
    this.bindAsObject(fb, 'items');
    fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    // top level div is going to make over all architechure container for our overall app
    return <div className="row panel panel-default">
      {/* here is our center column */}
      <div className="col-md-8 col-md-offset-2">
        {/* Then we have a header on the top of the column that say To-Do List */}
        <h2 className="text-center">
          To-Do List
        </h2>
        {/* itemsStore is a direct reference to our firebase object */}
        <Header itemsStore={ this.firebaseRefs.items } />
        {/* using a ternary expression */}
        <div className={"content " +(this.state.loaded ? 'loaded': '')}>
          {/* for right now items is a plain object (here is the data), only has the ability to read items not create it */}
          <List items={this.state.items}/>
        </div>
      </div>
    </div>
  },
  handleDataLoaded: function() {
    this.setState({loaded: true});
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
