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
            return await context.Categories.Where(p => p.User.Id == user.Id && p.Name != "Jar").ToListAsync();               
        }

        public  Categorie GetCategoryByID(int id)
        {
            return  context.Categories.FirstOrDefault(x => x.ID == id);
        }
        public Categorie GetCategoryByName(string name)
        {
            return context.Categories.FirstOrDefault(x => x.Name == name);
        }

        public async Task<Categorie> AddCategorie(Categorie categorie)
        {            
            context.Categories.Add(categorie);            
            await context.SaveChangesAsync();
            return categorie;
        }
        public async Task<bool> DeleteCategorie(Categorie categorie)
        {
            Categorie dbEntity = context.Categories.FirstOrDefault(p => p.ID == categorie.ID);
            if (dbEntity != null)
            {
                context.Categories.Remove(dbEntity);
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> EditCategory(Categorie categorie)
        {
            Categorie dbEntity = context.Categories.FirstOrDefault(p => p.ID == categorie.ID);
            if (dbEntity != null)
            {
                dbEntity.IsExpense = categorie.IsExpense;
                dbEntity.Name = categorie.Name;
                 await context.SaveChangesAsync();
                return true;
            }
            return false;
        }


        public async Task<IEnumerable<Categorie>> GetIncomes(User user)
        {
            return await context.Categories.Where(p => p.User.Id == user.Id && p.IsExpense == false  && p.Name != "Jar").ToListAsync();
        }

        public async Task<IEnumerable<Categorie>> GetExpenses(User user)
        {
            return await context.Categories.Where(p => p.User.Id == user.Id && p.IsExpense == true &&  p.Name != "Jar").ToListAsync();

        }

       
    }
}
