# How to run this code
1. Install Node.js v10 or above.
2. Go to this path by rerminal.
3. Run command `node ./ [Number N] [Thread Amount]` (N must < 2^30, Thread amount is default 4)

# Files
- index.js => Main function and display
- shorModule.js => Split thread to brute force and return to Main function
- singleShor.js => Shor's Algorithm code

# Test Number
- 5 x 7 = 35
- 47 x 97 = 4559
- 223 x 227 = 50621
- 659 x 941 = 620119
- 9769 x 3593 = 35100017
- 10103 x 33773 = 341208619

# Test Command
- `node ./ 35`
- `node ./ 4559`
- `node ./ 50621`
- `node ./ 620119`
- `node ./ 35100017`
- `node ./ 341208619`
