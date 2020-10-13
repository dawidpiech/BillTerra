using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public static class AddDefaultCaterories
    {
        public static void Add(ICategorieRepository categorieRepository, User user)
        {
            categorieRepository.AddCategorie(new Categorie { Name = "Home", User = user , IsExpense = true });
            categorieRepository.AddCategorie(new Categorie { Name = "Expense", User = user , IsExpense = true });
            categorieRepository.AddCategorie(new Categorie { Name = "Income", User = user , IsExpense = false});
        }
    }
}

