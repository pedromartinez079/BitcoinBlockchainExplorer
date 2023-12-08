const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                GETBLOCK_API_KEY_DEV: 'DEV_API_KEY', // For local tests: GETBLOCK_API_KEY
                GETBLOCK_ACCESS_TOKEN_DEV: 'DEV_TOKEN', // For local tests
                
            },
        };
    }

    return {
        env: {
            GETBLOCK_API_KEY_PROD: 'PROD_API_KEY',
            GETBLOCK_ACCESS_TOKEN_PROD: 'PROD_TOKEN',
            
        },
    };
};


