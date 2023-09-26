const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                GETBLOCK_API_KEY_DEV: 'DEV_API_KEY', // For local tests: GETBLOCK_API_KEY
                
            },
        };
    }

    return {
        env: {
            GETBLOCK_API_KEY_PROD: 'PROD_API_KEY',
            
        },
    };
};
