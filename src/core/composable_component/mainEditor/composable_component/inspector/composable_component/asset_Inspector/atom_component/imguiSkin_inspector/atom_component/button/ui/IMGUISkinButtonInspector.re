type color = WonderImgui.SkinType.color;

type imageId = WonderImgui.ExtendType.customImageId;

type align = WonderImgui.FontType.align;

external convertFontAlignToInt: align => int = "%identity";

external convertIntToFontAlign: int => align = "%identity";

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
        IMGUICustomImageTypeTextureNodeAssetEditorService.getId(
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
        IMGUICustomImageTypeTextureNodeAssetEditorService.getId(
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
        IMGUICustomImageTypeTextureNodeAssetEditorService.getId(
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
       );
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
              value |> Color.convert16HexToRGBArr,
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
              value |> Color.convert16HexToRGBArr,
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
              value |> Color.convert16HexToRGBArr,
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
          textureNodeId =>
            Method.changeButtonImageByNodeId(textureNodeId, send)
            |> StateLogicService.getEditorState
        }
        isShowTextureGroup=false
      />
      <SelectTextureNode
        label="Hover Button Image"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "imguiSkinData-buttonSkinData-hoverButtonImage-describe",
            languageType,
          )
        }
        currentTextureComponent=None
        removeTextureFunc={
          () => Method.changeHoverButtonImage(Js.Nullable.null, send)
        }
        findAllTextureNodesFunc=Method.findAllIMGUICustomImageTypeTextureNodes
        onDropFunc={
          textureNodeId =>
            Method.changeHoverButtonImageByNodeId(textureNodeId, send)
            |> StateLogicService.getEditorState
        }
        isShowTextureGroup=false
      />
      <SelectTextureNode
        label="Click Button Image"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "imguiSkinData-buttonSkinData-clickButtonImage-describe",
            languageType,
          )
        }
        currentTextureComponent=None
        removeTextureFunc={
          () => Method.changeClickButtonImage(Js.Nullable.null, send)
        }
        findAllTextureNodesFunc=Method.findAllIMGUICustomImageTypeTextureNodes
        onDropFunc={
          textureNodeId =>
            Method.changeClickButtonImageByNodeId(textureNodeId, send)
            |> StateLogicService.getEditorState
        }
        isShowTextureGroup=false
      />
      <IntInput
        key={DomHelper.getRandomKey()}
        label="Font Align"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "imguiSkinData-buttonSkinData-fontAlign-describe",
            languageType,
          )
        }
        defaultValue={
          state.fontAlign |> convertFontAlignToInt |> string_of_int
        }
        onChange={
          value =>
            Method.changeFontAlign(value |> convertIntToFontAlign, send)
        }
        onBlur={
          value =>
            Method.changeFontAlign(value |> convertIntToFontAlign, send)
        }
        onDragDrop={
          value =>
            Method.changeFontAlign(value |> convertIntToFontAlign, send)
        }
      />
      <PickColorComponent
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
            Method.changeFontColor(value |> Color.convert16HexToRGBArr, send)
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
  initialState: () =>
    /* let {
         buttonColor,
         hoverButtonColor,
         clickButtonColor,
         buttonImage,
         hoverButtonImage,
         clickButtonImage,
         fontAlign,
         fontColor,

       } = buttonSkinData; */
    buttonSkinData |> convertButtonSkinDataToState,
  reducer,
  render: self => render(currentNodeId, submitFunc, self),
};