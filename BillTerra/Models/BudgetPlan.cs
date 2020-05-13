using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public class BudgetPlan
    {
        public int ID { get; set; }
        public User User { get; set; }
        public Categorie Categorie { get; set; }
        public int Ammount { get; set; }
    }
}
