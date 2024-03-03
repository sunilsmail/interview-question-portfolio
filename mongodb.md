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



_----_------+


// User model
public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }
}

// UserController
[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly MongoDbContext _dbContext;

    public UserController(MongoDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _dbContext.Users.Find(user => true).ToListAsync();
        return Ok(users);
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] User user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _dbContext.Users.InsertOneAsync(user);
        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(string id)
    {
        var user = await _dbContext.Users.Find(u => u.Id == id).FirstOrDefaultAsync();
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }

    // Add other CRUD actions (Update, Delete) similarly
}

