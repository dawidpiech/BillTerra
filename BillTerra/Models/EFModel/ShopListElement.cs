using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public class ShopListElement
    {
        public int ID { get; set; }
        public User User { get; set; }
        public string ListName { get; set; }
        public string Title { get; set; }
        public bool IsChecked { get; set; }
    }

   
}
