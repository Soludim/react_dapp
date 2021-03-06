export function download(url, fileName) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onprogress = function (event) {
        if (event.lengthComputable) {
           // var percentComplete = (event.loaded / event.total) * 100;
            //yourShowProgressFunction(percentComplete);
        }
    };
    xhr.onload = function (event) {
        if (this.status === 200) {
            _saveBlob(this.response, fileName);
        } else {
            //yourErrorFunction()
        }
    };
    xhr.onerror = function (event) {
        //yourErrorFunction() 
    };
    xhr.send();
} 
function _saveBlob(response, fileName) {
    if (navigator.msSaveBlob) {
        //OK for IE10+ 
        navigator.msSaveBlob(response, fileName);
    } else {
        _html5Saver(response, fileName);
    }
} 
function _html5Saver(blob, fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    document.body.removeChild(a);
}