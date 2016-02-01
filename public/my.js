(function() {
    'use strict';
    var socket; // = io.connect('http://localhost:8090');
    var btnLeave = document.getElementById('leave');
    var btnJoin = document.getElementById('join');
    var divStatus = document.getElementById('status');
    btnLeave.addEventListener('click', function() {
        console.log('ui leave', socket)
        socket.close();
    });
    btnJoin.addEventListener('click', function() {
        console.log('ui join', socket)
        if (!!socket && socket.connected) {
            return;
        }
        socket = io.connect('http://localhost:8090')
        socket.on('news', function() {
            
        })
    });
})()
