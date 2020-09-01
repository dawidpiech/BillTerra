using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public class ShopingList
    {
        public int ID { get; set; }
        public User User { get; set; }
        public string Name { get; set; }
        public int Sequence { get; set; }
    }
}
