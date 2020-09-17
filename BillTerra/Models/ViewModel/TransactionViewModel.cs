using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace BillTerra.Models.ViewModel
{
    public class TransactionViewModel
    {
        public int ID { get; set; }
        public CategoryViewModel Category { get; set; }
        public DateTime Date { get; set; }
        public string Coment { get; set; }
        public int Amount { get; set; }
        public bool IsExpense { get; set; }
    }
}
