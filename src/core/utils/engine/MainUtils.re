open Js.Promise;

let _getLoadData = () => {
  let engineConfigDir = "./config/engine/";

  AssetEngineService.loadConfig(
    [|"./config/engine/setting.json", engineConfigDir|],
    StateDataEngineService.getEngineStateData(),
  );
};

let _registerJob = engineState =>
  engineState
  |> JobEngineService.registerNoWorkerInitJob(
       "init_editor",
       InitEditorJob.initEditorJob,
     )
  |> JobEngineService.registerNoWorkerInitJob(
       "init_event_for_editor",
       InitEventJob.initEventForEditorJob,
     )
  |> JobEngineService.registerNoWorkerInitJob(
       "init_hotkeys",
       InitHotKeysJob.initHotKeysForEditorJob,
     )
  |> JobEngineService.registerNoWorkerInitJob(
       "init_transform_gizmos",
       InitTransformGizmosJob.initJob,
     )
  |> JobEngineService.registerNoWorkerInitJob(
       "init_picking",
       InitPickingJob.initJob,
     )
  |> JobEngineService.registerNoWorkerInitJob(
       "init_transform_gizmos",
       InitTransformGizmosJob.initJob,
     )
  |> JobEngineService.registerNoWorkerInitJob(
       "init_camera_controller",
       InitCameraControllerJob.initJob,
     )
  |> JobEngineService.registerNoWorkerInitJob(
       "init_script_api",
       InitScriptAPIJob.initJob,
     )
  |> JobEngineService.registerNoWorkerLoopJob(
       "reallocate_cpu_memory",
       ReallocateCPUMemoryJob.reallocateJob,
     )
  |> JobEngineService.registerNoWorkerLoopJob(
       "update_camera",
       UpdateCameraJob.updateJob,
     )
  |> JobEngineService.registerNoWorkerLoopJob(
       "update_transform_gizmos",
       UpdateTransformGizmosJob.updateTransformJob,
     )
  |> JobEngineService.registerNoWorkerLoopJob(
       "render_transform_gizmos",
       RenderTransformGizmosJob.renderJob,
     )
  |> JobEngineService.registerNoWorkerLoopJob(
       "prepare_render_scene_view",
       PrepareRenderSceneViewJob.prepareRenderSceneViewJob,
     )
  |> JobEngineService.registerNoWorkerLoopJob(
       "prepare_render_game_view",
       PrepareRenderGameViewJob.prepareRenderGameViewJob,
     )
  |> JobEngineService.registerNoWorkerLoopJob(
       "set_outline_data",
       SetOutlineDataJob.setOutlineDataJob,
     )
  |> JobEngineService.registerNoWorkerLoopJob(
       "restore",
       RestoreJob.restoreJob,
     );

let _handleEngineState = engineState => {
  let engineState = _registerJob(engineState);

  let scene = engineState |> SceneEngineService.getSceneGameObject;

  engineState
  |> GameObjectEngineService.setGameObjectName(
       SceneEngineService.getDefaultName(),
       scene,
     )
  |> DirectorEngineService.init
  |> StateEngineService.setState;
};

let initEngine = () =>
  Wonderjs.StateDataMainType.(
    _getLoadData()
    |> WonderBsMost.Most.flatMap(engineState =>
         LoaderManagerEngineService.loadIMGUIAsset(
           "./public/font/empty.fnt",
           "./public/font/empty.png",
           Js.Nullable.return([|
             ("./public/img/camera.png", "camera"),
             ("./public/img/sun.png", "directionLight"),
             ("./public/img/point.png", "pointLight"),
           |]),
           (_, _) => (),
           engineState,
         )
         |> WonderBsMost.Most.fromPromise
       )
    |> WonderBsMost.Most.flatMap(engineState =>
         Fetch.fetch("./config/editor/setting.json")
         |> then_(response =>
              response
              |> Fetch.Response.json
              |> then_(json => {
                   json
                   |> ParseSettingService.convertToRecord
                   |> SetSettingEditorService.setSetting(
                        _,
                        StateEditorService.getState(),
                      )
                   |> StateEditorService.setState
                   |> ignore;

                   resolve(engineState);
                 })
            )
         |> WonderBsMost.Most.fromPromise
       )
    |> WonderBsMost.Most.map(engineState => engineState |> _handleEngineState)
    |> WonderBsMost.Most.drain
  );