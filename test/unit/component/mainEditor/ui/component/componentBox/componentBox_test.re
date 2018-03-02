open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "componentBox ui component",
    () => {
      let _buildComponentBoxComponent = (header,closable) =>
        ReactTestRenderer.create(
          <ComponentBox
            header
            closable
            gameObjectComponent=<div> (DomHelper.textEl("simulate div component")) </div>
          />
        );
      let _getFromArray = (array, index) => OperateArrayUtils.getNth(index, array);
      beforeEach(
        () => {
          TestToolEditor.closeContractCheck();
        }
      );
      afterEach(() =>{
          TestToolEditor.openContractCheck();
      });
      describe(
        "test snapshot",
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
          describe(
          "test show/hide content component",
          () => {
            let _triggerClickTriangle = (domChildren) => {
              let headerDiv = _getFromArray(domChildren, 0);
              let triangleDiv = _getFromArray(headerDiv##children, 0);
              EventToolUI.triggerClickEvent(triangleDiv)
            };
            test(
              "click once triangle to hide content component",
              () => {
                let component = _buildComponentBoxComponent("newBox", true);
                EventToolUI.triggerComponentEvent(component, _triggerClickTriangle);
                component |>  ReactTestTool.createSnapshotAndMatch;

              }
            );
            test(
              "click twice triangle to show content component",
              () => {
                let component = _buildComponentBoxComponent("newBox", true);
                EventToolUI.triggerComponentEvent(component, _triggerClickTriangle);
                EventToolUI.triggerComponentEvent(component, _triggerClickTriangle);
                component |>  ReactTestTool.createSnapshotAndMatch;
              }
            );
            }
            );
        }
      )
    }
  );