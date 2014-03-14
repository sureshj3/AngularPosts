using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using NLog;
using NLog.LayoutRenderers;
using System.Globalization;
using NLog.Config;
using System.Text;

namespace EmptyMVC.Utilities.LoggerN
{
    [LayoutRenderer("utc_date")]
    public class UtcDateRenderer : LayoutRenderer
    {

        ///
        /// Initializes a new instance of the  class.
        ///
        public UtcDateRenderer()
        {
            this.Format = "G";
            this.Culture = CultureInfo.InvariantCulture;
        }

        protected int GetEstimatedBufferSize(LogEventInfo ev)
        {
            // Dates can be 6, 8, 10 bytes so let's go with 10
            return 10;
        }

        ///
        /// Gets or sets the culture used for rendering.
        ///
        ///
        public CultureInfo Culture { get; set; }

        ///
        /// Gets or sets the date format. Can be any argument accepted by DateTime.ToString(format).
        ///
        ///
        [DefaultParameter]
        public string Format { get; set; }

        ///
        /// Renders the current date and appends it to the specified .
        ///
        /// <param name="builder">The  to append the rendered data to.
        /// <param name="logEvent">Logging event.
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
            builder.Append(logEvent.TimeStamp.ToUniversalTime().ToString(this.Format, this.Culture));
        }

    }
}