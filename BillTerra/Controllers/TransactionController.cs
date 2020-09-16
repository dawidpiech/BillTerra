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
        private UserManager<User> userManager;

        public TransactionController(ITransactionRepository repository, UserManager<User> userManager)
        {
            this.userManager = userManager;
            this.repository = repository;
        }

        [Authorize]
        public async Task<IActionResult> Index()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);

            return View("List", repository.Transactions(user).Result);

        }
        [Authorize]
        [HttpPost]
        public async Task Add(TransactionViewModel transactionViewModel)
        {
            
            User user = await userManager.GetUserAsync(HttpContext.User);
            var transaction = new Transaction
            {
                Amount = transactionViewModel.Amount,
                Coment = transactionViewModel.Coment,
                Categorie = new Categorie { ID = 10 , Name = "Home" , User = user},
                User = user,
                Date = transactionViewModel.Date,
                IsExpense = transactionViewModel.IsExpense
                


            };
            await repository.SaveTransaction(transaction) ;
        }
    }
}