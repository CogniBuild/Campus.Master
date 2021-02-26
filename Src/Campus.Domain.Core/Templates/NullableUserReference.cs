using System;

namespace Campus.Domain.Core.Templates
{
    public class NullableUserReference
    {
        public int? CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        
        public int? ModifiedById { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}