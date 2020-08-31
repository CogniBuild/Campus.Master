using System;
using System.Globalization;
using System.Net;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Campus.Master.API.Filters
{
    public sealed class GlobalExceptionFilterAttribute : Attribute, IExceptionFilter
    {
        private readonly ILogger _logger;
        
        public GlobalExceptionFilterAttribute(ILogger<GlobalExceptionFilterAttribute> logger)
        {
            _logger = logger;
        }
        
        public void OnException(ExceptionContext context)
        {
            var triggerDate = DateTime.Now.ToString("O", new CultureInfo("de-DE"));
            _logger.LogError(context.Exception, $"[{triggerDate} ERROR]");
            context.Result = new ContentResult
            {
                StatusCode = (int)HttpStatusCode.InternalServerError,
                Content = "A server error has occurred!"
            };
            context.ExceptionHandled = true;
        }
    }
}