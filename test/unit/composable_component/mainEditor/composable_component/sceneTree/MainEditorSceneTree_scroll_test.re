open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorSceneTree;

open Js.Promise;

let _ =
  describe("MainEditorSceneTree scroll", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set x axis scroll value", () => {
      describe("test x axis scroll left", () =>
        describe(
          "if selected sceneTreeNode dom Beyond a certain range on the left of the parent container",
          () =>
          test(
            "set scroll left to be half of the sceneTree container dom offset width",
            () => {
            let offsetLeft = 150.;
            let offsetWidth = 230.;

            let sceneTreeContainerJsObj =
              MainEditorSceneTreeScrollTool.buildSceneTreeContainerJsObj(
                ~scrollLeft=145.,
                ~offsetWidth,
                (),
              );

            let sceneTreeNodeDomClientRect =
              MainEditorSceneTreeScrollTool.buildSceneTreeNodeDomClientRect(
                ~offsetLeft,
                (),
              );

            SceneTreeNodeScrollUtils.scrollCurrentSceneTreeNode(
              sceneTreeContainerJsObj,
              sceneTreeNodeDomClientRect,
            );

            expect(sceneTreeContainerJsObj##scrollLeft) == offsetLeft
            -. offsetWidth
            /. 2.;
          })
        )
      );

      describe("test x axis scroll right", () =>
        describe(
          "if selected sceneTreeNode dom Beyond a certain range on the right of the parent container",
          () =>
          test(
            "set scroll left to be the selected sceneTreeNode dom offset left - (the half of the sceneTree container dom offsetWidth)",
            () => {
              let offsetLeft = 345.;
              let offsetWidth = 230.;

              let sceneTreeContainerJsObj =
                MainEditorSceneTreeScrollTool.buildSceneTreeContainerJsObj(
                  ~scrollLeft=145.,
                  ~offsetWidth,
                  (),
                );

              let sceneTreeNodeDomClientRect =
                MainEditorSceneTreeScrollTool.buildSceneTreeNodeDomClientRect(
                  ~offsetLeft,
                  (),
                );

              SceneTreeNodeScrollUtils.scrollCurrentSceneTreeNode(
                sceneTreeContainerJsObj,
                sceneTreeNodeDomClientRect,
              );

              expect(sceneTreeContainerJsObj##scrollLeft) == offsetLeft
              -. offsetWidth
              /. 2.;
            },
          )
        )
      );
    });

    describe("test set y axis scroll value", () => {
      describe("test y axis scroll top", () =>
        describe(
          "if selected sceneTreeNode dom Beyond a certain range on the top of the parent container",
          () =>
          test(
            "set scroll top to be half of the sceneTree container dom offset height",
            () => {
            let offsetHeight = 330.;
            let offsetTop = 565.;

            let sceneTreeContainerJsObj =
              MainEditorSceneTreeScrollTool.buildSceneTreeContainerJsObj(
                ~scrollTop=545.,
                ~offsetHeight,
                (),
              );

            let sceneTreeNodeDomClientRect =
              MainEditorSceneTreeScrollTool.buildSceneTreeNodeDomClientRect(
                ~offsetTop,
                (),
              );

            SceneTreeNodeScrollUtils.scrollCurrentSceneTreeNode(
              sceneTreeContainerJsObj,
              sceneTreeNodeDomClientRect,
            );

            expect(sceneTreeContainerJsObj##scrollTop) == offsetTop
            -. offsetHeight
            /. 2.;
          })
        )
      );

      describe("test y axis scroll bottom", () =>
        describe(
          "if selected sceneTreeNode dom Beyond a certain range on the bottom of the parent container",
          () =>
          test(
            "set scroll top to be the selected sceneTreeNode dom offset top - (the half of the sceneTree container dom offsetHeight)",
            () => {
              let offsetHeight = 330.;
              let offsetTop = 445.;

              let sceneTreeContainerJsObj =
                MainEditorSceneTreeScrollTool.buildSceneTreeContainerJsObj(
                  ~scrollTop=145.,
                  ~offsetHeight=330.,
                  (),
                );

              let sceneTreeNodeDomClientRect =
                MainEditorSceneTreeScrollTool.buildSceneTreeNodeDomClientRect(
                  ~offsetTop,
                  (),
                );

              SceneTreeNodeScrollUtils.scrollCurrentSceneTreeNode(
                sceneTreeContainerJsObj,
                sceneTreeNodeDomClientRect,
              );

              expect(sceneTreeContainerJsObj##scrollTop) == offsetTop
              -. offsetHeight
              /. 2.;
            },
          )
        )
      );
    });
  });