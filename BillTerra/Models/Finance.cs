using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BillTerra.Models;

namespace BillTerra.Models
{
    public class Finance
    {
       
            public decimal Balance { get; set; }
            public decimal Spendings { get; set; }
            public decimal Incomes { get; set; }
            public Charts Charts { get; set; }
        
    }
}
