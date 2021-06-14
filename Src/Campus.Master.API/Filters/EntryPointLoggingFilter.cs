using System;
using System.Text.Json;

using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.Filters;

using Campus.Master.API.Logging.Messaging;

namespace Campus.Master.API.Filters
{
    public class EntryPointLoggingFilter : IActionFilter
    {
        public string ActionName { get; set; } = "[Area name] Action name";
        public string SenderName { get; set; } = "";
        
        private readonly ILogger _logger;
        
        public EntryPointLoggingFilter(ILogger<EntryPointLoggingFilter> logger)
        {
            _logger = logger;
        }
        
        public void OnActionExecuted(ActionExecutedContext context)
        {
            _logger.LogInformation(JsonSerializer.Serialize(
                new EntryPointLoggingMessage
            {
                Date = DateTime.Now,
                Header = LoggingHeader.Info.ToString(),
                Origin = SenderName,
                ActionName = ActionName,
                Mode = LoggingMode.Leave.ToString()
            }));
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            _logger.LogInformation(JsonSerializer.Serialize(
                new EntryPointLoggingMessage
            {
                Date = DateTime.Now,
                Header = LoggingHeader.Info.ToString(),
                Origin = SenderName,
                ActionName = ActionName,
                Mode = LoggingMode.Entry.ToString()
            }));
        }
    }
}