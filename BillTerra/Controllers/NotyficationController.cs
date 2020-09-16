using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BillTerra.Models;
using BillTerra.Models.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BillTerra.Controllers
{
    public class NotyficationController : Controller
    {
        private INotificationRepository repository;
        private UserManager<User> userManager;

        public NotyficationController(INotificationRepository notificationRepository, UserManager<User> userManager)
        {
            repository = notificationRepository;
            this.userManager = userManager;
        }

        [Authorize]
        public async Task<IActionResult> Index()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);

            return Json(repository.Notifications(user).Result);

        }

        [Authorize]
        [HttpPost]
        public async void EnableNotyfication ([FromBody]NotyficationViewModel notyficationViewModel)
        {
            User user = await userManager.GetUserAsync(HttpContext.User);

            Notification notyfication = new Notification
            {
                User = user,
                ID = notyficationViewModel.ID,
                Describe = notyficationViewModel.Describe,
                Title = notyficationViewModel.Title,
                IsVisible = false
            };

            await repository.SaveNotyfication(notyfication);

        }


    }
}