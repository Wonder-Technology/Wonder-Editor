open Wonderjs;

open SourceTextureType;

open SelectType;

let getWrapOptions = () => [|
  {key: REPEAT |> TextureTypeUtils.convertWrapToInt, value: "REPEAT"},
  {
    key: MIRRORED_REPEAT |> TextureTypeUtils.convertWrapToInt,
    value: "MIRRORED_REPEAT",
  },
  {
    key: CLAMP_TO_EDGE |> TextureTypeUtils.convertWrapToInt,
    value: "CLAMP_TO_EDGE",
  },
|];

let changeWrapS = (textureIndex, value) => {
  BasicSourceTextureEngineService.setWrapS(
    value |> TextureTypeUtils.convertIntToWrap,
  )
  |> StateLogicService.getAndRefreshEngineStateWithDiff([|
       {arguments: [|textureIndex|], type_: Texture},
     |]);
};

let changeWrapT = (textureIndex, value) => {
  BasicSourceTextureEngineService.setWrapT(
    value |> TextureTypeUtils.convertIntToWrap,
  )
  |> StateLogicService.getAndRefreshEngineStateWithDiff([|
       {arguments: [|textureIndex|], type_: Texture},
     |]);
};