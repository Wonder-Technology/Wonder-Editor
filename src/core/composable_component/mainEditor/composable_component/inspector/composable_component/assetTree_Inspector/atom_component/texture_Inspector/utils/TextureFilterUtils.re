open Wonderjs;
open SourceTextureType;
open SelectType;
let getFilterOptions = () => [|
  {
    key: NEAREST |> TextureTypeUtils.convertFilterToInt,
    value: "NEAREST",
  },
  {key: LINEAR |> TextureTypeUtils.convertFilterToInt, value: "LINEAR"},
  {
    key: NEAREST_MIPMAP_NEAREST |> TextureTypeUtils.convertFilterToInt,
    value: "NEARESTMIPMAPNEAREST",
  },
  {
    key: LINEAR_MIPMAP_NEAREST |> TextureTypeUtils.convertFilterToInt,
    value: "LINEARMIPMAPNEAREST",
  },
  {
    key: NEAREST_MIPMAP_LINEAR |> TextureTypeUtils.convertFilterToInt,
    value: "NEARESTMIPMAPLINEAR",
  },
  {
    key: LINEAR_MIPMAP_LINEAR |> TextureTypeUtils.convertFilterToInt,
    value: "LINEARMIPMAPLINEAR",
  },
|];

let changeFilterMag = (textureId, value) => {
  WonderLog.Log.print(("select filter mag ", value)) |> ignore;
  BasicSourceTextureEngineService.setMagFilter(
    value |> TextureTypeUtils.convertIntToFilter,
  )
  |> StateLogicService.getAndRefreshEngineStateWithDiff([|
       {arguments: [|textureId|], type_: Texture},
     |]);
};

let changeFilterMin = (textureId, value: int) => {
  WonderLog.Log.print(("select filter min ", value)) |> ignore;
  BasicSourceTextureEngineService.setMinFilter(
    value |> TextureTypeUtils.convertIntToFilter,
  )
  |> StateLogicService.getAndRefreshEngineStateWithDiff([|
       {arguments: [|textureId|], type_: Texture},
     |]);
};