﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EventsExpress.Core.DTOs;
using EventsExpress.Core.IServices;
using EventsExpress.ViewModels;

namespace EventsExpress.ValueResolvers
{
    public class EventDtoToViewModelResolver : IValueResolver<EventDto, EventViewModel, string>
    {
        private readonly IPhotoService photoService;

        public EventDtoToViewModelResolver(IPhotoService photoService)
        {
            this.photoService = photoService;
        }

        public string Resolve(EventDto source, EventViewModel destination, string destMember, ResolutionContext context)
        {
            foreach (var u in destination.Owners)
            {
                u.PhotoUrl = photoService.GetPhotoFromAzureBlob($"users/{u.Id}/photo.png").Result;
            }

            foreach (var u in destination.Visitors)
            {
                u.PhotoUrl = photoService.GetPhotoFromAzureBlob($"users/{u.Id}/photo.png").Result;
            }

            return photoService.GetPhotoFromAzureBlob($"events/{source.Id}/full.png").Result;
        }
    }
}