import React from 'react';

const SelectAllButton = (({selectAll}) => (
  <div className="button is-primary is-outlined" onClick={selectAll}>
    <span className="icon is-small">
      <i className="fa fa-check fa-1x" aria-hidden="true"></i>
    </span>
    <span>Выбрать все</span>
  </div>
));

const DropButton = (({drop}) => (
  <div className="button is-danger is-outlined" onClick={drop}>
    <span className="icon is-small">
      <i className="fa fa-times fa-1x" aria-hidden="true"></i>
    </span>
    <span>Сброс</span>
  </div>
));

export const SaveButton = (({save}) => (
  <div className="button is-success is-outlined" onClick={save}>
    <span className="icon is-small">
      <i className="fa fa-floppy-o fa-1x" aria-hidden="true"></i>
    </span>
    <span>Скачать</span>
  </div>
));

export const DelButton = (({del}) => (
  <div className="button is-danger is-outlined" onClick={del}>
    <span className="icon is-small">
      <i className="fa fa-trash-o fa-1x" aria-hidden="true"></i>
    </span>
    <span>Удалить</span>
  </div>
));


export const GroupButtons = (({selectAll, drop, save, del}) => (
  <div className="has-text-centered">
    {selectAll &&
      <SelectAllButton selectAll={selectAll} />
    }

    {drop &&
      <DropButton drop={drop} />
    }

    {save &&
      <SaveButton save={save} />
    }

    {del &&
      <DelButton del={del} />
    }

  </div>
));



export const TitleButtonsGroup = (({check, view, save}) => (
  <div className="overlaybuttonsgroup is-invisible">
    {check &&
      <div className="overlaybutton" onClick={check}>
        <i className="fa fa-check fa-2x" aria-hidden="true"></i>
      </div>
    }
    {view &&
      <div className="overlaybutton" onClick={view}>
        <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
      </div>
    }
    {save &&
      <div className="overlaybutton" onClick={save}>
        <i className="fa fa-floppy-o fa-2x" aria-hidden="true"></i>
      </div>
    }


  </div>

));

export const SelectedIco = (({trigger}) => (
  <div className={trigger
                    ? "selected-ico fa-stack-2x"
                    : "is-invisible"
                  }>
      <i className="fa fa-circle fa-inverse fa-stack-1x" aria-hidden="true"></i>
      <i className="fa fa-check-circle fa-stack-1x" aria-hidden="true"></i>
  </div>
));






export const Counters = (({all, selected}) => (
  <div className="has-text-centered">
    {all > 0 &&
      <span className="subtitle">Всего:  {all}</span>
    }

    {selected > 0 &&
      <span className="subtitle">Выбрано: {selected}</span>
    }
  </div>

));



export class Modal extends React.Component {

  render() {
    const { trigger, close, children} = this.props;
    return(
      <div className={trigger ? "modal is-active" : "modal"}>
        <div className="modal-background" onClick={close}></div>
        <div className="modal-content has-text-centered">
            {children}
        </div>
        {close &&
          <button className="modal-close is-large" aria-label="close"
            onClick={close}></button>
        }
      </div>
    )
  }

}



export const Downloader = (({trigger, percent, file})=> (
  <div className="has-text-success">
    <Modal trigger={trigger}>
      <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      <span className="sr-only">Loading...</span>
      <br />
      <br />
      <p className="">{file}</p>
      <br />

      <progress className="progress is-large is-success" value={percent} max={100}></progress>
      <p className="">Прогресс: {percent}%</p>
    </Modal>
  </div>
));

export const Fetcher = (({trigger, message}) => (
  <div className="has-text-warning">
    <Modal trigger={trigger}>
      <p><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i></p>
      <br />
      <p>{message}</p>
    </Modal>
  </div>
))
