import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as docsActions from '../actions/DocsActions';

import { FavView } from '../components/Favs';
import DocsView from '../components/Docs';



class Docs extends Component {
  render() {
    const {docs} = this.props;
    const {
      getDocs,
      delDocs,
      selectDoc,
      selectAllDocs
    } = this.props.docsActions;

    return <div>
      <FavView
        title="У вас докментов:"
        length={docs.docslength}
        fetching={docs.fetching}
        fetchmessage={docs.fetchmessage}
        completemess={docs.completemess}
        error = {docs.error}
        get = {getDocs}
        del = {delDocs}
      />

    <DocsView docsarr={docs.docsarr}
                 select={selectDoc}
                 selectAll={selectAllDocs} />

  </div>

  }
}


function mapStateToProps(state) {
  return {docs: state.docs}
}

function mapDispatchToProps(dispatch) {
  return {
    docsActions: bindActionCreators(docsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Docs)
