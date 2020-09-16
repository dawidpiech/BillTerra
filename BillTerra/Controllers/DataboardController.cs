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
    public class DataboardController : Controller
    {

        private ITransactionRepository transactionRepository;
        private INotificationRepository notificationRepository;
            
        private UserManager<User> userManager;

        public DataboardController(ITransactionRepository transactionRepository, INotificationRepository notificationRepository, UserManager<User> userManager)
        {
            this.userManager = userManager;
            this.transactionRepository = transactionRepository;
            this.notificationRepository = notificationRepository;
        }


        public async Task<IActionResult> Index()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            IEnumerable<Transaction> TransactionIncomes = transactionRepository.GetIncomes(user).Result;
            IEnumerable<Transaction> TransactionExpenses = transactionRepository.GetExpenses(user).Result;
            decimal incomesSume = TransactionIncomes.ToList().Sum(x => x.Amount);
            decimal expensesSume = TransactionExpenses.ToList().Sum(x => x.Amount);


            List<NotificationViewModel> notifications = new List<NotificationViewModel>();
            notificationRepository.Notifications(user)
                .Result.ToList().ForEach(x  => notifications
                .Add(new NotificationViewModel
                {
                    Describe = x.Describe,
                    ID = x.ID,
                    Image = x.Image,
                    Title = x.Title
                }
            ));


            DataboardViewModel databoardViewModel = new DataboardViewModel
            {
                 
                UserName = user.UserName,
                Avatar = user.AvatarLink,
                Email = user.Email,
                Notyfication = notifications,
                Finance = new Finance
                {
                    Balance = incomesSume - expensesSume,
                    Spendings = expensesSume,
                    Incomes = incomesSume,
                    Charts = new Charts
                    {
                     Incomes = GetChartsData(TransactionIncomes),
                     Expenses = GetChartsData(TransactionExpenses)

                    }

                }

            };

            return Json(databoardViewModel); 
        }


        private List<ChartsData> GetChartsData(IEnumerable<Transaction> transactions)
        {
            List<ChartsData> result = new List<ChartsData>();
            decimal SumeTrasaction = transactions.ToList().Sum(x => x.Amount);

            foreach (var elm in transactions.GroupBy(x => x.Categorie).Select(x => new { x.Key, x }))
            {
                decimal sume = 0;
                foreach (var elmm in elm.x)
                {
                    sume += elmm.Amount;
                }
                result.Add(new ChartsData { Name = elm.Key.Name, Y = (sume / SumeTrasaction) * 100 });

            }

            return result;
        }
    }
}