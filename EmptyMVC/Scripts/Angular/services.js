

postsModel.service('postsFactory', function ($http) {

    this.getPosts = function (pageno, searchText, successCallback) {
        $http.post('/home/getPosts', { 'pageno': pageno, 'searchtext': searchText }).
            success(function (data, status) {
                successCallback(data);
            }).
            error(function (data, status) {
                alert("AJAX failed!");
            });
    };

    this.getPost = function (postId, successCallback) {
        $http.post('/post/getPost', { 'postId': postId }).
            success(function (data, status) {
                successCallback(data);
            }).
            error(function (data, status) {
                alert("AJAX failed!");
            });
    };

    this.getJSONPosts = function (pageno, searchText, successCallback) {
        var url = "/home/getPosts?pageno=" + pageno + "&searchtext=" + searchText;
        $http.getJSON(url, "", function (data) {
            successCallback(data);
        })
    };

    this.addPost = function (postVM, successCallback) {
        $http.post('/home/InsertPost', { "vm": JSON.stringify(postVM) }).
        success(function (data, status) {
            successCallback(data);
        }).
        error(function (data, status) {
            alert("AJAX failed!");
        });
    };

    this.addcomment = function (commentVM, successCallback) {
        $http.post('/home/InsertComment', { "vm": angular.toJson(commentVM) }).
        success(function (data, status) {
            successCallback(data);
        }).
        error(function (data, status) {
            alert("AJAX failed!");
        });
    };

    this.addLikeDislike = function (postId, ld, successCallback) {
        $http.post('/post/likeDislikePost', { "postId": postId, isLD: ld }).
        success(function (data, status) {
            successCallback(data);
        }).
        error(function (data, status) {
            alert("AJAX failed!");
        });
    };
});