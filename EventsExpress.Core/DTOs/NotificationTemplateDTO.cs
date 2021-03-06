﻿using EventsExpress.Db.Enums;

namespace EventsExpress.Core.DTOs
{
    public class NotificationTemplateDto
    {
        public NotificationProfile Id { get; set; }

        public string Title { get; set; }

        public string Subject { get; set; }

        public string Message { get; set; }
    }
}
