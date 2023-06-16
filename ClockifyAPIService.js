const https = require('https');

const options = {
    hostname: 'global.api.clockify.me',
    path: '/workspaces/5eda2300fe14aa072a454f01/timeEntries/full',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'ZjQ3NTNhMDgtNWNjYS00YzhhLWI1Y2YtODA5YmJmMWMwZWEx'
    }
};

const req = https.request(options, res => {
    let data = '';

    res.on('data', chunk => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('API call successful:', data);
    });
});

req.on('error', error => {
    console.error('API call error:', error);
});

const payload = JSON.stringify({
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    billable: true,
    description: 'CW Training',
    projectId: '64805a0ca2fe384cb7ff1eb5',
    taskId: null,
    tagIds: null,
    customFields: []
});

req.write(payload);
req.end();
