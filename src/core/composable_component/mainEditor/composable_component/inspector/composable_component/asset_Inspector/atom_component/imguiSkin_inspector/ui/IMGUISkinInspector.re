type buttonSkinData = IMGUIType.buttonSkinData;

type textAreaInputValue = string;

type allCustomStyleData = IMGUIType.allCustomStyleData;

type state = {
  buttonSkinData,
  allCustomStyleDataStr: textAreaInputValue,
  originSkinName: string,
};

type action =
  | ChangeButtonSkin(buttonSkinData)
  | ChangeAllCustomStyle(textAreaInputValue)
  | Submit(string);

module Method = {
  let changeSkinName = (newName, renameFunc) => renameFunc(newName);

  let submitButtonSkin = (sendFunc, buttonSkinData) =>
    sendFunc(ChangeButtonSkin(buttonSkinData));

  let buildAllCustomStyleDataInputValue = allCustomStyleData =>
    /* let allCustomStyleDataStr =
         allCustomStyleData |> SerializeService.serializeHashMap;

         {j|
         (function() {
             var allCustomStyleData = $allCustomStyleDataStr;

             return allCustomStyleData;
         }());
       |j} */
    allCustomStyleData |> SerializeService.serializeHashMap;

  /* {|
       (function() {
           var allCustomStyleData = {};

           //todo need rewrite
           var firstSingleCustomStyleData = {};

           firstSingleCustomStyleData["color"] = [1.0,0.5,0.1];

           allCustomStyleData["firstSingleCustomStyleData"] = firstSingleCustomStyleData;

           return allCustomStyleData;
       }());
     |}; */

  /* let _convertInputValueStrToAllCustomStyleData: string => allCustomStyleData = [%raw
       inputValueStr => {|
            return eval( inputValueStr);
            |}
     ]; */

  let _convertInputValueStrToAllCustomStyleData = allCustomStyleDataStr =>
    allCustomStyleDataStr |> SerializeService.deserializeHashMap;

  let submitAllCustomStyle = (sendFunc, allCustomStyleDataStr) =>
    sendFunc(ChangeAllCustomStyle(allCustomStyleDataStr));

  let submit =
      (
        nodeId,
        {buttonSkinData, allCustomStyleDataStr, originSkinName},
        sendFunc,
      ) => {
    let allCustomStyleData =
      _convertInputValueStrToAllCustomStyleData(allCustomStyleDataStr);

    let editorState = StateEditorService.getState();

    let skinName =
      IMGUISkinNodeAssetEditorService.getNodeName(nodeId, editorState);

    editorState
    |> IMGUISkinNodeAssetEditorService.setNodeData(
         nodeId,
         IMGUISkinNodeAssetService.buildNodeData(
           ~name=skinName,
           ~buttonSkinData,
           ~allCustomStyleData,
         ),
       )
    |> StateEditorService.setState
    |> ignore;

    let engineState = StateEngineService.unsafeGetState();
    let engineState =
      ExtendIMGUIEngineService.hasSkinData(originSkinName, engineState) ?
        ExtendIMGUIEngineService.updateSkinData(
          originSkinName,
          skinName,
          buttonSkinData,
          allCustomStyleData,
          engineState,
        ) :
        engineState;

    StateEngineService.setState(engineState) |> ignore;

    sendFunc(Submit(skinName));
  };
};

let component = ReasonReact.reducerComponent("IMGUISkinInspector");

let reducer = action =>
  switch (action) {
  | ChangeButtonSkin(buttonSkinData) => (
      state => ReasonReact.Update({...state, buttonSkinData})
    )
  | ChangeAllCustomStyle(allCustomStyleDataStr) => (
      state => ReasonReact.Update({...state, allCustomStyleDataStr})
    )
  | Submit(originSkinName) => (
      state => ReasonReact.Update({...state, originSkinName})
    )
  };

let render =
    (nodeId, renameFunc, {state, send}: ReasonReact.self('a, 'b, 'c)) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="IMGUISkinInspector" className="wonder-imguiSkin-inspector">
    <h1> {DomHelper.textEl("IMGUI Skin")} </h1>
    <hr />
    <StringInput
      label="Name"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "imguiSkin-name-describe",
          languageType,
        )
      }
      defaultValue={state.originSkinName}
      onBlur={value => Method.changeSkinName(value, renameFunc)}
      canBeNull=false
    />
    <IMGUISkinButtonInspector
      currentNodeId=nodeId
      buttonSkinData={state.buttonSkinData}
      submitFunc={Method.submitButtonSkin(send)}
    />
    <TextAreaInput
      label="AllCustomStyleData"
      defaultInputValue={state.allCustomStyleDataStr}
      onBlurFunc={Method.submitAllCustomStyle(send)}
    />
    <button onClick={_e => Method.submit(nodeId, state, send)}>
      {DomHelper.textEl("submit all")}
    </button>
  </article>;
};

let make =
    (
      ~uiState,
      ~dispatchFunc,
      ~currentNodeId,
      ~name,
      ~buttonSkinData,
      ~allCustomStyleData,
      ~renameFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {
    originSkinName: name,
    buttonSkinData,
    allCustomStyleDataStr:
      Method.buildAllCustomStyleDataInputValue(allCustomStyleData),
  },
  reducer,
  render: self => render(currentNodeId, renameFunc, self),
};