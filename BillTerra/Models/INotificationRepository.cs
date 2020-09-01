using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public interface INotificationRepository
    {
        Task Add(Notification notification);
        Task<IEnumerable<Notification>> Notifications(User user);
    }
}
