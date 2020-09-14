using System;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Campus.Master.API.Filters
{
    public sealed class ApplicationExceptionHandlerAttribute : Attribute, IFilterFactory
    {
        public bool IsReusable => false;
        
        public IFilterMetadata CreateInstance(IServiceProvider serviceProvider)
        {
            var filter = serviceProvider.GetService<ApplicationExceptionFilter>();
            return filter;
        }
    }
}