type buttonSkinData = WonderImgui.SkinType.buttonSkinData;

type userInputValue = string;

type allCustomStyleData = WonderImgui.SkinType.allCustomStyleData;

type state = {
  buttonSkinData,
  allCustomStyleDataStr: userInputValue,
  skinName: string,
  originSkinName: string,
};

type action =
  | ChangeSkinName(string)
  | ChangeButtonSkin(buttonSkinData)
  | ChangeAllCustomStyle(userInputValue)
  | Submit(string);

module Method = {
  let changeSkinName = (name, sendFunc) => sendFunc(ChangeSkinName(name));

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

  let buildDefaultAllCustomStyleDataInputValue = () =>
    buildAllCustomStyleDataInputValue(
      WonderCommonlib.ImmutableHashMapService.createEmpty()
      |> WonderCommonlib.ImmutableHashMapService.set(
           "firstSingleCustomStyleData",
           WonderCommonlib.ImmutableHashMapService.createEmpty()
           |> WonderCommonlib.ImmutableHashMapService.set(
                "color",
                [|1., 0.5, 0.|],
              ),
         ),
    );
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

  let _convertInputValueStrToAllCustomStyleData =
      (inputValueStr: string): allCustomStyleData => [%raw
    {|
         return eval( inputValueStr);
         |}
  ];

  /* let _convertAllCustomStyleDataToInputValueStr =
         (allCustomStyleData): allCustomStyleData => [%raw
       {|
            return eval( inputValueStr);
            |}
     ]; */

  let submitAllCustomStyle = (sendFunc, allCustomStyleDataStr) =>
    sendFunc(ChangeAllCustomStyle(allCustomStyleDataStr));

  let submit =
      (
        nodeId,
        {buttonSkinData, allCustomStyleDataStr, skinName, originSkinName},
        sendFunc,
      ) => {
    let allCustomStyleData =
      _convertInputValueStrToAllCustomStyleData(allCustomStyleDataStr);

    IMGUISkinNodeAssetEditorService.setNodeData(
      nodeId,
      IMGUISkinNodeAssetService.buildNodeData(
        ~name=skinName,
        ~buttonSkinData,
        ~allCustomStyleData,
      ),
    )
    |> StateLogicService.getAndSetEditorState;

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
  | ChangeSkinName(newSkinName) => (
      state => ReasonReact.Update({...state, skinName: newSkinName})
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
    <h1> {DomHelper.textEl("IMGUI Exec Func Data")} </h1>
    <hr />
    <StringInput
      label="Name"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "imguiSkin-name-describe",
          languageType,
        )
      }
      defaultValue={state.skinName}
      onBlur={
        value => {
          renameFunc(value);

          /* TODO fix: not has name in state! get name in editorState when need??? */
          Method.changeSkinName(value, send);
        }
      }
      canBeNull=false
    />
    <IMGUISkinButtonInspector
      currentNodeId=nodeId
      buttonSkinData={state.buttonSkinData}
      submitFunc={Method.submitButtonSkin(send)}
    />
    <UserInputJs
      label="AllCustomStyleData"
      defaultInputValue={Method.buildDefaultAllCustomStyleDataInputValue()}
      changeInputValueFunc={Method.submitAllCustomStyle(send)}
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
      /* ~skin, */
      ~buttonSkinData,
      ~allCustomStyleData,
      ~renameFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {
    /* let {buttonSkinData, allCustomStyleData}: WonderImgui.SkinType.singleSkinData =
       ExtendIMGUIEngineService.unsafeGetSkinData(name)
       |> StateLogicService.getEngineStateToGetData; */
    skinName: name,
    originSkinName: name,
    buttonSkinData,
    allCustomStyleDataStr:
      Method.buildAllCustomStyleDataInputValue(allCustomStyleData),
  },
  reducer,
  render: self => render(currentNodeId, renameFunc, self),
};