open AssetNodeType;

/* let _checkEditAndRunTextureWithDiff =
       ((editTexture, runTexture), type_, engineState, runEngineState) => {
     WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect=
                     {j|editMateral and runTexture diff should == materialType diff value|j},
                   ~actual={j|not|j},
                 ),
                 () => {
                   let diffValue =
                     StateEditorService.getState()
                     |> SceneEditorService.unsafeGetDiffMap
                     |> DiffComponentService.getEditEngineComponent(type_);

                   editTexture - runTexture == diffValue;
                 },
               )
             )
           )
         ),
       StateEditorService.getStateIsDebug(),
     );

     (runTexture, engineState, runEngineState);
   }; */

let createAndInitTexture = (textureName, engineState) => {
  let (engineState, texture) =
    engineState |> BasicSourceTextureEngineService.create;

  let engineState =
    engineState
    |> BasicSourceTextureEngineService.setBasicSourceTextureName(
         textureName,
         texture,
       )
    |> BasicSourceTextureEngineService.initTexture(texture);

  (texture, engineState);
};

let createAndSetTextureProps =
    (textureName, (warpS, warpT, minFilter, magFilter), engineState) => {
  let (engineState, texture) =
    engineState |> BasicSourceTextureEngineService.create;

  let engineState =
    engineState
    |> BasicSourceTextureEngineService.setBasicSourceTextureName(
         textureName,
         texture,
       )
    |> BasicSourceTextureEngineService.setWrapS(
         warpS |> TextureTypeUtils.convertIntToWrap,
         texture,
       )
    |> BasicSourceTextureEngineService.setWrapT(
         warpT |> TextureTypeUtils.convertIntToWrap,
         texture,
       )
    |> BasicSourceTextureEngineService.setMinFilter(
         minFilter |> TextureTypeUtils.convertIntToFilter,
         texture,
       )
    |> BasicSourceTextureEngineService.setMagFilter(
         magFilter |> TextureTypeUtils.convertIntToFilter,
         texture,
       )
    |> BasicSourceTextureEngineService.initTexture(texture);

  (texture, engineState);
};