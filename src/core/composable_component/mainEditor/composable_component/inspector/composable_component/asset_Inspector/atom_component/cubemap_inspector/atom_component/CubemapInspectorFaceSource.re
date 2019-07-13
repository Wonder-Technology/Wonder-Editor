module Method = {
  let showSource = currentSource =>
    switch (currentSource) {
    | None => ReasonReact.null
    | Some(source) =>
      <img src=ImageType.convertImageElementToSrcImageElements(source)##src />
    };

  let loadAndSetSource = LoadAndSetCubemapInspectorFaceSourceEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;
};

let component = ReasonReact.statelessComponent("CubemapInspectorFaceSource");

let _renderSourceImage =
    (
      (uiState, dispatchFunc),
      cubemapTexture,
      currentSource,
      (setSourceFunc, setFormatFunc, setFaceImageDataFunc),
    ) =>
  <div className="texture-img">
    {Method.showSource(currentSource)}
    <input
      className="cubemap-faceSource-loadAndSetSource"
      type_="file"
      multiple=false
      onChange={
        e =>
          Method.loadAndSetSource(
            (uiState, dispatchFunc),
            (
              cubemapTexture,
              setSourceFunc,
              setFormatFunc,
              setFaceImageDataFunc,
            ),
            e,
          )
          |> WonderBsMost.Most.drain
          |> ignore
      }
    />
  </div>;

let render =
    (
      (uiState, dispatchFunc),
      (cubemapTexture, label, title, currentSource),
      (setSourceFunc, setFormatFunc, setFaceImageDataFunc),
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article className="wonder-cubemap-inspector-faceSource">
    <div
      className="item-header"
      title={
        switch (title) {
        | None => ""
        | Some(title) => title
        }
      }>
      {DomHelper.textEl(label)}
    </div>
    <div className="item-content item-texture">
      {
        _renderSourceImage(
          (uiState, dispatchFunc),
          cubemapTexture,
          currentSource,
          (setSourceFunc, setFormatFunc, setFaceImageDataFunc),
        )
      }
    </div>
  </article>;
};

let make =
    (
      ~uiState: AppStore.appState,
      ~dispatchFunc,
      ~cubemapTexture,
      ~label,
      ~currentSource,
      ~setSourceFunc,
      ~setFormatFunc,
      ~setFaceImageDataFunc,
      ~title: option(string)=?,
      _children,
    ) => {
  ...component,
  render: _ =>
    render(
      (uiState, dispatchFunc),
      (cubemapTexture, label, title, currentSource),
      (setSourceFunc, setFormatFunc, setFaceImageDataFunc),
    ),
};