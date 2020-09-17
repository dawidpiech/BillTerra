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
        private ITransactionRepository transactionRepository;
        private ICategorieRepository categorieRepository;
        private UserManager<User> userManager;

        public TransactionController(ITransactionRepository transactionRepository, ICategorieRepository categorieRepository, UserManager<User> userManager)
        {
            this.userManager = userManager;
            this.transactionRepository = transactionRepository;
            this.categorieRepository = categorieRepository;
        }

        [Authorize]
        public async Task<IActionResult> Index()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            List<CategoryViewModel> expensesCategory = new List<CategoryViewModel>();
            List<CategoryViewModel> incomeCategory = new List<CategoryViewModel>();
            List<TransactionViewModel> transactions = new List<TransactionViewModel>();


            transactionRepository.Transactions(user).Result.ToList().ForEach(x =>
            {
                transactions.Add(new TransactionViewModel
                {
                    ID = x.ID,
                    Amount = x.Amount,
                    Category = new CategoryViewModel
                    {
                        ID = x.Categorie.ID,
                        Name = x.Categorie.Name
                    },
                    Coment = x.Coment,
                    Date = x.Date,
                    IsExpense = x.IsExpense
                });

            });

            categorieRepository.GetExpenses(user).Result.ToList().ForEach(x =>
            {
                expensesCategory.Add(new CategoryViewModel
                {
                    ID = x.ID,
                    Name = x.Name
                });

            });

            categorieRepository.GetIncomes(user).Result.ToList().ForEach(x =>
            {
                incomeCategory.Add(new CategoryViewModel
                {
                    ID = x.ID,
                    Name = x.Name
                });

            });

            TrasactionDataViewModel trasactionDataViewModel = new TrasactionDataViewModel
            {
                UserName = user.UserName,
                Email = user.Email,
                Avatar = user.AvatarLink,
                ExpensesCategory = expensesCategory,
                IncomeCategory = incomeCategory,
                Transactions = transactions
            };

            return Json(trasactionDataViewModel);

        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddTransactioin([FromBody] TransactionViewModel transactionViewModel)     
        {

            User user = await userManager.GetUserAsync(HttpContext.User);
            var transaction = new Transaction
            {
                Amount = transactionViewModel.Amount,
                Coment = transactionViewModel.Coment,
                Categorie = new Categorie
                {
                    ID = transactionViewModel.Category.ID,
                    Name = transactionViewModel.Category.Name,
                    IsExpense = transactionViewModel.Category.IsExpense,
                    User = user,
                },
                User = user,
                Date = transactionViewModel.Date,
                IsExpense = transactionViewModel.IsExpense
            };


            

            var tmp =  transactionRepository.AddTransaction(transaction).Result;


            return Json(new TransactionViewModel {
                Amount = tmp.Amount,
                Category = new CategoryViewModel
                {
                    ID  = tmp.Categorie.ID,
                    Name = tmp.Categorie.Name,
                    IsExpense = tmp.Categorie.IsExpense
                },
                Date = tmp.Date,
                IsExpense = tmp.IsExpense,
                ID = tmp.ID,
                Coment = tmp.Coment
            });
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> EditTrasactioin([FromBody]TransactionViewModel transactionViewModel)
        {
            User user = await userManager.GetUserAsync(HttpContext.User);

            var transaction = new Transaction
            {
                Amount = transactionViewModel.Amount,
                Coment = transactionViewModel.Coment,
                Categorie = new Categorie
                {
                    ID = transactionViewModel.Category.ID,
                    Name = transactionViewModel.Category.Name,
                    IsExpense = transactionViewModel.Category.IsExpense,
                    User = user,
                },
                User = user,
                Date = transactionViewModel.Date,
                IsExpense = transactionViewModel.IsExpense
            };


            return Json(new { succeed = transactionRepository.EditTransaction(transaction)  });
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> DeleteTrasactioin([FromBody] TransactionViewModel transactionViewModel)
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            var transaction = new Transaction
            {
                Amount = transactionViewModel.Amount, 
                Coment = transactionViewModel.Coment,
                Categorie = new Categorie
                {
                    ID = transactionViewModel.Category.ID,
                    Name = transactionViewModel.Category.Name,
                    IsExpense = transactionViewModel.Category.IsExpense,
                    User = user,
                },
                User = user,
                Date = transactionViewModel.Date,
                IsExpense = transactionViewModel.IsExpense
            };




            return Json(new { succeed = transactionRepository.DeleteTransaction(transaction) });
        }

    }
}