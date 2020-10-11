using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public class ShoppListElement
    {
        public int ID { get; set; }
        public User User { get; set; }
        public string Content { get; set; }
        public int PositionInList { get; set; }
    }

   
}
