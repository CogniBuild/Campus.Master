using System;

namespace Campus.Domain.Core.Templates
{
    public class StrictUserReference
    {
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        
        public int ModifiedById { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}