type color = IMGUIType.color;

type imageId = IMGUIType.imageId;

type align = IMGUIType.align;

type state = {
  buttonColor: color,
  hoverButtonColor: color,
  clickButtonColor: color,
  buttonImage: Js.Nullable.t(imageId),
  hoverButtonImage: Js.Nullable.t(imageId),
  clickButtonImage: Js.Nullable.t(imageId),
  fontAlign: align,
  fontColor: color,
};

external convertButtonSkinDataToState:
  WonderImgui.SkinType.buttonSkinData => state =
  "%identity";

external convertStateToButtonSkinData:
  state => WonderImgui.SkinType.buttonSkinData =
  "%identity";

type action =
  | ChangeButtonColor(color)
  | ChangeHoverButtonColor(color)
  | ChangeClickButtonColor(color)
  | ChangeButtonImage(Js.Nullable.t(imageId))
  | ChangeHoverButtonImage(Js.Nullable.t(imageId))
  | ChangeClickButtonImage(Js.Nullable.t(imageId))
  | ChangeFontAlign(align)
  | ChangeFontColor(color)
  | Submit(string);

module Method = {
  let changeButtonColor = (color, sendFunc) =>
    sendFunc(ChangeButtonColor(color));

  let changeHoverButtonColor = (color, sendFunc) =>
    sendFunc(ChangeHoverButtonColor(color));

  let changeClickButtonColor = (color, sendFunc) =>
    sendFunc(ChangeClickButtonColor(color));

  let changeButtonImage = (imageIdNullable, sendFunc) =>
    sendFunc(ChangeButtonImage(imageIdNullable));

  let changeHoverButtonImage = (imageIdNullable, sendFunc) =>
    sendFunc(ChangeHoverButtonImage(imageIdNullable));

  let changeClickButtonImage = (imageIdNullable, sendFunc) =>
    sendFunc(ChangeClickButtonImage(imageIdNullable));

  let changeFontAlign = (align, sendFunc) =>
    sendFunc(ChangeFontAlign(align));

  let changeFontColor = (color, sendFunc) =>
    sendFunc(ChangeFontColor(color));

  let findAllIMGUICustomImageTypeTextureNodes = editorState =>
    IMGUICustomImageTypeTextureNodeAssetEditorService.findAllIMGUICustomImageTypeTextureNodes(
      editorState,
    );

  let _checkChangeImage = (textureNodeId, editorState) =>
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              test(
                Log.buildAssertMessage(
                  ~expect={j|texture node->type be IMGUICustomImage|j},
                  ~actual={j|not|j},
                ),
                () =>
                TextureNodeAssetService.isIMGUICustomImageType(
                  OperateTreeAssetEditorService.unsafeFindNodeById(
                    textureNodeId,
                    editorState,
                  ),
                )
                |> assertTrue
              )
            )
          )
        ),
      StateEditorService.getStateIsDebug(),
    );

  let changeButtonImageByNodeId = (textureNodeId, sendFunc, editorState) => {
    _checkChangeImage(textureNodeId, editorState);

    sendFunc(
      ChangeButtonImage(
        IMGUICustomImageTypeTextureNodeAssetEditorService.unsafeGetId(
          textureNodeId,
          editorState,
        )
        |> Js.Nullable.return,
      ),
    )
    |> ignore;
  };

  let changeHoverButtonImageByNodeId = (textureNodeId, sendFunc, editorState) => {
    _checkChangeImage(textureNodeId, editorState);

    sendFunc(
      ChangeHoverButtonImage(
        IMGUICustomImageTypeTextureNodeAssetEditorService.unsafeGetId(
          textureNodeId,
          editorState,
        )
        |> Js.Nullable.return,
      ),
    )
    |> ignore;
  };

  let changeClickButtonImageByNodeId = (textureNodeId, sendFunc, editorState) => {
    _checkChangeImage(textureNodeId, editorState);

    sendFunc(
      ChangeClickButtonImage(
        IMGUICustomImageTypeTextureNodeAssetEditorService.unsafeGetId(
          textureNodeId,
          editorState,
        )
        |> Js.Nullable.return,
      ),
    )
    |> ignore;
  };

  let getCurrentTextureComponent = (imageIdNullable, editorState) =>
    imageIdNullable
    |> Js.Nullable.toOption
    |> Js.Option.map((. imageId) =>
         IMGUICustomImageTypeTextureNodeAssetEditorService.findTextureComponentByCustomImageId(
           IMGUICustomImageTypeTextureNodeAssetEditorService.findAllIMGUICustomImageTypeTextureNodes(
             editorState,
           ),
           imageId,
           editorState,
         )
         |> OptionService.unsafeGet
       );

  let getFontAlignOptions = (): array(SelectType.optionItem) => [|
    {
      key: WonderImgui.FontType.Left |> IMGUIType.convertFontAlignToInt,
      value: "left",
    },
    {
      key: WonderImgui.FontType.Center |> IMGUIType.convertFontAlignToInt,
      value: "center",
    },
    {
      key: WonderImgui.FontType.Right |> IMGUIType.convertFontAlignToInt,
      value: "right",
    },
  |];
};

