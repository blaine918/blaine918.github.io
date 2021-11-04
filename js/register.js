window.addEventListener('load', registerServiceWorker)

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then((res)=>{
            console.log('===SERVICE WORKER HAS BEEN REGISTRED===', res);
        }).catch((err)=>{
            console.log('===SERVICE WORKER REGISTER FAILED===', err);
        })
    } else {
        console.log('service worker not supported');
    }
}