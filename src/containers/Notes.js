import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as notesActions from '../actions/NotesActions';

import { FavView } from '../components/Favs';
import NotesView from '../components/Notes';



class Notes extends Component {
  render() {
    const {notes} = this.props;
    const {
      getNotes,
      delNotes,
      selectNote,
      selectAllNotes
    } = this.props.notesActions;

    return <div>
      <FavView
        title="У вас заметок:"
        length={notes.noteslength}
        fetching={notes.fetching}
        fetchmessage={notes.fetchmessage}
        completemess={notes.completemess}
        error = {notes.error}
        get = {getNotes}
        del = {delNotes}
      />

    <NotesView notesarr={notes.notesarr}
                 select={selectNote}
                 selectAll={selectAllNotes} />

  </div>

  }
}


function mapStateToProps(state) {
  return {notes: state.notes}
}

function mapDispatchToProps(dispatch) {
  return {
    notesActions: bindActionCreators(notesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes)
