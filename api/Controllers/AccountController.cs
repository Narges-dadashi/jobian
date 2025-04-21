using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

// #region Db and Token Settings
//     private readonly IMongoCollection<AppUser> _collection;

//     // constructor - dependency injections
//     public AccountController(IMongoClient client, IMongoDbSettings dbSettings)
//     {
//         var dbName = client.GetDatabase(dbSettings.DatabaseName);
//         _collection = dbName.GetCollection<AppUser>("users");
//     }
//     #endregion

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{

}