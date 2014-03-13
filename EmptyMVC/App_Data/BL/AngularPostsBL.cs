using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EmptyMVC.Models;
using EmptyMVC.ViewModels;
using System.Configuration;
using EmptyMVC.Utilities;

namespace EmptyMVC.BL
{
    public class AngularPostsBL
    {
        private AngularEntities db = new AngularEntities();

        public long AddPost(postViewModel post, HttpRequestBase request)
        {
            angularPost ap = new angularPost();
            ap.content = post.content;
            ap.postedby = post.postedby != "" || post.postedby != null ? post.postedby : "Anonymous";
            ap.createdate = DateTime.Now.Date;
            ap.UserBrowser = request.Browser.Browser + ", " + request.Browser.Version;
            ap.UserIP = Common.GetVisitorIPAddress();

            db.angularPosts.Add(ap);
            db.SaveChanges();

            return ap.id;
        }

        public long AddComment(commentViewModel comment, HttpRequestBase request)
        {
            angularPost ap = new angularPost();
            ap = GetPostByID(comment.parentPost);

            comment cmm = new comment();
            cmm.comments = comment.commenttext;
            cmm.commentPostedby = comment.postedby != "" ? comment.postedby : "Anonymous";
            cmm.createDate = DateTime.Now.Date;
            cmm.UserBrowser = request.Browser.Browser + ", " + request.Browser.Version;
            cmm.UserIP = Common.GetVisitorIPAddress();

            ap.comments.Add(cmm);

            db.SaveChanges();

            return cmm.id;
        }

        public IEnumerable<postViewModel> GetListofPosts(int pageno, string searchText)
        {
            int PostsPerPage = Convert.ToInt16(ConfigurationManager.AppSettings["PostsPerPage"]);
            IEnumerable<angularPost> aps = db.angularPosts;

            if (searchText != null && searchText != "")
                aps = aps.Where(ap => ap.content.Contains(searchText));

            return aps.Select(a => new postViewModel
            {
                id = a.id,
                content = a.content,
                postedby = a.postedby,
                createdate = a.createdate,
                ups = a.Likes,
                downs = a.Hates,
                eyes = a.Views,
                comments = a.comments.Select(c => new commentViewModel
                {
                    id = c.id,
                    parentPost = a.id,
                    postedby = c.commentPostedby,
                    commenttext = c.comments,
                    createDate = c.createDate,
                    ups = c.Likes,
                    downs = c.Hates
                })
            }).OrderBy(n => n.id).Skip((pageno - 1) * PostsPerPage).Take(PostsPerPage).ToList();
        }

        public angularPost GetPostByID(long id)
        {
            return db.angularPosts.Where(a => a.id == id).FirstOrDefault();
        }

        public postViewModel GetPostVMByID(long id)
        {
            return db.angularPosts.Where(a => a.id == id).Select(a => new postViewModel
            {
                id = a.id,
                content = a.content,
                postedby = a.postedby,
                createdate = a.createdate,
                ups = a.Likes,
                downs = a.Hates,
                eyes = a.Views,
                comments = a.comments.Select(c => new commentViewModel
                {
                    id = c.id,
                    parentPost = a.id,
                    postedby = c.commentPostedby,
                    commenttext = c.comments,
                    createDate = c.createDate,
                    ups = c.Likes,
                    downs = c.Hates
                })
            }).FirstOrDefault();
        }

        public void UpdateLikeDislikes(int postId, int likeDislikeFlag)
        {
            angularPost ap = new angularPost();
            ap = GetPostByID(postId);

            switch (likeDislikeFlag)
            {
                case 1:
                    ap.Likes = ap.Likes + 1;
                    break;
                case 0:
                    ap.Hates = ap.Hates + 1;
                    break;
                default:
                    break;
            }

            db.SaveChanges();
        }

    }
}