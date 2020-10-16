using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BillTerra.Models;
using BillTerra.Models.ViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace BillTerra.Controllers
{
    public class RaportController : Controller
    {
        private readonly ICategorieRepository _categorieRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IJarRepositorycs _jarRepositorycs;
        private readonly UserManager<User> _userManager;

        public RaportController(IJarRepositorycs jarRepositorycs, ICategorieRepository categorieRepository, ITransactionRepository transactionRepository, UserManager<User> userManager)
        {
            _categorieRepository = categorieRepository;
            _transactionRepository = transactionRepository;
            _userManager = userManager;
            _jarRepositorycs = jarRepositorycs;
        }


        public async Task<IActionResult> Index()
        {
            User user = await _userManager.GetUserAsync(HttpContext.User);
            List<double> dayExpenses = new List<double>();
            List<double> dayIncome = new List<double>();
            List<JarRaportViewModel> jarRaportViewModels = new List<JarRaportViewModel>();
            DateTime Today = DateTime.Now;

            for (int i = 1; i <= Today.Day; i++)
            {
                dayExpenses.Add(
                    _transactionRepository.GetTransactionOfDay(
                        user, new DateTime(Today.Year, Today.Month, i))
                    .Result.ToList().Sum(x => x.Amount)
                    );

                dayIncome.Add(
                    _transactionRepository.GetTransactionOfDay(
                          user, new DateTime(Today.Year, Today.Month, i), false)
                    .Result.ToList().Sum(x => x.Amount));
            }

            _jarRepositorycs.Jars(user).Result.ToList().ForEach(
                x => jarRaportViewModels.Add(new JarRaportViewModel
                {
                    Name = x.Name,
                    CurrentAmount = x.CurrentAmount,
                    Goal = x.Goal
                }
                ));


            return Json(new RaportDataViewModel
            {
                Avatar = user.AvatarLink,
                Email = user.Email,
                UserName = user.UserName,
                DayExpenses = dayExpenses,
                JarRaports = jarRaportViewModels,
                DayIncome = dayIncome
            });
        }
    }
}
