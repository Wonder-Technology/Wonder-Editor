open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "componentBox",
    () => {
      let _buildComponentBoxComponent = (header,closable) =>
        ReactTestRenderer.create(
          <ComponentBox
            header
            closable
            gameObjectComponent=(<div> (DomHelper.textEl("simulate div component")) </div>)
          />
        );
      let _getFromArray = (array, index) => ArrayService.getNth(index, array);
      beforeEach(
        () => {
          TestTool.closeContractCheck();
        }
      );
      afterEach(() =>{
          TestTool.openContractCheck();
      });
      describe(
      "test component arguments",
      () => {
        test(
          "create can't close componentBox component",
          () => {
            _buildComponentBoxComponent("newBox", false) |> ReactTestTool.createSnapshotAndMatch;
          }
        );
        test(
          "create closable componentBox component",
          () => {
            _buildComponentBoxComponent("newBox", true) |> ReactTestTool.createSnapshotAndMatch;
          }
        );
       }
      );
      describe(
       "test workflow",
       () => {
            let _triggerClickTriangle = (domChildren) => {
              let headerDiv = _getFromArray(domChildren, 0);
              let triangleDiv = _getFromArray(headerDiv##children, 0);
              BaseEventTool.triggerClickEvent(triangleDiv)
            };
            test(
              "click once triangle to hide content component",
              () => {
                let component = _buildComponentBoxComponent("newBox", true);
                BaseEventTool.triggerComponentEvent(component, _triggerClickTriangle);
                component |>  ReactTestTool.createSnapshotAndMatch;

              }
            );
            test(
              "click twice triangle to show content component",
              () => {
                let component = _buildComponentBoxComponent("newBox", true);
                BaseEventTool.triggerComponentEvent(component, _triggerClickTriangle);
                BaseEventTool.triggerComponentEvent(component, _triggerClickTriangle);
                component |>  ReactTestTool.createSnapshotAndMatch;
              }
            );
          }
        );
    }
  );