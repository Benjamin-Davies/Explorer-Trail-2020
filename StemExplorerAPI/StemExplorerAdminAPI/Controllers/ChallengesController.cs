using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StemExplorerService.Services.Interfaces;
using StemExplorerData.Models;
using StemExplorerData.Models.Entities;
using StemExplorerData.Models.ViewModels;

namespace StemExplorerAdminAPI.Controllers
{
    [Route("api/Admin/Challenges")]
    [ApiController]
    public class ChallengesController : ControllerBase
    {
        private readonly IChallengeService _challengeService;

        public ChallengesController(IChallengeService challengeService)
        {
            _challengeService = challengeService;
        }

        // GET: api/Challenges
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChallengeDto>>> GetChallenges()
        {
            try
            {
                return Ok(await _challengeService.GetChallenges(null));
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // GET: api/Challenges/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Challenge>> GetChallenge(int id)
        {
            try
            {
                var challenge = await _challengeService.GetChallengeById(id, null);

                if (challenge == null)
                {
                    return NotFound();
                }

                return Ok(challenge);
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // PUT: api/Challenges/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChallenge(int id, [FromBody] ChallengeDto challenge)
        {
            if (id != challenge.Id)
            {
                return BadRequest();
            }

            try
            {
                if (await _challengeService.UpdateChallenge(challenge))
                {
                    var thing = await _challengeService.GetChallengeById(14, null);
                    return NoContent();
                } else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // POST: api/Challenges
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Challenge>> PostChallenge(ChallengeDto dto)
        {
            try
            {
                await _challengeService.CreateChallenge(dto);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // DELETE: api/Challenges/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Challenge>> DeleteChallenge(int id)
        {
            try
            {
                var challenge = await _challengeService.DeleteChallenge(id);
                
                if (challenge.Id < 1)
                {
                    return NotFound();
                }

                return challenge;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}
