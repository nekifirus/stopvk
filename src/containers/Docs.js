import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as docsActions from '../actions/DocsActions';


import DocsView from '../components/Docs';
import {Fetcher} from '../components/Interface';


class Docs extends Component {
  render() {
    const {docs} = this.props;
    const {
      getDocs,
      delDocs,
      selectDoc,
      selectAllDocs,
      dropDocsSelection
    } = this.props.docsActions;

    return (

    <div>


    <DocsView docsarr={docs.docsarr}
              selected={docs.selecteddocs}
              get = {getDocs}
              del = {delDocs}
              select={selectDoc}
              selectAll={selectAllDocs}
              drop={dropDocsSelection}
      />

    {docs.fetching &&
         <Fetcher trigger={docs.fetching}
                  message={docs.fetchmessage}

           />
      }

  </div>
    )
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
