open Wonderjs;

open TextureType;

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

let _changeWrap = (textureComponent, value, setWrapFunc) => {
  let engineState = StateEngineService.unsafeGetState();

  engineState
  |> setWrapFunc(
       value |> TextureTypeUtils.convertIntToWrap,
       textureComponent,
     )
  |> BasicSourceTextureEngineService.setIsNeedUpdate(true, textureComponent)
  |> StateLogicService.refreshEngineState;
};

let changeWrapS = (textureComponent, value) =>
  _changeWrap(
    textureComponent,
    value,
    BasicSourceTextureEngineService.setWrapS,
  );

let changeWrapT = (textureComponent, value) =>
  _changeWrap(
    textureComponent,
    value,
    BasicSourceTextureEngineService.setWrapT,
  );