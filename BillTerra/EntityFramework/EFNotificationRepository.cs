using BillTerra.Contexts;
using BillTerra.Models;
using BillTerra.Models.ViewModel;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.EntityFramework
{
    public class EFNotificationRepository : INotificationRepository
    {
        private ApplicationDbContext context;

        public EFNotificationRepository(ApplicationDbContext ctx)
        {
            context = ctx;
        }


        public async Task SaveNotyfication(Notification notification)
        {
            if (notification != null)
            {
                context.Notyfications.Add(notification);
                await context.SaveChangesAsync();
            }
               
        }
        public async Task<IEnumerable<Notification>> Notifications(User user)
        {
            return await context.Notyfications.Where(p => p.User.Id == user.Id && p.IsVisible == true).ToListAsync();
        }

       
    }
}
