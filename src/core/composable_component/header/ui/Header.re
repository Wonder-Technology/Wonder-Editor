open ColorType;

open Color;

module Method = {
  let getStorageParentKey = () => "userExtension";
  /* todo use extension names instead of the name */

  let addExtension = text =>
    AppExtensionUtils.setExtension(getStorageParentKey(), text);

  let addGameObjectByType = HeaderAddGameObjectEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let disposeCurrentSceneTreeNode = HeaderDisposeGameObjectEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let buildOperateHistoryComponent = (store, dispatchFunc) =>
    <div className="header-item">
      <div className="component-item">
        <button
          onClick=(
            _e =>
              AllHistoryService.undoHistoryState(store, dispatchFunc)
              |> StateHistoryService.getAndRefreshStateForHistory
          )>
          (DomHelper.textEl("undo"))
        </button>
      </div>
      <div className="component-item">
        <button
          onClick=(
            _e =>
              AllHistoryService.redoHistoryState(store, dispatchFunc)
              |> StateHistoryService.getAndRefreshStateForHistory
          )>
          (DomHelper.textEl("redo"))
        </button>
      </div>
    </div>;

  let buildOperateGameObjectComponent = (store, dispatchFunc) =>
    <div className="header-item">
      <div className="component-item">
        <button
          onClick=(
            _e =>
              addGameObjectByType(
                (store, dispatchFunc),
                AddGameObjectType.Box,
                (),
              )
          )>
          (DomHelper.textEl("add box"))
        </button>
      </div>
      <div className="component-item">
        <button
          disabled=(
            SceneEditorService.getCurrentSceneTreeNode
            |> StateLogicService.getEditorState
            |> Js.Option.isNone
          )
          onClick=(
            _e => disposeCurrentSceneTreeNode((store, dispatchFunc), (), ())
          )>
          (DomHelper.textEl("dispose"))
        </button>
      </div>
    </div>;

  let buildOperateExtensionComponent = () =>
    <div className="header-item">
      <div className="component-item">
        <FileInput
          buttonText="show Input"
          onSubmit=(value => addExtension(value))
        />
      </div>
    </div>;

  let buildOperateControllerComponent = (store, dispatchFunc) =>
    <div className="header-item">
      <div className="component-item">
        <Switch
          openText="run"
          openFunc=(ControllerUtils.run(store))
          closeText="stop"
          closeFunc=(ControllerUtils.stop(dispatchFunc))
          isOpen=(
            SceneEditorService.getIsRun |> StateLogicService.getEditorState
          )
        />
      </div>
    </div>;

  let changeColor = value =>
    value
    |> convertColorObjToColorPickType
    |> getEngineColorRgbArr
    |> SceneEngineService.setAmbientLightColor
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let getColor = () =>
    SceneEngineService.getAmbientLightColor
    |> StateLogicService.getEngineStateToGetData
    |> getHexString;

  let closeColorPick = HeaderAmbientLightCloseColorPickEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

  let buildAmbientLightComponent = (store, dispatchFunc) =>
    <div className="header-item">
      <div className="component-item">
        <PickColorComponent
          key=(DomHelper.getRandomKey())
          label="ambient color : "
          getColorFunc=getColor
          changeColorFunc=changeColor
          closeColorPickFunc=(closeColorPick((store, dispatchFunc), ()))
        />
      </div>
    </div>;

  let buildEmptyGameObject = (store, dispatchFunc) =>
    <div className="header-item">
      <div className="component-item">
        <button
          onClick=(
            _e =>
              addGameObjectByType(
                (store, dispatchFunc),
                AddGameObjectType.EmptyGameObject,
                (),
              )
          )>
          (DomHelper.textEl("add empty gameObject"))
        </button>
      </div>
    </div>;

  let loadSceneWDB = HeaderUploadSceneWDBEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let buildOperateWDB = (store, dispatchFunc) =>
    <div className="header-item">
      <div className="component-item">
        <input
          className="file-upload"
          _type="file"
          multiple=false
          onChange=(e => loadSceneWDB((store, dispatchFunc), (), e))
        />
      </div>
      <div className="component-item">
        <button
          onClick=(
            _e =>
              HeaderExportUtils.exportPackage(
                WonderBsJszip.Zip.create,
                Fetch.fetch,
              )
              |> ignore
          )>
          (DomHelper.textEl("exportPackage"))
        </button>
      </div>
      <div className="component-item">
        <input
          className="file-upload"
          _type="file"
          multiple=false
          onChange=(
            e =>
              HeaderImportUtils.importPackage(
                WonderBsJszip.Zip.create,
                dispatchFunc,
                e,
              )
          )
        />
      </div>
    </div>;
};

let component = ReasonReact.statelessComponent("Header");

let render = (store: AppStore.appState, dispatchFunc, _self) =>
  <article key="header" className="wonder-header-component">
    (Method.buildOperateHistoryComponent(store, dispatchFunc))
    (Method.buildOperateGameObjectComponent(store, dispatchFunc))
    /* (Method.buildOperateExtensionComponent()) */
    (Method.buildOperateControllerComponent(store, dispatchFunc))
    (Method.buildAmbientLightComponent(store, dispatchFunc))
    (Method.buildEmptyGameObject(store, dispatchFunc))
    (Method.buildOperateWDB(store, dispatchFunc))
  </article>;

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  render: self => render(store, dispatchFunc, self),
};