using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BillTerra.Models;
using BillTerra.Contexts;
using Microsoft.AspNetCore.Identity;

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


        public ViewResult Index()
        {

            return View("List",new TransactionViewModel
            {
                Transactions = repository.Transactions
            });

        }
        public async Task Add()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            await repository.Add(user);
        }
    }
}