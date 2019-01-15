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
        describe("test source and target has the same parent", () => {
          let _prepare = state => {
            let (state, parent) =
              Wonderjs.TransformAPI.createTransform(state);
            let (state, child1) =
              Wonderjs.TransformAPI.createTransform(state);
            let (state, child2) =
              Wonderjs.TransformAPI.createTransform(state);
            let (state, child3) =
              Wonderjs.TransformAPI.createTransform(state);

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
            let (state, parent, (child1, child2, child3)) =
              _prepare(state^);

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
            let (state, parent, (child1, child2, child3)) =
              _prepare(state^);

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
        });

        describe("test source and target has different parents", () => {
          let _prepare = state => {
            let (state, parent1) =
              Wonderjs.TransformAPI.createTransform(state);
            let (state, parent2) =
              Wonderjs.TransformAPI.createTransform(state);
            let (state, child1) =
              Wonderjs.TransformAPI.createTransform(state);
            let (state, child2) =
              Wonderjs.TransformAPI.createTransform(state);
            let (state, child3) =
              Wonderjs.TransformAPI.createTransform(state);

            let state =
              state
              |> Wonderjs.TransformAPI.setTransformParent(
                   Js.Nullable.return(parent1),
                   child1,
                 )
              |> Wonderjs.TransformAPI.setTransformParent(
                   Js.Nullable.return(parent1),
                   child2,
                 )
              |> Wonderjs.TransformAPI.setTransformParent(
                   Js.Nullable.return(parent2),
                   child3,
                 );

            (state, (parent1, parent2), (child1, child2, child3));
          };

          test("test before", () => {
            let (state, (parent1, parent2), (child1, child2, child3)) =
              _prepare(state^);

            let state =
              TransformEngineService.changeChildOrder(
                child3,
                child1,
                parent1,
                TransformType.Before,
                state,
              );

            (
              TransformEngineService.getChildren(parent1, state),
              TransformEngineService.getChildren(parent2, state),
            )
            |> expect == ([|child3, child1, child2|], [||]);
          });
        });

        describe("test source not has a parent", () => {
          let _prepare = state => {
            let (state, parent1) =
              Wonderjs.TransformAPI.createTransform(state);
            /* let (state, parent2) =
               Wonderjs.TransformAPI.createTransform(state); */
            let (state, child1) =
              Wonderjs.TransformAPI.createTransform(state);
            let (state, child2) =
              Wonderjs.TransformAPI.createTransform(state);
            let (state, child3) =
              Wonderjs.TransformAPI.createTransform(state);

            let state =
              state
              |> Wonderjs.TransformAPI.setTransformParent(
                   Js.Nullable.return(parent1),
                   child1,
                 )
              |> Wonderjs.TransformAPI.setTransformParent(
                   Js.Nullable.return(parent1),
                   child2,
                 );
            /* |> Wonderjs.TransformAPI.setTransformParent(
                 Js.Nullable.return(parent2),
                 child3,
               ); */

            (state, parent1, (child1, child2, child3));
          };

          test("test before", () => {
            let (state, parent1, (child1, child2, child3)) =
              _prepare(state^);

            let state =
              TransformEngineService.changeChildOrder(
                child3,
                child1,
                parent1,
                TransformType.Before,
                state,
              );

            (
              TransformEngineService.getChildren(parent1, state),
              TransformEngineService.getParent(child1, state),
              TransformEngineService.getParent(child3, state),
            )
            |>
            expect == (
                        [|child3, child1, child2|],
                        Some(parent1),
                        Some(parent1),
                      );
          });
        });
      })
    );
  });