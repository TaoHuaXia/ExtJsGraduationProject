var common = {
    switchTimer: function () {
        $('#user').text(localStorage.getItem('user'));
        //巨幕切换定时器
        var count = 2,
            arr = ['spring', 'summer', 'autumn', 'winter'];
        //巨幕景色按钮切换
        $("#autumn").click(function () {
            $("header").css({
                "background": "url(static/image/autumn.jpg) no-repeat ",
                "background-size": "cover",
                "background-position": "0 -119px"
            });
            $(this).addClass('active').siblings('a').removeClass('active');
        });
        $('#autumn').click();
        $("#spring").click(function () {
            $("header").css({
                "background": "url(static/image/spring2.jpg) no-repeat ",
                "background-size": "cover",
                "background-position": "0 -335px"
            });
            $(this).addClass('active').siblings('a').removeClass('active');
        });
        $("#summer").click(function () {
            $("header").css({
                "background": "url(static/image/summer.jpg) no-repeat ",
                "background-size": "cover",
                "background-position": "0 -320px"
            });
            $(this).addClass('active').siblings('a').removeClass('active');
        });
        $("#winter").click(function () {
            $("header").css({
                "background": "url(static/image/winter.jpg) no-repeat ",
                "background-size": "cover",
                "background-position": "0 -168px"
            });
            $(this).addClass('active').siblings('a').removeClass('active');
        });
        window.setInterval(function () {
            if (count === 4)count = 0;
            $("#" + arr[count]).click();
            count++
        }, 8000)
    },
    getArticles: function () {
        //探索世界获取导游路线列表
        $.ajax({
            url: '../server/getRoutes.php',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                if(data.success){
                    data.data.map(function (item) {
                        $('#articleList').prepend(
                            "<div class='news'>" +
                            "<div class='title'>" +
                            "<h3 class='welcome'>" + item.title + "</h3>" +
                            "<h5 class='author'>导游：&emsp;<span class='text-warning'>" + item.leader + "</span>&emsp;&emsp;发布于" + item.createdAt + "</h5>" +
                            "<div class='photo'><img src='" + item.photo + "'></div>" +
                            "<div class='content'><p>" + item.description + "</p></div>" +
                            "<div class='read-more'><button class='btn btn-default btn-read' data-id=" + item._id + " data-leader=" + item.leader_id + ">查看路线详情</button></div>" +
                            "<div class='news-footer'><span class='cost'>" + item.cost + "</span>元/人</div>" +
                            "</div>" +
                            "</div>")
                    });
                    $('#loading').remove();
                }else{
                    layer.msg("您未登录，正在返回登录页面...");
                    setTimeout(function () {
                        location.href="../login.html";
                    },1000)
                }

            },
            error: function (data) {
                console.log(data);
                layer.msg(data.responseText)
            }
        });
    },
    getSelectedArticles: function () {
        $.ajax({
            url: '../server/getSelectedRoutes.php',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                    data.data.map(function (item) {
                        $('#selected-article').append("<li class='article-item'>" +
                            "<span class='glyphicon glyphicon-fire'><a class='select' data-id=" + item._id + " data-leader=" + item.leader_id + ">&emsp;" + item.title + "</a></span>" +
                            "</li>")
                    });
            },
            error: function (data) {

                layer.msg(data.responseText)
            }
        })
    },
    readDetail: function () {
        var routeId = $(this).attr('data-id'),
            leaderId=$(this).attr('data-leader');
        $.ajax({
            url: "../server/getRoute.php?id=" + routeId+"&leaderId="+leaderId,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $('body').addClass('open');
                $('.shade').addClass('open');
                if (data.data.description.indexOf('p') === -1) {
                    data.data.description = "<p>" + data.data.description + "</p>"
                }
                $('#article').append(
                    "<h5>" + data.data.title + "</h5>" +
                    "<p>导游：&emsp;<span class='text-warning'>" + data.data.leader + "</span>&emsp;&emsp;发表于" + data.data.createdAt + "</p>" +
                    "<img src=" + data.data.photo + ">" +
                    "<div class='article-body'>" +
                    "<h5 class='info-title'>景点概述</h5>"+
                        data.data.description +
                    "<div class='leader-info clearfix'>" +
                    "<h5 class='info-title'>导游信息</h5>"+
                    "<div class='col-sm-12 col-md-4 leader-img'><img src='static/image/user.jpg'></div>" +
                    "<div class='col-sm-12 col-md-8 leader-info'>" +
                    "<dl class='dl-horizontal'>" +
                    "<dt>姓名:</dt><dd>"+data.leader.name+"</dd>" +
                    "<dt>手机:</dt><dd>"+data.leader.phone+"</dd>" +
                    "<dt>籍贯:</dt><dd>"+data.leader.born+"</dd>" +
                    "</dl>" +
                    "</div>" +
                    "</div>" +
                    "<h5 class='info-title'>路线概述</h5>"+
                        data.data.info+
                    "<h5 class='info-title'>其他信息</h5>"+
                        "<p>已经报名人数:"+data.data.attend+"</p>"+
                        "<p>报名费用:<span class='cost'>" + data.data.cost + "</span>元/人</p>"+
                    "<div class='join-wrapper'><button id='join' class='btn btn-danger' data-id='"+data.data._id+"'>加入</button></div>"+
                    "</div>"
                );
                if (data.attend )$('#join').prop('disable',true).addClass('disabled').text('您已经报名');
                $('.article-detail').addClass('open');

                //报名按钮控制
                $('#article').on('click', '#join', function () {
                        common.join(data.data._id);
                    $('#join').addClass('disabled');
                });
            },
            error: function (data) {
                layer.msg(data.responseText);
            }
        })
    },
    readMore: function () {
        $('#user').text(localStorage.getItem('user'));
        //阅读文章全文
        $('#articleList').on('click', '.btn-read', common.readDetail);
        //精选文章点击
        $('#selected-article').on('click', '.select', common.readDetail);
        //关闭文章详情按钮
        $('#close-article').click(function () {
            $('.article-detail').removeClass('open');
            $('.shade').removeClass('open');
            setTimeout(function () {
                $('body').removeClass('open');
                $('#article').empty();
            }, 1000)
        })
    },
    join: function (id) {
        //更新点赞
        $.ajax({
            url: '../server/join.php?&id=' + id,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                layer.msg('报名成功！');
                $('#join').addClass('disabled').text('您已经报名');
            },
            error: function (data) {
                layer.msg(data.responseText)
            }
        })
    },
    imgUpload: function () {
        $('#photo').change(function () {
            var file = this.files[0],
                reader = new FileReader();
            if (file.type.indexOf('image') === -1) {
                layer.msg('请选择图片！');
                return false;
            }
            reader.readAsDataURL(file);
            reader.onload = function () {
                $('#showImg').empty().append("<img src='" + this.result + "'/>");
            }
        })
    },
    articleUpload: function () {
        $('#article-submit').click(function () {
            editor.sync();
            var title = $('#title').val(),
                photo = $('#photo').prop('files')[0],
                content = $('#editor').val(),
                describe = $('#describe').val(),
                author = localStorage.getItem('user'),
                date = new Date();
            console.log(title, photo, content, describe, author, date);
            if (title === '') {
                layer.msg('请输入文章标题');
                $('#title').focus()
            } else if (content === '') {
                layer.msg('请输入文章内容');
                $('#editor').focus()
            } else if (describe === '') {
                layer.msg('请输入文章概要');
                $('#describe').focus()
            } else if (!photo) {
                layer.msg('请选择导航图');
                $('#photo').focus()
            } else {
                var form = new FormData();
                form.append('title', title);
                form.append('describe', describe);
                form.append('photo', photo);
                form.append('content', content);
                form.append('author', author);
                form.append('date', date);
                $.ajax({
                    url: '../server/uploadArticle.php',
                    type: 'POST',
                    data: form,
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    success: function (data) {
                        layer.msg('发表成功！');
                        $('#articleList').empty();
                        common.getArticles();
                        setTimeout(function () {
                            $('#write-modal').modal('hide');
                        }, 1500);

                    },
                    error: function (data) {
                        layer.msg(eval('(' + data.responseText + ')').message);
                    }
                })
            }
        })
    },
    getPosts: function (type) {

        $('#posts-wrapper').empty();
        $.ajax({
            url: '../server/getPosts.php?type=' + type,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                data.posts.map(function (item) {
                    $('#posts-wrapper').append("<div class='text-content'>" +
                        "<div class='content-item'>" +
                        "<a class='hidden-xs user'><img src='static/image/user.jpg'/></a>" +
                        "<div class='question-content'>" +
                        "<h3 class='question' data-id='" + item._id + "' data-poster='" + item.author_id + "'><a>" + item.title + "</a></h3>" +
                        "<p class='describe'>" +
                        "<span class='user-name'>" + item.author + "</span>&nbsp;" +
                        "<span>发起了问题<strong>·</strong>&nbsp;" + item.reply + "人回复" +
                        "<strong>·</strong>&nbsp;" + item.browse + "人浏览" +
                        "<strong>·</strong>&nbsp;" + item.createdAt + "发表</span>" +
                        "</p>" +
                        "</div>" +
                        "</div>" +
                        "</div>")
                });
                data.hots.map(function (item) {
                    $('#subject').append("<li class='subject-item' data-id='"+item._id+"' data-poster='"+item.author_id+"'>" +
                        "<a><span class='glyphicon glyphicon-grain'></span>"+item.title+"</a>" +
                        "</li>")
                });
                $('#posts-wrapper').on('click', '.question',showPostDetail);
                $('#subject').on('click', '.subject-item',showPostDetail);
                function showPostDetail() {
                    var id = $(this).attr('data-id'),
                        poster = $(this).attr('data-poster');
                    $('.show-post').addClass('active');
                    //点击任意一个帖子标题的时候，会将对应的post_id,author_id传给后台，将两个值存入session中，便于之后使用
                    $.ajax({
                        url: '../server/getComments.php?id=' + id+'&type=redirect'+'&poster='+poster,
                        dataType: 'json',
                        type: 'GET',
                        success: function () {
                            location.href='./readPost.html';
                        },
                        error:function (data) {
                            layer.msg(data.responseText);
                        }
                    })
                }
            },
            error: function (data) {
                layer.msg(data.responseText);
            }
        })
    },
    getComments: function () {
        //由于后台已经存储了post_id所以只需要发送get请求，根据传来的post\comments\poster_id来进行渲染
        $.ajax({
            type: 'GET',
            url: '../server/getComments.php?type=get',
            dataType: 'json',
            success: function (data) {
                //渲染帖子首层
                if(data.post.content.indexOf('<p>') === -1)data.post.content ="<p>"+data.post.content+"</p>";
                var wrapper = $('#comment-wrapper');
                $('.post-wrapper > h5').text(data.post.title);
                wrapper.append("<div class='comment-item clearfix'>" +
                    "<div class='col-sm-2 comment-left'>" +
                    "<img src='static/image/user.jpg'>" +
                    "<p>" + data.post.author + "</p>" +
                    "<span class='poster'></span>" +
                    "</div>" +
                    "<div class='col-sm-10 comment-right'>" +
                    "<div class='content'>"+data.post.content+"</div>" +
                    "<span>发表于"+data.post.createdAt+"</span>" +
                    "</div>" +
                    "</div>");
                //渲染之后用户的回复
                data.comments.map(function (item) {
                    if(item.content.indexOf('<p>') === -1)item.content ="<p>"+item.content+"</p>";
                    //判断回复的用户是不是发表人
                    if (item.author_id === data.poster_id) {
                        wrapper.append("<div class='comment-item clearfix'>" +
                            "<div class='col-sm-2 comment-left'>" +
                            "<img src='static/image/user.jpg'>" +
                            "<p>" + item.author + "</p>" +
                            "<span class='poster'></span>" +
                            "</div>" +
                            "<div class='col-sm-10 comment-right'>" +
                            "<div class='content'>"+item.content+"</div>" +
                            "<span>发表于"+item.createdAt+"</span>" +
                            "</div>" +
                            "</div>")
                    } else {
                        wrapper.append("<div class='comment-item clearfix'>" +
                            "<div class='col-sm-2 comment-left'>" +
                            "<img src='static/image/user.jpg'>" +
                            "<p>" + item.author + "</p>" +
                            "</div>" +
                            "<div class='col-sm-10 comment-right'>" +
                            "<div class='content'>"+item.content+"</div>" +
                            "<span>发表于"+item.createdAt+"</span>" +
                            "</div>" +
                            "</div>")
                    }
                });
                $('.loading').css('display','none');
            },
            error:function (data) {
                layer.msg(data.responseText);
            }
        })
    },
    replySubmit:function () {
        //由于在登录，或者注册的时候已经将author_id,author存储在session中，所以只需要传入填写的内容
        $('#submit-reply').click(function () {
            editor.sync();
            var content = $('#comment-editor').val();
            $.ajax({
                url:'../server/uploadComment.php',
                type:'POST',
                data:{
                    content:content
                },
                dataType:'json',
                success:function (data) {
                    //如果成功了，后台传回必要的信息，前端进行展示，不需要再发送请求
                    layer.msg('发表成功！');
                   //清空编辑器内容
                    editor.html('');
                    if(data.content.indexOf('<p>') === -1)data.content ="<p>"+data.content+"</p>";
                    //判断发表回复的人是不是楼主
                    if (data.author_id === data.poster_id) {
                        $('#comment-wrapper').append("<div class='comment-item clearfix'>" +
                            "<div class='col-sm-2 comment-left'>" +
                            "<img src='static/image/user.jpg'>" +
                            "<p>" + data.author + "</p>" +
                            "<span class='poster'></span>" +
                            "</div>" +
                            "<div class='col-sm-10 comment-right'>" +
                            "<div class='content'>"+data.content+"</div>" +
                            "<span>发表于"+data.time+"</span>" +
                            "</div>" +
                            "</div>")
                    } else {
                        $('#comment-wrapper').append("<div class='comment-item clearfix'>" +
                            "<div class='col-sm-2 comment-left'>" +
                            "<img src='static/image/user.jpg'>" +
                            "<p>" + data.author + "</p>" +
                            "</div>" +
                            "<div class='col-sm-10 comment-right'>" +
                            "<div class='content'>"+data.content+"</div>" +
                            "<span>发表于"+data.time+"</span>" +
                            "</div>" +
                            "</div>")
                    }

                },
                error:function (data) {
                    layer.msg(data.responseText);
                }
            })
        })
    }
};
