// 1. Install MongoDB Driver: Install-Package MongoDB.Driver

// 2. Configure MongoDB Connection in appsettings.json

// 3. Create MongoDB Context
public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IConfiguration configuration)
    {
        var client = new MongoClient(configuration.GetConnectionString("MongoDB"));
        _database = client.GetDatabase(configuration["MongoDB:DatabaseName"]);
    }

    // Add properties for each collection
    public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
    public IMongoCollection<Product> Products => _database.GetCollection<Product>("Products");
    // Add more collections as needed
}

// 4. Define Models
public class User
{
    public ObjectId Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    // Add more properties as needed
}

public class Product
{
    public ObjectId Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    // Add more properties as needed
}

// 5. Implement CRUD Operations
public class UserRepository
{
    private readonly IMongoCollection<User> _usersCollection;

    public UserRepository(MongoDbContext dbContext)
    {
        _usersCollection = dbContext.Users;
    }

    public async Task<List<User>> GetAllUsers()
    {
        return await _usersCollection.Find(user => true).ToListAsync();
    }

    // Implement other CRUD operations similarly
}
