import React from 'react';


import {
  GroupButtons,
  SelectedIco,
  Counters
} from './Interface';



export default class GroupsView extends React.Component {
  componentDidMount() {
    this.props.get()
  }

  onSelectGroup (value, idx) {

        this.props.select.call(this, value, idx);
    }


  render() {
    const {
      groupsarr,
      selected,
      selectAll,
      drop,
      del
    } = this.props;

    const GroupType = (props) => {
      switch(props.type) {
        case "group":
          return (<span>Группа</span>);
        case "page":
          return (<span>Страница</span>);
        case "event":
         return (<span>Мероприятие</span>);
        default:
          return (<span>Группа</span>);
      }
    }

    const Groupcard = ({group, idx}) =>  (
      <div className="box album-card"
        onClick={this.onSelectGroup.bind(this, group, idx)}>

        <div className="album-cover">
          <img src={group.photo_200} className="image" alt={group.title} />

          <div className="album-count">
            <GroupType type={group.type} />
          </div>

          <div className="album-title has-text-centered">
          <a href={"https://vk.com/" + group.screen_name} target="_blank" rel="noopener noreferrer">{group.name}</a>
          <br />

            {group.is_closed ? <tag className="tag is-info is-rounded">Закрытая</tag> : ''}
            {group.is_admin ? <tag className="tag is-danger is-rounded">Вы админ</tag> : ''}
          </div>
        <SelectedIco trigger={group.isSelected} />
        </div>


      </div>
    );




    const GroupsCardArr = groupsarr.map((group, index) => (
      <Groupcard key={group.id} group={group} idx={index} />
    ));

    return (
      <div className="box">
        <Counters all={groupsarr.length} selected={selected} />
        <GroupButtons selectAll={selectAll} drop={drop} del={del} />

        <div className="albums-group">
          {GroupsCardArr}
        </div>
      </div>
    )

  }
}
