// Require libraries, modules whatever.
var Discord = require('discord.js');
var logger = require('winston');
var schedule = require('node-schedule');

var auth = require('./config/auth.json'); // Include config file.

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord client
var client = new Discord.Client();

// Log that client is ready and connected to discord
client.on('ready', function () {
    logger.info('Ready and connected!');
    logger.info('Logged in as: ' + client.user);
});


// Commands user can execute
client.on('message', msg => {
    if(msg.content.substring(0, 1) == "!"){
        var args = msg.content.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd){
            case 'ping': // Ping test that bot is operating
                msg.channel.send('pong!');
                break;
            case 'isit':
                break;
            case 'wednesdaynow':
                its_wednesday_my_dudes();
                break;
        }
    }
});

// Schedule bot for wednesday 00:00:01
var j = schedule.scheduleJob('1 0 0 * * 3', its_wednesday_my_dudes);



function its_wednesday_my_dudes(){
    var channel = client.channels.find('name', 'general'); // Find general channel.
    if (!channel) return; // Make sure that it exists.

    // Promise chain wednesday message in proper order.
    return channel.send('It is wednesday,')
    .then(msg => {
        return channel.send({
            files: [{
                attachment: './src/pics/frog.jpg',
                name: 'froggo.jpg'
            }]
        })
    }).then(msg => {
        return channel.send('my dudes');
    });
}

// Login to discord with client.
client.login(auth.token);