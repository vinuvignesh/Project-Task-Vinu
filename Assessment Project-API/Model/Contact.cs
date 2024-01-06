using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Assessment_Project___Contact_Details.Models
{
    [Table("ContactDetails")]
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(15)")]
        public string FirstName { get; set; } = "";
        [Column(TypeName = "nvarchar(15)")]
        public string LastName { get; set; } = "";

        [Column(TypeName = "nvarchar(50)")]
        public string Email { get; set; } = "";

        [Column(TypeName = "nvarchar(10)")]
        public string PhoneNumber { get; set; } = "";
        [Column(TypeName = "nvarchar(100)")]
        public string Address { get; set; } = "";
        [Column(TypeName = "nvarchar(20)")]
        public string City { get; set; } = "";
        [Column(TypeName = "nvarchar(20)")]
        public string State { get; set; } = "";
        [Column(TypeName = "nvarchar(20)")]
        public string Country { get; set; } = "";
        [Column(TypeName = "nvarchar(6)")]
        public int PostalCode { get; set; }

    }
}
