using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace Campus.Master.API.Filters
{
    public sealed class QueryItemsLimiter : Attribute, IAsyncActionFilter
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
                context.Result = new ObjectResult(FailureResponseMessage) { StatusCode = 403 };
            }
            else
            {
                await next();
            }
        }
    }
}