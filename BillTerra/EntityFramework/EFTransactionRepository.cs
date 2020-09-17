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

            return await context.Transactions.Include(d => d.Categorie)
                .Where(p => p.User.Id == user.Id).ToListAsync();

        }

        public async Task<Transaction> AddTransaction(Transaction transaction)
        {
            context.Transactions.Add(transaction);
            await context.SaveChangesAsync();

            return transaction;
        }

        public async Task<bool> EditTransaction(Transaction transaction)
        {
            Transaction dbEntity = context.Transactions.Include(d => d.Categorie).FirstOrDefault(p => p.ID == transaction.ID);
            if (dbEntity != null)
            {
                dbEntity.Amount = transaction.Amount;
                dbEntity.Categorie = transaction.Categorie;
                dbEntity.Coment = transaction.Coment;
                dbEntity.Date = transaction.Date;
                await context.SaveChangesAsync();
                return true;
            }
            return false;
            
            
        }

        public bool DeleteTransaction(Transaction transaction)
        {
            Transaction dbEntity = context.Transactions.Include(d => d.Categorie).FirstOrDefault(p => p.ID == transaction.ID);
            if (dbEntity != null)
            {
                context.Transactions.Remove(dbEntity);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<Transaction>> GetIncomes(User user)
        {
            return await context.Transactions.Include(d => d.Categorie).Where(p => p.User.Id == user.Id && p.IsExpense == false).ToListAsync();
        }

        public async Task<IEnumerable<Transaction>> GetExpenses(User user)
        {
            return await context.Transactions.Include(d => d.Categorie).Where(p => p.User.Id == user.Id && p.IsExpense == true).ToListAsync();
        }
    }
}
