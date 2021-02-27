using System;
using Campus.Domain.Core.Models;

namespace Campus.Domain.Core.Templates
{
    public interface IStrictUserReference
    {
        public int CreatedById { get; set; }
        public User CreatedByUser { get; set; }
        public DateTime CreatedOn { get; set; }
        
        public int ModifiedById { get; set; }
        public User ModifiedByUser { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}