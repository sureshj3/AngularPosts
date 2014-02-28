﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EmptyMVC.Models;
using EmptyMVC.ViewModels;
using EmptyMVC.BL;
using System.Web.Script.Serialization;


namespace EmptyMVC.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        private AngularPostsBL _AngularPostsBL;
        public HomeController()
        {
            _AngularPostsBL = new AngularPostsBL();
        }

        private AngularEntities db = new AngularEntities();

        public ActionResult Index()
        {
            ViewBag.cnt = db.angularPosts.Count();
            return View();
        }

        public ActionResult InsertPost(string vm)
        {
            //Request.Browser.br
            JavaScriptSerializer js = new JavaScriptSerializer();
            postViewModel pm = js.Deserialize<postViewModel>(vm);
            _AngularPostsBL.AddPost(pm,Request);
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

        public ActionResult getPosts(int pageno)
        {
            ViewBag.totalPages = db.angularPosts.Count();
            var abc = _AngularPostsBL.GetListofPosts(pageno);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string jsonResult = js.Serialize(abc);
            return Content(jsonResult);
        }

    }
}
