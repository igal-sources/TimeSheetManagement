using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace TimeSheet.Server.CoreControllers
{
    /*
        this controller is used in order to catch incorrect api calls
    */

    public class DefaultController : Controller
    {
        [HttpGet]
        [HttpPost]
        [HttpPut]
        [HttpDelete]
        public IActionResult DefaultCall()
        {
            string headers = "";
            string routeValues = "";
            foreach (var key in this.HttpContext.Request.Headers.Keys)
                headers += key + "=" + this.HttpContext.Request.Headers[key] + Environment.NewLine;

            foreach (var key in this.HttpContext.Request.RouteValues.Keys)
                routeValues += key + "=" + this.HttpContext.Request.RouteValues[key] + Environment.NewLine;

            string body = "";
            using (StreamReader stream = new StreamReader(HttpContext.Request.Body))
            {
                body = stream.ReadToEndAsync().Result;
                // body = "param=somevalue&param2=someothervalue"
            }
            
            var error = " The Route doesn't exists or incorrect data was send!!!" +
                    Environment.NewLine + "Date Time: " + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") +
                    Environment.NewLine + "Requested Route: " + this.HttpContext.Request.Path +
                    Environment.NewLine + "QueryString: " + this.HttpContext.Request.QueryString+
                    Environment.NewLine +
                    Environment.NewLine + "RouteValues: " + Environment.NewLine + routeValues +
                    Environment.NewLine +
                    Environment.NewLine + "headers: " + Environment.NewLine + headers +
                    Environment.NewLine + "Remote IP: " + this.HttpContext.Connection.RemoteIpAddress + ":" + this.HttpContext.Connection.RemotePort + 
                    Environment.NewLine + "IsHttps: " + this.HttpContext.Request.IsHttps +
                    Environment.NewLine + "Method: " +  this.HttpContext.Request.Method +
                    Environment.NewLine + "Scheme: " + this.HttpContext.Request.Scheme +
                    Environment.NewLine + "Protocol: " + this.HttpContext.Request.Protocol+
                    Environment.NewLine +
                    Environment.NewLine + "HasFormContentType: " + this.HttpContext.Request.HasFormContentType+
                    Environment.NewLine + "ContentType: " + this.HttpContext.Request.ContentType+
                    Environment.NewLine + "ContentLength: " + this.HttpContext.Request.ContentLength +
                    Environment.NewLine + "Body: " + Environment.NewLine + body;

            return BadRequest(error);
        }
    }
}