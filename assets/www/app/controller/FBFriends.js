Ext.define('Greetings.controller.FBFriends', {
    extend:'Ext.app.Controller',

    config:{
        control:{
            '#addRunButton':{
                tap:'addRun'
            },
            '#showFormButton':{
                tap:'showForm'
            },
            '#addRunBackBtn':{
                tap:'hideForm'
            }
        }
    },

    init:function () {
        this.callParent();

        Ext.getStore('FBFriends').on('load', this.onRunsLoad);
    },

    onRunsLoad:function (store) {

        var main = Ext.getCmp('main'),
            fbFriendList = Ext.getCmp('fbFriendList'),
            noFriends = Ext.getCmp('noFriends');

        if (store.getCount()) {
            if (!fbFriendList) {
                fbFriendList = Ext.create('Greetings.view.FBFriendList', {
                    id:'fbFriendList'
                });
            }
            main.setActiveItem(fbFriendList);
        } else {
            if (!noFriends) {
                noFriends = Ext.create('Greetings.view.NoFriends', {
                    id:'noFriends',
                    data:Greetings.userData
                });
            }
            main.setActiveItem(noFriends);
        }
    }
});
