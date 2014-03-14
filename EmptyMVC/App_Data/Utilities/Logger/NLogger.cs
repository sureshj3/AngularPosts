//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;

//using NLog;

//namespace EmptyMVC.Utilities.Logger
//{
//    public class NLogger1
//    {

//        private static Logger logger = LogManager.GetCurrentClassLogger();

//        public void MyMethod1()
//        {
//            logger.Trace("Sample trace message");
//            logger.Debug("Sample debug message");
//            logger.Info("Sample informational message");
//            logger.Warn("Sample warning message");
//            logger.Error("Sample error message");
//            logger.Fatal("Sample fatal error message");

//            // alternatively you can call the Log() method 
//            // and pass log level as the parameter.
//            logger.Log(LogLevel.Info, "Sample informational message");
//        }

//        public void MyMethod2()
//        {
//            int k = 42;
//            int l = 100;

//            logger.Trace("Sample trace message, k={0}, l={1}", k, l);
//            logger.Debug("Sample debug message, k={0}, l={1}", k, l);
//            logger.Info("Sample informational message, k={0}, l={1}", k, l);
//            logger.Warn("Sample warning message, k={0}, l={1}", k, l);
//            logger.Error("Sample error message, k={0}, l={1}", k, l);
//            logger.Fatal("Sample fatal error message, k={0}, l={1}", k, l);
//            logger.Log(LogLevel.Info, "Sample informational message, k={0}, l={1}", k, l);
//        }
//    }
//}