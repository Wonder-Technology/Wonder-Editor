open DragEventUtils;

type state = {style: ReactDOMRe.Style.t};

module Method = {
  let onDoubleClick = AssetTreeUtils.onSelect;
  let onClick = FileBox.Method.onSelect;
};

let component = ReasonReact.reducerComponent("FolderBox");

let reducer = (( onDrop,_,_,_ ), action, state) =>
  switch action {
  | DragStart =>
    ReasonReact.Update({...state, style: ReactUtils.addStyleProp("opacity", "0.2", state.style)})
  | DragEnter =>
    ReasonReact.Update({
      ...state,
      style: ReactUtils.addStyleProp("border", "2px dashed blue", state.style)
    })
  | DragLeave =>
    ReasonReact.Update({
      ...state,
      style: ReactUtils.addStyleProp("border", "1px solid red", state.style)
    })
  | DragEnd =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp("opacity", "1", state.style)
        |> ReactUtils.addStyleProp("border", "1px solid red")
    })
  | DragDrop(targetId, removedId) =>
    let (sign, _) =
      StateEditorService.getState() |> CurrentDragSourceEditorService.getCurrentDragSource;
    ReasonReact.SideEffects(((_self) => onDrop((targetId, removedId, sign))))
  | Nothing => ReasonReact.NoUpdate
  };

let render =
    (
      store,
      dispatch,
      attributeTuple,
      eventTuple,
      {state, reduce}: ReasonReact.self('a, 'b, 'c)
    ) => {
    let (dragImg, imgSrc,folderId,name,isSelected,sign ) = attributeTuple;
    let (onDrop, handleSign, handleRelationError, setNodeParentId) = eventTuple;
  let id = "folder-" ++ string_of_int(folderId);
  <article
    className="file-item"
    id
    style=state.style
    >
    <div className="item-ground"
    draggable=Js.true_
    onDragStart=(reduce(DragEventUtils.handleDragStart(folderId, sign,
    dragImg
    )))
    onDragEnd=(reduce(DragEventUtils.handleDrageEnd))
    onDragEnter=(reduce(DragEventUtils.handleDragEnter(folderId, handleSign, handleRelationError)))
    onDragLeave=(reduce(DragEventUtils.handleDragLeave(folderId, handleSign, handleRelationError)))
    onDragOver=DragEventUtils.handleDragOver
    onDrop=(reduce(DragEventUtils.handleDrop(folderId, handleRelationError)))
    
    ></div>
    <img src=imgSrc />
    <span className="item-text"> (DomHelper.textEl(name)) </span>
  </article>
};

let make =
    (
      ~store,
      ~dispatch,
      ~attributeTuple,
      ~eventTuple,
      _children
    ) => {
  ...component,
  reducer: reducer(eventTuple),
  initialState: () =>{
    let (dragImg, imgSrc,folderId,name,isSelected,sign ) = attributeTuple;
    isSelected ?
      {style: ReactDOMRe.Style.make(~background="red", ())} :
      {style: ReactDOMRe.Style.make(~border="1px solid red", ())}
  },
  didMount: (_self) => {
    let (dragImg, imgSrc,folderId,name,isSelected,sign ) = attributeTuple;
    let (onDrop, handleSign, handleRelationError, setNodeParentId) = eventTuple;
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
           Method.onDoubleClick(dispatch, setNodeParentId, folderId)
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
  render: (self) =>
    render(
      store,
      dispatch,
      attributeTuple,
      eventTuple,
      self
    )
};