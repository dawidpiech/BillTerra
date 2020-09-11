using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BillTerra.Contexts;
using BillTerra.Models;
using Microsoft.EntityFrameworkCore;

namespace BillTerra.EntityFramework
{
    public class EFShopingListRepository : IShopingListRepository
    {
        private ApplicationDbContext context;

        public EFShopingListRepository(ApplicationDbContext ctx)
        {
            context = ctx;
        }


        public ShopListElement DeleteListElement(ShopListElement shopListElement)
        {
            ShopListElement dbEntity = context.ShopListElements.FirstOrDefault(p => p.ID == shopListElement.ID);
            if(dbEntity != null)
            {
                context.ShopListElements.Remove(dbEntity);
                context.SaveChanges();
            }
            return dbEntity;

        }

        public async Task SaveListElement(ShopListElement shopListElement)
        {
            if (shopListElement.ID == 0)
                context.ShopListElements.Add(shopListElement);
            else
            {
                ShopListElement dbEntity = context.ShopListElements.FirstOrDefault(p => p.ID == shopListElement.ID);
                if(dbEntity != null)
                {
                    dbEntity.ListName = shopListElement.ListName;
                    dbEntity.Title = shopListElement.Title;
                    dbEntity.IsChecked = shopListElement.IsChecked;
                }
                
            }
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ShopListElement>> ShopListElements(User user)
        {

            return await context.ShopListElements.Where(p => p.User.Id == user.Id).ToListAsync();
        }
    }
}
