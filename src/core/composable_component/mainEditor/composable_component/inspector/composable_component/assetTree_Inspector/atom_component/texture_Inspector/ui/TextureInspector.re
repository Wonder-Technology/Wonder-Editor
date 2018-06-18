external convertUint8ToInt : Js.Typed_array.Uint8Array.elt => int =
  "%identity";

open SelectType;

type state = {
  nameInput: string,
  originalName: string,
};

type action =
  | BlurName
  | ChangeName(string);

module Method = {
  let changeName = event => {
    let inputVal = ReactDOMRe.domElementToObj(
                     ReactEventRe.Form.target(event),
                   )##value;
    ChangeName(inputVal);
  };

  let changeWrapS = (textureId, value) => {
    WonderLog.Log.print(("select warps ", value)) |> ignore;
    BasicSourceTextureEngineService.setWrapS(value, textureId)
    |> StateLogicService.getAndRefreshEditAndRunEngineState;
  };

  let changeWrapT = (textureId, value) => {
    WonderLog.Log.print(("select warpt ", value)) |> ignore;
    BasicSourceTextureEngineService.setWrapT(value, textureId)
    |> StateLogicService.getAndRefreshEditAndRunEngineState;
  };

  let _getWrapOptions = () => [|
    {key: 0, value: "REPEAT"},
    {key: 1, value: "MIRRORED_REPEAT"},
    {key: 2, value: "CLAMP_TO_EDGE"},
  |];

  let renderWarpSSelect = textureId =>
    <Select
      label="WarpS Mode"
      options=(_getWrapOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getWrapS(textureId)
        |> StateLogicService.getEngineStateToGetData
        |> convertUint8ToInt
      )
      onChange=(changeWrapS(textureId))
    />;

  let renderWarpTSelect = textureId =>
    <Select
      label="WarpT Mode"
      options=(_getWrapOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getWrapT(textureId)
        |> StateLogicService.getEngineStateToGetData
        |> convertUint8ToInt
      )
      onChange=(changeWrapT(textureId))
    />;
  let _getFilterOptions = () => [|
    {key: 0, value: "NEAREST"},
    {key: 1, value: "NEARESTMIPMAPNEAREST"},
    {key: 2, value: "NEARESTMIPMAPLINEAR"},
    {key: 3, value: "LINEAR"},
    {key: 4, value: "LINEARMIPMAPNEAREST"},
    {key: 5, value: "LINEARMIPMAPLINEAR"},
  |];

  let changeFilterMag = (textureId, value) => {
    WonderLog.Log.print(("select filter mag ", value)) |> ignore;
    BasicSourceTextureEngineService.setMagFilter(value, textureId)
    |> StateLogicService.getAndRefreshEditAndRunEngineState;
  };

  let changeFilterMin = (textureId, value) => {
    WonderLog.Log.print(("select filter min ", value)) |> ignore;
    BasicSourceTextureEngineService.setMinFilter(value, textureId)
    |> StateLogicService.getAndRefreshEditAndRunEngineState;
  };

  let renderFilterMagSelect = textureId =>
    <Select
      label="Filter Mag Mode"
      options=(_getFilterOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getMagFilter(textureId)
        |> StateLogicService.getEngineStateToGetData
        |> convertUint8ToInt
      )
      onChange=(changeFilterMag(textureId))
    />;

  let renderFilterMinSelect = textureId =>
    <Select
      label="Filter Min Mode"
      options=(_getFilterOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getMinFilter(textureId)
        |> StateLogicService.getEngineStateToGetData
        |> convertUint8ToInt
      )
      onChange=(changeFilterMin(textureId))
    />;
};

let component = ReasonReact.reducerComponent("TextureInspector");

let reducer = (dispatchFunc, nodeId, action) =>
  switch (action) {
  | ChangeName(value) => (
      state => ReasonReact.Update({...state, nameInput: value})
    )
  | BlurName => (
      state =>
        switch (state.nameInput) {
        | "" => ReasonReact.Update({...state, nameInput: state.originalName})
        | value =>
          ReasonReactUtils.updateWithSideEffects(
            {...state, originalName: value}, _state =>
            AssetTreeInspectorUtils.renameAssetTreeNode(
              dispatchFunc,
              value,
              nodeId,
            )
            |> StateLogicService.getEditorState
          )
        }
    )
  };

let render = (textureId, {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article key="TextureInspector" className="wonder-texture-assetTree">
    <div className="">
      <h1> (DomHelper.textEl("Texture")) </h1>
      <hr />
      <div className="">
        <span className=""> (DomHelper.textEl("name:")) </span>
        <input
          className="input-component float-input"
          _type="text"
          value=state.nameInput
          onChange=(_e => send(Method.changeName(_e)))
          onBlur=(_e => send(BlurName))
        />
      </div>
      <div className=""> (Method.renderWarpSSelect(textureId)) </div>
      <div className=""> (Method.renderWarpTSelect(textureId)) </div>
      <div className=""> (Method.renderFilterMagSelect(textureId)) </div>
      <div className=""> (Method.renderFilterMinSelect(textureId)) </div>
    </div>
  </article>;

let make =
    (
      ~store: AppStore.appState,
      ~dispatchFunc,
      ~name,
      ~nodeId,
      ~textureId,
      _children,
    ) => {
  ...component,
  initialState: () => {nameInput: name, originalName: name},
  reducer: reducer(dispatchFunc, nodeId),
  render: self => render(textureId, self),
};