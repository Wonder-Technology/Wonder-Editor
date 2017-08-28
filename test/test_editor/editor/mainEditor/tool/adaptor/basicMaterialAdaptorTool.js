var BasicMaterialAdaptorTool = YYC.Class({
    Public: {
        getColor: function (material) {
            return we.getBasicMaterialColorAdaptor(material);
        }
    }
})

var basicMaterialAdaptorTool = new BasicMaterialAdaptorTool();
