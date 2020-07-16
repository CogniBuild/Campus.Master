using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;

using Campus.Master.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Campus.Master.API.Filters
{
    public class QueryItemsLimiter : Attribute, IAsyncActionFilter
    {
        private readonly int _limiterValue;
        private const string TargetQueryParameter = "items";
        private const string FailureResponseMessage = "Requested count of items exceeded the limit!";

        public QueryItemsLimiter(int limiterValue)
        {
            _limiterValue = limiterValue;
        }
        
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var requestedItemsValue = Convert.ToInt32(context.HttpContext.Request.Query[TargetQueryParameter]);

            if (requestedItemsValue > _limiterValue)
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