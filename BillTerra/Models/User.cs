﻿using Microsoft.AspNetCore.Identity;

namespace BillTerra.Models
{
    public class User:IdentityUser
    {
  

    }

    public class CreateModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

    }

    public class LoginModel
    {
        
        public string Email { get; set; }
        public string Password { get; set; }
    }


}
