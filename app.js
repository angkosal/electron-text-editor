const { dialog } = require('electron').remote;
const fs = require('fs');

let filePath = '';

document.getElementById('btnOpen').addEventListener('click', function () {
    dialog.showOpenDialog({ properties: ['openFile'] }).then(res => {
        filePath = res.filePaths[0];
        loadFile(filePath)
        window.localStorage.setItem('filePath', filePath);
    })
})

document.getElementById('btnSave').addEventListener('click', function () {
    fs.writeFile(
        filePath,
        document.getElementById('data').value,
        function (err) {
            console.log(err);
        }
    )
})

window.addEventListener('load', function () {
    filePath = window.localStorage.getItem('filePath');
    if (filePath) {
        loadFile(filePath);
    }
})

function loadFile(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        document.getElementById('data').value = data;
    });
}