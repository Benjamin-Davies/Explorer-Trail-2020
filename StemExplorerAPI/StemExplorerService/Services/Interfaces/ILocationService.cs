﻿using StemExplorerData.Models.Entities;
using StemExplorerData.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerService.Services.Interfaces
{
    public interface ILocationService
    {
        Task<List<LocationDto>> GetLocations(int? profileId);
        Task<LocationDto> GetLocationById(int locationId);
        Task<List<FeaturedLocationDto>> GetFeaturedLocations();

        Task<bool> UpdateLocation(LocationDto dto);

        Task CreateLocation(LocationDto dto);

        Task<Location> DeleteLocation(int id);
    }
}
