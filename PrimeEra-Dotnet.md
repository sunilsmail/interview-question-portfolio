
---

# 1. Filters in asp.net core

- Authorization Filters
- Action filters
- Result Filters	
- Exception Filters	
- Resource Filters
- Custom Filters


<details><summary><b>Answer</b></summary>
<p>

#### Answer: 

In ASP.NET Core, filters are components that enable you to run code before or after the execution of a controller action or an entire request. Filters provide a way to implement cross-cutting concerns such as logging, authorization, exception handling, and caching. There are several types of filters in ASP.NET Core, and each type serves a specific purpose. Here are some common types of filters:

1. ##### Authorization Filters:
Authorization filters are used to control access to a resource. They are executed before the action method is called. If the authorization fails, the action method is not executed.

```C#
[Authorize]
public IActionResult SecureAction()
{
    // Code for the secured action
}
```

2. ##### Action Filters:
Action filters are executed before and after the action method. They provide a way to perform logic before and after the execution of the action.

```C#
public class MyActionFilter : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        // Code executed before the action method
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        // Code executed after the action method
    }
}

[ServiceFilter(typeof(MyActionFilter))]
public IActionResult MyAction()
{
    // Code for the action method
}
```

3. ##### Result Filters:
Result filters are executed before and after the execution of the result (the response). They allow you to modify the result or perform additional logic.	
```C#
public class MyResultFilter : IResultFilter
{
    public void OnResultExecuting(ResultExecutingContext context)
    {
        // Code executed before the result
    }

    public void OnResultExecuted(ResultExecutedContext context)
    {
        // Code executed after the result
    }
}

[ServiceFilter(typeof(MyResultFilter))]
public IActionResult MyAction()
{
    // Code for the action method
}
```

4. ##### Exception Filters:
Exception filters are executed when an unhandled exception occurs during the execution of the action. They allow you to handle exceptions and provide custom error responses.

```C#
public class MyExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        // Code to handle the exception
    }
}

[ServiceFilter(typeof(MyExceptionFilter))]
public IActionResult MyAction()
{
    // Code for the action method
}
```

5. ##### Resource Filters:
Resource filters are executed before and after the execution of the middleware and MVC filters, but before the action method. They provide a way to perform logic at an earlier stage in the request pipeline.

```C#
public class MyResourceFilter : IResourceFilter
{
    public void OnResourceExecuting(ResourceExecutingContext context)
    {
        // Code executed before the resource (action method)
    }

    public void OnResourceExecuted(ResourceExecutedContext context)
    {
        // Code executed after the resource (action method)
    }
}

[ServiceFilter(typeof(MyResourceFilter))]
public IActionResult MyAction()
{
    // Code for the action method
}


```

To use filters globally or on a per-controller or per-action basis, you can register them in the Startup.cs file using the AddMvc or AddControllers method.

```C#
services.AddMvc(options =>
{
    options.Filters.Add(new MyActionFilter()); // Global action filter
    options.Filters.Add(typeof(MyResultFilter)); // Global result filter
})
```

You can also use the [TypeFilter] attribute or the [ServiceFilter] attribute to apply filters at the action level.

#### Create a Custom Action Filter:
First, create a class for your custom action filter by implementing one of the filter interfaces, such as IActionFilter. Here's an example:

```C#
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

public class MyCustomActionFilter : IActionFilter
{
    private readonly ILogger<MyCustomActionFilter> _logger;

    public MyCustomActionFilter(ILogger<MyCustomActionFilter> logger)
    {
        _logger = logger;
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        // Code executed before the action method
        _logger.LogInformation("Executing action...");
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        // Code executed after the action method
        _logger.LogInformation("Action executed.");
    }
}
```

#### Register the Filter in Startup.cs:
Register your custom filter in the Startup.cs file in the ConfigureServices method. This is where you can add filters to the dependency injection container.

```C#
public void ConfigureServices(IServiceCollection services)
{
    // Other service configurations

    services.AddScoped<MyCustomActionFilter>();

    // Add MVC services
    services.AddControllersWithViews();
}
```

#### Apply the Filter to an Action Method:
Finally, apply the filter to the desired action method using the [ServiceFilter] attribute.	

