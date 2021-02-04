﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;

namespace StemExplorerAPI.Controllers
{
    [Route("api/ExternalContent")]
    [ApiController]
    public class ExternalContentController : ControllerBase
    {
        private readonly IExternalContentService _externalContentService;

        public ExternalContentController(IExternalContentService externalContentService)
        {
            _externalContentService = externalContentService;
        }

        [HttpGet]
        public async Task<List<ExternalContentDto>> Get()
        {
            return await _externalContentService.GetContent();
        }

        [HttpGet("{id}")]
        public async Task<ExternalContentDto> GetItem(int id)
        {
            return await _externalContentService.GetContent(id);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task Post([FromBody] ExternalContentDto newContent)
        {
            await _externalContentService.InsertContent(newContent);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task Put(int id, [FromBody] ExternalContentDto newContent)
        {
            await _externalContentService.UpdateContent(id, newContent);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task Delete(int id)
        {
            await _externalContentService.DeleteContent(id);
        }
    }
}
