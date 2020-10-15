using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;

namespace BillTerra.Models.ViewModel
{
    public class CategorieDataViewModel
    {
        public string UserName { get; set; }
        public string Avatar { get; set; }
        public string Email { get; set; }
        public List<CategorieViewModel> Categories { get; set; }
    }
}
