let getRelatedSkyboxCubemapOptFromCubemapAssets =
    (skyboxCubemapFromSceneWDBOpt, (editorState, engineState)) =>
  skyboxCubemapFromSceneWDBOpt
  |> Js.Option.map((. skyboxCubemapFromSceneWDB) => {
       let skyboxCubemapDataFromSceneWDB =
         RelateSceneSkyboxAndCubemapAssetUtils.getCubemapData(
           skyboxCubemapFromSceneWDB,
           engineState,
         );

       switch (
         CubemapNodeAssetEditorService.getTextureComponentsOfBasicSourceTypeTextureNode(editorState)
         |> Js.Array.find(cubemapAssetTextureComponent =>
              RelateSceneSkyboxAndCubemapAssetUtils.isCubemapDataEqual(
                skyboxCubemapDataFromSceneWDB,
                cubemapAssetTextureComponent,
                engineState,
              )
            )
       ) {
       | None =>
         WonderLog.Log.fatal(
           WonderLog.Log.buildFatalMessage(
             ~title="getRelatedSkyboxCubemapOptFromCubemapAssets",
             ~description=
               {j|skyboxCubemapDataFromSceneWDB should come from cubemap assets|j},
             ~reason="",
             ~solution={j||j},
             ~params={j||j},
           ),
         )
       | Some(cubemapAssetTextureComponent) => cubemapAssetTextureComponent
       };
     });

let setSkyboxCubemap = (cubemapTextureOpt, engineState) =>
  switch (cubemapTextureOpt) {
  | None => engineState
  | Some(cubemapTexture) =>
    engineState |> SceneEngineService.setCubemapTexture(cubemapTexture)
  };