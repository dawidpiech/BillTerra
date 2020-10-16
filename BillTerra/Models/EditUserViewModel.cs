using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models.ViewModel
{
    public class EditUserViewModel
    {
        public string Name { get; set; }
        public string AvatarLink { get; set; }
    }
    public class EditUserPasswordViewModel
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}