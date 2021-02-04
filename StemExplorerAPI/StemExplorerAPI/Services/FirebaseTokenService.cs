﻿using StemExplorerAPI.Services.Interfaces;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace StemExplorerAPI.Services
{
    public class FirebaseTokenService : IFirebaseTokenService
    {
        public IFirebaseTokenData GetTokenData(ClaimsPrincipal user)
            => new FirebaseTokenData(user.Identity as ClaimsIdentity);
        public IFirebaseTokenData GetTokenData(HttpContext context)
            => new FirebaseTokenData(context.User.Identity as ClaimsIdentity);

        private class FirebaseTokenData : IFirebaseTokenData
        {
            private ClaimsIdentity _identity;

            public FirebaseTokenData(ClaimsIdentity identity)
            {
                _identity = identity;
            }

            public string Name => _identity.FindFirst("name")?.Value;
            public string UserId => _identity.FindFirst("user_id")?.Value;
        }
    }
}
