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


        public async Task Add(ShopListElement shopListElement)
        {
            context.ShopListElements.Add(shopListElement);
            await context.SaveChangesAsync();
        }

        public async Task Delete(ShopListElement shopListElement)
        {
            throw new NotImplementedException();

        }

        public async Task Edit(ShopListElement shopListElement)
        {
            throw new NotImplementedException();

        }

        public async Task<IEnumerable<ShopListElement>> ShopListElements(User user)
        {
            var sql = $"SELECT * FROM dbo.ShopListElements WHERE UserId = '{user.Id}'";

            return await context.ShopListElements
                .FromSql(sql)
                .ToListAsync();
        }
    }
}
