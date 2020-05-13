using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public class TransactionViewModel
    {

        public IEnumerable<Transaction> Transactions { get; set; }
    }
}
