﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models.ViewModel
{
    public class DashboardDataViewModel
    {
        public string UserName { get; set; }
        public string Avatar { get; set; }
        public string Email { get; set; }
        public List<NotificationViewModel>  Notyfication { get; set; }
        public Finance Finance { get; set; }
    }





  

}
