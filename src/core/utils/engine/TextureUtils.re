open AssetNodeType;

external convertDomToImageElement :
  Image.htmlImage => Wonderjs.DomType.imageElement =
  "%identity";

let createTexture = (editEngineState, runEngineState) => {
  let (editEngineState, editTexture) =
    editEngineState |> BasicSourceTextureEngineService.create;
  let (runEngineState, runTexture) =
    runEngineState |> BasicSourceTextureEngineService.create;
  (editTexture, editEngineState, runEngineState);
};

let buildTextureNodeResult = (name, texture) => {
  name,
  type_: Texture,
  result: texture |> string_of_int |. Some,
};