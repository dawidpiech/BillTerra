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
    public class ShopingListController : Controller
    {
        private IShopingListRepository shopingListRepository;
        private UserManager<User> userManager;

        public ShopingListController(IShopingListRepository shopingListRepository, UserManager<User> userManager)
        {
            this.shopingListRepository = shopingListRepository;
            this.userManager = userManager;
        }

        [Authorize]
        public async Task<IActionResult> Index()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            List<ShopListElementViewModel> shopListElementViewModel = new List<ShopListElementViewModel>();

            shopingListRepository.ShopListElements(user).Result.ToList().ForEach(x =>
           {
               shopListElementViewModel.Add(new ShopListElementViewModel
               {
                   ID = x.ID,
                   IsChecked = x.IsChecked,
                   PositionInList = x.PositionInList,
                   Content = x.Content
               });
           });


            return Json(shopListElementViewModel);

        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddShopingListElement([FromBody] ShopListElementViewModel shopListElementViewModel)
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            var shopinglistElement = new ShopListElement
            {
                User = user,
                IsChecked = shopListElementViewModel.IsChecked,
                Content = shopListElementViewModel.Content,
                PositionInList = shopingListRepository.ShopListElements(user).Result.Last().PositionInList + 1

            };
            var tmp =  shopingListRepository.AddListElement(shopinglistElement).Result;

            return Json(new ShopListElementViewModel
            {
                ID = tmp.ID,
                Content = tmp.Content,
                PositionInList = tmp.PositionInList,
                IsChecked = tmp.IsChecked

            });
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> DeleteShopingListElement([FromBody] ShopListElementViewModel shopListElementViewModel)
        {
            User user = await userManager.GetUserAsync(HttpContext.User);

            ShopListElement shopListElement = new ShopListElement
            {
                Content = shopListElementViewModel.Content,
                ID = shopListElementViewModel.ID,
                IsChecked = shopListElementViewModel.IsChecked,
                PositionInList = shopListElementViewModel.PositionInList,
                User = user
            };

            return Json(new { succeed = shopingListRepository.DeleteListElement(shopListElement) });
        }

    }
}