using System;

namespace Campus.Master.API.Logging.Messaging
{
    public abstract class LoggingMessage
    {
        public DateTime Date { get; set; }
        public string Header { get; set; }
        public string Origin { get; set; }
    }
}