using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;

namespace StemExplorerAPI.Controllers
{
    [Route("api/Progress")]
    [ApiController]
    [Authorize]
    public class ProgressController : ControllerBase
    {
        private readonly IProgressService _progressService;
        private readonly ILogger _logger;

        public ProgressController(
            IProgressService progressService,
            ILogger<ProgressController> logger
        )
        {
            _progressService = progressService;
            _logger = logger;
        }

        [HttpGet("{profileId}")]
        public async Task<IActionResult> Get(int profileId)
        {
            try
            {
                return Ok(await _progressService.GetProgress(profileId));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpPost("ChallengeCompleted")]
        public async Task ChallengeCompleted(ChallengeCompletedDto completed)
        {
            try
            {
                await _progressService.ChallengeCompleted(completed.ProfileId, completed.ChallengeCompactId, completed.Correct);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}
