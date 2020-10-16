using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public static class AddDefaultCaterories
    {
        public static async Task Add(ICategorieRepository categorieRepository, User user)
        {
            //Income
            await categorieRepository.AddCategorie(new Categorie { Name = "Jar", User = user, IsExpense = false });
            await categorieRepository.AddCategorie(new Categorie { Name = "Business", User = user, IsExpense = false });
            await categorieRepository.AddCategorie(new Categorie { Name = "Extra Income", User = user, IsExpense = false });
            await categorieRepository.AddCategorie(new Categorie { Name = "Gifts", User = user, IsExpense = false });
            await categorieRepository.AddCategorie(new Categorie { Name = "Insurance Payout", User = user, IsExpense = false });
            await categorieRepository.AddCategorie(new Categorie { Name = "Loan", User = user, IsExpense = false });
            await categorieRepository.AddCategorie(new Categorie { Name = "Other", User = user, IsExpense = false });
            await categorieRepository.AddCategorie(new Categorie { Name = "Parental Leave", User = user, IsExpense = false });
            await categorieRepository.AddCategorie(new Categorie { Name = "Solary", User = user, IsExpense = false });
            // Expense
            await categorieRepository.AddCategorie(new Categorie { Name = "Beauty", User = user, IsExpense = true });
            await categorieRepository.AddCategorie(new Categorie { Name = "Bills & Fees", User = user, IsExpense = true });
            await categorieRepository.AddCategorie(new Categorie { Name = "Car", User = user, IsExpense = true });
            await categorieRepository.AddCategorie(new Categorie { Name = "Education", User = user, IsExpense = true });
            await categorieRepository.AddCategorie(new Categorie { Name = "Entertainment", User = user, IsExpense = true });
            await categorieRepository.AddCategorie(new Categorie { Name = "Family & Personal", User = user, IsExpense = true });
            await categorieRepository.AddCategorie(new Categorie { Name = "Food & Drink", User = user, IsExpense = true });
            await categorieRepository.AddCategorie(new Categorie { Name = "Gifts", User = user, IsExpense = true });
            await categorieRepository.AddCategorie(new Categorie { Name = "Groceries", User = user, IsExpense = true });
            await categorieRepository.AddCategorie(new Categorie { Name = "Healthcare", User = user, IsExpense = true });
            await categorieRepository.AddCategorie(new Categorie { Name = "Home", User = user, IsExpense = true });
            await categorieRepository.AddCategorie(new Categorie { Name = "Others", User = user, IsExpense = true });
            await categorieRepository.AddCategorie(new Categorie { Name = "Shopping", User = user, IsExpense = true });
            await categorieRepository.AddCategorie(new Categorie { Name = "Sport & Hobbies", User = user, IsExpense = true });
            await categorieRepository.AddCategorie(new Categorie { Name = "Transport", User = user, IsExpense = true });
            await categorieRepository.AddCategorie(new Categorie { Name = "Travel", User = user, IsExpense = true });
            await categorieRepository.AddCategorie(new Categorie { Name = "Work", User = user, IsExpense = true });

        }
    }
}

