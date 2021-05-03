


function registerServiceWorker (param){
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
        .register('./service-worker.js')
        .then(function (registration) {
            console.log('Service Worker Registered'); 
        });
    }
};

export {
  registerServiceWorker ,
  
}
/* No side effect */
