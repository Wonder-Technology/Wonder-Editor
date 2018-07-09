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

let changeWrapS = (textureId, value) => {
  WonderLog.Log.print(("select wraps ", value)) |> ignore;
  BasicSourceTextureEngineService.setWrapS(
    value |> TextureTypeUtils.convertIntToWrap,
  )
  |> StateLogicService.getAndRefreshEngineStateWithDiff([|
       {arguments: [|textureId|], type_: Texture},
     |]);
};

let changeWrapT = (textureId, value) => {
  WonderLog.Log.print(("select wrapt ", value)) |> ignore;
  BasicSourceTextureEngineService.setWrapT(
    value |> TextureTypeUtils.convertIntToWrap,
  )
  |> StateLogicService.getAndRefreshEngineStateWithDiff([|
       {arguments: [|textureId|], type_: Texture},
     |]);
};