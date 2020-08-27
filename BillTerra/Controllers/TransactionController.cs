using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BillTerra.Models;
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
        public async Task Add()
        {
            
            User user = await userManager.GetUserAsync(HttpContext.User);
            var transaction = new Transaction
            {
                Amount = 100,
                Name = "Kamil",
                Coment = "Taaaaa",
                Categorie = new Categorie { },
                User = user,
                Date = new DateTime(2000, 10, 10)


            };
            await repository.Add(transaction) ;
        }
    }
}