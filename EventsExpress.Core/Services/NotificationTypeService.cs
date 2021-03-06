﻿using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EventsExpress.Core.DTOs;
using EventsExpress.Core.IServices;
using EventsExpress.Db.EF;
using EventsExpress.Db.Entities;
using EventsExpress.Db.Enums;
using Microsoft.EntityFrameworkCore;

namespace EventsExpress.Core.Services
{
    public class NotificationTypeService : BaseService<NotificationType>, INotificationTypeService
    {
        public NotificationTypeService(AppDbContext context, IMapper mapper)
        : base(context, mapper)
        {
        }

        public IEnumerable<NotificationTypeDto> GetAllNotificationTypes()
        {
            var notificationTypes = Context.NotificationTypes.Include(c => c.Users).Select(x => new NotificationTypeDto
            {
                Id = x.Id,
                Name = x.Name,
            })
            .OrderBy(notification => notification.Name);

            return notificationTypes;
        }

        public NotificationType GetById(NotificationChange id)
        {
            return Context.NotificationTypes.Find(id);
        }
    }
}
