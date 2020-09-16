using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BillTerra.Models.ViewModel;

namespace BillTerra.Models
{
    public interface INotificationRepository
    {
        Task SaveNotyfication(Notification notification);
        Task<IEnumerable<Notification>> Notifications(User user);
        Task EnableNotyfication(Notification notification);
    }
}
