open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

/* TODO move to engine */
let _ =
  describe("TransformEngineService", () => {
    let createState = () =>
      /* SharedArrayBufferTool.setSharedArrayBufferToBeArrayBuffer(.); */
      Wonderjs.StateAPI.createState();

    let sandbox = getSandboxDefaultVal();
    /* let state = ref(Wonderjs.MainStateTool.createState()); */
    let state = ref(createState());

    beforeEach(() => {
      sandbox := createSandbox();

      state := TestToolEngine.initWithoutBuildFakeDom(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("changeChildOrder", () =>
      describe("change child order", () => {
        let _prepare = state => {
          let (state, parent) = Wonderjs.TransformAPI.createTransform(state);
          let (state, child1) = Wonderjs.TransformAPI.createTransform(state);
          let (state, child2) = Wonderjs.TransformAPI.createTransform(state);
          let (state, child3) = Wonderjs.TransformAPI.createTransform(state);

          let state =
            state
            |> Wonderjs.TransformAPI.setTransformParent(
                 Js.Nullable.return(parent),
                 child1,
               )
            |> Wonderjs.TransformAPI.setTransformParent(
                 Js.Nullable.return(parent),
                 child2,
               )
            |> Wonderjs.TransformAPI.setTransformParent(
                 Js.Nullable.return(parent),
                 child3,
               );

          (state, parent, (child1, child2, child3));
        };

        test("test before", () => {
          let (state, parent, (child1, child2, child3)) = _prepare(state^);

          let state =
            TransformEngineService.changeChildOrder(
              child3,
              child1,
              parent,
              TransformType.Before,
              state,
            );

          TransformEngineService.getChildren(parent, state)
          |> expect == [|child3, child1, child2|];
        });
        test("test after", () => {
          let (state, parent, (child1, child2, child3)) = _prepare(state^);

          let state =
            TransformEngineService.changeChildOrder(
              child3,
              child1,
              parent,
              TransformType.After,
              state,
            );

          TransformEngineService.getChildren(parent, state)
          |> expect == [|child1, child3, child2|];
        });
      })
    );
  });