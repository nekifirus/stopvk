import React from 'react';
import '../stylesheets/Photos.css';

import {
  GroupButtons,
  TitleButtonsGroup,
  SelectedIco,
  Counters
} from './Interface';





export default class AlbumsView extends React.Component {
  onSelectAlbum(album, index) {
    this.props.selectAlbum.call(this, album, index)
  }

  onViewAlbum(album, index) {
    this.props.viewAlbum.call(this, album, index)
  }

  onSaveAlbum(album) {
    this.props.saveAlbum.call(this, album)
  }



  componentDidMount() {
    this.props.getAlbums()
  }

  render() {
    const { albums, selectedalbums, selectAll, drop, save, del } = this.props;






    const Album = (({album, index}) => <div className="box album-card">
        <div className="album-cover">
          <img src={album.thumb_src} alt={album.title} />
            <div className="album-count">

                {album.size}
            </div>

          <div className="album-title has-text-centered">
              {album.title}
              <TitleButtonsGroup
                check={this.onSelectAlbum.bind(this, album, index)}
                view={this.onViewAlbum.bind(this, album, index)}
                save={this.onSaveAlbum.bind(this, album)}
              />
          </div>
        </div>
        <SelectedIco trigger={album.isSelected} />

      </div>
    );

    const AlbumsGroup = albums.map((album, index) => <Album album={album} index={index} key={album.title} />)

    return(
    <div className="box">

      <Counters all={albums.length} selected={selectedalbums} />

      <GroupButtons selectAll={selectAll} drop={drop} save={save} del={del} />


      <div className="albums-group">
        {AlbumsGroup}
      </div>
    </div>
    );
  }
}
