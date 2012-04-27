// Socket.IO OAuth example with Tumblr

var Sioa   = require('../index'),
    config = require('./config');

var YourApp = Sioa.extend({
    userList: null,
    config: null,
    
    init: function(config) {
        // Perform your initializations for extended app
        this.config = config;
        
        // Call parent
        this._super(this.config);
          
        this.userList = {};
    },
    
    onConnect: function(socket)
    {
        this._super(socket);
        
        // Additional app setup
        var session  = this.getSession(socket);
        
        this.userList[socket.id] = session;
        
        this.messageClient(socket, 'welcome', {
            sid: socket.id,
            message: 'Hello, new user!'
        });
        
        
    },
    
    onDisconnect: function()
    {
        // We are currently in the scope of the socket
        
        this.app._super();
    },
    
    onMessage: function(request)
    {
        // We are currently in the scope of the socket
        
        this.app._super(request);
        
        this.messageAll('forward', {
            sid: this.id,
            message: request.message
        });
    }
});

new YourApp(config);