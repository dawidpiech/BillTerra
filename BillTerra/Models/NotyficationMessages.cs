using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BillTerra.Models;
namespace BillTerra.Models
{
    public static class NotyficationMessages
    {

        public static Notification selectJarNotyfication(int numberOfJars, User user)
        {
            Notification notification = new Notification();

            if (numberOfJars == 1) notification = FirstJarCompleted(user);
            else if (numberOfJars == 5) notification = FifthJarCompleted(user);
            else if (numberOfJars % 10 == 0) notification = EveryTenthJarCompled(user, numberOfJars);
            else if (numberOfJars == 100) notification = HundredthJarCompleted(user);

            return notification;

        }

        public static Notification HelloNotyfication(User user) =>
            new Notification
            {
                Title = $"Hello {user.UserName}",
                Describe = "Welcome in Biletera",
                User = user,
                IsVisible = true
            };
        

        public static Notification FirstJarCompleted(User user) =>
            new Notification {
                User = user,
                Image = "",
                Describe = "Congratulations, you've achieved your first goal. What's next?",
                IsVisible = true,
                Title = "Jar"
            };
        public static Notification FifthJarCompleted(User user) =>
           new Notification
           {
               User = user,
               Image = "",
               Describe = "Whoaaa... This is the fifth goal achieved.Keep it up :)",
               IsVisible = true,
               Title = "Jar"
           };
        
        public static Notification HundredthJarCompleted(User user) =>
        new Notification
        {
            User = user,
            Image = "",
            Describe = "Master! 100 goals achieved. I think it's time to celebrate: D",
            IsVisible = true,
            Title = "Jar"
        };

        public static Notification EveryTenthJarCompled(User user , int numberOfJars) =>
          new Notification
          {
              User = user,
              Image = "",
              Describe = $"Goals achieved = {numberOfJars}. How soon after the = sign will we see 100? ",
              IsVisible = true,
              Title = "Jar"
          };

    }
}
