function postVM() {
    this.id = 0;
    this.content = null;
    this.postedby = "Anonymous";
    this.createdate = null;
    this.isActive = true;
}

function commentVM() {
    this.id = 0;
    this.commenttext = null;
    this.parentPost = null;
    this.postedby = "Anonymous";
    this.createdate = null;
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
    $scope.currPage = 1;
    $scope.totalPages = 10;
    $scope.newcomment = {};



    postsFactory.getPosts($scope.currPage, function (data) {
        $scope.posts = data;
    });



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

    $scope.prevclick = function () {
        $scope.currPage = $scope.currPage - 1;
        if ($scope.currPage > 0)
            postsFactory.getPosts($scope.currPage, function (data) {
                $scope.posts = data;
            });

        $scope.prevnextdisabling();
    };

    $scope.prevnextdisabling = function () {
        $scope.prevdisabled = $scope.currPage <= 1 ? true : false;
        $scope.nextdisabled = $scope.currPage >= $scope.totalPages ? true : false;
    };

    $scope.prevnextdisabling();

});