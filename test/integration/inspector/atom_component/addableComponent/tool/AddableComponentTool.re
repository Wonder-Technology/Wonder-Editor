            let execAddDirectionLightComponent = () => {
              let boxComponentCount = ComponentDomTool.getBoxComponentCount();
              let renderingCategoryDomIndex =
                ComponentDomTool.getRenderingCategoryDomIndex();
              let lightTypeDomIndex = ComponentDomTool.getLightTypeDomIndex();

              OperateComponentEventTool.addComponentIntoCurrentGameObject(
                boxComponentCount,
                renderingCategoryDomIndex,
                lightTypeDomIndex,
              );
            };