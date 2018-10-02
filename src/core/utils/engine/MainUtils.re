open Js.Promise;

let _getLoadData = () => {
  let engineDataDir = "./src/engine/config/";

  AssetEngineService.loadToData(
    [|"./src/engine/config/setting.json", engineDataDir|],
    StateDataEngineService.getEngineStateData(),
  );
};

let handleEngineState = engineState => {
  let engineState =
    JobEngineService.registerNoWorkerInitJob(
      "init_editor",
      InitEditorJobUtils.initEditorJob,
      engineState,
    )
    |> JobEngineService.registerNoWorkerInitJob(
         "init_event_for_editor",
         InitEventJobUtils.initEventForEditorJob,
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
         "restore",
         RestoreJobUtils.restoreJob,
       );

  StateEngineService.setIsDebug(true) |> ignore;

  let scene = engineState |> SceneEngineService.getSceneGameObject;

  engineState
  |> GameObjectEngineService.setGameObjectName("scene", scene)
  |> DirectorEngineService.init
  |> StateEngineService.setState;
};

let init = () =>
  Wonderjs.StateDataMainType.(
    _getLoadData()
    |> WonderBsMost.Most.flatMap(engineState =>
         LoaderManagerEngineService.loadIMGUIAsset(
           "./public/font/myFont.fnt",
           "./public/font/myFont.png",
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
    |> WonderBsMost.Most.map(engineState => engineState |> handleEngineState)
    |> WonderBsMost.Most.drain
  );

let start = () => init();