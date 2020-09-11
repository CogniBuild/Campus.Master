using System;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Campus.Master.API.Filters
{
    public sealed class EntryPointLoggingAttribute : Attribute, IFilterFactory
    {
        public string ActionName { get; set; } = "[Area name] Action name";
        public string SenderName { get; set; } = "";
        
        public bool IsReusable => false;
        
        public IFilterMetadata CreateInstance(IServiceProvider serviceProvider)
        {
            var filter = serviceProvider.GetService<EntryPointLoggingFilter>();
            filter.ActionName = ActionName;
            filter.SenderName = SenderName;
            return filter;
        }
    }
}