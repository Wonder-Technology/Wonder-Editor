open Wonderjs;

open TextureType;

open SelectType;

let getMagFilterOptions = () => [|
  {key: Nearest |> TextureTypeUtils.convertFilterToInt, value: "Nearest"},
  {key: Linear |> TextureTypeUtils.convertFilterToInt, value: "Linear"},
|];

let getMinFilterOptions = () => [|
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

let _changeFilter = (textureComponent, value, setFilterFunc) => {
  let engineState = StateEngineService.unsafeGetState();

  engineState
  |> setFilterFunc(
       value |> TextureTypeUtils.convertIntToFilter,
       textureComponent,
     )
  |> BasicSourceTextureEngineService.setIsNeedUpdate(true, textureComponent)
  |> StateLogicService.refreshEngineState;
};

let changeMagFilter = (textureComponent, value) =>
  _changeFilter(
    textureComponent,
    value,
    BasicSourceTextureEngineService.setMagFilter,
  );

let changeMinFilter = (textureComponent, value) =>
  _changeFilter(
    textureComponent,
    value,
    BasicSourceTextureEngineService.setMinFilter,
  );