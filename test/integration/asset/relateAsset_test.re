open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("relate asset", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test isLightMaterialDataEqual", () =>
      describe("test judge name is equal", () => {
        test(
          "if sourceName and targetName are all default name, return true", () => {
          let engineState = StateEngineService.unsafeGetState();
          let (engineState, _, material) =
            LightMaterialToolEngine.createGameObject(engineState);

          let name1 = "lightMaterial_1";
          let name2 = "lightMaterial_3";

          let engineState =
            LightMaterialEngineService.setLightMaterialName(
              material,
              name2,
              engineState,
            );

          RelateGameObjectAndAssetUtils._isLightMaterialNameEqual(
            Some(name1),
            material,
            engineState,
          )
          |> expect == true;
        });
        test("else if all are None, return true", () => {
          let engineState = StateEngineService.unsafeGetState();
          let (engineState, _, material) =
            LightMaterialToolEngine.createGameObject(engineState);

          RelateGameObjectAndAssetUtils._isLightMaterialNameEqual(
            None,
            material,
            engineState,
          )
          |> expect == true;
        });
        test("else, judge sourceName == targetName", () => {
          let engineState = StateEngineService.unsafeGetState();
          let (engineState, _, material) =
            LightMaterialToolEngine.createGameObject(engineState);

          let name1 = "lightMaterial_1";
          let name2 = "name2";

          let engineState =
            LightMaterialEngineService.setLightMaterialName(
              material,
              name2,
              engineState,
            );

          RelateGameObjectAndAssetUtils._isLightMaterialNameEqual(
            Some(name1),
            material,
            engineState,
          )
          |> expect == false;
        });
      })
    );

    describe("test _isImageNodeDataEqual", () =>
      describe("test judge name is equal", () => {
        test(
          "if sourceName and targetName are all default name, return true", () =>
          RelateGameObjectAndAssetUtils._isImageNameEqual(
            "image_1",
            ImageTool.buildImage(~name="image_3", ()),
          )
          |> expect == true
        );
        test("else, judge sourceName == targetName", () =>
          RelateGameObjectAndAssetUtils._isImageNameEqual(
            "image_1",
            ImageTool.buildImage(~name="name2", ()),
          )
          |> expect == false
        );
      })
    );
  });