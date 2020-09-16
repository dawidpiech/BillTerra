using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models.ViewModel
{
    public class NotyficationViewModel
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Describe { get; set; }
        public bool IsVisible { get; set; }
    }
}
