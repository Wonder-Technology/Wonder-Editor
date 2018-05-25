open AssetTreeNodeType;

open FileType;

open AssetNodeType;

type state = {
  inputField: ref(option(Dom.element)),
  inputValue: string,
  originalName: string,
  /* TODO remove, instead judge in "diable" */
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
    /* editorState
       |> AssetEditorService.setNodeMap(
            nodeMap
            /* TODO all: use SparseMapService.copy(get code from dingding, paste it to SparseMapService) */
            |> Js.Array.copy
            |> WonderCommonlib.SparseMapService.set(
                 nodeId,
                 nodeMap
                 |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
                 |> AssetTreeNodeUtils.renameNodeResult(value)
               )
          )
       |> StateEditorService.setState; */
    editorState
    |> AssetNodeMapEditorService.setResult(
         nodeId,
         editorState
         |> AssetNodeMapEditorService.unsafeGetNodeMap
         |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
         |> AssetTreeNodeUtils.renameNodeResult(value)
       );
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
        /* TODO use OptionService.unsafeGet */
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
    | "" => ReasonReact.Update({...state, inputValue: state.originalName})
    | value =>
      ReasonReact.UpdateWithSideEffects(
        {...state, originalName: value},
        ((_self) => Method.triggerBlur(dispatch, value, nodeId))
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
    originalName: nodeResult.name,
    isAssetTreeRootNode:
      AssetUtils.isIdEqual(
        AssetTreeRootEditorService.getRootTreeNodeId |> StateLogicService.getEditorState,
        nodeId
      )
  },
  reducer: reducer(dispatch, nodeId),
  render: (self) => render(nodeResult, self)
};