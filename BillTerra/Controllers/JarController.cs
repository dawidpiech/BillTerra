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
        private IJarRepositorycs jarRepositorycs;
        private UserManager<User> userManager;

        public JarController(IJarRepositorycs repository, UserManager<User> userManager)
        {
            this.userManager = userManager;
            this.jarRepositorycs = repository;
        }

        [Authorize]
        public async Task<IActionResult> Index()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            List<JarViewModel> jars = new List<JarViewModel>();

            jarRepositorycs.Jars(user).Result.ToList().ForEach(
                x =>
                {
                    jars.Add(new JarViewModel
                    {
                        Name = x.Name,
                        Goal = x.AcumulatedAmmount,
                        PercentageOfIncomes = x.MonthlyPayment,
                        State = x.State,
                        Sequence = x.Sequence
                       
                    });

                });


            JarDataViewModel jarDataViewModel = new JarDataViewModel
            {
                Avatar = user.AvatarLink,
                Email = user.Email,
                UserName = user.UserName,
                JarList = jars
                
            };


            return Json(jarDataViewModel);

        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> DeleteJar([FromBody] JarViewModel jarViewModel)
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            var jar = new Jar
            {
                ID = jarViewModel.Id,
                Name = jarViewModel.Name,
                State = jarViewModel.State,
                AcumulatedAmmount = jarViewModel.Goal,
                MonthlyPayment = jarViewModel.PercentageOfIncomes
                

            };
            return Json(new { succeed = jarRepositorycs.DeleteJar(jar) });
        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> EditJar([FromBody] JarViewModel jarViewModel)
        {
            User user = await userManager.GetUserAsync(HttpContext.User);

            var jar = new Jar
            {
                ID = jarViewModel.Id,
                Name = jarViewModel.Name,
                State = jarViewModel.State,
                AcumulatedAmmount = jarViewModel.Goal,
                MonthlyPayment = jarViewModel.PercentageOfIncomes,
                Sequence =  jarViewModel.Sequence
            };

            return Json(new { succeed = jarRepositorycs.EditJar(jar) });
        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddJar([FromBody] JarViewModel jarViewModel)
        {

            User user = await userManager.GetUserAsync(HttpContext.User);
            var jar = new Jar
            {
                User = user,
                Name = jarViewModel.Name,
                FinalAmmount = 0,
                AcumulatedAmmount = jarViewModel.Goal,
                CreationDate = DateTime.Now,
                MonthlyPayment = jarViewModel.PercentageOfIncomes,
                State = jarViewModel.State,
                EndDate = DateTime.Now,
                Sequence = jarViewModel.Sequence


            };
            Jar tmp = jarRepositorycs.AddJar(jar).Result;

            return Json(new JarViewModel
            {
                Id = tmp.ID,
                Goal = tmp.AcumulatedAmmount,
                Name = tmp.Name,
                State = tmp.State,
                PercentageOfIncomes = tmp.MonthlyPayment
            }) ;


        }
        

    }
}