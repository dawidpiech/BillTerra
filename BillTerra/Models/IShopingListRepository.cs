using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public interface IShopingListRepository
    {
        Task Add(ShopListElement shopListElement);
        Task Edit(ShopListElement shopListElement);
        Task Delete(ShopListElement shopListElement);
        Task<IEnumerable<ShopListElement>> ShopListElements(User user);
    }
}
