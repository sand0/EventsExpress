﻿using System;
using System.Collections.Generic;
using System.Text;
using EventsExpress.Db.Entities;
using EventsExpress.Db.Enums;

namespace EventsExpress.Core.DTOs
{
    public class NotificationTypeDto
    {
        public NotificationChange Id { get; set; }

        public string Name { get; set; }
    }
}
