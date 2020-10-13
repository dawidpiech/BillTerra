using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Policy;
using System.Threading.Tasks;

namespace BillTerra.Models.ViewModel
{
    public class JarViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Goal { get; set; }
        public int CurrentAmount { get; set; }
        public State State { get; set; }
    }
}
