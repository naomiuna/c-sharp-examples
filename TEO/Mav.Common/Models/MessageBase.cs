using System.Net;

namespace Mav.Common.Models
{
    public class MessageBase<T>
    {
        /// <summary>
        ///     A Generic Type T message payload - JSON Object(s)
        /// </summary>
        public T MessageBody { get; set; }

        /// <summary>
        ///     The HttpStatusCode for the response
        /// </summary>
        public HttpStatusCode StatusCode { get; set; }

        /// <summary>
        ///     Optional response message string to aid with passing back meaningful messages to the user / logging
        /// </summary>
        public string ResponseMessage { get; set; }
    }
}
