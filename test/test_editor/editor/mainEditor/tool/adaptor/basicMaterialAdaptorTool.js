var BasicMaterialAdaptorTool = YYC.Class({
    Public: {
        create:we.createBasicMaterialAdaptor,
        getColor: function (material) {
            return we.getBasicMaterialColorAdaptor(material);
        }
    }
})

var basicMaterialAdaptorTool = new BasicMaterialAdaptorTool();
