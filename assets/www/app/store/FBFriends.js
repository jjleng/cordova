
Ext.define('Greetings.store.FBFriends', {
    extend  : 'Ext.data.Store',

    config: {
        model: 'Greetings.model.FBFriend',

        proxy: {
            type: 'jsonp',
            url: '/facebook'
        }
    }
});
