/**
 * Handles Facebook interactions, specifically Login and Logout.
 *
 * When a user logs in, we display their profile picture and a list of Runs.
 */
Ext.define('Greetings.controller.Facebook', {
    extend:'Ext.app.Controller',
    requires:['Ext.MessageBox'],

    config:{
        control:{
            '#homeTab':{
                tap:'onUserTap'
            },

            '#loginView': {
                load: 'onLoginViewLoaded'
            }
        }
    },

    /**
     * Load the Facebook Javascript SDK asynchronously
     */
    init:function () {
    
    
    
    console.log("In fb init");
/*
        window.fbAsyncInit = Ext.bind(this.onFacebookInit, this);

        (function (d) {
            var js, id = 'facebook-jssdk';
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            d.getElementsByTagName('head')[0].appendChild(js);
        }(document));
        */
        this.onFacebookInit();
    },

    onFacebookInit:function () {
    
    console.log("onFacebookInit");

        if (Greetings.app.facebookAppId === '') return;

        var me = this;

		console.log(Greetings.app.facebookAppId);
        FB.init({
            appId:"176888355774566",
            nativeInterface: CDV.FB, 
            useCachedDialogs: false
        });
        
        FB.Event.monitor('auth.statusChange', function(session) {
		  console.log('Got the user\'s session: ', session);
		  
		  if (session && session.status != 'not_authorized' && session.status != 'notConnected') {
		    console.log('in branch 1');
		    
		  }
		  else if (session === undefined) {
		    console.log('in branch 2');
		    FB.login(function (response) {
	            if (response.authResponse) {
			     var access_token =   FB.getAuthResponse()['accessToken'];
			     console.log('Access Token = '+ access_token);			    
			   } else {
			     console.log('User cancelled login or did not fully authorize.');
			   }
        	}, {scope:'read_friendlists,user_relationships,friends_birthday,friends_location,friends_interests,friends_likes'});
		  }
		  else if (session && (session.status == 'not_authorized' || session.status == 'notConnected')) {
		    console.log('in branch 3');
		  }
		});

        FB.Event.subscribe('auth.logout', Ext.bind(me.onLogout, me));
/*
        FB.getLoginStatus(function (response) {
        
        console.log("FB.getLoginStatus");

            clearTimeout(me.fbLoginTimeout);

            me.hasCheckedStatus = true;
            Ext.Viewport.setMasked(false);

            Ext.get('splashLoader').destroy();
            Ext.get('greetings-body').addCls('greyBg');

            if (response.status == 'connected') {
                me.onLogin();
            } else {
                me.login();
            }
        });
        */

/*
		console.log("before settimeout");
        me.fbLoginTimeout = setTimeout(function () {
        
        console.log("in setTimeout");

            Ext.Viewport.setMasked(false);

            Ext.create('Ext.MessageBox', {
                title:'Facebook Error',
                message:[
                    'Facebook Authentication is not responding. ',
                    'Please check your Facebook app is correctly configured, ',
                    'then check the network log for calls to Facebook for more information.',
                    'Restart the app to try again.'
                ].join('')
            }).show();

        }, 10000);*/
    },

    login:function () {
        Ext.Viewport.setMasked(false);
        var splash = Ext.getCmp('login');
        if (!splash) {
            Ext.Viewport.add({ xclass:'Greetings.view.Login', id:'login' });
        }
        Ext.getCmp('login').showLoginText();
    },

    onLogin:function () {

        var me = this,
            errTitle;

        FB.api('/me', function (response) {

            if (response.error) {
                FB.logout();

                errTitle = "Facebook " + response.error.type + " error";
                Ext.Msg.alert(errTitle, response.error.message, function () {
                    me.login();
                });
            } else {
                Greetings.userData = response;
                if (!me.main) {
                    me.main = Ext.create('Greetings.view.Main', {
                        id:'main'
                    });
                }
                Ext.Viewport.setActiveItem(me.main);
                Ext.getStore('FBFriends').load();
            }
        });
    },

    logout:function () {
        Ext.Viewport.setMasked({xtype:'loadmask', message:'Logging out...'});
        FB.logout();
    },

    /**
     * Called when the Logout button is tapped
     */
    onLogout:function () {

        if (!this.hasCheckedStatus) return;

        this.login();

        Ext.Viewport.setMasked(false);
        Ext.Viewport.setActiveItem(Ext.getCmp('login'));
        Ext.getStore('Runs').removeAll();

        this.logoutCmp.destroy();
    },

    /**
     * When the user profile picture is tapped, create a Logout button and pop it up next to the
     * avatar.
     */
    onUserTap:function (cmp) {

        if (!this.logoutCmp) {
            this.logoutCmp = Ext.create('Ext.Panel', {
                width:120,
                top:0,
                left:0,
                padding:5,
                modal:true,
                hideOnMaskTap:true,
                items:[
                    {
                        xtype:'button',
                        id:'logoutButton',
                        text:'Logout',
                        ui:'decline'
                    }
                ]
            });
        }

        this.logoutCmp.showBy(cmp);
    },

    onLoginViewLoaded:function(cmp){
        console.log('onLoginViewLoaded');
        Ext.get('fbLogin').on({
            tap: function(){
                console.log('fbLogin tapped');
            }
        });
    },

    onFBLogin:function (cmp) {
        console.log("in onFBLogin");

        FB.login(function (response) {
            // handle the response
        }, {scope:'read_friendlists,user_relationships,friends_birthday,friends_location,friends_interests,friends_likes'});
    }
});
