using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{

    public enum State
    {
        Reached,
        NotReached,
        ImImplementation
    }

    public class Jar
    {
        public int ID { get; set; }
        public User User { get; set; }
        public string Name { get; set; }
        public int Goal { get; set; }
        public int CurrentAmount { get; set; }
        public State State { get; set; }

    }
}
