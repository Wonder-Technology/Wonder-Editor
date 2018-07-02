open AssetNodeType;

external convertDomToImageElement :
  Image.htmlImage => Wonderjs.DomType.imageElement =
  "%identity";

let _checkEditAndRunTextureWithDiff =
    (editTexture, runTexture, type_, editEngineState, runEngineState) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|editMateral and runTexture diff should == materialType diff value|j},
                ~actual={j|not|j},
              ),
              () => {
                let diffValue =
                  StateEditorService.getState()
                  |> SceneEditorService.unsafeGetDiffMap
                  |> DiffComponentService.getEditEngineComponent(type_);

                editTexture - runTexture == diffValue;
              },
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  (runTexture, editEngineState, runEngineState);
};

let createAndInitTexture = (textureName, editEngineState, runEngineState) => {
  let (editEngineState, editTexture) =
    editEngineState |> BasicSourceTextureEngineService.create;
  let (runEngineState, runTexture) =
    runEngineState |> BasicSourceTextureEngineService.create;

  _checkEditAndRunTextureWithDiff(
    editTexture,
    runTexture,
    DiffType.Texture,
    editEngineState
    |> BasicSourceTextureEngineService.setBasicSourceTextureName(
         textureName ++ "123",
         editTexture,
       )
    |> BasicSourceTextureEngineService.initTexture(editTexture),
    runEngineState
    |> BasicSourceTextureEngineService.setBasicSourceTextureName(
         textureName ++ "123",
         runTexture,
       )
    |> BasicSourceTextureEngineService.initTexture(runTexture),
  );
};

let buildTextureNodeResult = (name, texture) => {
  name: Js.Option.isNone(name) ? "" : name |> OptionService.unsafeGet,
  type_: Texture,
  result: texture |> string_of_int |. Some,
};