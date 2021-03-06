var React = require('react');
var Reflux = require('reflux');
var TopicStore = require('../stores/topic-store');
var Actions = require('../actions/topic-action');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
  // this mixin says this component that we are writing right needs to listen to
  // any event that is triggered by TopicStore, when TopicStore triggers an event
  // run the function 'onChange', which is a direct mapping to the function we 
  // declared at the bottom
  mixins: [
    Reflux.listenTo(TopicStore, 'onChange')
  ],
  getInitialState: function() {
    return {
      topics: []
    }
  },
  // always ran right before the component is rendered and only runs once
  componentWillMount: function() {
    Actions.getTopics();
  },
  render: function() {
    return <div className="list-group">
      {this.renderTopics()}
    </div>
  },
  renderTopics: function() {
    return this.state.topics.slice(0,4).map(function(topic) {
      return <Link to={"topics/" + topic.id} className="list-group-item" key={topic.id}>
        <h4>{topic.name}</h4>
        <p>{topic.description}</p>
      </Link>
    });
  },
  /**
   * Whenever TropicStore emits an event, onChange is going to run. We know 
   * that the second argument to this function is going to be the new data, 
   * the list of topics. The First one is going to be the name of the event.
   * We are going to take the array, data, or list of topics and set it on 
   * state using '.setState', as always when we '.setState' its going to trigger
   * a re-render of this component. Its going to run our 'render' function 
   * again which in turn calls 'renderTopics' 
   */
  onChange: function(event, topics) {
    this.setState({topics: topics});
  }
});