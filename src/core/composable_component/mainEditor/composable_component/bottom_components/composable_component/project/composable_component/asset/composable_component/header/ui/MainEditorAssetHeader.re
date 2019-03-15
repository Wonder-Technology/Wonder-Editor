type state = {
  isSelectNav: bool,
  streamSubscription: option(WonderBsMost.Most.subscription),
};

type action =
  | SetSubscription(WonderBsMost.Most.subscription)
  | ToggleShowNav
  | BlurNav;

module Method = {
  let addFolder = AssetHeaderAddFolderEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let removeAssetNode = AssetHeaderRemoveNodeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let fileLoad = AssetHeaderFileLoadEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let addMaterial = AssetHeaderAddMaterialEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;
};

let component = ReasonReact.reducerComponent("MainEditorAssetHeader");

let _renderSelectNav =
    (
      uiState: AppStore.appState,
      dispatchFunc,
      languageType,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <div className="item-content">
    <div
      className="content-section"
      onClick={_e => Method.addFolder((uiState, dispatchFunc), (), ())}>
      <span className="section-header">
        {
          DomHelper.textEl(
            LanguageUtils.getAssetLanguageDataByType(
              "asset-folder",
              languageType,
            ),
          )
        }
      </span>
    </div>
    <div
      className="content-section"
      onClick={_e => Method.addMaterial((uiState, dispatchFunc), (), ())}>
      <div className="section-header">
        {
          DomHelper.textEl(
            LanguageUtils.getAssetLanguageDataByType(
              "asset-material",
              languageType,
            ),
          )
        }
      </div>
    </div>
  </div>;

let _renderRemoveItem =
    (
      uiState: AppStore.appState,
      dispatchFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <div
    className="asset-header-item"
    title="remove asset"
    onClick={
      _e =>
        CurrentNodeIdAssetEditorService.couldRemoveCurrentNode
        |> StateLogicService.getEditorState ?
          Method.removeAssetNode((uiState, dispatchFunc), (), ()) : ()
    }>
    {
      CurrentNodeIdAssetEditorService.couldRemoveCurrentNode
      |> StateLogicService.getEditorState ?
        <div className="item-canBeClick">
          <img src="./public/img/remove.png" />
        </div> :
        <div className="item-notBeClick">
          <img src="./public/img/notRemove.png" />
        </div>
    }
  </div>;

let render =
    (
      (uiState, dispatchFunc),
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) => {
  let languageType =
    LanguageUtils.getLanguageType(WindowType.window##wonderLanguage);

  <article key="assetHeader" className="wonder-asset-header">
    <div
      className="asset-header-item"
      title="add asset"
      onClick={_e => send(ToggleShowNav)}>
      <div className="item-canBeClick">
        <img src="./public/img/add.png" />
      </div>
      {
        state.isSelectNav ?
          _renderSelectNav(uiState, dispatchFunc, languageType, self) :
          ReasonReact.null
      }
    </div>
    {_renderRemoveItem(uiState, dispatchFunc, self)}
    <div className="asset-header-item">
      <div className="item-canBeClick" title="load asset">
        <img src="./public/img/load.png" />
        <input
          className="asset-fileLoad"
          type_="file"
          multiple=false
          onChange={
            e =>
              Method.fileLoad(
                (uiState, dispatchFunc),
                WonderBsJszip.Zip.create,
                e,
              )
              |> ignore
          }
        />
      </div>
    </div>
  </article>;
};

let reducer = (action, state) =>
  switch (action) {
  | SetSubscription(subscription) =>
    ReasonReact.Update({...state, streamSubscription: Some(subscription)})
  | ToggleShowNav =>
    state.isSelectNav ?
      ReasonReact.Update({...state, isSelectNav: false}) :
      ReasonReact.Update({...state, isSelectNav: true})
  | BlurNav => ReasonReact.Update({...state, isSelectNav: false})
  };

let make = (~uiState: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {isSelectNav: false, streamSubscription: None},
  reducer,
  didMount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    EventUtils.bindEventInDidMount(
      e => {
        let target = ReactEventRe.Form.target(e);
        let targetArray =
          DomHelper.getElementsByClassName("asset-header-item");

        DomUtils.isSpecificDomChildrenHasTargetDom(target, targetArray) ?
          () : send(BlurNav);
      },
      subscription => send(SetSubscription(subscription)),
    ),
  render: self => render((uiState, dispatchFunc), self),
  willUnmount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    EventUtils.unmountStreamSubscription(state.streamSubscription),
};