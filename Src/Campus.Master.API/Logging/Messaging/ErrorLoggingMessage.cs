namespace Campus.Master.API.Logging.Messaging
{
    public class ErrorLoggingMessage : LoggingMessage
    {
        public string Message { get; set; }
        public string Trace { get; set; }
    }
}