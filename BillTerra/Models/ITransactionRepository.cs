using System.Collections.Generic;
using System.Threading.Tasks;


namespace BillTerra.Models
{
    public interface ITransactionRepository
    {
        Task Add(Transaction transaction);
        Task<IEnumerable<Transaction>> Transactions(User user);
    }
}