namespace TimeSheet.Server.Customers.Common.Models
{
    public class CustomersModel
    {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string ContactName { get; set; }
        public string ContactJobTitle { get; set; }
        public string Address { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public int BookkeepingNumber { get; set; }
    }
}
