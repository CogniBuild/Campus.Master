using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;

using Campus.Master.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Campus.Master.API.Filters
{
    public class FetchedItemsCountLimiterAttribute : Attribute, IAsyncActionFilter
    {
        private readonly IConfiguration _configuration;
        private const string TargetQueryParameter = "items";
        private const string FailureResponseMessage = "Requested count of items exceeded the limit!";

        public FetchedItemsCountLimiterAttribute(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var limiterValue = Convert.ToInt32(_configuration["Endpoints:FetchedItemsCountLimit"]);
            var requestedItemsValue = Convert.ToInt32(context.HttpContext.Request.Query[TargetQueryParameter]);

            if (requestedItemsValue > limiterValue)
            {
                var responseState = new StateTransfer
                {
                    Message = FailureResponseMessage,
                    Payload = "/"
                };
                
                context.Result = new ObjectResult(responseState) { StatusCode = 403 };
            }
            else
            {
                await next();
            }
        }
    }
}