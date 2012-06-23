Ext.define('Greetings.view.FBFriendList', {
    extend: 'Ext.List',

    config: {
        store: 'FBFriends',

        disableSelection: true,

        itemTpl: Ext.create('Ext.XTemplate',
            '<div class="run">',
                '<img src="https://graph.facebook.com/{profileId}/picture?type=square" />',
                '<div class="info"><b>{name}</b></div>',
            '</div>',
            {
                timeAgoInWords: function(date) {
                    try {

                        var now = Math.ceil(Number(new Date()) / 1000),
                            dateTime = Math.ceil(Number(date) / 1000),
                            diff = now - dateTime,
                            str;

                        if (diff < 0) diff = -diff;

                        if (diff < 86400) {
                            return 'Today';
                        } else if (diff < 60*60*24*365) {
                            str = String(Math.ceil(diff / (60 * 60 * 24)));
                            return str + (str == "1" ? ' day' : ' days') + ' ago';
                        } else {
                            return Ext.Date.format(new Date(date), 'jS M \'y');
                        }
                    } catch(e) {
                        return '';
                    }
                }
            }
        ),

        emptyText: 'Add some Runs, then invite your friends!'
    }
});
