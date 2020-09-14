using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BillTerra.Contexts;
using BillTerra.Models;
using Microsoft.EntityFrameworkCore;

namespace BillTerra.EntityFramework
{
    public class EFNotificationRepository : INotificationRepository
    {
        private ApplicationDbContext context;

        public EFNotificationRepository (ApplicationDbContext ctx)
        {
            context = ctx;
        }


        public async Task Add(Notification notification)
        {
            context.Notyfications.Add(notification);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Notification>> Notifications(User user)
        {
            var sql = $"SELECT * FROM dbo.Notyfications WHERE UserId = '{user.Id}'";

            return await context.Notyfications
                .FromSql(sql)
                .ToListAsync();
        }
    }
}
