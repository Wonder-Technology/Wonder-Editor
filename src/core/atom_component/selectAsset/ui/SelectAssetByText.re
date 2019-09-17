type assetData;

type assetRelatedData;

type state = {
  isShowAssetGroup: bool,
  currentAssetDataOpt: option(assetData),
};

external convertAssetDataTypeToInt: assetData => int = "%identity";

external convertIntToAssetDataType: int => assetData = "%identity";

external convertAssetDataTypeToString: assetData => string = "%identity";

external convertStringToAssetDataType: string => assetData = "%identity";

external convertAssetRelatedDataTypeToInt: assetRelatedData => int =
  "%identity";

external convertIntToAssetRelatedDataType: int => assetRelatedData =
  "%identity";

type materialAssetData = WonderEditor.MaterialDataAssetType.materialTuple;

type materialAssetRelatedData = (
  option(WonderEditor.NodeAssetType.nodeId),
  WonderEditor.MaterialDataAssetType.materialTuple,
);

external convertAssetDataTypeToMaterialAssetData:
  assetData => materialAssetData =
  "%identity";

external convertMaterialAssetDataToAssetDataType:
  materialAssetData => assetData =
  "%identity";

external convertAssetRelatedDataTypeToMaterialAssetRelatedData:
  assetRelatedData => materialAssetRelatedData =
  "%identity";

external convertMaterialAssetRelatedDataToAssetRelatedDataType:
  materialAssetRelatedData => assetRelatedData =
  "%identity";

external convertAssetRelatedDataTypeToNode:
  assetRelatedData => TreeAssetType.tree =
  "%identity";

external convertNodeToAssetRelatedDataType:
  TreeAssetType.tree => assetRelatedData =
  "%identity";

type scriptAttributeAssetData = {
  /* currentScript: Wonderjs.ScriptType.script, */
  lastScriptAttributeNodeId: option(int),
  unUsedScriptAttributeNodeIds: array(NodeAssetType.nodeId),
};

type scriptAttributeAssetRelatedData = scriptAttributeAssetData;

external convertAssetDataTypeToScriptAttributeAssetData:
  assetData => scriptAttributeAssetData =
  "%identity";

external convertScriptAttributeAssetDataToAssetDataType:
  scriptAttributeAssetData => assetData =
  "%identity";

external convertAssetRelatedDataTypeToScriptAttributeAssetRelatedData:
  assetRelatedData => scriptAttributeAssetRelatedData =
  "%identity";

external convertScriptAttributeAssetRelatedDataToAssetRelatedDataType:
  scriptAttributeAssetRelatedData => assetRelatedData =
  "%identity";

external convertScriptAttributeAssetRelatedDataTypeToScriptAttributeAssetData:
  scriptAttributeAssetRelatedData => scriptAttributeAssetData =
  "%identity";

type action =
  | ChangeAsset(assetRelatedData)
  | ShowAssetGroup
  | HideAssetGroup
  | RemoveAsset;

let component = ReasonReact.reducerComponent("SelectAssetByText");

let reducer =
    (
      changeAssetFunc,
      getCurrentAssetDataFromAssetRelatedDataFunc,
      action,
      state,
    ) =>
  switch (action) {
  | ChangeAsset(assetRelatedData) =>
    switch (state.currentAssetDataOpt) {
    | None =>
      ReasonReactUtils.updateWithSideEffects(
        {
          ...state,
          currentAssetDataOpt:
            Some(
              getCurrentAssetDataFromAssetRelatedDataFunc(assetRelatedData),
            ),
        },
        _state =>
        changeAssetFunc(None, assetRelatedData)
      )
    | Some(sourceAssetData) =>
      let currentAssetData =
        getCurrentAssetDataFromAssetRelatedDataFunc(assetRelatedData);

      sourceAssetData === currentAssetData ?
        ReasonReact.NoUpdate :
        ReasonReactUtils.updateWithSideEffects(
          {...state, currentAssetDataOpt: Some(currentAssetData)}, _state =>
          changeAssetFunc(Some(sourceAssetData), assetRelatedData)
        );
    }
  | ShowAssetGroup => ReasonReact.Update({...state, isShowAssetGroup: true})
  | HideAssetGroup => ReasonReact.Update({...state, isShowAssetGroup: false})
  | RemoveAsset => ReasonReact.Update({...state, currentAssetDataOpt: None})
  };

let render =
    (
      (label, title, assetGroupHeader),
      (
        isCurrentAssetFunc,
        getAssetTextFunc,
        removeAssetFuncOpt: option(unit => unit),
        findAllAssetRelatedDataFunc,
        getTextFunc,
      ),
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article className="selectAssetByText-item">
    <SelectAssetGroupBar
      headerText=label
      headerTitle=title
      assetText={
        getAssetTextFunc(state.currentAssetDataOpt)
        |> StateLogicService.getEngineStateToGetData
      }
      selectAssetFunc={send => send(ShowAssetGroup)}
      removeAssetFuncOpt={
        switch (removeAssetFuncOpt) {
        | None => None
        | Some(removeAssetFunc) =>
          Some(
            (
              send => {
                removeAssetFunc();

                send(RemoveAsset);
              }
            ),
          )
        }
      }
      sendFunc=send
    />
    {
      state.isShowAssetGroup ?
        <SelectAssetGroupWidget
          headerText=assetGroupHeader
          sendFunc=send
          clickHideGroupButtonFunc={send => send(HideAssetGroup)}
          findAllAssetRelatedDataFunc
          isCurrentAssetFunc={
            assetRelatedData =>
              switch (state.currentAssetDataOpt) {
              | None => false
              | Some(currentAssetData) =>
                isCurrentAssetFunc(currentAssetData, assetRelatedData)
              }
          }
          changeAssetFunc={
            (assetRelatedData, send) => send(ChangeAsset(assetRelatedData))
          }
          getTextFunc
        /> :
        ReasonReact.null
    }
  </article>;
};

let make =
    (
      ~label,
      ~assetGroupHeader,
      ~currentAssetDataOpt,
      ~getCurrentAssetDataFromAssetRelatedDataFunc,
      ~getAssetTextFunc,
      ~isCurrentAssetFunc,
      ~findAllAssetRelatedDataFunc,
      ~changeAssetFunc,
      ~getTextFunc,
      ~isShowAssetGroup,
      ~title,
      ~removeAssetFuncOpt=None,
      _children,
    ) => {
  ...component,
  initialState: () => {isShowAssetGroup, currentAssetDataOpt},
  reducer:
    reducer(changeAssetFunc, getCurrentAssetDataFromAssetRelatedDataFunc),
  render: self =>
    render(
      (label, title, assetGroupHeader),
      (
        isCurrentAssetFunc,
        getAssetTextFunc,
        removeAssetFuncOpt,
        findAllAssetRelatedDataFunc,
        getTextFunc,
      ),
      self,
    ),
};