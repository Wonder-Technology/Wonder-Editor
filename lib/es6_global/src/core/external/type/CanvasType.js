


function getCanvasContext (canvas){
    return canvas.getContext("2d");
    };

function drawImage (canvasContext,canvasDom,clipBegin,clipEnd,clipWidth,clipHeight,snapshotBegin,snapshotEnd,snapshotWidth,snapshotHeight){
       canvasContext.drawImage(canvasDom, clipBegin, clipEnd, clipWidth, clipHeight, snapshotBegin, snapshotEnd, snapshotWidth, snapshotHeight);
     };

function clearRect (canvasContext,canvasDom){
  canvasContext.clearRect(0, 0, canvasDom.width, canvasDom.height);

  return canvasContext;
     };

function toDataURL (canvasDom){
    return canvasDom.toDataURL();
  };

export {
  getCanvasContext ,
  drawImage ,
  clearRect ,
  toDataURL ,
  
}
/* No side effect */
