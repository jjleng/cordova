/**
 * This view shows the 'Initializing' loading mask, as well as displaying the Login text and button
 * if the user isn't logged in to Facebook.
 */
Ext.define('Greetings.view.Login', {
    extend: 'Ext.Container',

    config: {
        padding: 20,
        layout: 'fit',
        id: 'loginView',
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                cls: 'jogToolbar'
            }
        ]
    },

    showLoginText: function() {

        var redirectUrl = Ext.Object.toQueryString({
            redirect_uri: window.location.protocol + "//" + window.location.host,
            client_id: Greetings.app.facebookAppId,
            response_type: 'token'
        });

        console.log(redirectUrl);

        this.setHtml([
            '<h2>Welcome to Jog with Friends</h2>',
            '<p>With this app you can log your runs and share your progress with your friends</p>',
            '<p>In order to use Jog with Friends you must sign in with your Facebook account.</p>',
            '<div class="fbLogin" id="fbLogin" ></div>',
            '<div class="fb-facepile" data-app-id="' + Greetings.app.facebookAppId + '" data-max-rows="2" data-width="300"></div>'
        ].join(''));

         FB.XFBML.parse(document.getElementById('splash'));
    }
});
