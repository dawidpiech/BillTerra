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
        private INotificationRepository notificationRepository;
        private UserManager<User> userManager;

        public NotyficationController(INotificationRepository notificationRepository, UserManager<User> userManager)
        {
            this.notificationRepository = notificationRepository;
            this.userManager = userManager;
        }

        [Authorize]
        [HttpPost]
        public async void EnableNotyfication ([FromBody]NotificationViewModel notyficationViewModel)
        {
            User user = await userManager.GetUserAsync(HttpContext.User);

            await notificationRepository.SaveNotyfication(new Notification
            {
                User = user,
                ID = notyficationViewModel.ID,
                Describe = notyficationViewModel.Describe,
                Title = notyficationViewModel.Title,
                IsVisible = false,
                Image = notyficationViewModel.Image

            });

        }


    }
}