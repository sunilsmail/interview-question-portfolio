using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

public class RateService
{
    private static readonly HttpClient HttpClient = new HttpClient();
    private static Dictionary<string, RateData> Cache = new Dictionary<string, RateData>();
    private static DateTime LastCacheUpdateTime = DateTime.MinValue;

    public async Task<RateData> GetExchangeRatesAsync()
    {
        // Check if cache needs to be refreshed
        if (DateTime.Now - LastCacheUpdateTime > TimeSpan.FromMinutes(10))
        {
            await RefreshCacheAsync();
        }

        // Serve rates from the cache
        return Cache["USD"]; // Assuming USD for illustration, adapt as per your scenario
    }

    private async Task RefreshCacheAsync()
    {
        try
        {
            // Make a request to the mainframe web service
            var rates = await FetchRatesFromMainframeAsync();

            // Update the local cache
            Cache = rates;
            LastCacheUpdateTime = DateTime.Now;
        }
        catch (Exception ex)
        {
            // Handle exceptions (e.g., log or fallback mechanism)
            Console.WriteLine($"Error refreshing cache: {ex.Message}");
        }
    }

    private async Task<Dictionary<string, RateData>> FetchRatesFromMainframeAsync()
    {
        // Simulate fetching rates from the mainframe web service
        // Adapt this based on your actual web service implementation
        // For simplicity, assuming rates are in USD for various currencies
        var response = await HttpClient.GetStringAsync("https://mainframe-api.com/exchange-rates");
        var rates = DeserializeResponse(response);

        return rates;
    }

    private Dictionary<string, RateData> DeserializeResponse(string response)
    {
        // Simplified deserialization logic
        // Adapt this based on your actual response format
        // For simplicity, assuming rates are in USD for various currencies
        var rates = new Dictionary<string, RateData>
        {
            {"USD", new RateData { Currency = "USD", Value = 1.0 }}, // Default USD rate
            {"EUR", new RateData { Currency = "EUR", Value = 0.85 }},
            {"GBP", new RateData { Currency = "GBP", Value = 0.75 }},
            // Add more currencies as needed
        };

        return rates;
    }

    // Other methods for handling trigger mechanisms, cache invalidation, etc.
}

public class RateData
{
    public string Currency { get; set; }
    public double Value { get; set; }
}

class Program
{
    static async Task Main()
    {
        var rateService = new RateService();

        // Example: Fetch exchange rates
        var exchangeRates = await rateService.GetExchangeRatesAsync();
        Console.WriteLine($"Exchange rate for USD to {exchangeRates.Currency}: {exchangeRates.Value}");
    }
}


In this example:

RateService encapsulates the logic for fetching and caching exchange rates.
GetExchangeRatesAsync method serves rates from the cache if they are still valid; otherwise, it triggers a refresh.
RefreshCacheAsync method fetches rates from the mainframe and updates the local cache.
FetchRatesFromMainframeAsync simulates making a request to the mainframe web service.
DeserializeResponse method converts the web service response into a dictionary of RateData objects.
Remember to adapt this example to your specific requirements and error handling scenarios in a production environment.



// CurrencyRatesController.cs

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

[ApiController]
[Route("api/currency")]
public class CurrencyRatesController : ControllerBase
{
    private readonly IRateService _rateService;

    public CurrencyRatesController(IRateService rateService)
    {
        _rateService = rateService;
    }

    [HttpGet]
    public IActionResult GetRates()
    {
        // Check the cache for the latest rates
        var cachedRates = _rateService.GetCachedRates();

        // If rates are not in the cache or need to be updated
        if (cachedRates == null || _rateService.NeedsUpdate(cachedRates.LastUpdated))
        {
            // Fetch rates from the mainframe
            var newRates = _rateService.FetchRatesFromMainframe();

            // Update the cache with the new rates
            _rateService.UpdateCache(newRates);

            return Ok(newRates);
        }

        // Serve rates from the cache
        return Ok(cachedRates.Rates);
    }
}

// RateService.cs

using System;

public interface IRateService
{
    CachedRates GetCachedRates();
    bool NeedsUpdate(DateTime lastUpdated);
    Rates FetchRatesFromMainframe();
    void UpdateCache(Rates newRates);
}

public class CachedRates
{
    public DateTime LastUpdated { get; set; }
    public Rates Rates { get; set; }
}

public class Rates
{
    // Properties for currency exchange rates
}

public class RateService : IRateService
{
    private CachedRates _cachedRates;

    public CachedRates GetCachedRates()
    {
        return _cachedRates;
    }

    public bool NeedsUpdate(DateTime lastUpdated)
    {
        // Implement logic to check if rates need to be updated based on lastUpdated timestamp
        // For simplicity, always return true in this example
        return true;
    }

    public Rates FetchRatesFromMainframe()
    {
        // Implement logic to fetch rates from the mainframe web service
        // For simplicity, returning dummy rates here
        return new Rates();
    }

    public void UpdateCache(Rates newRates)
    {
        // Update the cached rates with the new rates and timestamp
        _cachedRates = new CachedRates
        {
            LastUpdated = DateTime.UtcNow,
            Rates = newRates
        };
    }
}
