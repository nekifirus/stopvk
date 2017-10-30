import React from 'react';
import DOMPurify from 'dompurify';

import {
  GroupButtons,
  Counters
} from './Interface';


export default class NotesView extends React.Component {
  componentDidMount() {
    this.props.get()
  }
  onSelectNote (note, index) {
        this.props.select.call(this, note, index);
  }

  render() {

    const { notesarr, selected, selectAll, drop, del } = this.props;

    const NoteText = ((text) => DOMPurify.sanitize(text))

    const NoteCard = (({note, index}) => (
      <div className="box"
                          onClick={this.onSelectNote.bind(this, note, index)}>
      <div>
        <div className={note.isSelected ? "select-ico fa-3x" : "is-invisible"}>
            <i className="fa fa-circle fa-stack-1x" aria-hidden="true"></i>
            <i className="fa fa-check-circle fa-inverse fa-stack-1x" aria-hidden="true"></i>
        </div>
      </div>


      <div className="notes-text" dangerouslySetInnerHTML={{__html: NoteText(note.text)}}></div>
    </div>
  ));

    const NotesGroup = notesarr.map((note, index) => <NoteCard
      key={note.id} note={note} index={index} />
    );




    return(
      <div className="box">
        <Counters all={notesarr.length} selected={selected} />
        <GroupButtons selectAll={selectAll} drop={drop} del={del} />

        {NotesGroup}
      </div>

    )
  }


}
