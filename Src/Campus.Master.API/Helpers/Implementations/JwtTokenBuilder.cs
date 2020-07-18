using System;
using System.Text;
using System.Collections.Generic;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

using Campus.Master.API.Helpers.Contracts;

namespace Campus.Master.API.Helpers.Implementations
{
    public class JwtTokenBuilder : ITokenBuilder
    {
        private readonly List<Claim> _claims;
        private readonly string _privateKey;
        
        public JwtTokenBuilder(string privateKey)
        {
            _claims = new List<Claim>();
            _privateKey = privateKey;
        }
        
        public ITokenBuilder AddClaim(string type, string value)
        {
            _claims.Add(new Claim(type, value));
            return this;
        }

        public ITokenBuilder ResetClaims()
        {
            _claims.Clear();
            return this;
        }

        public string Build()
        {
            var encryptingSecret = Encoding.UTF8.GetBytes(_privateKey);
            var key = new SymmetricSecurityKey(encryptingSecret);
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var descriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(_claims),
                Expires = DateTime.Now.AddHours(6),
                SigningCredentials = credentials
            };

            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateToken(descriptor);
            
            return handler.WriteToken(token);
        }
    }
}