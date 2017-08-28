var transformOperTool = (function(){
    return {
        getEulerAngle:function (gameObject) {
            // var result = [];
            //
            // triangleTransform.mMatrix.elements.forEach(function (i) {
            //     result.push(i)
            // });
            //
            // return result;

            //todo need finish
        },
        getTriangleMatrixElement:function (triangleTransform) {
            var result = [];

            triangleTransform.mMatrix.elements.forEach(function (i) {
                result.push(i)
            });

            return result;
        },
        getTransform:we.getTransformOper
   }
})();
