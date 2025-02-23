﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChallengeCompactController : ControllerBase
    {
        private readonly IChallengeCompactService _challengeCompactService;

        public ChallengeCompactController(IChallengeCompactService challengeCompactService)
        {
            _challengeCompactService = challengeCompactService;
        }

        // Return all with optional filter for category type
        [HttpGet]
        public async Task<IEnumerable<ChallengeCompactDto>> GetChallengeCompacts(string filter = null)
        {
            return await _challengeCompactService.GetChallengeCompactsAsync(filter);
        }

        // Return by id
        [HttpGet("{id}")]
        public async Task<ChallengeCompactDto> GetChallenge(int id)
        {
            return await _challengeCompactService.GetChallengeCompactByIdAsync(id);
        }
    }
}
