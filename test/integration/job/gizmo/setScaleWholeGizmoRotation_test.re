open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

let _ =
  describe("test set scale whole gizmo rotation", () => {
    let sandbox = getSandboxDefaultVal();

    /* let _prepareState = () => {
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
           }; */

    beforeEach(()
      => sandbox := createSandbox());
      /* _prepareState(); */
      /* StateLogicService.getAndSetEngineState(MainUtils._handleEngineState); */
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("fix bug", () => {
      let _prepareGameObject = sandbox => {
        InitTransformGizmosJobTool.prepareOneGameObject(
          ~sandbox,
          ~viewWidth=500,
          ~viewHeight=200,
          ~offsetLeft=0,
          ~offsetTop=0,
          ~cameraPos=(0., 0., 3.),
          ~gameObjectPos=(0., 0., 0.),
          ~gameObjectEulerAngles=(0., 0., 0.),
          ~createGameObjectFunc=InitPickingJobTool.createCube,
          (),
        );

        CurrentTransformGizmoSceneViewEditorService.markScale
        |> StateLogicService.getAndSetEditorState;
      };

      let _prepare = sandbox => {
        let gameObject1 = _prepareGameObject(sandbox);

        InitPickingJobTool.triggerPicking(
          ~sandbox,
          ~pageX=250,
          ~pageY=100,
          (),
        );

        gameObject1;
      };

      describe(
        {|fix "scale gizmo"->"set whole gizmo rotation" bug:

        description
        now set scale whole gizmo rotation like Local coordinate system.
        but this will cause one bug:
        if drag x axis to scale to negative value, the whole gizmo->rotation will be changed(x axis is reverse!) and cause dithering!|},
        () =>
        describe("if drag x axis to scale to negative value", () => {
          test({|keep whole gizmo->rotation changed(x axis is reverse)|}, () => {
            let gameObject1 = _prepare(sandbox);

            EventTransformGizmosTool.triggerMouseDown(
              ~sandbox,
              ~pageX=250 + 10,
              ~pageY=100,
              (),
            );
            EventTransformGizmosTool.triggerFirstMouseDragOverEvent(
              ~sandbox,
              ~pageX=250 - 20,
              ~pageY=100,
              (),
            );

            TransformGameObjectTool.getEulerAngles(
              OperateScaleGizmoSceneViewEditorService.unsafeGetScaleWholeGizmo
              |> StateLogicService.getEditorState,
              StateEngineService.unsafeGetState(),
            )
            |> expect == (0., 0., 180.);
          });
          test("the scale x value should be negative", () => {
            let gameObject1 = _prepare(sandbox);

            EventTransformGizmosTool.triggerMouseDown(
              ~sandbox,
              ~pageX=250 + 10,
              ~pageY=100,
              (),
            );
            EventTransformGizmosTool.triggerFirstMouseDragOverEvent(
              ~sandbox,
              ~pageX=250 - 20,
              ~pageY=100,
              (),
            );

            let currentSceneTreeNodeLocalScale1 =
              InitTransformGizmosJobTool.getCurrentSceneTreeNodeLocalScale();

            EventTransformGizmosTool.triggerMouseMove(
              ~sandbox,
              ~pageX=250 - 30,
              ~pageY=100,
              (),
            );

            let currentSceneTreeNodeLocalScale2 =
              InitTransformGizmosJobTool.getCurrentSceneTreeNodeLocalScale();

            (currentSceneTreeNodeLocalScale1, currentSceneTreeNodeLocalScale2)
            |> expect == (((-2.), 1., 1.), ((-3.), 1., 1.));
          });
        })
      );
    });
  });