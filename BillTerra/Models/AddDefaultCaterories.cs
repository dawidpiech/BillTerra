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
            categorieRepository.SaveCategorie(new Categorie { Name = "Home", User = user , IsExpense = true });
            categorieRepository.SaveCategorie(new Categorie { Name = "Expense", User = user , IsExpense = true });
            categorieRepository.SaveCategorie(new Categorie { Name = "Income", User = user , IsExpense = false});
        }
    }
}

