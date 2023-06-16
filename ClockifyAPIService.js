const https = require('https');
const cron = require('node-cron');

const apiKey = 'ZjQ3NTNhMDgtNWNjYS00YzhhLWI1Y2YtODA5YmJmMWMwZWEx';

const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': apiKey,
};

const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format

const body = JSON.stringify({
    start: `${currentDate}T16:30:00.000Z`, // Set the time to 6 PM in UTC
    end: `${currentDate}T12:30:00.000Z`,
    billable: true,
    description: 'CW Training',
    projectId: '64805a0ca2fe384cb7ff1eb5',
    taskId: null,
    tagIds: null,
    customFields: [],
});

const options = {
    hostname: 'global.api.clockify.me',
    path: '/workspaces/5eda2300fe14aa072a454f01/timeEntries/full',
    method: 'POST',
    headers: headers,
};

// Schedule the task to run at 6 PM every day 18
cron.schedule('10 11 * * *', () => {
    const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            console.log('API call successful');
            console.log('Response:', JSON.parse(responseData));
        });
    });

    req.on('error', (error) => {
        console.error('API call failed');
        console.error('Error:', error.message);
    });

    req.write(body);
    req.end();
});
