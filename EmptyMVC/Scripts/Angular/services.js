

postsModel.service('postsFactory', function ($http) {

    this.getPosts = function (pageno,successCallback) {
        $http.post('/home/getPosts', { 'pageno': pageno }).
            success(function (data, status) {
                successCallback(data);
            }).
            error(function (data, status) {
                alert("AJAX failed!");
            });
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


});