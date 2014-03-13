function postVM() {
    this.id = 0;
    this.content = null;
    this.postedby = "Anonymous";
    this.createdate = null;
    this.isActive = true;
    this.ups = 0;
    this.downs = 0;
    this.eyes = 0;
}

function commentVM() {
    this.id = 0;
    this.commenttext = null;
    this.parentPost = null;
    this.postedby = "Anonymous";
    this.createdate = null;
    this.ups = 0;
    this.downs = 0;
}
//local storage
function getStorageItem(key) {
    if (typeof (Storage) !== "undefined")
        return localStorage.getItem(key);
    else
        return null;
}

function setStorageItem(key, value) {
    if (typeof (Storage) !== "undefined")
        localStorage.setItem(key, value);
}
//Session storage
function getSstorageItem(key) {
    if (typeof (Storage) !== "undefined")
        return sessionStorage.getItem(key);
    else
        return null;
}

function setSstorageItem(key, value) {
    if (typeof (Storage) !== "undefined")
        sessionStorage.setItem(key, value);
}

var alert_blank_posttext = 'aha...content of the post cannot be left blank.';
var alert_blank_commenttext = 'aha...comment cannot be left blank.';
var alert_blank_successpost = 'Thankyou...Your post is successfully saved.';

function showHideAlerts(showAlertObject, HideAlertObject, HideBothObject) {
    $("#alert-error,#alert-success").toggleClass('hidden', true);

    $("#alert-" + showAlertObject).toggleClass('hidden', false);
    $("#alert-" + HideAlertObject).toggleClass('hidden', true)
}

//******************************************************************************************************

postsModel.controller('postsController', function ($scope, postsFactory) {
    $scope.currPage = 0;
    $scope.totalPages = 10;
    $scope.newcomment = {};
    $scope.busy = false;
    $scope.posts = [];

    $scope.post = null;
    $scope.comments = null;



    //postsFactory.getJSONPosts($scope.currPage, $scope.searchText, function (data) {
    //    $scope.posts = data;
    //});




    $scope.getPosts = function (onComplete) {
        postsFactory.getPosts($scope.currPage, $scope.searchText === undefined ? "" : $scope.searchText, function (data) {
            $scope.busy = false;
            for (var i = 0; i < data.length; i++) {
                $scope.posts.push(data[i]);
            };

            if (typeof onComplete === 'function') {
                onComplete();
            };

        });
    };

    $scope.addpost = function () {
        if ($scope.newcontent === undefined || $scope.newcontent.trim() == '') {
            showHideAlerts('error', 'success');
            return;
        };

        var postObject = new postVM();

        postObject.content = $scope.newcontent;
        postObject.postedby = $scope.postedby;

        $scope.posts.push({ content: $scope.newcontent, postedby: $scope.postedby });
        $scope.newcontent = '';
        $scope.postedby = '';

        postsFactory.addPost(postObject, function (data) {
            //$scope.posts = data;
            showHideAlerts('success', 'error');
        });
    };

    $scope.addcomment = function (id) {
        var me = this;
        id = me.post.id;

        if ($scope.newcomment[id + ''] === undefined || $scope.newcomment[id + ''].trim() == '') {
            showHideAlerts('error', 'success');
            return;
        };

        var commentObject = new commentVM();
        commentObject.commenttext = $scope.newcomment[id + ''];
        commentObject.parentPost = id;
        commentObject.postedby = null;

        postsFactory.addcomment(commentObject, function (data) {
            showHideAlerts('success', 'error');
            me.post.comments.push(commentObject);
            $scope.newcomment[id + ''] = '';
        });
    };

    $scope.updateLD = function (ld) {
        var me = this;
        id = me.post.id;
        if (getStorageItem(id + '_' + ld)) {
            return;
        }
        postsFactory.addLikeDislike(id, ld, function (data) {
            setStorageItem(id + '_' + ld, ld);
            if (ld == 0) me.post.downs = me.post.downs + 1;
            else if (ld == 1) me.post.ups = me.post.ups + 1;
        });
    };

    $scope.nextclick = function () {
        $scope.currPage = $scope.currPage + 1;
        postsFactory.getPosts($scope.currPage, function (data) {
            $scope.posts = data;
        });

        $scope.prevnextdisabling();
    };

    $scope.prevclick = function () {
        $scope.currPage = $scope.currPage - 1;
        if ($scope.currPage > 0)
            postsFactory.getPosts($scope.currPage, function (data) {
                $scope.posts = data;
            });

        $scope.prevnextdisabling();
    };

    $scope.loadMore = function () {
        if ($scope.busy == true) { return; }

        $scope.busy = true;
        $scope.currPage = $scope.currPage + 1;
        if ($scope.currPage > 0)
            $scope.getPosts();
    };

    $scope.SearchPosts = function (e) {
        if (typeof e === undefined && window.event) e = window.event;

        var onSearchComplete = function () {
            if ($scope.posts.length == 0) { alert('no such relevant posts found') }
        };

        if (e.keyCode == 13) {
            $scope.posts = [];
            $scope.getPosts(onSearchComplete);
        }

    };

    $scope.prevnextdisabling = function () {
        $scope.prevdisabled = $scope.currPage <= 1 ? true : false;
        $scope.nextdisabled = $scope.currPage >= $scope.totalPages ? true : false;
    };

    $scope.prevnextdisabling();

});

//******************************************************************************************************

postsModel.controller('postDetailController', function ($scope, postsFactory) {
    $scope.post = null;
    $scope.comments = null;

    $scope.getPost = function (onComplete) {
        var postId = $("#HiddenpostId").val();

        postsFactory.getPost(postId, function (data) {
            $scope.post = data;
            if (typeof onComplete === 'function') {
                onComplete();
            };

        });
    };

    $scope.getPost();

    $scope.addcomment = function (id) {
        var me = this;
        id = me.post.id;

        if ($scope.newcomment === undefined || $scope.newcomment.trim() == '') {
            showHideAlerts('error', 'success');
            return;
        };

        var commentObject = new commentVM();
        commentObject.commenttext = $scope.newcomment;
        commentObject.parentPost = id;
        commentObject.postedby = null;

        postsFactory.addcomment(commentObject, function (data) {
            showHideAlerts('success', 'error');
            me.post.comments.push(commentObject);
            $scope.newcomment = '';
        });
    };

    $scope.updateLD = function (ld) {
        var me = this;
        id = me.post.id;
        if (getStorageItem(id + '_' + ld)) {
            return;
        }
        postsFactory.addLikeDislike(id, ld, function (data) {
            setStorageItem(id + '_' + ld, ld);
            if (ld == 0) me.post.downs = me.post.downs + 1;
            else if (ld == 1) me.post.ups = me.post.ups + 1;
        });
    };

});