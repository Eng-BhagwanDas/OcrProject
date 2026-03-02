namespace OcrSystem.API.Models
{
    public class DocumentData
    {
        public string? FullName { get; set; }
        public string? DocumentNumber { get; set; }
        public string? DateOfBirth { get; set; }
        public string? IssueDate { get; set; }
        public string? ExpiryDate { get; set; }
        public float Confidence { get; set; }
    }
}
