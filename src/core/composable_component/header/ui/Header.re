open ColorType;

open Color;

type navType =
  | None
  | File
  | Edit;

type state = {
  isSelectNav: bool,
  currentSelectNav: navType,
};

type action =
  | HoverNav(navType)
  | FocusNav(navType)
  | BlurNav;

module Method = {
  let getStorageParentKey = () => "userExtension";
  /* todo use extension names instead of the name */

  let addExtension = text =>
    AppExtensionUtils.setExtension(getStorageParentKey(), text);

  let addGameObjectByType = HeaderAddGameObjectEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let disposeCurrentSceneTreeNode = HeaderDisposeGameObjectEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let buildFileComponent = (state, send, store, dispatchFunc) => {
    let className =
      state.currentSelectNav === File ?
        "item-title item-active" : "item-title";
    <div className="header-item">
      <div className="component-item">
        <span
          className
          onClick=(e => send(FocusNav(File)))
          onMouseOver=(e => send(HoverNav(File)))>
          (DomHelper.textEl("File"))
        </span>
      </div>
      (
        state.currentSelectNav === File ?
          <div className="item-content">
            <div
              className="content-section"
              onClick=(
                _e =>
                  AllHistoryService.undoHistoryState(store, dispatchFunc)
                  |> StateHistoryService.getAndRefreshStateForHistory
              )>
              <span className="section-header">
                (DomHelper.textEl("Undo"))
              </span>
              <span className="section-tail">
                (DomHelper.textEl("Ctrl+Z"))
              </span>
            </div>
            <div
              className="content-section"
              onClick=(
                _e =>
                  AllHistoryService.redoHistoryState(store, dispatchFunc)
                  |> StateHistoryService.getAndRefreshStateForHistory
              )>
              <span className="section-header">
                (DomHelper.textEl("Redo"))
              </span>
              <span className="section-tail">
                (DomHelper.textEl("Ctrl+U"))
              </span>
            </div>
          </div> :
          ReasonReact.null
      )
    </div>;
  };

  let buildEditComponent = (state, send, store, dispatchFunc) => {
    let className =
      state.currentSelectNav === Edit ?
        "item-title item-active" : "item-title";
    <div className="header-item">
      <div className="component-item">
        <span
          className
          onClick=(
            e => state.isSelectNav ? send(BlurNav) : send(FocusNav(Edit))
          )
          onMouseOver=(e => send(HoverNav(Edit)))>
          (DomHelper.textEl("Edit"))
        </span>
      </div>
      (
        state.currentSelectNav === Edit ?
          <div className="item-content item-edit">
            <div className="content-section">
              <input
                className="section-fileLoad"
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
              <span className="section-header">
                (DomHelper.textEl("Import Package"))
              </span>
            </div>
            <div
              className="content-section"
              onClick=(
                _e =>
                  HeaderExportUtils.exportPackage(
                    WonderBsJszip.Zip.create,
                    Fetch.fetch,
                  )
                  |> ignore
              )>
              <span className="section-header">
                (DomHelper.textEl("Export Package"))
              </span>
            </div>
          </div> :
          ReasonReact.null
      )
    </div>;
  };

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

  /* let buildOperateExtensionComponent = () =>
     <div className="header-item">
       <div className="component-item">
         <FileInput
           buttonText="show Input"
           onSubmit=(value => addExtension(value))
         />
       </div>
     </div>; */

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
  /* let buildEmptyGameObject = (store, dispatchFunc) =>
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
     </div>; */
};

let component = ReasonReact.reducerComponent("Header");

let reducer = (action, state) =>
  switch (action) {
  | FocusNav(selectNav) =>
    WonderLog.Log.print(("click", state.isSelectNav)) |> ignore;

    state.isSelectNav ?
      ReasonReact.Update({
        ...state,
        isSelectNav: false,
        currentSelectNav: None,
      }) :
      ReasonReact.Update({
        ...state,
        isSelectNav: true,
        currentSelectNav: selectNav,
      });

  | BlurNav =>
    ReasonReact.Update({...state, isSelectNav: false, currentSelectNav: None})

  | HoverNav(selectNav) =>
    state.isSelectNav ?
      ReasonReact.Update({...state, currentSelectNav: selectNav}) :
      ReasonReact.NoUpdate
  };

let render =
    (
      store: AppStore.appState,
      dispatchFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article key="header" className="wonder-header-component">
    <div className="header-nav">
      (Method.buildFileComponent(state, send, store, dispatchFunc))
      (Method.buildEditComponent(state, send, store, dispatchFunc))
    </div>
    <div className="header-controller">

    </div>
  </article>;
/* (Method.buildAmbientLightComponent(store, dispatchFunc)) */

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {isSelectNav: false, currentSelectNav: None},
  reducer,
  didMount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    DomHelper.addEventListener(
      DomHelper.document,
      "click",
      e => {
        let target = ReactEventRe.Form.target(e);
        let targetArray = DomHelper.getElementsByClassName("item-title");
        let targetArrayLen = targetArray |> Js.Array.length;
        let isIncludeTarget = ref(false);
        for (x in 0 to targetArrayLen - 1) {
          target === targetArray[x] ? isIncludeTarget := true : ();
        };

        isIncludeTarget^ ? () : send(BlurNav);
      },
    ),
  render: self => render(store, dispatchFunc, self),
};