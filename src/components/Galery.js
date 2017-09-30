import React from 'react';

import Gallery from 'react-grid-gallery';
import '../stylesheets/galery.css'




export default class PhotoGallery extends React.Component{


  render() {


    return <div>
        <button className="button is-primary" onClick={this.props.showGalery}>Показать галерею</button>
        {this.props.trigger ?
          <div>
            <button className="button is-primary" onClick={this.props.selectAll}>Выбрать все</button>
            <br/>
             <Gallery
              images={this.props.images}
              onSelectImage={this.props.selectPhoto}
              margin={1}

              />
            <div className="is-clearfix"></div>
            <br />
            <p><button className="button is-primary box" onClick={this.props.showMorePhotos}>Еще</button></p>
          </div>
        : ''}







    </div>
  }
}
