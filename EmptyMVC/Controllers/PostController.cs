using EmptyMVC.BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EmptyMVC.Controllers
{
    public class PostController : Controller
    {
        //
        // GET: /Post/
        private AngularPostsBL _AngularPostsBL;

        public PostController()
        {
            _AngularPostsBL = new AngularPostsBL();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult post(int id)
        {
            ViewBag.PostId = id;
            return View();
        }

        public JsonResult getPost(int postId)
        {
            var postDetail = _AngularPostsBL.GetPostVMByID(postId);
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //string jsonResult = js.Serialize(abc);

            //jsonResult = Regex.Replace(jsonResult, @"\""\\/Date\((\d+)\)\\/\""", "new Date($1)");

            return Json(postDetail);
        }

        /// <summary>
        /// Like or Dislike a post
        /// </summary>
        /// <param name="postId">id of the post</param>
        /// <param name="isLike">0-dislike,1-like</param>
        /// <returns></returns>
        public ActionResult likeDislikePost(int postId, int isLD)
        {
            _AngularPostsBL.UpdateLikeDislikes(postId, isLD);

            return Content("");
        }

    }
}
