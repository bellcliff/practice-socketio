
var init = function(server) {
    var io = require('socket.io')(server);
    var sockets = {};
    io.on('connection', function(socket) {
        socket.on('login', function(data){
            var user = data.user;
            if (!user){
                socket.emit('error', {
                    msg: 'user is needed'
                });
                return;
            }

            // regist to global
            sockets[user] = socket;

            /**
             * msg should be like
             * {
             *    to: 'another'
             *    msg: 'blabla'
             * }
             */
            socket.on('msg', function(data){
                socket.emit('onmsg', {status: 1});
                if (data && data.to && sockets[data.to]) {
                    // TODO, data.to is valid user
                    sockets[data.to].emit('msg', {
                        from: user,
                        msg: data.msg
                    });
                    return;
                }
                // TODO, offline msg
            });
        });
        socket.on('disconnect', function() {
            console.log('disconnect');
        });
    });
};

module.exports = init;

