open AssetTreeNodeType;

open FileType;

type state = {
  inputField: ref(option(Dom.element)),
  inputValue: string,
  primitiveName: string,
  isAssetTreeRootNode: bool
};

type action =
  | Blur
  | Change(string);

let setInputNodeRef = (value, {ReasonReact.state}) => state.inputField := Js.Null.to_opt(value);

module Method = {
  let change = (event) => {
    let inputVal = ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value;
    Change(inputVal)
  };
  let blur = (_event) => Blur;
  let triggerBlur = (dispatch, value, nodeId) => {
    let editorState = StateEditorService.getState();
    let nodeMap = editorState |> AssetEditorService.unsafeGetNodeMap;
    editorState
    |> AssetEditorService.setNodeMap(
         nodeMap
         |> Js.Array.copy
         |> WonderCommonlib.SparseMapService.set(
              nodeId,
              nodeMap
              |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
              |> AssetTreeNodeUtils.renameNodeResult(value)
            )
       )
    |> StateEditorService.setState;
    dispatch(AppStore.ReLoad)
  };
  let showFolderInfo = (nodeResult, {state, handle, reduce}: ReasonReact.self('a, 'b, 'c)) =>
    switch nodeResult.type_ {
    | Folder =>
      <div className="">
        <h1> (DomHelper.textEl("Folder")) </h1>
        <hr />
        <span className=""> (DomHelper.textEl("name:")) </span>
        <input
          ref=(handle(setInputNodeRef))
          className="input-component float-input"
          _type="text"
          value=state.inputValue
          disabled=(state.isAssetTreeRootNode ? Js.true_ : Js.false_)
          onChange=(reduce(change))
          onBlur=(reduce(blur))
        />
      </div>
    | Image =>
      <div className="">
        <h1> (DomHelper.textEl("Image")) </h1>
        <hr />
        <span className=""> (DomHelper.textEl("name:")) </span>
        <input
          ref=(handle(setInputNodeRef))
          className="input-component float-input"
          _type="text"
          value=state.inputValue
          onChange=(reduce(change))
          onBlur=(reduce(blur))
        />
      </div>
    | Json =>
      <div>
        <h1> (DomHelper.textEl("Json")) </h1>
        <hr />
        <span className=""> (DomHelper.textEl("name:")) </span>
        <input
          ref=(handle(setInputNodeRef))
          className="input-component float-input"
          _type="text"
          value=state.inputValue
          onChange=(reduce(change))
          onBlur=(reduce(blur))
        />
        <p> (DomHelper.textEl(nodeResult.result |> Js.Option.getExn)) </p>
      </div>
    };
};

let component = ReasonReact.reducerComponent("AssetTreeInspector");

let reducer = (dispatch, nodeId, action, state) =>
  switch action {
  | Change(value) => ReasonReact.Update({...state, inputValue: value})
  | Blur =>
    switch state.inputValue {
    | "" => ReasonReact.Update({...state, inputValue: state.primitiveName})
    | value =>
      ReasonReact.UpdateWithSideEffects(
        {...state, primitiveName: value},
        ((_slef) => Method.triggerBlur(dispatch, value, nodeId))
      )
    }
  };

let render = (nodeResult, self) =>
  <article key="AssetTreeInspector" className="inspector-component">
    (Method.showFolderInfo(nodeResult, self))
  </article>;

let make = (~store: AppStore.appState, ~dispatch, ~nodeId, ~nodeResult, _children) => {
  ...component,
  initialState: () => {
    inputValue: nodeResult.name,
    inputField: ref(None),
    primitiveName: nodeResult.name,
    isAssetTreeRootNode:
      AssetUtils.isIdEqual(
        AssetUtils.getRootTreeNodeId |> StateLogicService.getEditorState,
        nodeId
      )
  },
  reducer: reducer(dispatch, nodeId),
  render: (self) => render(nodeResult, self)
};