```C#
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    [ServiceFilter(typeof(MyCustomActionFilter))]
    public IActionResult Index()
    {
        _logger.LogInformation("Executing Index action...");
        return View();
    }

    // Other action methods
}
```

In this example, the MyCustomActionFilter filter is applied to the Index action method. When the Index action is executed, the OnActionExecuting method of the filter will be called before the action, and the OnActionExecuted method will be called after the action.

Remember that you need to have the necessary logging infrastructure in place (in this case, a logger injected into the filter and controller) to see the log messages. Adjust the filter logic and dependencies based on your specific requirements.

</p>
</details>

---
# 2. XSS attack

<details><summary><b>Answer</b></summary>
<p>

#### Answer: 

 Cross-Site Scripting (XSS) is a security vulnerability that allows 
      attackers to inject malicious scripts into web pages viewed by other users. 
      To prevent XSS in ASP.NET Core Web API, you should follow best practices and utilize 
      security features provided by the framework. Here are some recommendations:
	  
	  1. ##### Input Validation:
Ensure that all user inputs are validated on both the client and server sides. Validate and sanitize user inputs to reject any malicious content. Use validation attributes, regular expressions, or custom validation logic to validate input data.


```C#
[HttpPost]
public IActionResult SomeAction([FromBody] UserInputModel userInput)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }
}
```

2. ##### HTML Encoding:
Encode output data before rendering it to the client. ASP.NET Core provides the HtmlEncoder class to encode data.
```C#
@Html.Raw(HtmlEncoder.Default.Encode(model.Property))
```
3. ##### Content Security Policy (CSP):
Implement Content Security Policy headers to restrict the sources from which your application can load scripts. This helps prevent the execution of unauthorized scripts.

In your Startup.cs file:
```C#
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    // Other middleware configurations

    app.Use(async (context, next) =>
    {
        context.Response.Headers.Add("Content-Security-Policy", "script-src 'self'");
        await next();
    });

    // Additional configurations
}

```

4. ##### AntiXss NuGet Package:
Consider using the AntiXss library, a NuGet package that provides additional protection against XSS attacks.
 #### dotnet add package AntiXSS
 Then, use it in your code:
```C#
 var sanitizedInput = Sanitizer.GetSafeHtmlFragment(userInput);
```

5. ##### Use Razor Pages and Views Safely:
   If you're using Razor Pages or Views, make sure to use Razor syntax properly. Razor automatically HTML-encodes content by default.
   ```Html
   <p>@Model.Property</p>

   ```

6. ##### HTTPOnly and Secure Cookies:
If your application uses cookies, set the HttpOnly and Secure flags to enhance security.
```C#
services.ConfigureApplicationCookie(options =>
{
    options.HttpOnly = true;
    options.SecurePolicy = CookieSecurePolicy.Always;
});

```
7. ##### Regular Security Audits:
Regularly review your codebase for potential XSS vulnerabilities and conduct security audits. Automated tools and manual code reviews can help identify and address security issues.

By incorporating these practices, you can significantly reduce the risk of XSS vulnerabilities in your ASP.NET Core Web API. Additionally, stay informed about security best practices and updates to ensure ongoing protection against evolving security threats.

</p>
</details>

---


# 3. CSRF attack

<details><summary><b>Answer</b></summary>
<p>

#### Answer: 

 In ASP.NET Core Web API, protecting against CSRF attacks is equally important. However, the approach is slightly different compared to traditional web applications with server-rendered views. Here's how you can implement CSRF protection in an ASP.NET Core Web API:
	  
	  1. ##### Configure Anti-Forgery in Startup.cs:
In the ConfigureServices method of your Startup.cs file, configure anti-forgery services. Note that in a Web API scenario, you might not be using Razor views, so the anti-forgery token might not be generated automatically in the views.


```C#
public void ConfigureServices(IServiceCollection services)
{
    // Other service configurations

    services.AddAntiforgery(options =>
    {
        options.HeaderName = "X-CSRF-TOKEN"; // Customize the header name if needed
        options.SuppressXFrameOptionsHeader = false; // Optional: Include if you need X-Frame-Options header
    });

    // Add MVC services for Web API
    services.AddControllers();
}

```

