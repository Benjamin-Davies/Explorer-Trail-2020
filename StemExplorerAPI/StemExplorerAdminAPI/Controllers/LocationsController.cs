using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StemExplorerData.Models;
using StemExplorerData.Models.Entities;
using StemExplorerData.Models.ViewModels;
using StemExplorerService.Services.Interfaces;

namespace StemExplorerAdminAPI.Controllers
{
    [Route("api/Admin/Locations")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationsController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        // GET: api/Locations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocationDto>>> GetLocations()
        {
            try
            {
                return Ok(await _locationService.GetLocations(null));
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // GET: api/Locations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LocationDto>> GetLocation(int id)
        {
            try
            {
                var location = await _locationService.GetLocationById(id);

                if (location == null)
                {
                    return NotFound();
                }

                return Ok(location);
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // PUT: api/Locations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLocation(int id, [FromBody] LocationDto location)
        {
            if (id != location.Id)
            {
                return BadRequest();
            }

            try
            {
                if (await _locationService.UpdateLocation(location))
                {
                    return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // POST: api/Locations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Location>> PostLocation(LocationDto dto)
        {
            try
            {
                await _locationService.CreateLocation(dto);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // DELETE: api/Locations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Location>> DeleteLocation(int id)
        {
            try
            {
                var location = await _locationService.DeleteLocation(id);

                if (location.LocationId < 1)
                {
                    return NotFound();
                }

                return location;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}
