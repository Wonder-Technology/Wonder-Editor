open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

let _ =
  describe("update transform gizmos job", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareState = () => {
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~isInitJob=false,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~initPipelines=
              {|
            [
        {
          "name": "default",
          "jobs": [
            {
              "name": "init_transform_gizmos"
            }
          ]
        }
      ]
            |},
            ~loopPipelines=
              {|
             [
         {
           "name": "default",
           "jobs": [
{"name": "update_transform_gizmos" }
           ]
         }
       ]
             |},
            (),
          ),
        (),
      );

      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
    };

    beforeEach(() => {
      sandbox := createSandbox();

      _prepareState();

      StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("if has current scene tree node", () => {
      beforeEach(() =>
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode()
      );

      describe("test translation gizmo", () =>
        describe("update translation whole gizmo transform", () => {
          let _prepareForTestParent = () => {
            let engineState = StateEngineService.unsafeGetState();
            let firstCube = MainEditorSceneTool.getFirstCube(engineState);
            let secondCube = MainEditorSceneTool.getSecondCube(engineState);
            let engineState =
              GameObjectTool.addChild(secondCube, firstCube, engineState);

            (engineState, (firstCube, secondCube));
          };

          describe("move gizmo to current scene tree node position", () =>
            test("test current scene tree node has parent", () => {
              let (engineState, (firstCube, secondCube)) =
                _prepareForTestParent();
              let pos1 = (1., 2., 3.);
              let pos2 = (3., 2., 3.);
              let engineState =
                engineState
                |> TransformGameObjectEngineService.setLocalPosition(
                     firstCube,
                     pos1,
                   )
                |> TransformGameObjectEngineService.setLocalPosition(
                     secondCube,
                     pos2,
                   );

              let engineState =
                engineState |> DirectorToolEngine.runWithDefaultTime;

              TransformGameObjectEngineService.getPosition(
                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo
                |> StateLogicService.getEditorState,
                engineState,
              )
              |>
              expect == Wonderjs.Vector3Service.add(
                          Wonderjs.Vector3Type.Float,
                          pos1,
                          pos2,
                        );
            })
          );

          describe("rotate gizmo to current scene tree node rotation", () =>
            describe("test current scene tree node has parent", () => {
              let _setRotate = (engineState, (firstCube, secondCube)) => {
                let localEulerAngles1 = (1., 2., 3.);
                let localEulerAngles2 = (3., 2., 3.);
                let engineState =
                  engineState
                  |> TransformGameObjectTool.setLocalEulerAngles(
                       firstCube,
                       localEulerAngles1,
                     )
                  |> TransformGameObjectTool.setLocalEulerAngles(
                       secondCube,
                       localEulerAngles2,
                     );

                engineState;
              };

              let _judge = (engineState, (firstCube, secondCube)) => {
                let engineState =
                  engineState |> DirectorToolEngine.runWithDefaultTime;

                TransformGameObjectTool.getEulerAngles(
                  OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo
                  |> StateLogicService.getEditorState,
                  engineState,
                )
                |> expect == (4.10583, 3.8374, 6.10583);
              };

              test("test only rotate", () => {
                let (engineState, (firstCube, secondCube)) =
                  _prepareForTestParent();

                let engineState =
                  _setRotate(engineState, (firstCube, secondCube));

                _judge(engineState, (firstCube, secondCube));
              });
              test("test translation+rotate", () => {
                let (engineState, (firstCube, secondCube)) =
                  _prepareForTestParent();

                let pos1 = (1., 2., 3.);
                let pos2 = (3., 2., 3.);
                let engineState =
                  engineState
                  |> TransformGameObjectEngineService.setLocalPosition(
                       firstCube,
                       pos1,
                     )
                  |> TransformGameObjectEngineService.setLocalPosition(
                       secondCube,
                       pos2,
                     );
                let engineState =
                  _setRotate(engineState, (firstCube, secondCube));

                _judge(engineState, (firstCube, secondCube));
              });
            })
          );

          describe(
            "scale gizmo based on the distance between current scene tree node and camera",
            () =>
            test(
              "the distance is more far, the scale of gizmo is more large", () => {
              let engineState = StateEngineService.unsafeGetState();
              let currentSceneTreeNode =
                MainEditorSceneTool.getFirstCube(engineState);
              let camera =
                MainEditorCameraTool.getCurrentCameraGameObject(engineState)
                |> OptionService.unsafeGet;
              let translationWholeGizmo =
                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo
                |> StateLogicService.getEditorState;

              let pos1 = (0., 0., 0.);
              let pos2 = (1., 0., 0.);
              let pos3 = (2., 0., 0.);
              let engineState =
                engineState
                |> TransformGameObjectEngineService.setLocalPosition(
                     currentSceneTreeNode,
                     pos1,
                   )
                |> TransformGameObjectEngineService.setLocalPosition(
                     camera,
                     pos2,
                   );
              let engineState =
                engineState |> DirectorToolEngine.runWithDefaultTime;
              let localScale1 =
                TransformGameObjectTool.getLocalScale(
                  translationWholeGizmo,
                  engineState,
                );

              let engineState =
                engineState
                |> TransformGameObjectEngineService.setLocalPosition(
                     camera,
                     pos3,
                   );
              let engineState =
                engineState |> DirectorToolEngine.runWithDefaultTime;
              let localScale2 =
                TransformGameObjectTool.getLocalScale(
                  translationWholeGizmo,
                  engineState,
                );

              (localScale1, localScale2)
              |> expect == ((0.03, 0.03, 0.03), (0.06, 0.06, 0.06));
            })
          );
        })
      );
    });
  });