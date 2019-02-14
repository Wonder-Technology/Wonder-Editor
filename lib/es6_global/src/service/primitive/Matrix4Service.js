


function getMaxScaleOnAxis(matTypeArr) {
  var scaleXSq = matTypeArr[0] * matTypeArr[0] + matTypeArr[1] * matTypeArr[1] + matTypeArr[2] * matTypeArr[2];
  var scaleYSq = matTypeArr[4] * matTypeArr[4] + matTypeArr[5] * matTypeArr[5] + matTypeArr[6] * matTypeArr[6];
  var scaleZSq = matTypeArr[8] * matTypeArr[8] + matTypeArr[9] * matTypeArr[9] + matTypeArr[10] * matTypeArr[10];
  return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
}

function extractBasic(matTypeArr) {
  var xAxis_000 = matTypeArr[0];
  var xAxis_001 = matTypeArr[1];
  var xAxis_002 = matTypeArr[2];
  var xAxis = /* tuple */[
    xAxis_000,
    xAxis_001,
    xAxis_002
  ];
  var yAxis_000 = matTypeArr[4];
  var yAxis_001 = matTypeArr[5];
  var yAxis_002 = matTypeArr[6];
  var yAxis = /* tuple */[
    yAxis_000,
    yAxis_001,
    yAxis_002
  ];
  var zAxis_000 = matTypeArr[8];
  var zAxis_001 = matTypeArr[9];
  var zAxis_002 = matTypeArr[10];
  var zAxis = /* tuple */[
    zAxis_000,
    zAxis_001,
    zAxis_002
  ];
  return /* tuple */[
          xAxis,
          yAxis,
          zAxis
        ];
}

export {
  getMaxScaleOnAxis ,
  extractBasic ,
  
}
/* No side effect */
