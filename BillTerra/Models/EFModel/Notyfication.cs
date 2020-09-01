using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public class Notification
    {
        public int ID { get; set; }
        public User User { get; set; }
        public string Title { get; set; }
        public string Describe { get; set; }
        public bool IsVisible { get; set; }
    }
}
