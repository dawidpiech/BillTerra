using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public interface ITransactionRepository
    {
        IQueryable<Transaction> Transactions { get; }
        Task Add(User user);
    }
}
