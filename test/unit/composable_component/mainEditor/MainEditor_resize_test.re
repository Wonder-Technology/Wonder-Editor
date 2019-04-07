open Wonder_jest;
open Expect;
open Expect.Operators;
open Sinon;

let _ =
  describe("test mainEditor->resize", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareState = () => {
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~initPipelines=
              {|
             [
         {
           "name": "default",
           "jobs": [
             {
               "name": "init_imgui"
             }
           ]
         }
       ]
             |},
            ~initJobs=
              {|
             [
               { "name": "init_imgui" }
             ]
             |},
            ~loopPipelines=
              {|
             [
         {
           "name": "default",
           "jobs": [
           ]
         }
       ]
             |},
            ~loopJobs={|
             []
             |},
            (),
          ),
        (),
      );

      MainEditorSceneTool.initInspectorEngineState(
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
                    {"name": "init_inspector_engine" }
                ]
              }
            ]
             |},
            ~initJobs=
              {|
             [
                {"name": "init_inspector_engine" }
             ]
             |},
            (),
          ),
        (),
      );

      StateInspectorEngineService.unsafeGetState()
      |> MainUtils._handleInspectorEngineState
      |> StateInspectorEngineService.setState
      |> ignore;

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );
    };

    let _resizeMainCanvas = sandbox => {
      let dispatchFunc = SinonTool.createOneLengthStub(sandbox^);

      MainEditorResizeTool.resizeMainCanvasScreen(dispatchFunc);

      dispatchFunc;
    };

    let _resizeInspectorCanvas = sandbox => {
      let dispatchFunc = SinonTool.createOneLengthStub(sandbox^);

      MainEditorResizeTool.resizeInspectorCanvasScreen(dispatchFunc);

      dispatchFunc;
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("resize main-canvas and viewPort", () => {
      describe("set main-canvas size", () =>
        test(
          "main-canvas's width and height should == parent's width and height",
          () => {
          _prepareState();
          let (mainParentDom, mainCanvasDom, _, _) =
            IMGUITool.stubMainCanvasAndInspectorCanvasDom(sandbox);

          let _ = _resizeMainCanvas(sandbox);

          (mainCanvasDom##width, mainCanvasDom##height)
          |> expect
          == (mainParentDom##offsetWidth, mainParentDom##offsetHeight);
        })
      );

      /* describe("send uniform projection mat data", () =>
           test("test", () => {
             _prepareState();
             let (mainParentDom, mainCanvasDom) =
               IMGUITool.stubMainCanvasAndInspectorCanvasDom(sandbox);
             let gl = FakeGlToolEngine.getEngineStateGl();
             let pos1 = 10;
             gl##getUniformLocation
             |> withTwoArgs(Sinon.matchAny, "u_projectionMat")
             |> returns(pos1);

             MainEditor.Method.resizeCanvasAndViewPort();

             gl##uniformMatrix4fv
             |> withOneArg(pos1)
             |> getCallCount
             |> expect == 1;
           })
         ); */

      describe("set viewport", () =>
        test(
          "main-canvas's viewport should == canvas parent's width and height",
          () => {
          _prepareState();
          let (mainCanvasparentDom, mainCanvasDom, _, _) =
            IMGUITool.stubMainCanvasAndInspectorCanvasDom(sandbox);

          let _ = _resizeMainCanvas(sandbox);

          let (_, _, width, height) =
            StateEngineService.unsafeGetState()
            |> DeviceManagerEngineService.getViewport
            |> OptionService.unsafeGet;

          (width, height)
          |> expect
          == (
               mainCanvasparentDom##offsetWidth,
               mainCanvasparentDom##offsetHeight,
             );
        })
      );

      describe("update view rect", () =>
        test("update scene view and game view rect", () => {
          _prepareState();
          let (mainCanvasparentDom, mainCanvasDom, _, _) =
            IMGUITool.stubMainCanvasAndInspectorCanvasDom(sandbox);
          let width = mainCanvasparentDom##offsetWidth;
          let height = mainCanvasparentDom##offsetHeight;

          let _ = _resizeMainCanvas(sandbox);

          let editorState = StateEditorService.getState();
          (
            SceneViewEditorService.unsafeGetViewRect(editorState),
            GameViewEditorService.unsafeGetViewRect(editorState),
          )
          |> expect
          == ((0, 0, width / 2, height), (width / 2, 0, width / 2, height));
        })
      );

      describe("update all cameraProjections by new aspect", () => {
        let _setFakeCanvasd = (width, height) =>
          SettingToolEngine.setFakeCanvasToEngineState(~width, ~height, ());

        let _getAllPMatrixs = engineState =>
          GameObjectComponentEngineService.getAllPerspectiveCameraProjectionComponents(
            engineState,
          )
          |> Js.Array.map(cameraProjection =>
               engineState
               |> Wonderjs.PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraProjectionPMatrix(
                    cameraProjection,
                  )
             );

        beforeEach(() => {
          MainEditorSceneTool.initStateWithJob(
            ~sandbox,
            ~noWorkerJobRecord=
              NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
                ~loopPipelines=
                  {|
                [
            {
              "name": "default",
              "jobs": [
                {
                  "name": "update_camera"
                }
              ]
            }
          ]
                |},
                ~loopJobs=
                  {|
                [
                {
                  "name": "update_camera"
                }
                ]
                |},
                (),
              ),
            (),
          );

          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          );

          DirectorToolEngine.prepareAllEnginState();
        });

        test(
          "test resize twice(the first resize is to mark all cameraProjections not dirty)",
          () => {
            _setFakeCanvasd(200., 200.);
            let (mainCanvasparentDom, mainCanvasDom, _, _) =
              IMGUITool.stubMainCanvasAndInspectorCanvasDom(sandbox);

            let _ = _resizeMainCanvas(sandbox);
            _setFakeCanvasd(100., 200.);
            let _ = _resizeMainCanvas(sandbox);

            let engineState = StateEngineService.unsafeGetState();
            let pMatrix =
              PerspectiveCameraProjectionToolEngine.buildPerspective(
                60.,
                100. /. 200.,
                0.01,
                50000.,
              );

            _getAllPMatrixs(engineState) |> expect == [|pMatrix, pMatrix|];
          },
        );
      });
    });

    describe("resize inspector-canvas and viewPort", () => {
      beforeEach(() => _prepareState());
      afterEach(() => CanvasTool.restoreMainCanvasAndInspectorCanvasDom());

      describe("set inspector-canvas size", () =>
        test(
          "inspector-canvas's width and height should == parent's width and height",
          () => {
          let (
            _mainParentDom,
            _mainCanvasDom,
            inspectorParentDom,
            inspectorCanvasDom,
          ) =
            CanvasTool.stubMainCanvasAndInspectorCanvasDom(
              ~sandbox,
              ~offsetWidth=200,
              ~offsetHeight=200,
              ~canvasWidth=100,
              ~canvasHeight=100,
              (),
            );

          _resizeInspectorCanvas(sandbox) |> ignore;

          (inspectorCanvasDom##width, inspectorCanvasDom##height)
          |> expect
          == (
               inspectorParentDom##offsetWidth,
               inspectorParentDom##offsetHeight,
             );
        })
      );

      describe("set viewport", () =>
        test(
          "inspector-canvas's viewport should == canvas parent's width and height",
          () => {
          let (
            _mainParentDom,
            _mainCanvasDom,
            inspectorParentDom,
            inspectorCanvasDom,
          ) =
            CanvasTool.stubMainCanvasAndInspectorCanvasDom(
              ~sandbox,
              ~offsetWidth=200,
              ~offsetHeight=200,
              (),
            );

          _resizeInspectorCanvas(sandbox) |> ignore;

          let (_, _, width, height) =
            StateInspectorEngineService.unsafeGetState()
            |> DeviceManagerEngineService.getViewport
            |> OptionService.unsafeGet;

          (width, height)
          |> expect
          == (
               inspectorParentDom##offsetWidth,
               inspectorParentDom##offsetHeight,
             );
        })
      );

      describe("fix bug", () => {
        describe("if not show inspector canvas", () =>
          test(
            "trigger onResize function should not resize inspector canvas", () => {
            open MainEditor;
            let (canvasWidth, canvasHeight) = (100, 100);

            let (_, _, inspectorParentDom, inspectorCanvasDom) =
              CanvasTool.stubMainCanvasAndInspectorCanvasDom(
                ~sandbox,
                ~offsetWidth=0,
                ~offsetHeight=0,
                ~canvasWidth,
                ~canvasHeight,
                (),
              );

            DomHelper.setDomDisplay(
              DomHelper.getElementById("inspectorCanvasParent"),
              false,
            );

            MainEditor.Method.onResize(
              DomHelper.getElementById("inspectorCanvasParent"),
            );

            (inspectorCanvasDom##width, inspectorCanvasDom##height)
            |> expect == (canvasWidth, canvasHeight);
          })
        );
        describe("else", () =>
          test("trigger onResize function should resize inspector canvas", () => {
            open MainEditor;

            let (canvasWidth, canvasHeight) = (100, 100);
            let (parentOffsetWidth, parentOffsetHeight) = (200, 200);

            let (_, _, inspectorParentDom, inspectorCanvasDom) =
              CanvasTool.stubMainCanvasAndInspectorCanvasDom(
                ~sandbox,
                ~offsetWidth=200,
                ~offsetHeight=200,
                ~canvasWidth,
                ~canvasHeight,
                (),
              );

            DomHelper.setDomDisplay(
              DomHelper.getElementById("inspectorCanvasParent"),
              true,
            );

            MainEditor.Method.onResize(
              DomHelper.getElementById("inspectorCanvasParent"),
            );

            (inspectorCanvasDom##width, inspectorCanvasDom##height)
            |> expect == (parentOffsetWidth, parentOffsetHeight);
          })
        );
      });
    });
  });