2. ##### Generate and Include Anti-Forgery Token in Requests:
In a Web API scenario, you need to generate and include the anti-forgery token manually in the request headers. This typically involves retrieving the anti-forgery token from the server and including it in the headers of subsequent requests.
```C#
[ApiController]
[Route("api/[controller]")]
public class MyController : ControllerBase
{
    private readonly IAntiforgery _antiforgery;

    public MyController(IAntiforgery antiforgery)
    {
        _antiforgery = antiforgery;
    }

    [HttpGet]
    public IActionResult GetAntiForgeryTokens()
    {
        var tokens = _antiforgery.GetAndStoreTokens(HttpContext);

        // Return the anti-forgery token in the response
        return Ok(new { csrfToken = tokens.RequestToken });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Submit([FromBody] FormData formData)
    {
        // Code for handling form submission
    }
}

```

The [ValidateAntiForgeryToken] attribute, in this context, checks the presence and validity of the anti-forgery token in the request headers.

3. ##### Include Anti-Forgery Token in AJAX Requests:
When making AJAX requests to your API, ensure that you include the anti-forgery token in the request headers.

In your Startup.cs file:
```javascrip#
// Example using jQuery
$.ajax({
    url: "/api/submit",
    type: "POST",
    headers: {
        "X-CSRF-TOKEN": csrfToken // Include the anti-forgery token here
    },
    contentType: "application/json",
    data: JSON.stringify({
        // Your data here
    }),
    success: function(response) {
        // Handle success
    },
    error: function(error) {
        // Handle error
    }
});

```
Remember that the actual implementation details may vary based on your specific application architecture and requirements. Adjust the provided examples according to your application's structure and the way you handle anti-forgery tokens in your particular scenario.

</p>
</details>

---

# 4. User defined types in sql

<details><summary><b>Answer</b></summary>
<p>

#### Answer: 

 SQL Server allows a particular data type [table] to store a data set. In this data type, we specify the data types and their properties similar to a table.

In the below user-defined table type, we defined two columns [ProductName] and [Cost] with their corresponding data types. Table-valued parameters provide flexibility and better performance than the temporary table in some cases.SQL Server does not maintain the statistics for these table-valued parameters; therefore, you should take you should test your requirements and workload.


```sql
CREATE TYPE ProductTableType AS TABLE (
    ProductName VARCHAR(50),
    Cost INT);

```


2. ##### In the next step, we create a stored procedure that uses the user-defined table data type and selects the values from the variable:

It uses READONLY arguments for the table-valued parameters. We cannot perform the data manipulation operations – Update, delete, insert on the table-valued parameters in the stored procedure body.

```sql
CREATE PROCEDURE GetProducts
    @p ProductTableType READONLY
as
SELECT ProductName,COST
    FROM @P
    RETURN 0
;
GO
```



3. ##### Now, inserts few records in the table variable and executes the stored procedure.
```sql
DECLARE @p as ProductTableType
INSERT @p
    VALUES ('AC', 123)
        , ('CA', 345)
        , ('DB', 543)
; 
    
exec GetProducts @p
```
Remember that the actual implementation details may vary based on your specific application architecture and requirements. Adjust the provided examples according to your application's structure and the way you handle anti-forgery tokens in your particular scenario.

</p>
</details>

---

# 5. Common Table Expressions in sql

<details><summary><b>Answer</b></summary>
<p>

#### Answer: 
The common table expression (CTE) is a powerful construct in SQL that helps simplify a query. CTEs work as virtual tables (with records and columns), created during the execution of a query, used by the query, and eliminated after query execution. CTEs often act as a bridge to transform the data in source tables to the format expected by the query.

A common table expression, or CTE, is a temporary named result set created from a simple SELECT statement that can be used in a subsequent SELECT statement. Each SQL CTE is like a named query, whose result is stored in a virtual table (a CTE) to be referenced later in the main query.

The best way to learn common table expressions is through practice. I recommend LearnSQL.com's interactive Recursive Queries course. It contains over 100 exercises that teach CTEs starting with the basics and progressing to advanced topics like recursive common table expressions.

```sql
WITH my_cte AS (
  SELECT a,b,c
  FROM T1
)
SELECT a,c
FROM my_cte
WHERE ....


with ordered_salary as
(
SELECT name, salary, ROW_NUMBER() OVER(ORDER BY salary DESC) rn
FROM salary_table
)
select name, salary
from ordered_salary
where rn = 5
```
</p>
</details>

---


