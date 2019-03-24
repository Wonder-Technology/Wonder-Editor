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
  });