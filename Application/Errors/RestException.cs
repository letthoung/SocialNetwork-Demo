using System;
using System.Net;

namespace Application.Errors
{
    public class RestException : Exception
    {
        public HttpStatusCode Code { get; }
        public Object Errors { get; }
        public RestException(HttpStatusCode code, object errors = null)
        {
            this.Code = code;
            this.Errors = errors;
        }
    }
}