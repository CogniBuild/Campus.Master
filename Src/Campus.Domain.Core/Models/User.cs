using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Campus.Domain.Core.Models
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public DateTime CreatedOn { get; set; }
        public Locale PreferredLocale { get; set; }

        public ICollection<Participant> Participation { get; set; }
    }
}
