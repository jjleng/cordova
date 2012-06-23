/**
 * Facebook friend model
 */
Ext.define('Greetings.model.FBFriend', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'profileId', type: 'string' },
            { name: 'name',      type: 'string' }
        ]
    }
});
