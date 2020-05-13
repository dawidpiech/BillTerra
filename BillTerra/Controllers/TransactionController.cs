using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BillTerra.Models;
using BillTerra.Contexts;

namespace BillTerra.Controllers
{
    public class TransactionController : Controller
    {
        private ITransactionRepository repository;

        public TransactionController(ITransactionRepository repo)
        {

            repository = repo;
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
            await repository.Add();
        }
    }
}