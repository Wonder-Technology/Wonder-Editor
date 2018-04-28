'use strict';


var onload = (
        function (reader,handleFunc) {
            reader.onload = function() {
                handleFunc(this.result)
            }
        }
    );

export {
  onload ,
  
}
/* onload Not a pure module */
