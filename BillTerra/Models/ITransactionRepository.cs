using System.Collections.Generic;
using System.Threading.Tasks;


namespace BillTerra.Models
{
    public interface ITransactionRepository
    {
        Task SaveTransaction(Transaction transaction);
        Transaction DeleteTransaction(Transaction transaction);
        Task<IEnumerable<Transaction>> Transactions(User user);
    }
}