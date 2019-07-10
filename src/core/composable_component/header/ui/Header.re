type navType =
  | None
  | File
  | Edit
  | Publish
  | Setting
  | Help
  | AssetBundle;

type state = {
  isSelectNav: bool,
  currentSelectNav: navType,
};

type action =
  | HoverNav(navType)
  | ToggleShowNav(navType)
  | BlurNav;

module Method = {
  /* let getStorageParentKey = () => "userExtension";
     /* todo use extension names instead of the name */

     let addExtension = text =>
       AppExtensionUtils.setExtension(getStorageParentKey(), text); */

  let isHeaderDom = target =>
    DomUtils.isSpecificDomChildrenHasTargetDom(
      target,
      DomHelper.getElementsByClassName("item-title"),
    );

  let isImportPackageDom = target =>
    DomUtils.isSpecificDomChildrenHasTargetDom(
      target,
      DomHelper.getElementsByClassName("section-fileLoad"),
    );
};

let component = ReasonReact.reducerComponent("Header");

let reducer = (action, state) =>
  switch (action) {
  | ToggleShowNav(selectNav) =>
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
      })

  | BlurNav =>
    ReasonReact.Update({...state, isSelectNav: false, currentSelectNav: None})

  | HoverNav(selectNav) =>
    state.isSelectNav ?
      ReasonReact.Update({...state, currentSelectNav: selectNav}) :
      ReasonReact.NoUpdate
  };

let render =
    (
      uiState: AppStore.appState,
      dispatchFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article key="header" className="wonder-header-component">
    <div className="header-nav">
      <HeaderFile
        uiState
        dispatchFunc
        isFileNav={state.currentSelectNav === File}
        toggleShowNavFunc={() => send(ToggleShowNav(File))}
        hoverNavFunc={() => send(HoverNav(File))}
      />
      <HeaderEdit
        uiState
        dispatchFunc
        isEditNav={state.currentSelectNav === Edit}
        toggleShowNavFunc={() => send(ToggleShowNav(Edit))}
        hoverNavFunc={() => send(HoverNav(Edit))}
        closeNavFunc={() => send(BlurNav)}
      />
      <HeaderPublish
        uiState
        dispatchFunc
        isPublishNav={state.currentSelectNav === Publish}
        toggleShowNavFunc={() => send(ToggleShowNav(Publish))}
        hoverNavFunc={() => send(HoverNav(Publish))}
      />
      <HeaderSetting
        uiState
        dispatchFunc
        isSettingNav={state.currentSelectNav === Setting}
        isShowSceneModal=false
        toggleShowNavFunc={() => send(ToggleShowNav(Setting))}
        hoverNavFunc={() => send(HoverNav(Setting))}
      />
      <HeaderHelp
        uiState
        dispatchFunc
        isHelpNav={state.currentSelectNav === Help}
        toggleShowNavFunc={() => send(ToggleShowNav(Help))}
        hoverNavFunc={() => send(HoverNav(Help))}
      />
      <HeaderAssetBundle
        uiState
        dispatchFunc
        isAssetBundleNav={state.currentSelectNav === AssetBundle}
        toggleShowNavFunc={() => send(ToggleShowNav(AssetBundle))}
        hoverNavFunc={() => send(HoverNav(AssetBundle))}
      />
      <HeaderNotice uiState dispatchFunc />
    </div>
  </article>;

let make = (~uiState: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {isSelectNav: false, currentSelectNav: None},
  reducer,
  didMount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    EventHelper.addEventListener(
      DomHelper.document,
      "click",
      e => {
        let target = ReactEventRe.Form.target(e);

        Method.isHeaderDom(target) || Method.isImportPackageDom(target) ?
          () : send(BlurNav);
      },
    ),
  render: self => render(uiState, dispatchFunc, self),
};