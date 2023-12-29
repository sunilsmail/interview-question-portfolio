# Filters in asp.net core
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

