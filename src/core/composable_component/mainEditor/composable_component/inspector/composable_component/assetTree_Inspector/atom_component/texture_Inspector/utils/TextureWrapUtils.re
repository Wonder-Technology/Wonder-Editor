open Wonderjs;

open SourceTextureType;

open SelectType;

let getWrapOptions = () => [|
  {key: Repeat |> TextureTypeUtils.convertWrapToInt, value: "Repeat"},
  {
    key: Mirrored_repeat |> TextureTypeUtils.convertWrapToInt,
    value: "Mirrored_repeat",
  },
  {
    key: Clamp_to_edge |> TextureTypeUtils.convertWrapToInt,
    value: "Clamp_to_edge",
  },
|];

let changeWrapS = (textureComponent, value) =>
  BasicSourceTextureEngineService.setWrapS(
    value |> TextureTypeUtils.convertIntToWrap,
    textureComponent,
  )
  |> StateLogicService.getAndRefreshEngineStateWithFunc;

let changeWrapT = (textureComponent, value) =>
  BasicSourceTextureEngineService.setWrapT(
    value |> TextureTypeUtils.convertIntToWrap,
    textureComponent,
  )
  |> StateLogicService.getAndRefreshEngineStateWithFunc;