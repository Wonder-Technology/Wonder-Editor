module Method = {
  let onDoubleClick = AssetTreeUtils.onSelect;
  let onClick = FileBox.Method.onSelect;
};

let component = ReasonReact.statelessComponent("FileBox");

let render = (store, dispatch, imgSrc, folderId, name, sign, isSelected, _self) => {
  let className = "file-item " ++ (isSelected ? "item-active" : "");
  let id = "folder-" ++ string_of_int(folderId);
  <article className id>
    <img src=imgSrc />
    <span className="item-text"> (DomHelper.textEl(name)) </span>
  </article>
};

let make =
    (~store, ~dispatch, ~imgSrc, ~folderId, ~name, ~sign, ~isSelected, ~setNodeParentId, _children) => {
  ...component,
  didMount: (_self) => {
    let clickStream =
      Most.fromEvent(
        "mousedown",
        DomHelper.getElementById("folder-" ++ string_of_int(folderId)) |> Obj.magic,
        Js.true_
      );
    clickStream
    |> ClickStreamUtils.bindClickStream(~isSingleClick=false)
    |> Most.forEach(
         (_event) => {
           WonderLog.Log.print("double click11") |> ignore;
           Method.onDoubleClick( dispatch,setNodeParentId, folderId)
         }
       )
    |> ignore;
    clickStream
    |> ClickStreamUtils.bindClickStream(~isSingleClick=true)
    |> Most.forEach(
         (event) => {
           WonderLog.Log.print("sing click") |> ignore;
           Method.onClick(dispatch, folderId, event)
         }
       )
    |> ignore;
    ReasonReact.NoUpdate
  },
  render: (self) => render(store, dispatch, imgSrc, folderId, name, sign, isSelected, self)
};