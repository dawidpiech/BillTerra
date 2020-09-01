using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public class Categorie
    {
        public int ID { get; set; }
        public User User { get; set; }
        public string Name { get; set; }
        public bool IsExpense { get; set; }

    }
}
