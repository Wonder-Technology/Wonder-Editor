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

let changeWrapS = (textureComponent, value) => {
  let engineState = StateEngineService.unsafeGetState();

  engineState
  |> BasicSourceTextureEngineService.setWrapS(
       value |> TextureTypeUtils.convertIntToWrap,
       textureComponent,
     )
  |> BasicSourceTextureEngineService.setIsNeedUpdate(true, textureComponent)
  |> StateLogicService.refreshEngineState;
};

let changeWrapT = (textureComponent, value) => {
  let engineState = StateEngineService.unsafeGetState();

  engineState
  |> BasicSourceTextureEngineService.setWrapT(
       value |> TextureTypeUtils.convertIntToWrap,
       textureComponent,
     )
  |> BasicSourceTextureEngineService.setIsNeedUpdate(true, textureComponent)
  |> StateLogicService.refreshEngineState;
};