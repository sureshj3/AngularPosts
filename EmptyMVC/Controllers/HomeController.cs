using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EmptyMVC.Models;
using EmptyMVC.ViewModels;
using EmptyMVC.BL;
using System.Web.Script.Serialization;
using System.Text.RegularExpressions;
using EmptyMVC.Utilities;


namespace EmptyMVC.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        private AngularPostsBL _AngularPostsBL;
        private NLogger _logger;
        public HomeController()
        {
            _logger = new NLogger();
            _AngularPostsBL = new AngularPostsBL();
        }

        private AngularEntities db = new AngularEntities();

        public ActionResult Index()
        {
            try
            {
                ViewBag.cnt = db.angularPosts.Count();
            }
            catch (Exception ex)
            {
                _logger.Error("An error has occurred HomeController-Index", ex);
            }

            return View();
        }

        public JsonResult getPosts(int pageno, string searchtext)
        {
            ViewBag.totalPages = db.angularPosts.Count();
            var abc = _AngularPostsBL.GetListofPosts(pageno, searchtext);
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //string jsonResult = js.Serialize(abc);

            //jsonResult = Regex.Replace(jsonResult, @"\""\\/Date\((\d+)\)\\/\""", "new Date($1)");

            return Json(abc);
        }

        public ActionResult InsertPost(string vm)
        {
            //Request.Browser.br
            JavaScriptSerializer js = new JavaScriptSerializer();
            postViewModel pm = js.Deserialize<postViewModel>(vm);
            _AngularPostsBL.AddPost(pm, Request);
            return Content("");
        }

        public ActionResult InsertComment(string vm)
        {
            //Request.Browser.br
            JavaScriptSerializer js = new JavaScriptSerializer();
            commentViewModel cm = js.Deserialize<commentViewModel>(vm);
            _AngularPostsBL.AddComment(cm, Request);
            return Content("");
        }

        //public JsonResult getPosts(int pageno, string searchtext)
        //{
        //    ViewBag.totalPages = db.angularPosts.Count();
        //    var abc = _AngularPostsBL.GetListofPosts(pageno, searchtext);
        //    //JavaScriptSerializer js = new JavaScriptSerializer();
        //    //string jsonResult = js.Serialize(abc);

        //    //jsonResult = Regex.Replace(jsonResult, @"\""\\/Date\((\d+)\)\\/\""", "new Date($1)");

        //    return Json(abc);
        //}

    }
}
