using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models.ViewModel
{
    public class CategorieViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public bool IsExpense { get; set; }
    }
}
