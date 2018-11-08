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
         Fetch.fetch("./config/setting.json")
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
    |> WonderBsMost.Most.map(engineState => engineState |> handleEngineState)
    |> WonderBsMost.Most.drain
  );

let start = () => init();