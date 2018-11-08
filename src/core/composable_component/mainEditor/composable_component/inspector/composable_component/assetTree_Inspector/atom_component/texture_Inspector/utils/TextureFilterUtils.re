open Wonderjs;

open SourceTextureType;

open SelectType;

let getFilterOptions = () => [|
  {key: Nearest |> TextureTypeUtils.convertFilterToInt, value: "Nearest"},
  {key: Linear |> TextureTypeUtils.convertFilterToInt, value: "Linear"},
  {
    key: Nearest_mipmap_nearest |> TextureTypeUtils.convertFilterToInt,
    value: "Nearest_mipmap_nearest",
  },
  {
    key: Linear_mipmap_nearest |> TextureTypeUtils.convertFilterToInt,
    value: "Linear_mipmap_nearest",
  },
  {
    key: Nearest_mipmap_linear |> TextureTypeUtils.convertFilterToInt,
    value: "Nearest_mipmap_linear",
  },
  {
    key: Linear_mipmap_linear |> TextureTypeUtils.convertFilterToInt,
    value: "Linear_mipmap_linear",
  },
|];

let changeMagFilter = (textureComponent, value) => {
  let engineState = StateEngineService.unsafeGetState();

  engineState
  |> BasicSourceTextureEngineService.setMagFilter(
       value |> TextureTypeUtils.convertIntToFilter,
       textureComponent,
     )
  |> BasicSourceTextureEngineService.setIsNeedUpdate(true, textureComponent)
  |> StateLogicService.refreshEngineState;
};

let changeMinFilter = (textureComponent, value) => {
  let engineState = StateEngineService.unsafeGetState();

  engineState
  |> BasicSourceTextureEngineService.setMinFilter(
       value |> TextureTypeUtils.convertIntToFilter,
       textureComponent,
     )
  |> BasicSourceTextureEngineService.setIsNeedUpdate(true, textureComponent)
  |> StateLogicService.refreshEngineState;
};