import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as notesActions from '../actions/NotesActions';

import {Fetcher} from '../components/Interface';
import NotesView from '../components/Notes';



class Notes extends Component {
  render() {
    const {notes} = this.props;
    const {
      getNotes,
      delNotes,
      selectNote,
      selectAllNotes,
      dropNotesSelection
    } = this.props.notesActions;

    return <div>

    <NotesView notesarr={notes.notesarr}
               selected={notes.selectednotes}
               get = {getNotes}
               del = {delNotes}
               select={selectNote}
               selectAll={selectAllNotes}
               drop={dropNotesSelection}
      />

      {notes.fetching &&
           <Fetcher trigger={notes.fetching}
                    message={notes.fetchmessage}

             />
        }

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
