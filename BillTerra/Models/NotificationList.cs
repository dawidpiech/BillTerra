using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public static class NotificationList
    {
        public static List<Notification> Notifications
        {
            get
            {
                List<Notification> tmp = notifications;
                return tmp;
                
            }
        }


        private static List<Notification> notifications = new List<Notification>();

       

        public static void UpdateNotyficationsList()
        {
            notifications.Clear();
        }

        
        


    }

   

}
