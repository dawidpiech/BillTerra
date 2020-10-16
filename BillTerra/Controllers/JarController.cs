using BillTerra.Models;
using BillTerra.Models.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Controllers
{
    public class JarController : Controller
    {
        private IJarRepositorycs _jarRepositorycs;
        private readonly INotificationRepository _notificationRepository;
        private readonly ITransactionRepository _transactionRepository;
        private ICategorieRepository _categorieRepository;
        private UserManager<User> _userManager;

        public JarController(ITransactionRepository transactionRepository, ICategorieRepository categorieRepository, IJarRepositorycs jarRepositorycs, INotificationRepository notificationRepository, UserManager<User> userManager)
        {
            _jarRepositorycs = jarRepositorycs;
            _notificationRepository = notificationRepository;
            _userManager = userManager;
            _transactionRepository = transactionRepository;
            _categorieRepository = categorieRepository;
        }

        [Authorize]
        public async Task<IActionResult> Index()
        {
            User user = await _userManager.GetUserAsync(HttpContext.User);
            List<JarViewModel> jars = new List<JarViewModel>();

            _jarRepositorycs.Jars(user).Result.ToList().ForEach(
                x =>
                {
                    jars.Add(new JarViewModel
                    {
                        Name = x.Name,
                        Goal = x.Goal,
                        CurrentAmount = x.CurrentAmount,
                        ID = x.ID,
                        State = x.State

                    });

                });


            JarDataViewModel jarDataViewModel = new JarDataViewModel
            {
                Avatar = user.AvatarLink,
                Email = user.Email,
                UserName = user.UserName,
                JarList = jars,
                Balance = (_transactionRepository.GetIncomes(user).Result.ToList().Sum(x => x.Amount))
                - (_transactionRepository.GetExpenses(user).Result.ToList().Sum(x => x.Amount))

            };


            return Json(jarDataViewModel);

        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> DeleteJar([FromBody] JarViewModel jarViewModel)
        {
            User user = await _userManager.GetUserAsync(HttpContext.User);
            var jar = new Jar
            {
                ID = jarViewModel.ID,
                Name = jarViewModel.Name,
                State = State.NotReached,
                Goal = jarViewModel.Goal,
                CurrentAmount = jarViewModel.CurrentAmount,
                User = user


            };

            return Json(new { succeed = _jarRepositorycs.DeleteJar(jar) });
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddJar([FromBody] JarViewModel jarViewModel)
        {

            User user = await _userManager.GetUserAsync(HttpContext.User);
            var jar = new Jar
            {
                User = user,
                Name = jarViewModel.Name,
                CurrentAmount = jarViewModel.CurrentAmount,
                Goal = jarViewModel.Goal,
                State = jarViewModel.State,

            };
            Jar tmp = _jarRepositorycs.AddJar(jar).Result;

            return Json(new JarViewModel
            {
                ID = tmp.ID,
                Goal = tmp.Goal,
                Name = tmp.Name,
                State = tmp.State,
                CurrentAmount = tmp.CurrentAmount
            });
        }

        [Authorize]
        [HttpPost]
        public async Task EndJar([FromBody] JarViewModel jarViewModel)
        {
            User user = await _userManager.GetUserAsync(HttpContext.User);

            _notificationRepository.SaveNotyfication(NotyficationMessages.selectJarNotyfication(_jarRepositorycs.ReachedJars(user).Result.Count(), user));

            var jar = new Jar
            {
                User = user,
                Name = jarViewModel.Name,
                CurrentAmount = jarViewModel.CurrentAmount,
                Goal = jarViewModel.Goal,
                State = State.Reached,

            };

            await _jarRepositorycs.EditJar(jar);

        }

        public async Task AddMoneyToJar([FromBody] JarAddMoneyViewModel jarAddMoneyViewModel)
        {
            User user = await _userManager.GetUserAsync(HttpContext.User);

            var jar = new Jar
            {
                User = user,
                Name = jarAddMoneyViewModel.Name,
                CurrentAmount = jarAddMoneyViewModel.CurrentAmount,
                Goal = jarAddMoneyViewModel.Goal,
                State = jarAddMoneyViewModel.State,
                ID = jarAddMoneyViewModel.ID
            };

            jar.CurrentAmount += jarAddMoneyViewModel.Money;

            await _jarRepositorycs.EditJar(jar);

            await _transactionRepository.AddTransaction(new Transaction
            {
                User = user,
                Coment = $"Add money to jar {jarAddMoneyViewModel.Name}",
                IsExpense = false,
                Date = DateTime.Now,
                Categorie = _categorieRepository.GetCategoryByName("Jar", user),
                Amount = jarAddMoneyViewModel.Money
            });



        }

    }
}