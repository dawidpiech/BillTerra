using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models.ViewModel
{
    public class ShoppingListElementViewModel
    {
        public int ID { get; set; }
        public string Content { get; set; }
        public int PositionInList { get; set; }
    }
}
