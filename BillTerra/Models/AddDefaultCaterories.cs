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
            categorieRepository.SaveCategorie(new Categorie { Name = "Dom", User = user });
            categorieRepository.SaveCategorie(new Categorie { Name = "Wydatki", User = user });
            categorieRepository.SaveCategorie(new Categorie { Name = "Dochody", User = user });
        }
    }
}

