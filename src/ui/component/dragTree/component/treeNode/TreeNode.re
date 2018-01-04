Css.importCss("./css/treeNode.css");

external toDomObj : ReactEventRe.Mouse.t => Js.t({..}) = "%identity";

type state = {currentStyle: ReactDOMRe.Style.t};

type action =
  | DragEnter
  | DragLeave
  | DragStart;

module Method = {
  let handleClick = (onSelect, uid, event) => onSelect(uid);
  let handleDragStart = (uid, event) => {
    let e = toDomObj(event);
    e##stopPropagation();
    e##dataTransfer##effectAllowed#="move";
    e##dataTransfer##setData("dragedId", uid);
    DragStart
  };
  let handleDragEnter = (_event) => DragEnter;
  let handleDragLeave = (_event) => DragLeave;
  let handleDragOver = (event) => {
    let e = toDomObj(event);
    e##preventDefault()
  };
  let handleDrop = (uid, onDropFinish, event) => {
    let e = toDomObj(event);
    let dragedId = e##dataTransfer##getData("dragedId");
    onDropFinish(uid, dragedId)
  };
};

let component = ReasonReact.reducerComponent("TreeNode");

let make =
    (
      ~uid: int,
      ~name: string,
      ~onSelect: int => unit,
      ~onDropFinish: (int, int) => unit,
      ~treeChildren: option(array(ReasonReact.reactElement))=?,
      _children
    ) => {
  ...component,
  initialState: () => {currentStyle: ReactDOMRe.Style.make(~opacity="1", ())},
  reducer: (action, state) =>
    switch action {
    | DragStart =>
      let style = ReactUtils.addStyleProp("opacity", "0.2", state.currentStyle);
      ReasonReact.Update({...state, currentStyle: style})
    | DragEnter =>
      let style = ReactUtils.addStyleProp("border", "2px dashed blue", state.currentStyle);
      ReasonReact.Update({...state, currentStyle: style})
    | DragLeave =>
      ReasonReact.Update({
        ...state,
        currentStyle: ReactDOMRe.Style.unsafeAddProp(state.currentStyle, "border", "0")
      })
    },
  render: ({state, reduce}) =>
    <ul
      className="wonder-tree-node"
      draggable=(Js.Boolean.to_js_boolean(true))
      onDragStart=(reduce(Method.handleDragStart(uid)))>
      <li
        style=state.currentStyle
        onDragEnter=(reduce(Method.handleDragEnter))
        onDragLeave=(reduce(Method.handleDragLeave))
        onDragOver=(reduce(Method.handleDragOver))
        onDrop=(Method.handleDrop(uid, onDropFinish))
        onClick=((e) => Method.handleClick(onSelect, uid, e))>
        (DomHelper.textEl(name))
      </li>
      (
        switch treeChildren {
        | None => ReasonReact.nullElement
        | Some(trees) => ReasonReact.arrayToElement(trees)
        }
      )
    </ul>
};