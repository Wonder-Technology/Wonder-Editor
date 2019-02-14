open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: pick", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareTwoGameObjects = sandbox =>
      InitPickingJobTool.prepareTwoGameObjects(
        ~sandbox,
        ~viewWidth=510,
        ~viewHeight=200,
        ~offsetLeft=10,
        ~offsetTop=20,
        ~cameraPos=(
          2.2987656593322754,
          8.099184036254883,
          1.1699984073638916,
        ),
        ~gameObject1Pos=(0., 0., 0.),
        ~gameObject1EulerAngles=(0., 0., 0.),
        ~gameObject2Pos=(1., 2., 0.),
        ~gameObject2EulerAngles=(0., 0., 0.),
        ~createGameObjectFunc1=InitPickingJobTool.createCube,
        ~createGameObjectFunc2=InitPickingJobTool.createCube,
        (),
      );

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test undo operate", () =>
      describe("test undo one step", () => {
        describe({j|test undo "pick one" operation|j}, () => {
          test("if not undo any ui state before, undo should still work", () => {
            let (gameObject1, gameObject2) = _prepareTwoGameObjects(sandbox);

            InitPickingJobTool.triggerPickingAndRestore(
              ~sandbox,
              ~pageX=251 + 10,
              ~pageY=91 + 20,
              (),
            );

            RedoUndoTool.undoHistoryState();

            InitPickingJobTool.notPick();
          });

          describe("else, undo work", () =>
            test("step which from second to first", () => {
              let (gameObject1, gameObject2) =
                _prepareTwoGameObjects(sandbox);

              InitPickingJobTool.triggerPicking(
                ~sandbox,
                ~pageX=251 + 10,
                ~pageY=91 + 20,
                (),
              );
              InitPickingJobTool.triggerPickingAndRestore(
                ~sandbox,
                ~pageX=257 + 10,
                ~pageY=100 + 20,
                (),
              );

              RedoUndoTool.undoHistoryState();

              InitPickingJobTool.pickOne(gameObject1);
            })
          );
        });

        describe({j|test undo "not pick" operation|j}, () => {
          test("if not undo any ui state before, undo should still work", () => {
            let (gameObject1, gameObject2) = _prepareTwoGameObjects(sandbox);

            InitPickingJobTool.triggerPicking(
              ~sandbox,
              ~pageX=251 + 10,
              ~pageY=91 + 20,
              (),
            );
            InitPickingJobTool.triggerPickingAndRestore(
              ~sandbox,
              ~pageX=451 + 10,
              ~pageY=91 + 20,
              (),
            );

            RedoUndoTool.undoHistoryState();

            InitPickingJobTool.pickOne(gameObject1);
          });

          describe("else, undo work", () => {
            test("test1", () => {
              let (gameObject1, gameObject2) =
                _prepareTwoGameObjects(sandbox);

              InitPickingJobTool.triggerPicking(
                ~sandbox,
                ~pageX=251 + 10,
                ~pageY=91 + 20,
                (),
              );
              InitPickingJobTool.triggerPickingAndRestore(
                ~sandbox,
                ~pageX=451 + 10,
                ~pageY=91 + 20,
                (),
              );

              RedoUndoTool.undoHistoryState();

              InitPickingJobTool.pickOne(gameObject1);
            });
            test("test2", () => {
              let (gameObject1, gameObject2) =
                _prepareTwoGameObjects(sandbox);

              InitPickingJobTool.triggerPicking(
                ~sandbox,
                ~pageX=251 + 10,
                ~pageY=91 + 20,
                (),
              );
              InitPickingJobTool.triggerPicking(
                ~sandbox,
                ~pageX=451 + 10,
                ~pageY=91 + 20,
                (),
              );
              InitPickingJobTool.triggerPickingAndRestore(
                ~sandbox,
                ~pageX=251 + 10,
                ~pageY=91 + 20,
                (),
              );

              RedoUndoTool.undoHistoryState();

              InitPickingJobTool.notPick();
            });
          });
        });
      })
    );

    describe("test redo operate", () =>
      describe("test redo one step", () =>
        test(
          "undo step which from second to first, redo step which from first to second",
          () => {
          let (gameObject1, gameObject2) = _prepareTwoGameObjects(sandbox);

          InitPickingJobTool.triggerPicking(
            ~sandbox,
            ~pageX=251 + 10,
            ~pageY=91 + 20,
            (),
          );
          InitPickingJobTool.triggerPickingAndRestore(
            ~sandbox,
            ~pageX=257 + 10,
            ~pageY=100 + 20,
            (),
          );

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          InitPickingJobTool.pickOne(gameObject2);
        })
      )
    );

    describe("fix bug", () =>{
      describe(
        {j|if "pick the same gameObject" multiple times continuously, only push to stack once|j},
        () =>
        test("test undo", () => {
          let (gameObject1, gameObject2) = _prepareTwoGameObjects(sandbox);

          InitPickingJobTool.triggerPicking(
            ~sandbox,
            ~pageX=251 + 10,
            ~pageY=91 + 20,
            (),
          );
          InitPickingJobTool.triggerPicking(
            ~sandbox,
            ~pageX=257 + 10,
            ~pageY=100 + 20,
            (),
          );
          InitPickingJobTool.triggerPickingAndRestore(
            ~sandbox,
            ~pageX=257 + 10,
            ~pageY=100 + 20,
            (),
          );

          RedoUndoTool.undoHistoryState();

          InitPickingJobTool.pickOne(gameObject1);
        })
      );

      describe(
        {j|if "not pick" multiple times continuously, only push to stack once|j},
        () =>
        test("test undo", () => {
          let (gameObject1, gameObject2) = _prepareTwoGameObjects(sandbox);

          InitPickingJobTool.triggerPicking(
            ~sandbox,
            ~pageX=251 + 10,
            ~pageY=91 + 20,
            (),
          );
          InitPickingJobTool.triggerPicking(
            ~sandbox,
            ~pageX=451 + 10,
            ~pageY=91 + 20,
            (),
          );
          InitPickingJobTool.triggerPickingAndRestore(
            ~sandbox,
            ~pageX=451 + 10,
            ~pageY=91 + 20,
            (),
          );

          RedoUndoTool.undoHistoryState();

          InitPickingJobTool.pickOne(gameObject1);
        })
      )
    }
    );
  });