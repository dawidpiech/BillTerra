using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models.ViewModel
{
    public class AutorisationCreateUserState
    {

        public bool CreateAccountSucceeded { get; set; }
        public IEnumerable<IdentityError> Errors { get; set; }
    }
}
