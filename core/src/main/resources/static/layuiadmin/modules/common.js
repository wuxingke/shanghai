/**
 @Name：layuiAdmin 公共业务
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：LPPL
    
 */
 
layui.define(function(exports){
  var $ = layui.$
  ,layer = layui.layer
  ,laytpl = layui.laytpl
  ,setter = layui.setter
  ,view = layui.view
  ,admin = layui.admin
  ,form = layui.form;

  //公共业务的逻辑处理可以写在此处，切换任何页面都会执行
  //……

  getParams = function (formId) {
    var _params = {};

    $.each($('#' + formId).serializeArray(), function (i, field) {
      if (null != field.value && "" != field.value) {
      _params[field.name] = field.value;
      }
    });
    return _params;
  };


  //ajax请求成功处理函数
  ajaxSuccess = function(data,table){
    table.reload('table');
    if(data.code == 0){
      layer.open({
        title:"消息提醒",
        content:data.message,
        skin:"layui-layer-molv",
        offset: 'rb',
        time:3000,
        btn:[],
        shade: 0,
        anim: -1,
        icon:6
      });
    }else {
      layer.open({
        title:"消息提醒",
        content:data.message,
        skin:"layui-layer-molv",
        btn:["查看错误信息"],
        anim: -1,
        icon:5,
        btn1:function(index){
          layer.open({content:data.data})
          layer.close(index);
        }
      });
    }
  }



  //初始化table
   initTable = function (ele, url, method,cols, table,formId, doneCallBack) {
    return table.render({
      elem: "#"+ele
      ,id: ele
      , url: layui.setter.host+url
      , method: method
      , cellMinWidth: 80
      , cols: cols
      ,where:getParams(formId)
      ,page:{
        limits:[10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90]
        ,limit:20
      }
      , done: function (res) {
        if (typeof(doneCallBack) === "function") {
          doneCallBack(res);
        }
      }
    });
  };

  //初始化table(不带分页)
  initTable_all = function (ele, url, method,cols, table,formId, doneCallBack) {
    return table.render({
      elem: "#"+ele
      ,id: ele
      , url: layui.setter.host+url
      , method: method
      , cellMinWidth: 80
      , cols: cols
      ,where:getParams(formId)
      , done: function (res) {
        if (typeof(doneCallBack) === "function") {
          doneCallBack(res);
        }
      }
    });
  };












  //动态参数
  searchForm = function(){
    var args = Array.from(arguments);   //arguments不是Array类型，此方法是将arguments转换为Array。
    searchForm_dict(args,"lunban");
  }



  searchForm_dict = function(params,code){
      if(params.indexOf(code) != -1){
         $.ajax({
          type:'get',
          async:false,
          url:layui.setter.host+'xitongshezhi/shujuzidian/formSelect?code='+code,
          success:function(data){
            createOption_dict(data,code);
          }
        });
    }
  }
  //动态创建option dict
  createOption_dict = function(data,code){
    var html = '';
    var dicts = data.data.dicts;
    for(var i = 0;i<dicts.length;i++){
      html+='<option value= "'+dicts[i].value+'" >'+dicts[i].name+'</option>';
    }
    console.info(html);
    $("#"+code).append(html);
  }




  //form查询表单收缩
    formBack = function(){
    var shou_suo = false; //未收缩
    $('#shou_suo_cxtj').click(function() {
        if (shou_suo) {
            $('.layui-card-header').slideDown(500, function () {
                $('#shou_suo_cxtj').html('<img class="layui-nav-img" style="margin-right:0" src="/images/up.png"/>');
                shou_suo = false;
            });
        } else {
            $('.layui-card-header').slideUp(500, function () {
                $('#shou_suo_cxtj').html('<img class="layui-nav-img" style="margin-right:0" src="/images/down.png"/>');
                shou_suo = true;
            });
        }
    })}


















  
  
  //退出
  admin.events.logout = function(){
    //执行退出接口
    admin.req({
      url: layui.setter.base + 'json/user/logout.js'
      ,type: 'get'
      ,data: {}
      ,done: function(res){ //这里要说明一下：done 是只有 response 的 code 正常才会执行。而 succese 则是只要 http 为 200 就会执行
        
        //清空本地记录的 token，并跳转到登入页
        admin.exit(function(){
          location.href = 'user/login.html';
        });
      }
    });
  };


    //ajax请求成功处理下拉框函数
    initDownList = function(data,downID,selectedId,valueName,valueID,isall){
      $('#' + downID).html("");
      if(data.code == 0) {
          if(data.data.length == 0) {
              return false;
          }
          var reg = RegExp(/,/);
          var selectedArr=[];
          if(selectedId==null){
              selectedArr=null;
          }else if(reg.test(selectedId)){
              selectedArr = selectedId.split(',');
          }else{
              selectedArr.push(selectedId);
          }

          var str = "";

          if(!isall) {
              for(var i = 0; i < data.data.length; i++) {
                  if(selectedArr==null){
                      str += "<option value='" + data.data[i][valueID] + "'>"
                          + data.data[i][valueName]
                          + "</option>";
                  }else{
                      for(var j=0;j< selectedArr.length;j++){
                          if(data.data[i][valueID]==selectedArr[j]){
                              str += "<option value='" + data.data[i][valueID] + "' selected='selected'>"
                                  + data.data[i][valueName]
                                  + "</option>";
                              break;
                          }
                          if(j==selectedArr.length-1 && data.data[i][valueID]!=selectedArr[j]){
                              str += "<option value='" + data.data[i][valueID] + "'>"
                                  + data.data[i][valueName]
                                  + "</option>";
                              break;
                          }
                      }
                  }
              }
              $('#' + downID).html(str);
          } else {
              str += "<option value=''>全部</option>";
              for(var i = 0; i < data.data.length; i++) {

                  if(selectedArr==null){
                      str += "<option value='" + data.data[i][valueID] + "'>"
                          + data.data[i][valueName]
                          + "</option>";
                  }else{
                      for(var j=0;j< selectedArr.length;j++){
                          if(data.data[i][valueID]==selectedArr[j]){
                              str += "<option value='" + data.data[i][valueID] + "' selected='selected'>"
                                  + data.data[i][valueName]
                                  + "</option>";
                              break;
                          }
                          if(j==selectedArr.length-1 && data.data[i][valueID]!=selectedArr[j]){
                              str += "<option value='" + data.data[i][valueID] + "'>"
                                  + data.data[i][valueName]
                                  + "</option>";
                              break;
                          }
                      }
                  }
              }
              $('#' + downID).html(str);
          }

      } else {
          layer.open({
              title:"消息提醒",
              content:data.message,
              skin:"layui-layer-molv",
              btn:["查看错误信息"],
              anim: -1,
              icon:5,
              btn1:function(index){
                  layer.open({content:data.data})
                  layer.close(index);
              }
          });
      }
  }


    /**
     * 2019/03/22 bjw
     * 通过三目运算符处理thymeleaf表达式中的内容有NULL异常
     * @param name 数据取值参数
     * @returns {string} 取值内容
     */
    repNull = function(name) {
        var arr = name.split('.');
        var tem = "<div>{{ ";
        var currentObj = 'd';
        var smbds = '(';
        for (var i = 0; i < arr.length; i++) {
            currentObj += '.' + arr[i];
            if (i == (arr.length - 1)) {
                smbds += currentObj + "== null) ? '' : " + currentObj;
            } else {
                smbds += currentObj + "== null || ";
            }
        }
        tem += smbds;
        tem += ' }}</div>';
        return tem;
    }

    /**
     * 校验
     */
    tq_verify = function(form){
        form.verify({
            heyuehao: [
                /^([0-9]{5})([A-Z]{1})([0-9]{1})$/,
                '合约号格式不正确！'
            ],
            zmAndSz: [
                /^[A-Za-z0-9]+$/
                , '只能是数字和字母组成！'
            ],
            zm: [
                /^[A-Za-z]+$/
                , '只能是字母组成！'
            ],
            sz: [
                /^[0-9]+$/
                , '只能是数字组成！'
            ],
            int: [
                /^-?[1-9]+[0-9]*$/
                , '只能是整数类型！'
            ],
            num: function (value, item) {
                if (isNaN(value)) {
                    return "只能输入数字类型！";
                }
            },
            length: function (value, item) { //校验字符长度，配合tq_length 标签。
                var valueSize = value ? value.length : 0;
                var maxNumber = $(item).attr('tq_length');
                if (maxNumber) {
                    var arr = maxNumber.split('^');
                    if (arr[0] != '' && arr[1] != '') {
                        if (valueSize < arr[0] || valueSize > arr[1]) return '不能少于' + arr[0] + '个字符和不能大于' + arr[1] + '个字符！';
                    }
                    if (arr.length == 1) {
                        if (valueSize != arr[0]) return '输入长度只能是' + arr[0] + '个字符！';
                    }
                    if (arr[0] == '' && arr[1] != '') {
                        if (valueSize > arr[1]) return "不能超过" + arr[1] + "个字符！";
                    }
                    if (arr[0] != '' && arr[1] == '') {
                        if (valueSize < arr[0]) return "不能少于" + arr[0] + "个字符！";
                    }
                }
            }
        });
    }

  //对外暴露的接口
  exports('common', {});
});