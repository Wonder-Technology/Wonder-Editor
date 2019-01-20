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

    let _undoOneUiState = () =>
      UIHistoryService.storeUIState(
        100,
        Obj.magic(-1),
        AllStateData.getHistoryState(),
      )
      |> AllStateData.setHistoryState;

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test undo operate", () =>
      describe("test undo one step", () => {
        describe({j|test undo "pick one" operation|j}, () => {
          test("if not undo any ui state before, undo not work", () => {
            let (gameObject1, gameObject2) = _prepareTwoGameObjects(sandbox);

            InitPickingJobTool.triggerPickingAndRestore(
              ~sandbox,
              ~pageX=251 + 10,
              ~pageY=91 + 20,
              (),
            );

            RedoUndoTool.undoHistoryState();

            InitPickingJobTool.pickOne(gameObject1);
          });

          describe("else, undo work", () => {
            beforeEach(() => _undoOneUiState());

            test("step which from second to first", () => {
              let (gameObject1, gameObject2) =
                _prepareTwoGameObjects(sandbox);

              InitPickingJobTool.triggerPicking(
                sandbox,
                251 + 10,
                91 + 20,
                1,
              );
              InitPickingJobTool.triggerPickingAndRestore(
                ~sandbox,
                ~pageX=257 + 10,
                ~pageY=100 + 20,
                (),
              );

              RedoUndoTool.undoHistoryState();

              InitPickingJobTool.pickOne(gameObject1);
            });
          });
        });

        describe({j|test undo "not pick" operation|j}, () => {
          test("if not undo any ui state before, undo not work", () => {
            let (gameObject1, gameObject2) = _prepareTwoGameObjects(sandbox);

            InitPickingJobTool.triggerPickingAndRestore(
              ~sandbox,
              ~pageX=451 + 10,
              ~pageY=91 + 20,
              (),
            );

            RedoUndoTool.undoHistoryState();

            InitPickingJobTool.notPick();
          });

          describe("else, undo work", () => {
            beforeEach(() => _undoOneUiState());

            test("step which from second to first", () => {
              let (gameObject1, gameObject2) =
                _prepareTwoGameObjects(sandbox);

              InitPickingJobTool.triggerPicking(
                sandbox,
                251 + 10,
                91 + 20,
                1,
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
            sandbox,
            251 + 10,
            91 + 20,
            1,
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
  });