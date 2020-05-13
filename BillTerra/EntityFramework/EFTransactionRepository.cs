using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BillTerra.Models;
using BillTerra.Contexts;

namespace BillTerra.EntityFramework
{

    public class EFTransactionRepository : ITransactionRepository
    {
        private ApplicationDbContext context;

        public EFTransactionRepository(ApplicationDbContext ctx)
        {
            context = ctx;

            
        }

        public IQueryable<Transaction> Transactions => context.Transactions;

        public async Task Add()
        {
            var transaction = new Transaction
            {
                Amount = 100,
                Name = "Kamil",
                Coment = "Taaaaa",
                Categorie = new Categorie { },
                User = new User { },
                Date = new DateTime(2000, 10, 10)


            };

            context.Transactions.Add(transaction);
            await context.SaveChangesAsync();

        }
    }
}
