const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                GETBLOCK_API_KEY: 'API_DEV',
                
            },
        };
    }

    return {
        env: {
            GETBLOCK_API_KEY_PROD: 'API_PROD',
            
        },
    };
};
