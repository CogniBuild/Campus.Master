using System;
using System.Net;
using System.Text.Json;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.Filters;

using Campus.Master.API.Logging.Messaging;

namespace Campus.Master.API.Filters
{
    // ReSharper disable once ClassNeverInstantiated.Global
    public sealed class GlobalExceptionFilterAttribute : Attribute, IExceptionFilter
    {
        private readonly ILogger _logger;
        
        public GlobalExceptionFilterAttribute(ILogger<GlobalExceptionFilterAttribute> logger)
        {
            _logger = logger;
        }
        
        public void OnException(ExceptionContext context)
        {
            _logger.LogError(JsonSerializer.Serialize(new ErrorLoggingMessage
            {
                Date = DateTime.Now,
                Header = LoggingHeader.Error.ToString(),
                Origin = "GlobalExceptionFilter",
                Message = context.Exception.Message,
                Trace = context.Exception.StackTrace
            }));
            
            context.Result = new ContentResult
            {
                StatusCode = (int)HttpStatusCode.InternalServerError,
                Content = "A server error has occurred!"
            };
            context.ExceptionHandled = true;
        }
    }
}