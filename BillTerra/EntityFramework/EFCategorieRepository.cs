using BillTerra.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BillTerra.Models;
using Microsoft.EntityFrameworkCore;

namespace BillTerra.EntityFramework
{
    public class EFCategorieRepository : ICategorieRepository
    {
        private ApplicationDbContext context;

        public EFCategorieRepository(ApplicationDbContext ctx)
        {
            context = ctx;
        }


        public async Task<IEnumerable<Categorie>> Categories(User user)
        {
            return await context.Categories.Where(p => p.User.Id == user.Id).ToListAsync();               
        }

        public async Task SaveCategorie(Categorie categorie)
        {
            if (categorie.ID == 0)
                context.Categories.Add(categorie);
            else
            {
                Categorie dbEntity = context.Categories.FirstOrDefault(p => p.ID == categorie.ID);
                if (dbEntity != null)
                {
                    dbEntity.Name = categorie.Name;
                   
                }

            }
            await context.SaveChangesAsync();
        }

        public Categorie DeleteCategorie(Categorie categorie)
        {
            Categorie dbEntity = context.Categories.FirstOrDefault(p => p.ID == categorie.ID);
            if (dbEntity != null)
            {
                context.Categories.Remove(dbEntity);
                context.SaveChanges();
            }
            return dbEntity;
        }

        public async Task<IEnumerable<Categorie>> GetIncomes(User user)
        {
            return await context.Categories.Where(p => p.User.Id == user.Id && p.IsExpense == false ).ToListAsync();
        }

        public async Task<IEnumerable<Categorie>> GetExpenses(User user)
        {
            return await context.Categories.Where(p => p.User.Id == user.Id && p.IsExpense == true).ToListAsync();

        }
    }
}
