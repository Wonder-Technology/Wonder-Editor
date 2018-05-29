open DragEventUtils;

Css.importCss("./css/treeNode.css");

type state = {style: ReactDOMRe.Style.t};

let component = ReasonReact.reducerComponent("TreeNode");

let reducer = (eventHandleTuple, action, state) =>
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
    let (_, onDrop, _, _) = eventHandleTuple;
    let (sign, _) =
      StateEditorService.getState() |> CurrentDragSourceEditorService.getCurrentDragSource;
    ReasonReact.SideEffects(((_self) => onDrop((targetId, removedId, sign))))
  | Nothing => ReasonReact.NoUpdate
  };

let render =
    (
      attributeTuple,
      eventHandleTuple,
      treeChildren,
      {state, reduce}: ReasonReact.self('a, 'b, 'c)
    ) => {
    let (uid, name, isSelected, isActive,dragImg, sign, icon, dragable) = attributeTuple;
  let (onSelect, _, handleSign, handleRelationError) = eventHandleTuple;
  let _buildNotDragableUl = (content) =>
    <ul className="wonder-tree-node">
      content
      (
        switch treeChildren {
        | None => ReasonReact.nullElement
        | Some(trees) => ReasonReact.arrayToElement(trees)
        }
      )
    </ul>;
  let _buildDragableUl = (content) =>
    <ul
      className="wonder-tree-node"
      draggable=Js.true_
      onDragStart=(reduce(DragEventUtils.handleDragStart(uid, sign,DomHelper.createElement("img"))))
      onDragEnd=(reduce(DragEventUtils.handleDrageEnd))>
      content
      (
        switch treeChildren {
        | None => ReasonReact.nullElement
        | Some(trees) => ReasonReact.arrayToElement(trees)
        }
      )
    </ul>;
  let _getContent = () =>
    <li
      style=state.style
      onClick=((_event) => onSelect(uid))>
    <div className="item-ground"
      draggable=Js.true_
      onDragEnter=(reduce(DragEventUtils.handleDragEnter(uid, handleSign, handleRelationError )))
      onDragLeave=(reduce(DragEventUtils.handleDragLeave(uid, handleSign, handleRelationError)))
      onDragOver=DragEventUtils.handleDragOver
      onDrop=(reduce(DragEventUtils.handleDrop(uid, handleRelationError)))
    ></div>
      (
        switch icon {
        | None => ReasonReact.nullElement
        | Some(icon) => <img src=icon />
        }
      )
      (DomHelper.textEl(name))
    </li>;
  switch dragable {
  | None => _buildDragableUl(_getContent())
  | Some(dragable) =>
    dragable ? _buildDragableUl(_getContent()) : _buildNotDragableUl(_getContent())
  }
};

let make =
    (
      ~attributeTuple,
      ~eventHandleTuple,
      ~treeChildren: option(array(ReasonReact.reactElement))=?,
      _children
    ) => {
  ...component,
  initialState: () => {
    let (_uid, _name, isSelected, isActive,dragImg, sign, icon, dragable) = attributeTuple;
    isSelected ?
      isActive ?
        {style: ReactDOMRe.Style.make(~background="red", ())} :
        {style: ReactDOMRe.Style.make(~background="#c0c0c0", ())} :
      {style: ReactDOMRe.Style.make(~border="1px solid red", ())}
  },
  reducer: reducer(eventHandleTuple),
  render: (self) =>
    render(attributeTuple, eventHandleTuple, treeChildren, self)
};