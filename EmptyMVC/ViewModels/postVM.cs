using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmptyMVC.ViewModels
{
    public class postViewModel
    {
        public long id { get; set; }
        public string content { get; set; }
        public string postedby { get; set; }
        public Nullable<System.DateTime> createdate { get; set; }
        public Nullable<bool> isActive { get; set; }
        public int ups { get; set; }
        public int downs { get; set; }
        public int eyes { get; set; }
        public IEnumerable<commentViewModel> comments { get; set; }
    }

    public class commentViewModel
    {
        public long id { get; set; }
        public long parentPost { get; set; }
        public string commenttext { get; set; }
        public string postedby { get; set; }
        public int ups { get; set; }
        public int downs { get; set; }
        public Nullable<System.DateTime> createDate { get; set; }

    }
}