# 6. what is Controllercontext in .net core web api

<details><summary><b>Answer</b></summary>
<p>

#### Answer: 
In ASP.NET Core Web API, the ControllerContext class represents information about the current state of the controller. It provides access to various properties and methods that give you information about the HTTP request, the response, the route data, and other aspects of the controller's context.

Here are some of the key properties and methods of the ControllerContext class in ASP.NET Core Web API:

##### 	HttpContext Property:
The HttpContext property provides access to the HttpContext object, which contains information about the current HTTP request and response.

```c#
HttpContext httpContext = ControllerContext.HttpContext;
```

##### Request Property:
The Request property provides access to the HttpRequest object, which contains information about the incoming HTTP request.
```c#
HttpRequest request = ControllerContext.Request;
```

##### Response Property:
The Response property provides access to the HttpResponse object, which allows you to modify the HTTP response.
```c#
HttpResponse response = ControllerContext.Response;
```

##### RouteData Property:
The RouteData property provides access to route-related information, such as route values and route data tokens.
```c#
RouteData routeData = ControllerContext.RouteData;
```	

##### ActionDescriptor Property:
The ActionDescriptor property provides information about the action method being executed, including attributes, parameters, and other details.
```c#
ActionDescriptor actionDescriptor = ControllerContext.ActionDescriptor;
```	

##### ModelState Property:
The ModelState property provides access to the model state, which represents validation errors and other state information about the model.
```c#
ModelStateDictionary modelState = ControllerContext.ModelState;
```	

##### Result Property:
The Result property gets or sets the ActionResult that will be executed when the action method is finished.
```c#
IActionResult result = ControllerContext.Result;
```	

##### Url Property:
The Url property provides access to a UrlHelper instance, which allows you to generate URLs based on route values.
```c#
IUrlHelper urlHelper = ControllerContext.Url;
```	

The ControllerContext is often used within the context of a controller action method. It provides a way to interact with various aspects of the HTTP request and response, route data, and other controller-related information. You can access it directly within your controller or use it within action filters, which can inspect or modify the controller context during the request lifecycle.
</p>
</details>

---

# 7. what security policies we need to take while uploading a file 

<details><summary><b>Answer</b></summary>
<p>
#### Answer: 
When implementing file uploads in an ASP.NET Core Web API, it's crucial to consider security measures to prevent various security risks and vulnerabilities. Here are some security policies and best practices to follow when handling file uploads:

##### File Type Validation:
Ensure that file uploads are restricted to specific file types that your application expects. Validate file extensions and content types to prevent the upload of potentially malicious files. Use a whitelist approach, allowing only known and safe file types.

##### File Size Limits:
Set appropriate size limits for uploaded files to prevent denial-of-service attacks through the submission of excessively large files. Limiting the file size helps to manage server resources and ensures a smooth user experience.

##### File Name Sanitization:
Sanitize file names to remove special characters, spaces, and other potentially dangerous elements. This helps prevent directory traversal attacks and ensures that file names won't cause security issues on the server.

##### Use Secure Connections (HTTPS):
Ensure that file uploads occur over a secure connection (HTTPS) to encrypt data in transit. This helps protect sensitive information, such as the contents of the uploaded files and any authentication tokens used during the upload process.

##### Anti-Virus Scanning:
Implement anti-virus scanning on uploaded files to detect and prevent the upload of malicious content. Many organizations have security policies that require scanning files for malware before they are stored or processed.

In your ASP.NET Core controller or service responsible for handling file uploads, implement logic to scan each uploaded file using the anti-virus solution. This might involve calling an API endpoint provided by the anti-virus service or using a local library.
```c#
// Example pseudocode using an imaginary anti-virus SDK
public async Task<IActionResult> UploadFile(IFormFile file)
{
    if (file != null && file.Length > 0)
    {
        // Convert IFormFile to byte array
        byte[] fileBytes;
        using (var ms = new MemoryStream())
        {
            await file.CopyToAsync(ms);
            fileBytes = ms.ToArray();
        }

        // Call the anti-virus scanning method
        bool isFileSafe = AntiVirusScanner.ScanFile(fileBytes);

        if (isFileSafe)
        {
            // Process the safe file
            // ...
            return Ok("File uploaded successfully.");
        }
        else
        {
            // Handle the case where the file is not safe
            return BadRequest("File contains malicious content.");
        }
    }
    else
    {
        return BadRequest("Invalid file.");
    }
}

```

