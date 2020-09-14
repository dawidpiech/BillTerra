using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public class Transaction
    {
        public int ID { get; set; }
        public User User { get; set; }
        public Categorie Categorie { get; set; }
        public DateTime Date { get; set; }
        public string Coment { get; set; }
        public int Amount { get; set; }
        public bool IsExpense { get; set; }
    }

   



}
