# Time Sheet Management
A React demo for Time Sheet Management

This system devided into 3 layers:
  
  1. **Database** - using SQL Server that contains all relevant tables and Stored Procedures to manage CRUD operations.
  2. **Server side** - using ASP.NET Core with dot net 6.
     The project divided into 2 layers:
     
     + **Business** folders - Each folder contains a:     
          * **Repository** class with related interface.          
            This class is responsible to make calls to database using [Dapper](https://github.com/DapperLib/Dapper) library to retrive data in JSON format.            
          * **Service** class with related interface.         
            This class is responsible to handle business logic.            
            It retrive the Repository interface in Dependency Injection and use it to call Repository class methods.
            
     + **WebAPI** - Contains controller classes that responsible for all HTTP requests.   
          Each controller is responsible for one app module.   
          It retrive the Service interface in Dependency Injection and use it to call Service class methods.
      
  3. **Client side**
          
