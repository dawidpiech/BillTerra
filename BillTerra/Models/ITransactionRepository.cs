using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace BillTerra.Models
{
    public interface ITransactionRepository
    {
        Task<Transaction> AddTransaction(Transaction transaction);
        Task<bool> EditTransaction(Transaction transaction);
        bool DeleteTransaction(Transaction transaction);
        Task<IEnumerable<Transaction>> GetTransactionOfDay(User user, DateTime date);
        Task<IEnumerable<Transaction>> Transactions(User user);
        Task<IEnumerable<Transaction>> GetIncomes(User user);
        Task<IEnumerable<Transaction>> GetExpenses(User user);

    }
}