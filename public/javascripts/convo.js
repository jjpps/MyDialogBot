var botui = new BotUI('api-bot');
var socket = io.connect('http://localhost:8010');
botui.message.add({
    content: 'Lets Start Talking…',
    delay: 1500,
}).then(function () {
    botui.action.text({
        action: {
            placeholder: 'Say Hello',
        }
    }
    ).then(function (res) {
        socket.emit('fromClient', { client: res.value }); // sends the message typed to server
    }).then(
        function () {
            socket.on('fromServer', function (data) { // recieveing a reply from server.
                botui.message.add({
                    content: data.server,
                    delay: 500,
                });
            });
        })
});