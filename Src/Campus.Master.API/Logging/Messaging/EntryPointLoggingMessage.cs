namespace Campus.Master.API.Logging.Messaging
{
    public class EntryPointLoggingMessage : LoggingMessage
    {
        public string ActionName { get; set; }
        public string Mode { get; set; }
    }
}