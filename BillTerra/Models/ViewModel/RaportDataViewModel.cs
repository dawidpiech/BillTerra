using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models.ViewModel
{
    public class RaportDataViewModel
    {
        public string UserName { get; set; }
        public string Avatar { get; set; }
        public string Email { get; set; }
        public List<JarRaportViewModel> JarRaports { get; set; }
        public List<double> DayExpenses { get; set; }

    }

    

}
