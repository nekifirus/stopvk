import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as groupsActions from '../actions/GroupActions';

import { FavView } from '../components/Favs';
import GroupsView from '../components/Groups';


class Groups extends Component {
  render() {
    const {groups} = this.props;
    const {
      getGroups,
      leaveGroups,
      selectGroup
    } = this.props.groupsActions;

    return <div>
      <FavView
        title="Групп в которых вы состоите:"
        length={groups.groupslength}
        fetching={groups.fetching}
        fetchmessage={groups.fetchmessage}
        completemess={groups.completemess}
        error = {groups.error}
        get = {getGroups}
        del = {leaveGroups}
      />
    <GroupsView groupsarr={groups.groupsarr} select={selectGroup} />
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
