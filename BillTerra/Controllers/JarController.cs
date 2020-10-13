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
        private UserManager<User> _userManager;

        public JarController(IJarRepositorycs jarRepositorycs, INotificationRepository notificationRepository, UserManager<User> userManager)
        {
            _jarRepositorycs = jarRepositorycs;
            _notificationRepository = notificationRepository;
            _userManager = userManager;
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
                JarList = jars
                
            };


            return Json(jarDataViewModel);

        }

        [Authorize]
        [HttpDelete]
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

            return Json(new { succeed = _jarRepositorycs.EditJar(jar) });
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
            }) ;


        }

        [Authorize]
        [HttpPost]
        public async Task EndJar([FromBody] JarViewModel jarViewModel)
        {
            User user = await _userManager.GetUserAsync(HttpContext.User);
            await _notificationRepository.SaveNotyfication(new Notification
            {
                Title = $"Jar {jarViewModel.Name}",
                Describe = $"Jar state is {jarViewModel.State}",
                User = user,
                IsVisible = true
            });
        }
        public async Task AddMoneyToJar([FromBody] JarViewModel jarViewModel , int money)
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

            if (jar.CurrentAmount + money >= jar.Goal)
            {
                jar.State = State.Reached;

                await _notificationRepository.SaveNotyfication(new Notification
                {
                    Title = $"End jar {jarViewModel.Name}",
                    Describe = $"Congratulations The jar is full",
                    User = user,
                    IsVisible = true
                });


            }

            jar.CurrentAmount += money;

            await _jarRepositorycs.EditJar(jar);

        }

    }
}