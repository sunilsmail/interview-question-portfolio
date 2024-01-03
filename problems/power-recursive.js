function pow(a, b)
{

    if (b > 0)

        return multiply(a, pow(a, b - 1));

    else

        return 1;
}
 
// A recursive function to get x*y 

function multiply(x, y)
{

    if (y > 0)

        return (x + multiply(x, y - 1));

    else

        return 0;
}
 
// Driver code
console.log(pow(5, 3));
