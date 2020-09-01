using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BillTerra.Models;
using Microsoft.AspNetCore.Identity;

namespace BillTerra.Controllers
{
    public class MainController : Controller
   {
        private INotificationRepository repository;
        private UserManager<User> userManager;

        public MainController(INotificationRepository repository, UserManager<User> userManager)
        {
            this.userManager = userManager;
            this.repository = repository;
        }

        public async Task<IActionResult> Index()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
       

            return View("MainIndex", repository.Notifications(user).Result);         
        }


    }
}