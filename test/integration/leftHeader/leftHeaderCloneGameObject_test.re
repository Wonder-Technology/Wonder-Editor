open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("leftHeader clone gameObject", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test clone current gameObject", () => {
      test("should select cloned one", () => {
        let targetGameObject = GameObjectTool.getCurrentSceneTreeNode();

        MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();

        GameObjectTool.getCurrentSceneTreeNode() |> expect != targetGameObject;
      });
      test("cloned one should share the material", () => {
        let targetGameObjectLightMaterial =
          GameObjectTool.getCurrentSceneTreeNodeLightMaterial();

        MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();

        GameObjectTool.getCurrentSceneTreeNodeLightMaterial()
        |> expect == targetGameObjectLightMaterial;
      });
    });

    describe("check light count before clone", () =>
      describe("if light count will exceed max count after drag, warn", () => {
        let _test = (createLightFunc, judgeFunc) => {
          let warn =
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "warn",
            );

          let editorState = StateEditorService.getState();
          let engineState = StateEngineService.unsafeGetState();

          let (editorState, engineState) =
            createLightFunc(editorState, engineState);

          editorState |> StateEditorService.setState |> ignore;
          engineState |> StateEngineService.setState |> ignore;

          MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();

          judgeFunc(warn);
        };

        describe("test direction light", () =>
          describe("test exceed", () => {
            let _createLights = (editorState, engineState) => {
              let (editorState, engineState, directionLight1) =
                PrimitiveLogicService.createDirectionLight(
                  editorState,
                  engineState,
                );
              let (editorState, engineState, directionLight2) =
                PrimitiveLogicService.createDirectionLight(
                  editorState,
                  engineState,
                );

              let (editorState, engineState, directionLight3) =
                PrimitiveLogicService.createDirectionLight(
                  editorState,
                  engineState,
                );

              (editorState, engineState);
            };

            test("test clone gameObject has direction light component", () =>
              _test(
                (editorState, engineState) => {
                  let (editorState, engineState) =
                    _createLights(editorState, engineState);

                  editorState |> StateEditorService.setState |> ignore;
                  MainEditorSceneTool.setDirectionLightGameObjectToBeCurrentSceneTreeNode();

                  (StateEditorService.getState(), engineState);
                },
                warn =>
                  ConsoleTool.getMessage(warn)
                  |> expect
                  |> toContain(
                       MainEditorLightUtils.getDirectionLightExceedMaxCountMessage(),
                     ),
              )
            );
            test(
              "test clone gameObject whose children has direction light component",
              () =>
              _test(
                (editorState, engineState) => {
                  let (editorState, engineState) =
                    _createLights(editorState, engineState);

                  StateLogicService.setState((editorState, engineState));

                  let newGameObject = GameObjectTool.getNewGameObject();

                  MainEditorLeftHeaderTool.addEmptyGameObject();

                  let directionLightGameObject =
                    MainEditorSceneTool.getDirectionLightInDefaultScene
                    |> StateLogicService.getEngineStateToGetData;

                  MainEditorSceneTreeTool.Drag.dragGameObjectToBeTargetSib(
                    ~sourceGameObject=directionLightGameObject,
                    ~targetGameObject=newGameObject,
                    (),
                  );

                  GameObjectTool.setCurrentSceneTreeNode(newGameObject);

                  (
                    StateEditorService.getState(),
                    StateEngineService.unsafeGetState(),
                  );
                },
                warn =>
                  ConsoleTool.getMessage(warn)
                  |> expect
                  |> toContain(
                       MainEditorLightUtils.getDirectionLightExceedMaxCountMessage(),
                     ),
              )
            );
            test(
              "clone gameObject not has direction light component shouldn't warn",
              () =>
              _test(
                (editorState, engineState) => {
                  let (editorState, engineState) =
                    _createLights(editorState, engineState);

                  StateLogicService.setState((editorState, engineState));

                  MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();

                  (
                    StateEditorService.getState(),
                    StateEngineService.unsafeGetState(),
                  );
                },
                warn => warn |> expect |> not_ |> toCalled,
              )
            );
          })
        );

        describe("test point light", () =>
          describe("test exceed", () => {
            let _createLights = (editorState, engineState) => {
              let (editorState, engineState, pointLight1) =
                MainEditorPointLightTool.createPointLight(
                  editorState,
                  engineState,
                );
              let (editorState, engineState, pointLight2) =
                MainEditorPointLightTool.createPointLight(
                  editorState,
                  engineState,
                );

              let (editorState, engineState, pointLight3) =
                MainEditorPointLightTool.createPointLight(
                  editorState,
                  engineState,
                );

              let (editorState, engineState, pointLight4) =
                MainEditorPointLightTool.createPointLight(
                  editorState,
                  engineState,
                );

              (editorState, engineState, pointLight1);
            };

            test("test clone gameObject has point light component", () =>
              _test(
                (editorState, engineState) => {
                  let (editorState, engineState, pointLight1) =
                    _createLights(editorState, engineState);

                  let engineState =
                    SceneEngineService.addSceneChild(
                      pointLight1,
                      engineState,
                    );

                  editorState |> StateEditorService.setState |> ignore;
                  GameObjectTool.setCurrentSceneTreeNode(pointLight1);

                  (StateEditorService.getState(), engineState);
                },
                warn =>
                  ConsoleTool.getMessage(warn)
                  |> expect
                  |> toContain(
                       MainEditorLightUtils.getPointLightExceedMaxCountMessage(),
                     ),
              )
            );
            test(
              "test clone gameObject whose children has point light component",
              () =>
              _test(
                (editorState, engineState) => {
                  let (editorState, engineState, pointLight1) =
                    _createLights(editorState, engineState);

                  let (engineState, parent, _) =
                    GameObjectToolEngine.createGameObject(engineState);

                  let engineState =
                    GameObjectTool.addChild(parent, pointLight1, engineState);

                  let engineState =
                    SceneEngineService.addSceneChild(parent, engineState);

                  StateLogicService.setState((editorState, engineState));

                  GameObjectTool.setCurrentSceneTreeNode(parent);

                  (
                    StateEditorService.getState(),
                    StateEngineService.unsafeGetState(),
                  );
                },
                warn =>
                  ConsoleTool.getMessage(warn)
                  |> expect
                  |> toContain(
                       MainEditorLightUtils.getPointLightExceedMaxCountMessage(),
                     ),
              )
            );
            test(
              "clone gameObject not has point light component shouldn't warn",
              () =>
              _test(
                (editorState, engineState) => {
                  let (editorState, engineState, pointLight1) =
                    _createLights(editorState, engineState);

                  let engineState =
                    SceneEngineService.addSceneChild(
                      pointLight1,
                      engineState,
                    );

                  StateLogicService.setState((editorState, engineState));

                  MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();

                  (
                    StateEditorService.getState(),
                    StateEngineService.unsafeGetState(),
                  );
                },
                warn => warn |> expect |> not_ |> toCalled,
              )
            );
          })
        );
      })
    );
  });