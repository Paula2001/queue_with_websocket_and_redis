const { emit } = require('../app');

module.exports =  function connectToSocket(server ,setRedisData ,getRedisData){
    const io = require('socket.io')(server);
    recieveMsg(io, setRedisData ,getRedisData);
}

function recieveMsg(io ,setRedisData ,getRedisData){
    io.on('connection', (socket) => {
        console.log("connected");
        socket.on('add_new_reservation', function(msg) {
            setRedisData(msg ,'add_new_reservation');
            emitMsg(io ,getRedisData);
        });
        socket.on('confirm_reservation', function(msg) {
            setRedisData(msg ,'add_new_reservation');
            emitMsg(io ,getRedisData);
        });
        socket.on('is_in', function(msg) {
            setRedisData(msg ,'add_new_reservation');
            emitMsg(io ,getRedisData);
        });
        socket.on('rearrange_reservation', function(msg) {
            setRedisData(msg ,'rearrange_reservation');
            emitMsg(io ,getRedisData);
        });
    });
}

function emitMsg(io ,getRedisData){

    getRedisData((msg) => io.emit('chat message',msg ));
}



