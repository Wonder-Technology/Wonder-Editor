module Method = {
  /* let onSelect = (dispatch, id, _event) => {
    WonderLog.Log.print("hehe") |> ignore;
       AssetTreeUtils.onSelect(dispatch, id)
  }; */
  let onDoubleClick = () => WonderLog.Log.print("double") |> ignore;
  let onClick = (folderId,_event) => WonderLog.Log.print("click") |> ignore;
};

let component = ReasonReact.statelessComponent("FileBox");

let render = (store, dispatch, imgSrc, folderId, name, sign, isSelected, _self) => {
  let className = "file-item " ++ (isSelected ? "item-active" : "");
  let id = "folder-"++ string_of_int(folderId);
  
  <article className id
  >
    <img src=imgSrc onDragStart=(EventUtils.dragStart(folderId, sign)) />
    <span className="item-text"> (DomHelper.textEl(name)) </span>
  </article>
};

let make = (~store, ~dispatch, ~imgSrc, ~folderId, ~name, ~sign, ~isSelected, _children) => {
  ...component,
  didMount: (_self) => {
    let clickStream = Most.fromEvent("click", DomHelper.getElementById("folder-"++string_of_int(folderId)) |> Obj.magic,Js.true_);

    clickStream
    |> ClickStreamUtils.bindClickStream(false)
    |> Most.forEach((event) => {
        WonderLog.Log.print("double click11") |> ignore;
    });
    clickStream
    |> ClickStreamUtils.bindClickStream(true)
    |> Most.forEach((event) => {
        WonderLog.Log.print("single click") |> ignore;
    });
   
    ReasonReact.NoUpdate
  },
  render: (self) => render(store, dispatch, imgSrc, folderId, name, sign, isSelected, self)
};