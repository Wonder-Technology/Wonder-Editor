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

let changeWrapS = (textureIndex, value) =>
  BasicSourceTextureEngineService.setWrapS(
    value |> TextureTypeUtils.convertIntToWrap,
    textureIndex,
  )
  |> StateLogicService.getAndRefreshEngineStateWithFunc;

let changeWrapT = (textureIndex, value) =>
  BasicSourceTextureEngineService.setWrapT(
    value |> TextureTypeUtils.convertIntToWrap,
    textureIndex,
  )
  |> StateLogicService.getAndRefreshEngineStateWithFunc;