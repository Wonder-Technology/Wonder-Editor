var DirectorAdaptorTool = YYC.Class({
    Public: {
        isInit: function () {
            return we.isDirectorInit();
        },
        getDirector: function () {
            return we.getDirectorAdaptor();
        }
    }
})

var directorAdaptorTool = new DirectorAdaptorTool();
