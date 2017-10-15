import React from 'react';
import '../stylesheets/Groups.css';




export default class GroupsView extends React.Component {


  onSelectGroup (value, idx) {

        console.log(value)
        this.props.select.call(this, value, idx);
    }


  render() {
    const {
      groupsarr
    } = this.props;

    const GroupType = (props) => {
      switch(props.type) {
        case "group":
          return <tag className="tag is-light is-rounded">Группа</tag>
        case "page":
          return <tag className="tag is-light is-rounded">Страница</tag>
        case "event":
         return <tag className="tag is-light is-rounded">Мероприятие</tag>
        default:
          return <tag className="tag is-light is-rounded">Группа</tag>
      }
    }

    const Groupcard = (props) =>  <div className="field">
      <div className={props.value.isSelected ? "card selected" : "card"}
                                    onClick={this.onSelectGroup.bind(this, props.value, props.idx)}>
        <div className="card-image">
          <img src={props.value.photo_200} className="image" alt="" />
              <div className={props.value.isSelected ? "select-ico fa-3x" : "is-invisible"}>
                <i className="fa fa-circle fa-stack-1x" aria-hidden="true"></i>
                <i className="fa fa-check-circle fa-inverse fa-stack-1x" aria-hidden="true"></i>
             </div>
            <div className="tagsfield">
              <GroupType type={props.value.type} />

              {props.value.is_closed ? <tag className="tag is-info is-rounded">Закрытая</tag> : ''}
              {props.value.is_admin ? <tag className="tag is-danger is-rounded">Вы админ</tag> : ''}
            </div>
        </div>
        <div className="card-content has-text-centered">

          <div>
            <p><a href={"https://vk.com/" + props.value.screen_name} target="_blank" rel="noopener noreferrer">{props.value.name}</a></p>
          </div>


        </div>
      </div>
    </div>


    const GroupsCardArr = groupsarr.map((group, index) => <Groupcard
                                                            key={group.id}
                                                            value={group}
                                                            idx={index}
                                                            />)

    return <div className="card-group">
      {GroupsCardArr}
    </div>
  }
}
