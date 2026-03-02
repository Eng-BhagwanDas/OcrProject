using OcrSystem.API.Models;

namespace OcrSystem.API.Services
{
    public interface IOcrService
    {
        DocumentData ExtractData(byte[] imageBytes);
    }
}
