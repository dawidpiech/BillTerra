using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BillTerra.Models;
using BillTerra.Models.ViewModel;
using BillTerra.Contexts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace BillTerra.Controllers
{
    public class TransactionController : Controller
    {
        private ITransactionRepository repository;
        private ICategorieRepository categorieRepository;
        private UserManager<User> userManager;

        public TransactionController(ITransactionRepository repository, ICategorieRepository categorieRepository, UserManager<User> userManager)
        {
            this.userManager = userManager;
            this.repository = repository;
            this.categorieRepository = categorieRepository;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Index()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);


            return Json(repository.Transactions(user).Result);

        }
        [Authorize]
        public async Task Add(TransactionViewModel transactionViewModel)
        {
            
            User user = await userManager.GetUserAsync(HttpContext.User);
            var transaction = new Transaction
            {
                Amount = transactionViewModel.Amount,
                Coment = transactionViewModel.Coment,
                Categorie = categorieRepository.Categories(user).Result.ElementAt(0),
                User = user,
                Date = transactionViewModel.Date,
                IsExpense = transactionViewModel.IsExpense
                


            };
            await repository.SaveTransaction(transaction) ;
        }
    }
}