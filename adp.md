-- Create the target table
CREATE TABLE Employee (
    EmployeeID INT PRIMARY KEY,
    Name VARCHAR(50),
    Department VARCHAR(50),
    Salary DECIMAL(10, 2)
);

-- Insert some sample data into the target table
INSERT INTO Employee (EmployeeID, Name, Department, Salary)
VALUES (1, 'John Doe', 'HR', 50000.00),
       (2, 'Jane Smith', 'IT', 60000.00);

-- Create the source table
CREATE TABLE EmployeeUpdate (
    EmployeeID INT PRIMARY KEY,
    Name VARCHAR(50),
    Department VARCHAR(50),
    Salary DECIMAL(10, 2)
);

-- Insert some sample data into the source table
INSERT INTO EmployeeUpdate (EmployeeID, Name, Department, Salary)
VALUES (1, 'John Doe', 'HR', 55000.00),
       (3, 'Alice Johnson', 'Finance', 70000.00);

-- Perform the bulk update using MERGE statement
MERGE INTO Employee AS target
USING EmployeeUpdate AS source
ON target.EmployeeID = source.EmployeeID
WHEN MATCHED THEN
    UPDATE SET 
        target.Name = source.Name,
        target.Department = source.Department,
        target.Salary = source.Salary
WHEN NOT MATCHED BY TARGET THEN
    INSERT (EmployeeID, Name, Department, Salary) 
    VALUES (source.EmployeeID, source.Name, source.Department, source.Salary);

-- View the updated target table
SELECT * FROM Employee;


using (var dbContextTransaction = context.Database.BeginTransaction(System.Data.IsolationLevel.Serializable))
{
    try
    {
        // run your query to ensure no competing reservation exists
        // use AsNoTracking to ensure the query runs against your database in the transaction context
        context.Reservations.AsNoTracking()...;

        // if it is valid, insert your reservations
        context.Reservations.Add(...);

        // run the insert statement
        context.SaveChanges();

        // commit the transaction
        dbContextTransaction.Commit();
    }
    catch
    {
        // roll back the transaction if anything went wrong so that your database isn't locked
        dbContextTransaction.Rollback();

        throw;
    }
}