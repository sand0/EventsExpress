﻿using System.Linq;
using AutoMapper;
using EventsExpress.Core.DTOs;
using EventsExpress.Db.Bridge;
using EventsExpress.Db.EF;
using EventsExpress.Db.Entities;
using Microsoft.EntityFrameworkCore;

namespace EventsExpress.ValueResolvers
{
    public class UserChangePasswordResolver : IValueResolver<User, UserDto, bool>
    {
        private readonly AppDbContext dbContext;
        private readonly ISecurityContext securityContext;

        public UserChangePasswordResolver(AppDbContext dbContext, ISecurityContext securityContext)
        {
            this.dbContext = dbContext;
            this.securityContext = securityContext;
        }

        public bool Resolve(User source, UserDto destination, bool destMember, ResolutionContext context)
        {
            var authLocal = dbContext.AuthLocal
                .FirstOrDefault(x => x.AccountId == securityContext.GetCurrentAccountId());

            if (authLocal == null)
            {
                return false;
            }

            return true;
        }
    }
}
