var TransformAdaptorTool = YYC.Class({
    Public: {
        getPosition: function (transform) {
            return we.getPositionAdaptor(transform);
        }
    }
})

var transformAdaptorTool = new TransformAdaptorTool();
