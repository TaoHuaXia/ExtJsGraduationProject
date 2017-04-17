
Ext.create('Ext.form.Panel',{
  title:'欢迎登录KuYoo旅游社区',
  bodyPadding:20,
  width:500,
  url:'server/login.php',
  layout:'anchor',
  method:'POST',
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
          console.log(form);
          console.log('可以提交了');
          form.submit({
            success: function(form, action) {
              console.log(action.result);
              localStorage.setItem('user',action.result.user);
              localStorage.setItem('id',action.result.id);
              if(action.result.type === '1'){
                Ext.Msg.show({
                  title:'消息',
                  msg:'管理员，欢迎您'
                });
                setTimeout(function () {
                  window.location.href ="web/admin/index.html";
                },1000)
              }else{
                Ext.Msg.show({
                  title:'消息',
                  msg:action.result.message
                });
                setTimeout(function () {
                  window.location.href ="web/index.html";
                },1000)
              }
            },
            failure: function(form,action) {
              console.log(action);
              Ext.Msg.alert( '登陆失败',action.result.message||action.response.responseText);
              that.disabled=false;

            }
          });
        }
      }
    }
  ],
  renderTo:Ext.getDom('form')

});