
---

# 1. Filters in asp.net core

- A: Authorization Filters
- B: Action filters
- C: Result Filters	
- D: Exception Filters	
- E: Resource Filters
- E: Custom Filters


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
# XSS attack: 
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

# CSRF attack
# User defined types in sql
# CTE in sql
# Triggers in sql
# How to clear all the sessions of the users and have single active session
# Controller Context
# After creating token how to increase the time?
# How to update records of male to female and female to male?
 update user set gender = (case gender when 'male' then 'female' else 'male' end);
# Custom filters
# Design patterns 
# Authentication techniques
# JWT auth
# what security policies we need to take while uploading a file 
# Merge in sql

