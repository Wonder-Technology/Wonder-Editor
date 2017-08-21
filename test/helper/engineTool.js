var engineTool = (function () {
    return {
        isTriangle:function (gameObject) {
            if(this.hasGeometry(gameObject)){
                var geometryData = gameObject.geometry.geometryData;
                var indicesStr = geometryData.indice.sort().toString();

                if(indicesStr == this.triangleIndices.sort().toString()){
                    return true;
                }

                return false;
            }
        },
        isBox:function(gameObject){
            if(this.hasGeometry(gameObject)){
                var geometryData = gameObject.geometry.geometryData;
                var indicesStr = geometryData.indice.sort().toString();

                if(indicesStr == this.boxIndices.sort().toString()){
                    return true;
                }

                return false;
            }
        },
        isCamera:function (gameObject) {
            var componentList = gameObject._componentManager._componentList.children;
            var result = null;

            componentList.forEach(function (item) {
                for(var i in item){
                    if(i == "camera") {
                        result = true;
                    }
                }
            });

            if(result)
                return true;
            else
                return false;

        },
        type:function (target) {
            return {}.toString.call(target).slice(8,-1).toLowerCase();
        },
        hasGeometry:function(gameObject){
            return gameObject.geometry !== void 0 && gameObject.geometry !== null
        },
        triangleIndices: [0, 1, 2],
        boxIndices:[0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23     ],
    }
}());
