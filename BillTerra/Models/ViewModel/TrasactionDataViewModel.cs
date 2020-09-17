using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models.ViewModel
{
    public class TrasactionDataViewModel
    {
        public string UserName { get; set; }
        public string Avatar { get; set; }
        public string Email { get; set; }
        public List<TransactionViewModel> Transactions { get; set; }
        public List<CategoryViewModel> IncomeCategory { get; set; }
        public List<CategoryViewModel> ExpensesCategory { get; set; }

    }
}
