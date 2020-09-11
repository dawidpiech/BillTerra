using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BillTerra.Models;
using BillTerra.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BillTerra.EntityFramework
{

    public class EFTransactionRepository : ITransactionRepository
    {
        private ApplicationDbContext context;

        public EFTransactionRepository(ApplicationDbContext ctx)
        {
            context = ctx;

        }

        public async Task<IEnumerable<Transaction>> Transactions(User user)
        {

            return await context.Transactions.Where(p => p.User.Id == user.Id).ToListAsync();

        }


        public async Task Add( Transaction transaction)
        {

            context.Transactions.Add(transaction);
            await context.SaveChangesAsync();

        }

        public async Task SaveTransaction(Transaction transaction)
        {
            if (transaction.ID == 0)
                context.Transactions.Add(transaction);
            else
            {
                Transaction dbEntity = context.Transactions.FirstOrDefault(p => p.ID == transaction.ID);
                if (dbEntity != null)
                {
                    dbEntity.Amount = transaction.Amount;
                    dbEntity.Categorie = transaction.Categorie;
                    dbEntity.Coment = transaction.Coment;
                    dbEntity.Date = transaction.Date;

                }

            }
            await context.SaveChangesAsync();
        }

        public Transaction DeleteTransaction(Transaction transaction)
        {
            Transaction dbEntity = context.Transactions.FirstOrDefault(p => p.ID == transaction.ID);
            if (dbEntity != null)
            {
                context.Transactions.Remove(dbEntity);
                context.SaveChanges();
            }
            return dbEntity;
        }
    }
}
