let replaceGameObjectLightMaterialToBasicMaterialAndRefreshDispose =
    (gameObject, state) => {
  let (state, basicMaterial) = BasicMaterialEngineService.create(state);

  state
  |> GameObjectComponentEngineService.disposeLightMaterialComponent(
       gameObject,
       GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
         gameObject,
         state,
       ),
     )
  |> GameObjectComponentEngineService.addBasicMaterialComponent(
       gameObject,
       basicMaterial,
     )
  |> JobEngineService.execDisposeJob;
};
/*
 let isMaterialDisposed = (material, state) => {
   open Wonderjs.BasicMaterialType;
   let {disposedIndexArray} =
     Wonderjs.RecordBasicMaterialMainService.getRecord(state);
   disposedIndexArray |> Js.Array.includes(material);
 }; */

let isAlive = (material, engineState) =>
  Wonderjs.DisposeBasicMaterialMainService.isAlive(
    material,
    Wonderjs.RecordBasicMaterialMainService.getRecord(engineState),
  );