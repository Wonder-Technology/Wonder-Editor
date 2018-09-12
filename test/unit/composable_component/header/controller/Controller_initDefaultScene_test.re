open Wonderjs;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller init default scene", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test engine state", () =>
      describe("add grid plane gameObject", () =>
        describe("test components", () => {
          describe("add custom geometry component", () =>
            test("test vertices, indices", () => {
              let engineState = StateEngineService.unsafeGetState();
              let gridPlaneGameObject =
                MainEditorSceneTool.getGridPlaneInDefaultScene
                |> StateLogicService.getEditorState;

              let geometry =
                GameObjectComponentEngineService.unsafeGetGeometryComponent(
                  gridPlaneGameObject,
                  engineState,
                );

              let vertices =
                GeometryEngineService.getGeometryVertices(
                  geometry,
                  engineState,
                );
              let indices =
                GeometryEngineService.getGeometryIndices(
                  geometry,
                  engineState,
                );
              (
                vertices |> Js.Typed_array.Float32Array.length,
                indices |> Js.Typed_array.Uint16Array.length,
                vertices
                |> Js.Typed_array.Float32Array.slice(~start=0, ~end_=10),
                indices
                |> Js.Typed_array.Uint16Array.slice(~start=0, ~end_=10),
              )
              |>
              expect == (
                          732,
                          244,
                          Js.Typed_array.Float32Array.make([|
                            (-300.),
                            0.,
                            (-300.),
                            300.,
                            0.,
                            (-300.),
                            (-300.),
                            0.,
                            (-300.),
                            (-300.),
                          |]),
                          Js.Typed_array.Uint16Array.make([|
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                          |]),
                        );
            })
          );
          describe("add meshRenderer component", () =>
            test("drawMode should be Lines", () => {
              let engineState = StateEngineService.unsafeGetState();
              let gridPlaneGameObject =
                MainEditorSceneTool.getGridPlaneInDefaultScene
                |> StateLogicService.getEditorState;

              engineState
              |> GameObjectComponentEngineService.getMeshRendererComponent(
                   gridPlaneGameObject,
                 )
              |. MeshRendererEngineService.getDrawMode(engineState)
              |>
              expect == (
                          Wonderjs.DrawModeType.Lines
                          |> Wonderjs.DrawModeType.drawModeToUint8
                        );
            })
          );
          test("add basic material component", () => {
            let engineState = StateEngineService.unsafeGetState();
            let gridPlaneGameObject =
              MainEditorSceneTool.getGridPlaneInDefaultScene
              |> StateLogicService.getEditorState;

            engineState
            |> GameObjectComponentEngineService.hasBasicMaterialComponent(
                 gridPlaneGameObject,
               )
            |> expect == true;
          });
        })
      )
    );
  });