let component = ReasonReact.reducerComponent("IMGUISkinButtonInspector");

let reducer = action =>
  switch (action) {
  | ChangeButtonColor(color) => (
      state => ReasonReact.Update({...state, buttonColor: color})
    )
  | ChangeHoverButtonColor(color) => (
      state => ReasonReact.Update({...state, hoverButtonColor: color})
    )
  | ChangeClickButtonColor(color) => (
      state => ReasonReact.Update({...state, clickButtonColor: color})
    )
  | ChangeButtonImage(imageIdNullable) => (
      state => ReasonReact.Update({...state, buttonImage: imageIdNullable})
    )
  | ChangeHoverButtonImage(imageIdNullable) => (
      state =>
        ReasonReact.Update({...state, hoverButtonImage: imageIdNullable})
    )
  | ChangeClickButtonImage(imageIdNullable) => (
      state =>
        ReasonReact.Update({...state, clickButtonImage: imageIdNullable})
    )
  | ChangeFontAlign(fontAlign) => (
      state => ReasonReact.Update({...state, fontAlign})
    )
  | ChangeFontColor(fontColor) => (
      state => ReasonReact.Update({...state, fontColor})
    )
  };

let render =
    (textureNodeId, submitFunc, {state, send}: ReasonReact.self('a, 'b, 'c)) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article
    key="IMGUISkinButtonInspector"
    className="wonder-imguiSkinButton-inspector">
    <h2> {DomHelper.textEl("Button")} </h2>
    <hr />
    <div className="imguiSkinButton-skin">
      <PickColorComponent
        label="Button Color"
        key={DomHelper.getRandomKey()}
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "imguiSkinData-buttonSkinData-buttonColor-describe",
            languageType,
          )
        }
        getColorFunc={() => state.buttonColor |> Color.getHexString}
        changeColorFunc={
          value =>
            Method.changeButtonColor(
              value |> Color.convertColorObjToRGBArr,
              send,
            )
        }
        closeColorPickFunc={
          value =>
            Method.changeButtonColor(
              value |> Color.convert16HexToRGBArr,
              send,
            )
        }
      />
      <PickColorComponent
        key={DomHelper.getRandomKey()}
        label="Hover Button Color"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "imguiSkinData-buttonSkinData-hoverButtonColor-describe",
            languageType,
          )
        }
        getColorFunc={() => state.hoverButtonColor |> Color.getHexString}
        changeColorFunc={
          value =>
            Method.changeHoverButtonColor(
              value |> Color.convertColorObjToRGBArr,
              send,
            )
        }
        closeColorPickFunc={
          value =>
            Method.changeHoverButtonColor(
              value |> Color.convert16HexToRGBArr,
              send,
            )
        }
      />
      <PickColorComponent
        key={DomHelper.getRandomKey()}
        label="Click Button Color"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "imguiSkinData-buttonSkinData-clickButtonColor-describe",
            languageType,
          )
        }
        getColorFunc={() => state.clickButtonColor |> Color.getHexString}
        changeColorFunc={
          value =>
            Method.changeClickButtonColor(
              value |> Color.convertColorObjToRGBArr,
              send,
            )
        }
        closeColorPickFunc={
          value =>
            Method.changeClickButtonColor(
              value |> Color.convert16HexToRGBArr,
              send,
            )
        }
      />
      <SelectTextureNode
        key={DomHelper.getRandomKey()}
        label="Button Image"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "imguiSkinData-buttonSkinData-buttonImage-describe",
            languageType,
          )
        }
        currentTextureComponent={
          Method.getCurrentTextureComponent(state.buttonImage)
          |> StateLogicService.getEditorState
        }
        removeTextureFunc={
          () => Method.changeButtonImage(Js.Nullable.null, send)
        }
        findAllTextureNodesFunc=Method.findAllIMGUICustomImageTypeTextureNodes
        onDropFunc={
          textureNode =>
            Method.changeButtonImageByNodeId(
              NodeAssetService.getNodeId(~node=textureNode),
              send,
            )
            |> StateLogicService.getEditorState
        }
        isShowTextureGroup=false
      />
      <SelectTextureNode
        key={DomHelper.getRandomKey()}
        label="Hover Button Image"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "imguiSkinData-buttonSkinData-hoverButtonImage-describe",
            languageType,
          )
        }
        currentTextureComponent={
          Method.getCurrentTextureComponent(state.hoverButtonImage)
          |> StateLogicService.getEditorState
        }
        removeTextureFunc={
          () => Method.changeHoverButtonImage(Js.Nullable.null, send)
        }
        findAllTextureNodesFunc=Method.findAllIMGUICustomImageTypeTextureNodes
        onDropFunc={
          textureNode =>
            Method.changeHoverButtonImageByNodeId(
              NodeAssetService.getNodeId(~node=textureNode),
              send,
            )
            |> StateLogicService.getEditorState
        }
        isShowTextureGroup=false
      />
      <SelectTextureNode
        key={DomHelper.getRandomKey()}
        label="Click Button Image"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "imguiSkinData-buttonSkinData-clickButtonImage-describe",
            languageType,
          )
        }
        currentTextureComponent={
          Method.getCurrentTextureComponent(state.clickButtonImage)
          |> StateLogicService.getEditorState
        }
        removeTextureFunc={
          () => Method.changeClickButtonImage(Js.Nullable.null, send)
        }
        findAllTextureNodesFunc=Method.findAllIMGUICustomImageTypeTextureNodes
        onDropFunc={
          textureNode =>
            Method.changeClickButtonImageByNodeId(
              NodeAssetService.getNodeId(~node=textureNode),
              send,
            )
            |> StateLogicService.getEditorState
        }
        isShowTextureGroup=false
      />
      <Select
        key={DomHelper.getRandomKey()}
        label="Font Align"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "imguiSkinData-buttonSkinData-fontAlign-describe",
            languageType,
          )
        }
        options={Method.getFontAlignOptions()}
        selectedKey={state.fontAlign |> IMGUIType.convertFontAlignToInt}
        onChange={
          value =>
            Method.changeFontAlign(
              value |> IMGUIType.convertIntToFontAlign,
              send,
            )
        }
      />
      <PickColorComponent
        key={DomHelper.getRandomKey()}
        label="Font Color"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "imguiSkinData-buttonSkinData-fontColor-describe",
            languageType,
          )
        }
        getColorFunc={() => state.fontColor |> Color.getHexString}
        changeColorFunc={
          value =>
            Method.changeFontColor(
              value |> Color.convertColorObjToRGBArr,
              send,
            )
        }
        closeColorPickFunc={
          value =>
            Method.changeFontColor(value |> Color.convert16HexToRGBArr, send)
        }
      />
    </div>
    <button onClick={_e => submitFunc(state |> convertStateToButtonSkinData)}>
      {DomHelper.textEl("submit all")}
    </button>
  </article>;
};

let make = (~currentNodeId, ~buttonSkinData, ~submitFunc, _children) => {
  ...component,
  initialState: () => buttonSkinData |> convertButtonSkinDataToState,
  reducer,
  render: self => render(currentNodeId, submitFunc, self),
};