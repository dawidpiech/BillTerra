using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BillTerra.Models;
using BillTerra.Contexts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace BillTerra.Controllers
{
    public class ShopingListController : Controller
    {
        private IShopingListRepository shopingListRepository;
        private UserManager<User> userManager;

        public ShopingListController (IShopingListRepository shopingListRepository , UserManager<User> userManager)
        {
            this.shopingListRepository = shopingListRepository;
            this.userManager = userManager;
        }

        [Authorize]
        public async Task<IActionResult> Index()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            return View("ShopingList",shopingListRepository.ShopListElements(user).Result);
        }

        [Authorize]
        public async Task<IActionResult> Add()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            var shopinglistElement = new ShopListElement
            {
                User = user,
                ListName = "Zakupy",
                Title = "Mandarynka",
                IsChecked = true

            };
            await shopingListRepository.SaveListElement(shopinglistElement);
            return RedirectToAction("Index");
        }

      

    }
}