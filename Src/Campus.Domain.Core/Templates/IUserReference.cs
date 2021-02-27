using System;
using Campus.Domain.Core.Models;

namespace Campus.Domain.Core.Templates
{
    public interface IUserReference
    {
        public string CreatedById { get; set; }
        public User CreatedByUser { get; set; }
        public DateTime CreatedOn { get; set; }
        
        public string ModifiedById { get; set; }
        public User ModifiedByUser { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}