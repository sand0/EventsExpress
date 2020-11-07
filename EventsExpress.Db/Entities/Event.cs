﻿using System;
using System.Collections.Generic;

namespace EventsExpress.Db.Entities
{
    public class Event : BaseEntity
    {
        public bool IsBlocked { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime DateFrom { get; set; }

        public DateTime DateTo { get; set; }

        public Guid CityId { get; set; }

        public virtual City City { get; set; }

        public int MaxParticipants { get; set; }

        public Guid? PhotoId { get; set; }

        public virtual Photo Photo { get; set; }

        //public ICollection<Guid> OwnerId { get; set; }

        //public virtual ICollection<User> Owner { get; set; }

        public virtual ICollection<EventOwner> Owners { get; set; }

        public virtual ICollection<UserEvent> Visitors { get; set; }

        public virtual ICollection<EventCategory> Categories { get; set; }

        public virtual ICollection<Rate> Rates { get; set; }

        public virtual ICollection<EventStatusHistory> StatusHistory { get; set; }
    }
}
