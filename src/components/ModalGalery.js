import React from 'react';
import Gallery from 'react-grid-gallery';
import { Modal, GroupButtons } from './Interface';

export default class ModalGalery extends React.Component {



  render() {
    const { album, close, trigger, select, selectAll, drop, save} = this.props;




    return(
      <div>

         <Modal trigger={trigger} close={close}>
              <div>
                <div className="title album-inmodal-title">{album.title}</div>
                <GroupButtons
                  selectAll={selectAll}
                  drop={drop}
                  save={save}
                  />
                <Gallery images={album.items} margin={1} onSelectImage={select}/>
              </div>

         </Modal>

      </div>


    )
  }
}
