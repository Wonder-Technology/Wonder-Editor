open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

let _ =
  describe("MainEditorTransform rotation", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    MainEditorTransformTestTool.transformBaseTest(
      sandbox,
      "test change rotation value",
      (0., TransformUtils.getTransformRotationData),
      (
        MainEditorTransformTool.changeRotationX,
        MainEditorTransformTool.changeRotationY,
        MainEditorTransformTool.changeRotationZ,
      ),
    );
  });