import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as groupsActions from '../actions/GroupActions';


import GroupsView from '../components/Groups';


class Groups extends Component {
  render() {
    const {groups} = this.props;
    const {
      getGroups,
      leaveGroups,
      selectGroup,
      selectAllGroups,
      dropGroupsSelection
    } = this.props.groupsActions;

    return <div>
      
    <GroupsView
      groupsarr={groups.groupsarr}
      selected={groups.selectedgroups}
      get = {getGroups}
      del = {leaveGroups}
      select={selectGroup}
      selectAll={selectAllGroups}
      drop={dropGroupsSelection}
    />
  </div>

  }
}


function mapStateToProps(state) {
  return {groups: state.groups}
}

function mapDispatchToProps(dispatch) {
  return {
    groupsActions: bindActionCreators(groupsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
