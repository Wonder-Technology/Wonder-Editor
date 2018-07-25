
open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

let _ =
  describe("MainEditor ArcballCamera", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode to be camera", () => {
      beforeEach(() => {
        MainEditorSceneTool.initStateAndGl(~sandbox, ());
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setCameraTobeCurrentSceneTreeNode,
        );
      });

      describe(
      "test ",
      () => {
      test(
      "111",
      () => {
      expect(1) == 1
       }
      );
       }
      );


    });
  });