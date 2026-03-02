using Microsoft.AspNetCore.Mvc;
using OcrSystem.API.Services;

namespace OcrSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentController : ControllerBase
    {
        private readonly IOcrService _ocrService;
        private readonly ILogger<DocumentController> _logger;

        public DocumentController(IOcrService ocrService, ILogger<DocumentController> logger)
        {
            _ocrService = ocrService;
            _logger = logger;
        }

        [HttpPost("extract")]
        public async Task<IActionResult> ExtractData(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            // Strict validation needed here for MIME types etc.
            
            try
            {
                // 1. Retention Policy Implementation
                var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
                if (!Directory.Exists(uploadsDir)) Directory.CreateDirectory(uploadsDir);

                // Cleanup: Delete files older than 3 months
                var retentionDate = DateTime.Now.AddMonths(-3);
                foreach (var existingFile in Directory.GetFiles(uploadsDir))
                {
                   if (System.IO.File.GetCreationTime(existingFile) < retentionDate)
                   {
                       try { System.IO.File.Delete(existingFile); } catch {}
                   }
                }

                // Save current file
                var filePath = Path.Combine(uploadsDir, $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}");
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // 2. Process Image for OCR
                // Read back from file or use the stream (loading from file ensures we test the saved artifact)
                var imageBytes = await System.IO.File.ReadAllBytesAsync(filePath);

                var result = _ocrService.ExtractData(imageBytes);

                return Ok(new { success = true, data = result });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing document");
                return StatusCode(500, "Internal server error processing the image.");
            }
        }
    }
}
