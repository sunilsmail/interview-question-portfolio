# Filters in asp.net core
# XSS attack: 
      Cross-Site Scripting (XSS) is a security vulnerability that allows 
      attackers to inject malicious scripts into web pages viewed by other users. 
      To prevent XSS in ASP.NET Core Web API, you should follow best practices and utilize 
      security features provided by the framework. Here are some recommendations:
##### Input Validation:
Ensure that all user inputs are validated on both the client and server sides. Validate and sanitize user inputs to reject any malicious content. Use validation attributes, regular expressions, or custom validation logic to validate input data.


[HttpPost]
public IActionResult SomeAction([FromBody] UserInputModel userInput)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }
}


# CSRF attack
# User defined types in sql
# CTE in sql
# Triggers in sql
# How to clear all the sessions of the users and have single active session
# Controller Context
# After creating token how to increase the time?
# How to update records of male to female and female to male?
# Custom filters
# Design patterns 
# Authentication techniques

