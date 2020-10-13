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
        public int Id { get; set; }
        public int Sequence { get; set; }
        public string Name { get; set; }
        public int Goal { get; set; }
        public int PercentageOfIncomes { get; set; }
        public State State { get; set; }
    }
}
