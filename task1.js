class LogEntry {
    constructor(deviceId, userId, loggedIn, loggedOut, lastOpenedAt) {
        this.deviceId = deviceId;
        this.userId = userId;
        this.logged_In = new Date(loggedIn);
        this.logged_Out = new Date(loggedOut);
        this.lastOpenedAt = new Date(lastOpenedAt);
    }
}

// Example log entries
const logEntries = [
    new LogEntry("device1", "user1", "2023-01-01T00:00:00Z", "2023-03-01T00:00:00Z", "2023-02-15T12:34:56Z"),
    new LogEntry("device2", "user1", "2023-02-01T00:00:00Z", "2023-05-01T00:00:00Z", "2023-04-15T12:34:56Z"),
    new LogEntry("device3", "user2", "2023-01-01T00:00:00Z", "2023-04-01T00:00:00Z", "2023-02-15T12:34:56Z"),
    new LogEntry("device4", "user3", "2023-02-01T00:00:00Z", "2023-05-01T00:00:00Z", "2023-04-15T12:34:56Z")
];

// Function to get month and year in YYYY-MM format
const getMonthYear = (date) => {
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`;
}

const monthlyLoggedInAndActiveUsers = {};

// Function to calculate monthly stats
const calculateMonthlyStats = (entries) => {
    entries.forEach(entry => {
        let currentDate = new Date(entry.logged_In);
        const endDate = new Date(entry.logged_Out);
        
        while (currentDate <= endDate) {
            const monthYear = getMonthYear(currentDate);
            
            if (!monthlyLoggedInAndActiveUsers[monthYear]) {
                monthlyLoggedInAndActiveUsers[monthYear] = { loggedInUsers: new Set(), activeUsers: new Set() };
            }
            
            monthlyLoggedInAndActiveUsers[monthYear].loggedInUsers.add(entry.userId);
            
            if (getMonthYear(entry.lastOpenedAt) === monthYear) {
                monthlyLoggedInAndActiveUsers[monthYear].activeUsers.add(entry.userId);
            }
            
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
    });
}

// Call the function
calculateMonthlyStats(logEntries);

// Output
Object.keys(monthlyLoggedInAndActiveUsers).forEach(month => {
    const { loggedInUsers, activeUsers } = monthlyLoggedInAndActiveUsers[month];
    console.log(`Month: ${month}`);
    console.log(`Logged In Users: ${loggedInUsers.size}`);
    console.log(`Active Users: ${activeUsers.size}`);
});