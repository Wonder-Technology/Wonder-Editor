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
          ConsoleTool.notShowMessage();

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
          test("test exceed", () =>
            _test(
              (editorState, engineState) => {
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
          )
        );

        describe("test point light", () =>
          test("test exceed", () =>
            _test(
              (editorState, engineState) => {
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

                let engineState =
                  SceneEngineService.addSceneChild(pointLight1, engineState);

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
          )
        );
      })
    );
  });