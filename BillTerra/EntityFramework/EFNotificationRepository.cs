using BillTerra.Contexts;
using BillTerra.Models;
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
            if (notification.ID == 0)
                context.Notyfications.Add(notification);
            else
            {
                Notification dbEntity = context.Notyfications.FirstOrDefault(p => p.ID == notification.ID);
                if (dbEntity != null)
                {
                    dbEntity.Describe = notification.Describe;
                    dbEntity.Title = notification.Title;
                    dbEntity.IsVisible = notification.IsVisible;

                }

            }
            await context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Notification>> Notifications(User user)
        {
            return await context.Notyfications.Where(p => p.User.Id == user.Id && p.IsVisible == true).ToListAsync();
        }




    }
}
