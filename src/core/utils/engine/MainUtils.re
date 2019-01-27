open Js.Promise;

let _getLoadData = () => {
  let engineConfigDir = "./src/config/engine/";

  AssetEngineService.loadConfig(
    [|"./src/config/engine/setting.json", engineConfigDir|],
    StateDataEngineService.getEngineStateData(),
  );
};

let _handleEngineState = engineState => {
  let engineState =
    engineState
    |> JobEngineService.registerNoWorkerInitJob(
         "init_editor",
         InitEditorJobUtils.initEditorJob,
       )
    |> JobEngineService.registerNoWorkerInitJob(
         "init_event_for_editor",
         InitEventJobUtils.initEventForEditorJob,
       )
    |> JobEngineService.registerNoWorkerInitJob(
         "init_hotkeys",
         InitHotKeysJobUtils.initHotKeysForEditorJob,
       )
    |> JobEngineService.registerNoWorkerInitJob(
         "init_transform_gizmos",
         InitTransformGizmosJobUtils.initJob,
       )
    |> JobEngineService.registerNoWorkerInitJob(
         "init_picking",
         InitPickingJobUtil.initJob,
       )
    |> JobEngineService.registerNoWorkerInitJob(
         "init_transform_gizmos",
         InitTransformGizmosJobUtils.initJob,
       )
    |> JobEngineService.registerNoWorkerInitJob(
         "init_camera_controller",
         InitCameraControllerJobUtils.initJob,
       )
    |> JobEngineService.registerNoWorkerLoopJob(
         "reallocate_cpu_memory",
         ReallocateCPUMemoryJobUtils.reallocateJob,
       )
    |> JobEngineService.registerNoWorkerLoopJob(
         "update_transform_gizmos",
         UpdateTransformGizmosJobUtils.updateTransformJob,
       )
    |> JobEngineService.registerNoWorkerLoopJob(
         "render_transform_gizmos",
         RenderTransformGizmosJobUtils.renderJob,
       )
    |> JobEngineService.registerNoWorkerLoopJob(
         "prepare_render_scene_view",
         PrepareRenderViewJobUtils.prepareRenderSceneViewJob,
       )
    |> JobEngineService.registerNoWorkerLoopJob(
         "prepare_render_game_view",
         PrepareRenderViewJobUtils.prepareRenderGameViewJob,
       )
    |> JobEngineService.registerNoWorkerLoopJob(
         "set_outline_data",
         SetOutlineDataJobUtils.setOutlineDataJob,
       )
    |> JobEngineService.registerNoWorkerLoopJob(
         "restore",
         RestoreJobUtils.restoreJob,
       );

  let scene = engineState |> SceneEngineService.getSceneGameObject;

  engineState
  |> GameObjectEngineService.setGameObjectName("scene", scene)
  |> DirectorEngineService.init
  |> StateEngineService.setState;
};

let _hideLoading = [%bs.raw
  loadingDomId => {|
                        document.querySelector("#" + loadingDomId).style.display = "none";
  |}
];

let init = () =>
  Wonderjs.StateDataMainType.(
    _getLoadData()
    |> WonderBsMost.Most.flatMap(engineState =>
         LoaderManagerEngineService.loadIMGUIAsset(
           "./public/font/Lato-Regular-64.fnt",
           "./public/font/lato.png",
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
    |> WonderBsMost.Most.tap(_ => {
         _hideLoading("loading");
         ();
       })
    |> WonderBsMost.Most.flatMap(engineState =>
         Fetch.fetch("./src/config/editor/setting.json")
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

let start = () => init();