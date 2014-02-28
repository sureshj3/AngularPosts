

function postVM() {
    this.id = 0;
    this.content = null;
    this.postedby = "Anonymous";
    this.createdate = null;
    this.isActive = 1;
}

function commentVM() {
    this.id = 0;
    this.commenttext = null;
    this.parentPost = null;
    this.postedby = "Anonymous";
    this.createdate = null;
}