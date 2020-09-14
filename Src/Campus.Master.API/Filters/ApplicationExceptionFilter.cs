using System;
using System.Net;
using System.Text.Json;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.Filters;

using Campus.Master.API.Logging.Messaging;

namespace Campus.Master.API.Filters
{
    public class ApplicationExceptionFilter : IExceptionFilter
    {
        private readonly ILogger _logger;
        
        public ApplicationExceptionFilter(ILogger<ApplicationExceptionFilter> logger)
        {
            _logger = logger;
        }
        
        public void OnException(ExceptionContext context)
        {
            if (context.Exception.GetType() == typeof(ApplicationException))
            {
                _logger.LogWarning(JsonSerializer.Serialize(new EntryPointLoggingMessage
                {
                    Date = DateTime.Now,
                    Header = LoggingHeader.Info.ToString(),
                    Origin = "ApplicationExceptionFilter",
                    ActionName = context.Exception.Message,
                    Mode = LoggingMode.Leave.ToString()
                }));
            
                context.Result = new ContentResult
                {
                    StatusCode = (int)HttpStatusCode.BadRequest,
                    Content = context.Exception.Message
                };
                context.ExceptionHandled = true;
            }
        } 
    }
}