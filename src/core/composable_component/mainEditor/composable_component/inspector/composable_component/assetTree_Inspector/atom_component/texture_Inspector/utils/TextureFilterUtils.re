open Wonderjs;

open SourceTextureType;

open SelectType;

let getFilterOptions = () => [|
  {key: NEAREST |> TextureTypeUtils.convertFilterToInt, value: "NEAREST"},
  {key: LINEAR |> TextureTypeUtils.convertFilterToInt, value: "LINEAR"},
  {
    key: NEAREST_MIPMAP_NEAREST |> TextureTypeUtils.convertFilterToInt,
    value: "NEAREST_MIPMAP_NEAREST",
  },
  {
    key: LINEAR_MIPMAP_NEAREST |> TextureTypeUtils.convertFilterToInt,
    value: "LINEAR_MIPMAP_NEAREST",
  },
  {
    key: NEAREST_MIPMAP_LINEAR |> TextureTypeUtils.convertFilterToInt,
    value: "NEAREST_MIPMAP_LINEAR",
  },
  {
    key: LINEAR_MIPMAP_LINEAR |> TextureTypeUtils.convertFilterToInt,
    value: "LINEAR_MIPMAP_LINEAR",
  },
|];

let changeMagFilter = (textureIndex, value) => {
  BasicSourceTextureEngineService.setMagFilter(
    value |> TextureTypeUtils.convertIntToFilter,
  )
  |> StateLogicService.getAndRefreshEngineStateWithDiff([|
       {arguments: [|textureIndex|], type_: Texture},
     |]);
};

let changeMinFilter = (textureIndex, value: int) => {
  BasicSourceTextureEngineService.setMinFilter(
    value |> TextureTypeUtils.convertIntToFilter,
  )
  |> StateLogicService.getAndRefreshEngineStateWithDiff([|
       {arguments: [|textureIndex|], type_: Texture},
     |]);
};