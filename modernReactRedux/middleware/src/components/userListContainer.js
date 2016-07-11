import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UserList extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  renderUser(user) {
    return (
      <div className="card card-block" key={user.name}>
        <h4 className="card-title">{user.name}</h4>
        <p className="card-text">{user.work}</p>
        <a href="/" className="btn btn-primary">Email</a>
      </div>
    );
  }

  // mapping over our list of users and for each user call the renderUser() helper method and than return it root jsx below
  render() {
    return (
      <div>
        {/*
          mapping over our list of users and for each user call the renderUser()
          helper method and than return it root jsx below
        */}
        {this.props.users.map(this.renderUser)}
      </div>
    );
  }
}

UserList.propTypes = {
  fetchUsers: React.PropTypes.func.isRequired,
  users: React.PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return { users: state.users };
}

export default connect(mapStateToProps, actions)(UserList);