##### Storage Location Security:
Store uploaded files in a secure location outside the web root to prevent direct access by users. Ensure that proper access controls are in place, restricting access to authorized users only. Avoid using predictable or easily guessable file paths.

##### Implement Cross-Origin Resource Sharing (CORS) Policies:
If your API serves content to different origins, configure CORS policies to control which domains are allowed to make requests to your API. This helps prevent unauthorized cross-origin requests.

##### Authentication and Authorization:
Authenticate and authorize users before allowing file uploads. Ensure that only authorized users have the privilege to upload files. Use a robust authentication mechanism, and implement role-based access control if needed.

##### Logging and Monitoring:
Implement logging to capture details about file uploads, including user information, timestamps, and file metadata. Regularly monitor logs to detect any suspicious activity or potential security incidents.

##### Implement Rate Limiting:
To prevent abuse or potential denial-of-service attacks, implement rate limiting on file uploads. This restricts the number of requests a user can make within a specified time period.
###### Install the Required NuGet Package:
Use the AspNetCoreRateLimit package, which provides rate limiting middleware for ASP.NET Core applications. Install it using the Package Manager Console or the Visual Studio Package Manager.
```c#
Install-Package AspNetCoreRateLimit
```

###### Configure Rate Limiting in Startup.cs:
In the ConfigureServices method of your Startup.cs file, configure the rate limiting services.
```c#
using AspNetCoreRateLimit;

public void ConfigureServices(IServiceCollection services)
{
    // Other service configurations

    // Rate limiting configuration
    services.AddMemoryCache();
    services.Configure<IpRateLimitOptions>(Configuration.GetSection("IpRateLimiting"));
    services.Configure<IpRateLimitPolicies>(Configuration.GetSection("IpRateLimitPolicies"));
    services.AddInMemoryRateLimiting();
}

```

In your appsettings.json file, add the rate limiting configuration:
```json
{
  "IpRateLimiting": {
    "EnableEndpointRateLimiting": true,
    "StackBlockedRequests": false,
    "RealIpHeader": "X-Real-IP",
    "ClientIdHeader": "X-ClientId",
    "HttpStatusCode": 429
  },
  "IpRateLimitPolicies": {
    "DefaultPolicy": {
      "Rules": [
        {
          "Endpoint": "*",
          "Period": "1h",
          "Limit": 1000
        }
      ]
    }
  }
}

```
Adjust the configuration according to your specific requirements. This example allows 1000 requests per hour for all endpoints.

###### Use the Rate Limiting Middleware:
In the Configure method of your Startup.cs file, use the rate limiting middleware. Place it after other middleware components but before the MVC middleware.

```c#
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    // Other middleware configurations

    // Rate limiting middleware
    app.UseIpRateLimiting();
    
    // MVC middleware
    app.UseMvc();
}

```
This middleware intercepts requests and checks whether the client has exceeded the defined rate limits.

Customizing Rate Limiting Behavior (Optional):
You can customize rate limiting behavior further by creating custom rate limiting policies, handling blocked requests, and configuring endpoint-specific rate limits.

For more advanced configurations and options, refer to the official documentation of the AspNetCoreRateLimit package: AspNetCoreRateLimit

By following these steps, you've integrated basic rate limiting into your ASP.NET Core Web API. Adjust the configuration parameters and policies based on your specific requirements and desired level of protection.

##### Validation and Error Handling:
Implement robust validation and error handling mechanisms to handle unexpected situations gracefully. Provide informative error messages to users without revealing sensitive information about the server.

By adhering to these security policies and best practices, you can enhance the security of file uploads in your ASP.NET Core Web API and protect against common security threats associated with this functionality.

</p>
</details>

---
# 8. How to update records of male to female and female to male?

<details><summary><b>Answer</b></summary>
<p>
Answer: 


```sql
update user set gender = (case gender when 'male' then 'female' else 'male' end);

```
	
</p>
</details>

---
# Triggers in sql
# How to clear all the sessions of the users and have single active session
# After creating token how to increase the time?
# Custom filters
# Design patterns 
# Authentication techniques
# JWT auth
# Merge in sql
# difference between framework and core?

