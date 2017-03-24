//using CookBook.Models;
//using Microsoft.EntityFrameworkCore;
//using Newtonsoft.Json;
//using Newtonsoft.Json.Linq;
//using RestSharp;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace Application.Web.Controllers.ApiControllers
//{
//    public class RestMailController
//    {

//        private readonly CookBookContext _context;
//        public CookBookContext Context { get; set; }

//        public void ApiTest()
//        {
      
//        var client = new RestClient("/api/recipe");
//          var context = new _context.Cookbook

//         var request = new RestRequest("recipe/id", Method.GET);
//         var recipeId = 
//            request.AddUrlSegment("id", recipeId ); // replaces matching token in request.Resource

      

    
//            // execute the request
//            IRestResponse response = client.Execute(request);
//            var content = response.Content; // raw content as string



//            // easy async support
//            client.ExecuteAsync(request, response =>
//            {
//                Console.WriteLine(response.Content);
//            });

//            // async with deserialization
//            var asyncHandle = client.ExecuteAsync<Person>(request, response =>
//            {
//                Console.WriteLine(response.Data.Name);
//            });

//            // abort the request on demand
//            asyncHandle.Abort();
//        }
//    }
//}