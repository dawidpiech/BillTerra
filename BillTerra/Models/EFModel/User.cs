using Microsoft.AspNetCore.Identity;

namespace BillTerra.Models
{
    public class User:IdentityUser
    {
      public string AvatarLink { get; set; }
    }


}
