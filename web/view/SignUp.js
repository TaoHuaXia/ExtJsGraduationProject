
Ext.create('Ext.form.Panel',{
    title:'欢迎注册KuYoo旅游社区',
    bodyPadding:20,
    width:500,
    url:'server/signUp.php',
    layout:'anchor',
    method:'POST',
    cls:'loginForm',
    defaults:{
        anchor:'100%'
    },
    defaultType:'textfield',
    items:[{
        margin:'0 0 20 0',
        fieldLabel:'账号',
        name:'account',
        allowBlank:false,
        msgTarget:'under'
    },{
        fieldLabel:'密码',
        inputType:'password',
        name:'password',
        regex:/^[a-zA-Z0-9]{6,12}$/,
        regexText:'请输入6-12位由字母/数字组成的密码',
        msgTarget:'under'

    }],
    buttons:[
        {
            text:'提交',
            handler:function () {
                var form = this.up('form').getForm();
                var that = this;
                this.disabled = true;
                if(form.isValid()){
                    form.submit({
                        success: function(form, action) {
                            Ext.Msg.show({
                                title:'消息',
                                msg:action.result.message
                            });
                            that.disabled=false;
                            setTimeout(function () {
                                window.location.href ="web/index.html";
                            },1000)
                        },
                        failure: function(form,action) {
                            console.log(action)
                            Ext.Msg.alert( '注册',action.result.message||action.response.responseText);
                            that.disabled=false;

                        }
                    });
                }
            }
        }
    ],
    renderTo:Ext.getBody()

});