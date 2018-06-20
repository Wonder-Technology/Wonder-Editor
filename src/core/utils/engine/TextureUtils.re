open AssetNodeType;

external convertDomToImageElement :
  Image.htmlImage => Wonderjs.DomType.imageElement =
  "%identity";

let createAndInitTexture = (editEngineState, runEngineState) => {
  let (editEngineState, editTexture) =
    editEngineState |> BasicSourceTextureEngineService.create;
  let (runEngineState, runTexture) =
    runEngineState |> BasicSourceTextureEngineService.create;

  (
    editTexture,
    editEngineState
    |> BasicSourceTextureEngineService.initTexture(editTexture),
    runEngineState |> BasicSourceTextureEngineService.initTexture(runTexture),
  );
  /* TODO check: editTexture,runTexture should diff 0 */
};

let buildTextureNodeResult = (name, texture) => {
  name,
  type_: Texture,
  result: texture |> string_of_int |. Some,
};