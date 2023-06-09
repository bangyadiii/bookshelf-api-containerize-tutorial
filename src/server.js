const Hapi = require("@hapi/hapi");
const routes = require("./router");
require("dotenv").config();

const init = async () => {
    const rest = Hapi.server({
        port: parseInt(process.env.PORT, 10) || 9000,
        host: process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1",
        routes: {
            cors: {
                origin: ["*"],
            },
        },
    });

    rest.route(routes);

    await rest.start();
    // eslint-disable-next-line no-console
    console.log(`server running at ${rest.info.uri}`);
};

init();
