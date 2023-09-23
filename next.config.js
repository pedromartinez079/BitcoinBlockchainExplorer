const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                GETBLOCK_API_KEY: 'f2599ba2-c9f4-427e-933e-53a77bffcf10',
                
            },
        };
    }

    return {
        env: {
            GETBLOCK_API_KEY: 'f2599ba2-c9f4-427e-933e-53a77bffcf10',
            
        },
    };
};
