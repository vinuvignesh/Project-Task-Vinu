using System.ComponentModel.DataAnnotations;

namespace Assessment_Project.Model
{
    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
    }
}
