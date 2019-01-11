open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

let _ =
  describe("MainEditorTransform scale", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    MainEditorTransformTestTool.transformBaseTest(
      sandbox,
      "test change scale value",
      (1., TransformUtils.getTransformScaleData),
      (
        MainEditorTransformTool.changeScaleX,
        MainEditorTransformTool.changeScaleY,
        MainEditorTransformTool.changeScaleZ,
      ),
    );

    describe("deal with specific case", () => {
      beforeEach(() => {
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~noWorkerJobRecord=
            NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
          (),
        );

        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        );
        DirectorToolEngine.prepareAndInitAllEnginState();
      });

      describe("the scale value in engineState can't be 0", () =>
        test("if input 0, set origin value to engineState instead of 0", () => {
          open FloatInput;

          let currentGameObjectTransform =
            GameObjectTool.getCurrentSceneTreeNodeTransform();
          let value = 0.;
          let state = {inputValue: Some("0."), originValue: "1.0"};

          let reasonStateUpdate =
            FloatInputTool.reducer(
              ~canBeZero=Some(true),
              ~action=Blur,
              ~state,
              (),
            )
            |> ReactTool.getUpdateState;

          reasonStateUpdate.inputValue |> expect == Some("0");
        })
      );
    });
  });