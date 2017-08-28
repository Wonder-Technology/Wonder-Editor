var CameraAdaptorTool = YYC.Class({
    Public: {
        getNear: function (cameraController) {
            return we.getNearAdaptor(cameraController);
        },
        getFar: function (cameraController) {
            return we.getFarAdaptor(cameraController);
        },
        getAspect: function (cameraController) {
            return we.getAspectAdaptor(cameraController);
        },
        getFovy: function (cameraController) {
            return we.getFovyAdaptor(cameraController);
        }
    }
})

var cameraAdaptorTool = new CameraAdaptorTool();
