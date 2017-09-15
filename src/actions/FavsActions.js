import {
  FAVLINKS_REQUEST,
  FAVLINKS_SUCCESS,
  FAVLINKS_FAIL,
  FAVLINKSDEL_REQUEST,
  FAVLINKSDEL_SUCCESS,
  FAVLINKSDEL_FAIL
} from '../constants/Favs';
import jsonp from 'jsonp';
import linkCreator from '../Utils/linkCreator';


export function favegetLinks() {
  return function(dispatch, getState) {

    const
      state = getState(),
      access_token = state.auth.access_token,
      methodname = "fave.getLinks";
    var
      linkarr = [],
      count = 50,
      offset = 0;

    dispatch({
      type: FAVLINKS_REQUEST,
      payload: linkarr.length
    });

    linksRequestCycle(offset);

    function linksRequestCycle(offset) {
      jsonp(linkCreator(methodname,
                        access_token,
                        { count: count, offset: offset }),
            function(err, data) {
              if (err) {
                dispatch({
                  type: FAVLINKS_FAIL,
                  payload: err
                });
              };
              if (data) {
                linkarr = linkarr.concat(data.response.items);
                offset = offset + count;
                if (offset > data.response.count) return dispatch({
                    type: FAVLINKS_SUCCESS,
                    payload: linkarr
                  });
                dispatch({
                  type: FAVLINKS_REQUEST,
                  payload: data.response.count
                });
                setTimeout(function() {
                  linksRequestCycle(offset)
                }, 333);
              }
            })
    }

  }
};



export function favedelLinks() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token,
      methodname = "execute.favlinks_del",
      linkarr = state.favs.linkarr,
      count = 2;

    dispatch({
      type: FAVLINKSDEL_REQUEST,
      payload: linkarr.length
    });

    delRequest();

    function delRequest() {
      if (!linkarr.length) return dispatch({ type: FAVLINKSDEL_SUCCESS });

      var linkstoDelete;
      function linksPrepare(linkarr) {
        var links = [], arr = [];

        arr = linkarr.splice(-count, count);

        for (var key in arr) {
          links.push(arr[key].id);
        };

        links = links.join();
        return links;
      };
      linkstoDelete = linksPrepare(linkarr);

      console.log(linkstoDelete)
      var a = linkCreator(methodname, access_token,
                  { count: count, links: linkstoDelete })
      console.log(a)

      jsonp(
        linkCreator(methodname, access_token,
                    { count: count, links: linkstoDelete }),
        function(err, data) {
          if (err) return dispatch({
            type: FAVLINKSDEL_FAIL,
            payload: err
          });
          if (data) {
            console.log(data)
            dispatch({
              type: FAVLINKSDEL_REQUEST,
              payload: linkarr.length
            });
            setTimeout(function() {
             delRequest();
            }, 333);
          }
        }
      );
    }
  }
}
