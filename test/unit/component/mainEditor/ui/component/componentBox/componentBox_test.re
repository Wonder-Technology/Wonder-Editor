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
              let component = _buildComponentBoxComponent("newBox", false);
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "create closable componentBox component",
            () => {
              let component = _buildComponentBoxComponent("newBox", true);
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
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
              "first click triangle to hide content component",
              () => {
                let component = _buildComponentBoxComponent("newBox", true);
                EventToolUI.triggerComponentEvent(component, _triggerClickTriangle);
                let json = ReactTestRenderer.toJSON(component);
                toMatchSnapshot(expect(json))
              }
            );
            test(
              "second click triangle to show content component",
              () => {
                let component = _buildComponentBoxComponent("newBox", true);
                EventToolUI.triggerComponentEvent(component, _triggerClickTriangle);
                EventToolUI.triggerComponentEvent(component, _triggerClickTriangle);
                let json = ReactTestRenderer.toJSON(component);
                toMatchSnapshot(expect(json))
              }
            );
            }
            );
        }
      )
    }
  );